import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Star, Phone, Mail, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface Lab {
  id: string;
  name: string;
  rating: number;
  distance: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  timings: string;
  certifications: string[];
}

// Hardcoded tier-2 cities in India
const TIER_2_CITIES = [
  'Lucknow',
  'Jaipur', 
  'Bhopal',
  'Coimbatore',
  'Nagpur',
  'Visakhapatnam',
  'Indore',
  'Patna',
  'Vadodara',
  'Ludhiana',
  'Agra',
  'Nashik',
  'Madurai',
  'Kochi',
  'Thiruvananthapuram'
];

// Hardcoded lab data for each city
const LABS_DATA: Record<string, Lab[]> = {
  'Lucknow': [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'HealthFirst Diagnostics',
      rating: 4.5,
      distance: '2.1 km away',
      city: 'Lucknow',
      address: 'Gomti Nagar, Lucknow',
      phone: '+91 9876543210',
      email: 'contact@healthfirst.com',
      timings: '7:00 AM - 9:00 PM',
      certifications: ['NABL', 'ISO 15189']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Metro Lab Services',
      rating: 4.2,
      distance: '3.5 km away',
      city: 'Lucknow',
      address: 'Hazratganj, Lucknow',
      phone: '+91 9876543211',
      email: 'info@metrolab.com',
      timings: '6:30 AM - 10:00 PM',
      certifications: ['NABL', 'CAP']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'CityLife Diagnostics',
      rating: 4.7,
      distance: '1.8 km away',
      city: 'Lucknow',
      address: 'Alambagh, Lucknow',
      phone: '+91 9876543212',
      email: 'support@citylife.com',
      timings: '8:00 AM - 8:00 PM',
      certifications: ['NABL', 'ISO 15189', 'JCI']
    }
  ],
  'Jaipur': [
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Pink City Labs',
      rating: 4.3,
      distance: '2.8 km away',
      city: 'Jaipur',
      address: 'C-Scheme, Jaipur',
      phone: '+91 9876543213',
      email: 'hello@pinkcitylabs.com',
      timings: '7:00 AM - 9:30 PM',
      certifications: ['NABL', 'ISO 15189']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Royal Diagnostics',
      rating: 4.6,
      distance: '1.2 km away',
      city: 'Jaipur',
      address: 'Malviya Nagar, Jaipur',
      phone: '+91 9876543214',
      email: 'care@royaldiagnostics.com',
      timings: '6:00 AM - 10:00 PM',
      certifications: ['NABL', 'CAP', 'ISO 15189']
    }
  ],
  'Bhopal': [
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Central India Labs',
      rating: 4.4,
      distance: '3.2 km away',
      city: 'Bhopal',
      address: 'New Market, Bhopal',
      phone: '+91 9876543215',
      email: 'info@centrallabs.com',
      timings: '7:30 AM - 9:00 PM',
      certifications: ['NABL', 'ISO 15189']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440007',
      name: 'Madhya Pradesh Diagnostics',
      rating: 4.1,
      distance: '4.5 km away',
      city: 'Bhopal',
      address: 'MP Nagar, Bhopal',
      phone: '+91 9876543216',
      email: 'contact@mpdiagnostics.com',
      timings: '8:00 AM - 8:30 PM',
      certifications: ['NABL']
    }
  ],
  'Coimbatore': [
    {
      id: '550e8400-e29b-41d4-a716-446655440008',
      name: 'Tamil Health Center',
      rating: 4.8,
      distance: '1.5 km away',
      city: 'Coimbatore',
      address: 'RS Puram, Coimbatore',
      phone: '+91 9876543217',
      email: 'support@tamilhealth.com',
      timings: '6:30 AM - 10:30 PM',
      certifications: ['NABL', 'ISO 15189', 'JCI']
    }
  ],
  'Nagpur': [
    {
      id: '550e8400-e29b-41d4-a716-446655440009',
      name: 'Orange City Labs',
      rating: 4.2,
      distance: '2.7 km away',
      city: 'Nagpur',
      address: 'Sadar, Nagpur',
      phone: '+91 9876543218',
      email: 'info@orangecitylabs.com',
      timings: '7:00 AM - 9:00 PM',
      certifications: ['NABL', 'ISO 15189']
    }
  ],
  'Visakhapatnam': [
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'Coastal Diagnostics',
      rating: 4.5,
      distance: '3.1 km away',
      city: 'Visakhapatnam',
      address: 'MVP Colony, Visakhapatnam',
      phone: '+91 9876543219',
      email: 'hello@coastaldiag.com',
      timings: '6:00 AM - 10:00 PM',
      certifications: ['NABL', 'CAP']
    }
  ]
};

const LabSelectionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  
  const [selectedCity, setSelectedCity] = useState('');
  const [labs, setLabs] = useState<Lab[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');

  const testId = searchParams.get('testId') || '';
  const testName = searchParams.get('testName') || '';
  const originalPrice = parseInt(searchParams.get('testPrice') || '0');

  useEffect(() => {
    if (selectedCity) {
      setLabs(LABS_DATA[selectedCity] || []);
    }
  }, [selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const sortedLabs = [...labs].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance.replace(' km away', '')) - parseFloat(b.distance.replace(' km away', ''));
      default:
        return 0;
    }
  });

  const handleLabSelect = (lab: Lab) => {
    const bookingParams = new URLSearchParams({
      testId,
      testName,
      testPrice: originalPrice.toString(),
      labId: lab.id,
      labName: lab.name,
      selectedCity
    });
    
    navigate(`/booking?${bookingParams.toString()}`);
  };

  const renderLabCard = (lab: Lab) => (
    <Card key={lab.id} className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🏥</span>
              <h3 className="text-lg font-semibold text-gray-900">{lab.name}</h3>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="text-lg mr-2">⭐</span>
              <span className="font-medium">{lab.rating}/5</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-lg mr-2">📍</span>
              <span className="text-sm">{lab.distance}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {t('labSelection.card.viewDetails')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{lab.name}</DialogTitle>
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
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{lab.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{lab.email}</span>
                </div>
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

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">{t('labSelection.title')}</h1>
            
            {/* City Selection */}
            <div className="mb-6">
              <Label className="text-base font-medium mb-2 block">Select Your City</Label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a city" />
                </SelectTrigger>
                <SelectContent>
                  {TIER_2_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!selectedCity ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Please select a city to view available labs.</h3>
                <p className="text-gray-600">Choose your city from the dropdown above to see labs near you.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
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
                  <Select value={sortBy} onValueChange={(value: 'rating' | 'distance') => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">{t('labSelection.sortBy.rating')}</SelectItem>
                      <SelectItem value="distance">{t('labSelection.sortBy.distance')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Lab Cards */}
              {labs.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">{t('labSelection.noLabs.title')}</h3>
                    <p className="text-gray-600 mb-4">{t('labSelection.noLabs.description')}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {sortedLabs.map(renderLabCard)}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );

};

export default LabSelectionPage;