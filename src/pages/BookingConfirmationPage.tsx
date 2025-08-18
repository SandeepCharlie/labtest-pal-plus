import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Building, TestTube, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface BookingDetails {
  testName: string;
  city: string;
  labName: string;
  date: string;
  time: string;
  bookingId: string;
}

const BookingConfirmationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking details from location state or use defaults
  const bookingDetails: BookingDetails = location.state || {
    testName: 'Complete Blood Count (CBC)',
    city: 'Lucknow',
    labName: 'HealthCare Plus Lab',
    date: new Date().toLocaleDateString('en-IN'),
    time: '10:00 AM',
    bookingId: 'BK' + Date.now().toString().slice(-6)
  };

  const handleTrackNow = () => {
    navigate('/tracking', { state: bookingDetails });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('confirmation.successTitle')}
            </h1>
            <p className="text-muted-foreground">
              {t('confirmation.successMessage')}
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                {t('confirmation.bookingDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Booking ID */}
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{t('confirmation.bookingId')}:</span>
                <span className="font-mono text-primary">{bookingDetails.bookingId}</span>
              </div>

              {/* Test Name */}
              <div className="flex items-start space-x-3">
                <TestTube className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t('confirmation.testName')}</p>
                  <p className="text-muted-foreground">{bookingDetails.testName}</p>
                </div>
              </div>

              {/* City */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t('confirmation.city')}</p>
                  <p className="text-muted-foreground">{bookingDetails.city}</p>
                </div>
              </div>

              {/* Laboratory */}
              <div className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t('confirmation.laboratory')}</p>
                  <p className="text-muted-foreground">{bookingDetails.labName}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t('confirmation.dateTime')}</p>
                  <p className="text-muted-foreground">
                    {bookingDetails.date} at {bookingDetails.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={handleTrackNow}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {t('confirmation.trackNow')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
              size="lg"
            >
              {t('confirmation.backToHome')}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {t('confirmation.additionalInfo')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;