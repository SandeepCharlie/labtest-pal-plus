
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const popularTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    originalPrice: 800,
    discountedPrice: 299,
    discount: 63,
    rating: 4.8,
    reviews: 15420,
    duration: "24 hrs",
    homeCollection: true,
    description: "Comprehensive blood analysis including RBC, WBC, platelets"
  },
  {
    id: 2,
    name: "Lipid Profile Test",
    originalPrice: 1200,
    discountedPrice: 449,
    discount: 63,
    rating: 4.7,
    reviews: 8965,
    duration: "12 hrs",
    homeCollection: true,
    description: "Cholesterol, triglycerides, HDL, LDL analysis"
  },
  {
    id: 3,
    name: "Diabetes Screening",
    originalPrice: 600,
    discountedPrice: 199,
    discount: 67,
    rating: 4.9,
    reviews: 12340,
    duration: "6 hrs",
    homeCollection: true,
    description: "HbA1c, Fasting glucose, Post-meal glucose"
  },
  {
    id: 4,
    name: "Thyroid Function Test",
    originalPrice: 900,
    discountedPrice: 349,
    discount: 61,
    rating: 4.6,
    reviews: 9876,
    duration: "24 hrs",
    homeCollection: true,
    description: "TSH, T3, T4 levels analysis"
  }
];

export const PopularTests = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('popularTests.title')}</h2>
          <p className="text-gray-600">{t('popularTests.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-medical-primary/10 text-medical-primary border-0">
                    {test.discount}% OFF
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{test.rating}</span>
                    <span className="text-xs text-gray-500">({test.reviews})</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                  {test.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{test.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-medical-secondary" />
                  <span className="text-sm text-gray-600">{t('popularTests.reportIn')} {test.duration}</span>
                </div>
                
                {test.homeCollection && (
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-medical-accent" />
                    <span className="text-sm text-medical-accent font-medium">{t('popularTests.homeCollectionAvailable')}</span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-medical-primary">₹{test.discountedPrice}</span>
                    <span className="text-lg text-gray-400 line-through">₹{test.originalPrice}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                  {t('popularTests.bookNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white">
            {t('popularTests.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};
