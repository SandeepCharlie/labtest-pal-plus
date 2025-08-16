import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Star, Phone, Mail, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Lab {
  id: string;
  lab_name: string;
  city: string;
  address: string;
  logo_url?: string;
  rating: number;
  review_count: number;
  phone?: string;
  email?: string;
  website?: string;
  certifications?: string[];
  timings: string;
  price: number;
  distance?: string;
}

const LabSelectionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [labs, setLabs] = useState<Lab[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [showCityInput, setShowCityInput] = useState(true);

  const testId = searchParams.get('testId') || '';
  const testName = searchParams.get('testName') || '';
  const originalPrice = parseInt(searchParams.get('testPrice') || '0');

  useEffect(() => {
    if (selectedCity && testId) {
      fetchLabsForTest();
    }
  }, [selectedCity, testId]);

  const fetchLabsForTest = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('labs')
        .select(`
          id,
          lab_name,
          city,
          address,
          logo_url,
          rating,
          review_count,
          phone,
          email,
          website,
          certifications,
          timings,
          lab_tests!inner(price)
        `)
        .eq('city', selectedCity)
        .eq('lab_tests.test_id', testId)
        .eq('lab_tests.is_available', true)
        .eq('is_active', true);

      if (error) throw error;

      const labsWithPrices = data.map(lab => ({
        ...lab,
        price: lab.lab_tests[0]?.price || originalPrice,
        distance: '2.1 km' // Mock distance - would be calculated from user location
      }));

      setLabs(labsWithPrices);
    } catch (error) {
      console.error('Error fetching labs:', error);
      toast({
        title: t('labSelection.error.title'),
        description: t('labSelection.error.fetchFailed'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCitySubmit = () => {
    if (!cityInput.trim()) {
      toast({
        title: t('labSelection.city.validation.required'),
        description: t('labSelection.city.validation.description'),
        variant: 'destructive'
      });
      return;
    }
    setSelectedCity(cityInput.trim());
    setShowCityInput(false);
  };

  const sortedLabs = [...labs].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance || '0') - parseFloat(b.distance || '0');
      default:
        return 0;
    }
  });

  const handleLabSelect = (lab: Lab) => {
    const bookingParams = new URLSearchParams({
      testId,
      testName,
      testPrice: lab.price.toString(),
      labId: lab.id,
      labName: lab.lab_name,
      selectedCity
    });
    
    navigate(`/booking?${bookingParams.toString()}`);
  };

  const renderLabCard = (lab: Lab) => (
    <Card key={lab.id} className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{lab.lab_name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{lab.address}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{lab.timings}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">₹{lab.price}</div>
            <div className="text-sm text-gray-500">{t('labSelection.card.forTest')}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-medium">{lab.rating}</span>
            <span className="text-gray-500 ml-1">({lab.review_count} {t('labSelection.card.reviews')})</span>
          </div>
          {lab.distance && (
            <span className="text-sm text-gray-600">{lab.distance}</span>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {t('labSelection.card.viewDetails')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{lab.lab_name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">{t('labSelection.details.address')}</Label>
                  <p className="text-sm text-gray-600">{lab.address}</p>
                </div>
                <div>
                  <Label className="font-medium">{t('labSelection.details.timings')}</Label>
                  <p className="text-sm text-gray-600">{lab.timings}</p>
                </div>
                {lab.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{lab.phone}</span>
                  </div>
                )}
                {lab.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{lab.email}</span>
                  </div>
                )}
                {lab.certifications && lab.certifications.length > 0 && (
                  <div>
                    <Label className="font-medium flex items-center mb-2">
                      <Award className="w-4 h-4 mr-1" />
                      {t('labSelection.details.certifications')}
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {lab.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={() => handleLabSelect(lab)}
            className="flex-1"
          >
            {t('labSelection.card.selectLab')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showCityInput) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-md">
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
                <CardTitle className="text-center">{t('labSelection.city.title')}</CardTitle>
                <p className="text-center text-gray-600">{t('labSelection.city.description')}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="city">{t('labSelection.city.label')}</Label>
                  <Input
                    id="city"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder={t('labSelection.city.placeholder')}
                    onKeyPress={(e) => e.key === 'Enter' && handleCitySubmit()}
                  />
                </div>
                <Button 
                  onClick={handleCitySubmit}
                  className="w-full"
                  disabled={!cityInput.trim()}
                >
                  {t('labSelection.city.continue')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setShowCityInput(true)}
            className="mb-6 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{t('labSelection.title')}</h1>
            <p className="text-gray-600">
              {t('labSelection.subtitle').replace('{{testName}}', testName).replace('{{city}}', selectedCity)}
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {t('labSelection.found').replace('{{count}}', labs.length.toString())}
            </p>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort">{t('labSelection.sortBy.label')}</Label>
              <Select value={sortBy} onValueChange={(value: 'price' | 'rating' | 'distance') => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">{t('labSelection.sortBy.price')}</SelectItem>
                  <SelectItem value="rating">{t('labSelection.sortBy.rating')}</SelectItem>
                  <SelectItem value="distance">{t('labSelection.sortBy.distance')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lab Cards */}
          {loading ? (
            <div className="text-center py-8">
              <p>{t('labSelection.loading')}</p>
            </div>
          ) : labs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">{t('labSelection.noLabs.title')}</h3>
                <p className="text-gray-600 mb-4">{t('labSelection.noLabs.description')}</p>
                <Button onClick={() => setShowCityInput(true)}>
                  {t('labSelection.noLabs.changeCity')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedLabs.map(renderLabCard)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LabSelectionPage;