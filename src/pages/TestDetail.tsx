import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, FileText, MapPin, Shield, Calendar, ArrowLeft, Play } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Import video thumbnails
import videoThumbEnglish from '@/assets/video-thumb-english.jpg';
import videoThumbHindi from '@/assets/video-thumb-hindi.jpg';
import videoThumbTelugu from '@/assets/video-thumb-telugu.jpg';
import videoThumbMarathi from '@/assets/video-thumb-marathi.jpg';

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('testDetail.testNotFound')}</h1>
          <Button onClick={() => navigate('/')}>{t('testDetail.goBackHome')}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    const params = new URLSearchParams({
      testId: testId || '',
      testName: test.name,
      testPrice: test.price.toString()
    });
    navigate(`/lab-selection?${params.toString()}`);
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
              
              {/* Video Explanation Section */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    {t('testDetail.videoSection.title')}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{t('testDetail.videoSection.subtitle')}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Video */}
                    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <img 
                          src={videoThumbEnglish} 
                          alt="English medical explanation video"
                          className="w-full aspect-video object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-8 h-8 text-primary fill-primary" />
                          </div>
                        </div>
                        {/* Language badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-primary font-semibold shadow-sm">
                            EN
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base mb-2">{t('testDetail.videoSection.whatIs')} {test.name}?</h4>
                        <p className="text-sm text-muted-foreground">{t('testDetail.videoSection.englishDesc')}</p>
                      </div>
                    </div>

                    {/* Hindi Video */}
                    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <img 
                          src={videoThumbHindi} 
                          alt="Hindi medical explanation video"
                          className="w-full aspect-video object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-8 h-8 text-primary fill-primary" />
                          </div>
                        </div>
                        {/* Language badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-primary font-semibold shadow-sm">
                            HI
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base mb-2">{t('testDetail.videoSection.whatIsHindi')}</h4>
                        <p className="text-sm text-muted-foreground">{t('testDetail.videoSection.hindiDesc')}</p>
                      </div>
                    </div>

                    {/* Telugu Video */}
                    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <img 
                          src={videoThumbTelugu} 
                          alt="Telugu medical explanation video"
                          className="w-full aspect-video object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-8 h-8 text-primary fill-primary" />
                          </div>
                        </div>
                        {/* Language badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-primary font-semibold shadow-sm">
                            TE
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base mb-2">{t('testDetail.videoSection.whatIsTelugu')}</h4>
                        <p className="text-sm text-muted-foreground">{t('testDetail.videoSection.teluguDesc')}</p>
                      </div>
                    </div>

                    {/* Marathi Video */}
                    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <img 
                          src={videoThumbMarathi} 
                          alt="Marathi medical explanation video"
                          className="w-full aspect-video object-cover"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-8 h-8 text-primary fill-primary" />
                          </div>
                        </div>
                        {/* Language badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-primary font-semibold shadow-sm">
                            MR
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base mb-2">{t('testDetail.videoSection.whatIsMarathi')}</h4>
                        <p className="text-sm text-muted-foreground">{t('testDetail.videoSection.marathiDesc')}</p>
                      </div>
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
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-medical-primary" />
                    <CardTitle>{t('testDetail.preparation.title')}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('testDetail.preparation.subtitle')}</p>
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
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="w-5 h-5 text-yellow-600 mt-0.5">⏰</div>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">{t('testDetail.preparation.reminder')}</p>
                        <p className="text-xs text-yellow-700 mt-1">{t('testDetail.preparation.reminderDesc')}</p>
                      </div>
                    </div>
                  </div>
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