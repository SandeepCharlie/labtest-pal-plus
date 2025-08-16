import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, CreditCard, Home, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingData {
  testId: string;
  testName: string;
  testPrice: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  date: Date | undefined;
  time: string;
  paymentMethod: 'online' | 'cash';
}

interface TimeRestriction {
  test_id: string;
  test_name: string;
  start_time: string;
  end_time: string;
  is_fasting_required: boolean;
  preparation_hours: number;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timeRestrictions, setTimeRestrictions] = useState<TimeRestriction | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string>('');

  const [bookingData, setBookingData] = useState<BookingData>({
    testId: searchParams.get('testId') || '',
    testName: searchParams.get('testName') || '',
    testPrice: parseInt(searchParams.get('testPrice') || '0'),
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    date: undefined,
    time: '',
    paymentMethod: 'online'
  });

  useEffect(() => {
    if (bookingData.testId) {
      fetchTimeRestrictions();
    }
  }, [bookingData.testId]);

  useEffect(() => {
    if (bookingData.date && timeRestrictions) {
      generateTimeSlots();
    }
  }, [bookingData.date, timeRestrictions]);

  const fetchTimeRestrictions = async () => {
    try {
      const { data, error } = await supabase
        .from('test_time_restrictions')
        .select('*')
        .eq('test_id', bookingData.testId)
        .single();

      if (error) throw error;
      setTimeRestrictions(data);
    } catch (error) {
      console.error('Error fetching time restrictions:', error);
    }
  };

  const generateTimeSlots = () => {
    if (!timeRestrictions) return;

    const slots: string[] = [];
    const [startHour, startMinute] = timeRestrictions.start_time.split(':').map(Number);
    const [endHour, endMinute] = timeRestrictions.end_time.split(':').map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    for (let time = startTime; time < endTime; time += 30) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }

    setAvailableTimeSlots(slots);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(bookingData.fullName && bookingData.phone && bookingData.email && bookingData.address);
      case 2:
        return !!(bookingData.date && bookingData.time);
      case 3:
        return !!bookingData.paymentMethod;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: t('booking.validation.error'),
        description: t('booking.validation.fillRequired'),
        variant: 'destructive'
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          test_id: bookingData.testId,
          test_name: bookingData.testName,
          test_price: bookingData.testPrice,
          full_name: bookingData.fullName,
          phone: bookingData.phone,
          email: bookingData.email,
          address: bookingData.address,
          landmark: bookingData.landmark || '',
          booking_date: format(bookingData.date!, 'yyyy-MM-dd'),
          booking_time: bookingData.time,
          payment_method: bookingData.paymentMethod,
          lab_id: searchParams.get('labId') || null,
          lab_name: searchParams.get('labName') || '',
          selected_city: searchParams.get('selectedCity') || '',
          booking_id: '' // Will be auto-generated by trigger
        })
        .select('booking_id')
        .single();

      if (error) throw error;

      setBookingId(data.booking_id);
      setCurrentStep(4);
      
      toast({
        title: t('booking.success.title'),
        description: t('booking.success.description')
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: t('booking.error.title'),
        description: t('booking.error.description'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const isTimeSlotValid = (time: string): boolean => {
    if (!timeRestrictions) return true;
    
    const [hour, minute] = time.split(':').map(Number);
    const timeMinutes = hour * 60 + minute;
    
    const [startHour, startMinute] = timeRestrictions.start_time.split(':').map(Number);
    const [endHour, endMinute] = timeRestrictions.end_time.split(':').map(Number);
    
    const startTimeMinutes = startHour * 60 + startMinute;
    const endTimeMinutes = endHour * 60 + endMinute;
    
    return timeMinutes >= startTimeMinutes && timeMinutes < endTimeMinutes;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{t('booking.personalDetails.fullName')} *</Label>
          <Input
            id="fullName"
            value={bookingData.fullName}
            onChange={(e) => setBookingData({...bookingData, fullName: e.target.value})}
            placeholder={t('booking.personalDetails.fullNamePlaceholder')}
          />
        </div>
        <div>
          <Label htmlFor="phone">{t('booking.personalDetails.phone')} *</Label>
          <Input
            id="phone"
            value={bookingData.phone}
            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
            placeholder={t('booking.personalDetails.phonePlaceholder')}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">{t('booking.personalDetails.email')} *</Label>
        <Input
          id="email"
          type="email"
          value={bookingData.email}
          onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
          placeholder={t('booking.personalDetails.emailPlaceholder')}
        />
      </div>

      <div>
        <Label htmlFor="address">{t('booking.personalDetails.address')} *</Label>
        <Textarea
          id="address"
          value={bookingData.address}
          onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
          placeholder={t('booking.personalDetails.addressPlaceholder')}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="landmark">{t('booking.personalDetails.landmark')}</Label>
        <Input
          id="landmark"
          value={bookingData.landmark}
          onChange={(e) => setBookingData({...bookingData, landmark: e.target.value})}
          placeholder={t('booking.personalDetails.landmarkPlaceholder')}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label>{t('booking.dateTime.selectDate')} *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !bookingData.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {bookingData.date ? format(bookingData.date, "PPP") : t('booking.dateTime.pickDate')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={bookingData.date}
              onSelect={(date) => setBookingData({...bookingData, date, time: ''})}
              disabled={(date) => date < new Date() || date < new Date(Date.now() + 24 * 60 * 60 * 1000)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {timeRestrictions && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            {t('booking.dateTime.idealTime')}: {timeRestrictions.start_time} - {timeRestrictions.end_time}
          </p>
          {timeRestrictions.is_fasting_required && (
            <p className="text-sm text-amber-700">
              ⚠️ {t('booking.dateTime.fastingRequired')} ({timeRestrictions.preparation_hours} {t('booking.dateTime.hours')})
            </p>
          )}
        </div>
      )}

      {bookingData.date && (
        <div>
          <Label>{t('booking.dateTime.selectTime')} *</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {availableTimeSlots.map((time) => (
              <Button
                key={time}
                variant={bookingData.time === time ? "default" : "outline"}
                size="sm"
                onClick={() => setBookingData({...bookingData, time})}
                disabled={!isTimeSlotValid(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          
          {bookingData.time && !isTimeSlotValid(bookingData.time) && (
            <p className="text-red-600 text-sm mt-2">
              {t('booking.dateTime.invalidTime')}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>{t('booking.payment.selectMethod')} *</Label>
        <RadioGroup 
          value={bookingData.paymentMethod} 
          onValueChange={(value: 'online' | 'cash') => setBookingData({...bookingData, paymentMethod: value})}
          className="mt-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="online" id="online" />
            <div className="flex items-center space-x-2 flex-1">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <Label htmlFor="online" className="font-medium">{t('booking.payment.online')}</Label>
                <p className="text-sm text-gray-600">{t('booking.payment.onlineDesc')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="cash" id="cash" />
            <div className="flex items-center space-x-2 flex-1">
              <Home className="w-5 h-5 text-primary" />
              <div>
                <Label htmlFor="cash" className="font-medium">{t('booking.payment.cash')}</Label>
                <p className="text-sm text-gray-600">{t('booking.payment.cashDesc')}</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">{t('booking.confirmation.title')}</h2>
        <p className="text-gray-600">{t('booking.confirmation.description')}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="font-medium">{t('booking.confirmation.bookingId')}:</span>
              <span className="font-mono">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('booking.confirmation.testName')}:</span>
              <span>{bookingData.testName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('booking.confirmation.date')}:</span>
              <span>{bookingData.date ? format(bookingData.date, 'PPP') : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('booking.confirmation.time')}:</span>
              <span>{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('booking.confirmation.amount')}:</span>
              <span>₹{bookingData.testPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button onClick={() => navigate('/')} className="w-full">
          {t('booking.confirmation.backToHome')}
        </Button>
        <Button variant="outline" className="w-full">
          {t('booking.confirmation.callSupport')}
        </Button>
      </div>
    </div>
  );

  const steps = [
    { title: t('booking.steps.personalDetails'), component: renderStep1 },
    { title: t('booking.steps.dateTime'), component: renderStep2 },
    { title: t('booking.steps.payment'), component: renderStep3 },
    { title: t('booking.steps.confirmation'), component: renderStep4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">{t('booking.title')}</CardTitle>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-2 mt-6">
                {steps.map((_, index) => (
                  <React.Fragment key={index}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      index + 1 <= currentStep 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-gray-200 text-gray-600"
                    )}>
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-12 h-1 rounded",
                        index + 1 < currentStep ? "bg-primary" : "bg-gray-200"
                      )} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <p className="text-center text-gray-600 mt-2">
                {steps[currentStep - 1]?.title}
              </p>
            </CardHeader>

            <CardContent>
              {steps[currentStep - 1]?.component()}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('booking.navigation.previous')}
                  </Button>

                  {currentStep === 3 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={loading || !validateStep(currentStep)}
                    >
                      {loading ? t('booking.navigation.submitting') : t('booking.navigation.submit')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!validateStep(currentStep)}
                    >
                      {t('booking.navigation.next')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;