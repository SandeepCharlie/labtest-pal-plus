import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Mock data for tests - in real app this would come from API
const testData: Record<string, any[]> = {
  men: [
    {
      id: 'men-health-basic',
      name: 'Men\'s Health Basic Package',
      description: 'Essential health checkup for men including liver, kidney, and heart parameters',
      price: 1200,
      originalPrice: 1500,
      reportTime: '24 hours',
      testsIncluded: 45,
      preparation: 'Fasting for 10-12 hours required',
      features: ['Complete Blood Count', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid Profile']
    },
    {
      id: 'men-health-premium',
      name: 'Men\'s Health Premium Package',
      description: 'Comprehensive health screening including advanced cardiac and diabetes markers',
      price: 2500,
      originalPrice: 3000,
      reportTime: '24 hours',
      testsIncluded: 72,
      preparation: 'Fasting for 10-12 hours required',
      features: ['All Basic Tests', 'HbA1c', 'Vitamin D', 'PSA', 'Testosterone', 'ECG']
    }
  ],
  women: [
    {
      id: 'women-health-basic',
      name: 'Women\'s Health Basic Package',
      description: 'Essential health checkup designed specifically for women\'s health needs',
      price: 1400,
      originalPrice: 1700,
      reportTime: '24 hours',
      testsIncluded: 52,
      preparation: 'Fasting for 10-12 hours required',
      features: ['Complete Blood Count', 'Thyroid Profile', 'Iron Studies', 'Calcium', 'Vitamin B12']
    },
    {
      id: 'women-health-premium',
      name: 'Women\'s Health Premium Package',
      description: 'Comprehensive women\'s health screening with hormonal assessments',
      price: 2800,
      originalPrice: 3500,
      reportTime: '24 hours',
      testsIncluded: 78,
      preparation: 'Fasting for 10-12 hours required',
      features: ['All Basic Tests', 'Hormonal Profile', 'PCOS Panel', 'Breast Cancer Markers', 'Pap Smear']
    }
  ],
  senior: [
    {
      id: 'senior-health-basic',
      name: 'Senior Citizen Health Package',
      description: 'Comprehensive health monitoring for elderly with focus on chronic conditions',
      price: 1800,
      originalPrice: 2200,
      reportTime: '24 hours',
      testsIncluded: 65,
      preparation: 'Fasting for 10-12 hours required',
      features: ['Complete Blood Count', 'Diabetes Panel', 'Cardiac Markers', 'Bone Health', 'Kidney Function']
    }
  ],
  allergies: [
    {
      id: 'food-allergy-panel',
      name: 'Food Allergy Panel',
      description: 'Comprehensive testing for common food allergens',
      price: 3200,
      originalPrice: 4000,
      reportTime: '48 hours',
      testsIncluded: 40,
      preparation: 'No special preparation required',
      features: ['Milk', 'Egg', 'Wheat', 'Soy', 'Nuts', 'Seafood', 'Fruits', 'Vegetables']
    }
  ],
  pregnancy: [
    {
      id: 'pregnancy-basic',
      name: 'Pregnancy Care Package',
      description: 'Essential tests for healthy pregnancy monitoring',
      price: 2200,
      originalPrice: 2800,
      reportTime: '24 hours',
      testsIncluded: 35,
      preparation: 'No fasting required',
      features: ['Complete Blood Count', 'Glucose Screening', 'Iron Studies', 'Infection Screening', 'Genetic Markers']
    }
  ],
  chronic: [
    {
      id: 'diabetes-monitoring',
      name: 'Diabetes Monitoring Package',
      description: 'Comprehensive diabetes management and monitoring tests',
      price: 1600,
      originalPrice: 2000,
      reportTime: '24 hours',
      testsIncluded: 25,
      preparation: 'Fasting for 10-12 hours required',
      features: ['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin', 'Kidney Function', 'Eye Screening']
    }
  ]
};

const TestCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tests = testData[categoryId || ''] || [];
  const categoryTitle = categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1) + ' Health Tests';

  const handleBookTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryTitle}</h1>
            <p className="text-gray-600">Choose from our comprehensive range of health tests</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-gray-900">{test.name}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <p className="text-gray-600">{test.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="w-4 h-4 mr-1" />
                          {test.testsIncluded} tests
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          Report in {test.reportTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-medical-primary">₹{test.price}</span>
                      <span className="text-lg text-gray-500 line-through">₹{test.originalPrice}</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Tests Included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {test.features.slice(0, 4).map((feature: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {test.features.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{test.features.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      Home collection available
                    </div>
                    
                    <Button 
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                      onClick={() => handleBookTest(test.id)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestCategory;