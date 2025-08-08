import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, FileText, MapPin, Shield, Calendar, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Mock data - in real app this would come from API
const testDetails: Record<string, any> = {
  'men-health-basic': {
    name: 'Men\'s Health Basic Package',
    description: 'Essential health checkup for men including liver, kidney, and heart parameters. This comprehensive package is designed to detect early signs of health issues and monitor overall wellness.',
    price: 1200,
    originalPrice: 1500,
    reportTime: '24 hours',
    testsIncluded: 45,
    preparation: [
      'Fasting for 10-12 hours required before sample collection',
      'Avoid alcohol 24 hours before the test',
      'Take medications as prescribed by your doctor',
      'Wear comfortable clothing for easy sample collection'
    ],
    features: [
      'Complete Blood Count (CBC)',
      'Lipid Profile',
      'Liver Function Tests',
      'Kidney Function Tests',
      'Thyroid Profile (TSH, T3, T4)',
      'Blood Sugar (Fasting & Random)',
      'Urine Analysis',
      'ECG'
    ],
    benefits: [
      'Early detection of health issues',
      'Monitor overall health status',
      'Track disease progression',
      'Personalized health recommendations'
    ],
    sampleType: 'Blood & Urine',
    homeCollection: true,
    reportFormat: 'Digital & Physical'
  }
};

const TestDetail = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const test = testDetails[testId || ''];

  if (!test) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test not found</h1>
          <Button onClick={() => navigate('/')}>Go back to home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    // In real app, this would integrate with booking system
    alert('Booking functionality would be integrated here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tests
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{test.name}</CardTitle>
                      <p className="text-gray-600">{test.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-6 h-6 text-medical-primary mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Tests Included</div>
                      <div className="font-semibold">{test.testsIncluded}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-6 h-6 text-medical-primary mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Report Time</div>
                      <div className="font-semibold">{test.reportTime}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-medical-primary mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Collection</div>
                      <div className="font-semibold">Home & Lab</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-6 h-6 text-medical-primary mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Sample</div>
                      <div className="font-semibold">{test.sampleType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tests Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {test.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-medical-primary rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preparation Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {test.preparation.map((instruction: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-medical-light rounded-full flex items-center justify-center text-medical-primary text-sm font-bold mt-1">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Book This Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-medical-primary">₹{test.price}</span>
                      <span className="text-lg text-gray-500 line-through">₹{test.originalPrice}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tests included:</span>
                        <span className="font-semibold">{test.testsIncluded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Report delivery:</span>
                        <span className="font-semibold">{test.reportTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Home collection:</span>
                        <span className="font-semibold text-green-600">Available</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button 
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                      onClick={handleBookNow}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Free home collection available
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose This Test?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {test.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
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

export default TestDetail;