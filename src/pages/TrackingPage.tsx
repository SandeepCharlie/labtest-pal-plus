import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

const TrackingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [agentPosition, setAgentPosition] = useState({ lat: 26.8467, lng: 80.9462 }); // Starting position in Lucknow
  const [estimatedTime, setEstimatedTime] = useState(25);

  const bookingDetails = location.state || {
    testName: 'Complete Blood Count (CBC)',
    city: 'Lucknow',
    labName: 'HealthCare Plus Lab',
    bookingId: 'BK123456'
  };

  // Simulate agent movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      
      setEstimatedTime(prev => Math.max(5, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const agentDetails = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-background">
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

          {/* Status Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('tracking.title')}
            </h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {t('tracking.status.onTheWay')}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {t('tracking.liveLocation')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-muted rounded-lg h-96 flex items-center justify-center overflow-hidden">
                    {/* Dummy Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                      {/* Road lines */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-1/2"></div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400 transform -translate-x-1/2"></div>
                      
                      {/* Buildings */}
                      <div className="absolute top-8 left-8 w-12 h-16 bg-gray-600 rounded-sm"></div>
                      <div className="absolute top-12 right-12 w-10 h-14 bg-gray-700 rounded-sm"></div>
                      <div className="absolute bottom-8 left-16 w-14 h-12 bg-gray-500 rounded-sm"></div>
                      
                      {/* Moving Agent Marker */}
                      <div 
                        className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg transition-all duration-3000 ease-in-out"
                        style={{
                          left: `${40 + (agentPosition.lng - 80.9462) * 10000}%`,
                          top: `${60 + (agentPosition.lat - 26.8467) * 10000}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      
                      {/* Destination Marker */}
                      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span>{t('tracking.agentLocation')}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>{t('tracking.yourLocation')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tracking Details */}
            <div className="space-y-6">
              {/* Estimated Time */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      {t('tracking.estimatedArrival')}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {estimatedTime} {t('tracking.minutes')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {t('tracking.agentDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{agentDetails.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ {agentDetails.rating}/5 {t('tracking.rating')}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('tracking.callAgent')}
                  </Button>
                </CardContent>
              </Card>

              {/* Booking Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('tracking.bookingInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('tracking.bookingId')}</p>
                    <p className="font-mono text-sm">{bookingDetails.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('tracking.testName')}</p>
                    <p className="text-sm">{bookingDetails.testName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('tracking.lab')}</p>
                    <p className="text-sm">{bookingDetails.labName}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackingPage;