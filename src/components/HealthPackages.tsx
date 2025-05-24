
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Heart, Activity } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const healthPackages = [
  {
    id: 1,
    name: "Master Health Checkup",
    icon: Shield,
    originalPrice: 4999,
    discountedPrice: 1999,
    discount: 60,
    tests: 72,
    category: "Comprehensive",
    popular: true,
    description: "Complete body checkup including all vital parameters",
    features: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Diabetes", "Thyroid"]
  },
  {
    id: 2,
    name: "Women's Health Package",
    icon: Heart,
    originalPrice: 3499,
    discountedPrice: 1499,
    discount: 57,
    tests: 45,
    category: "Women's Health",
    popular: false,
    description: "Specialized health screening for women's unique needs",
    features: ["Hormonal Tests", "Breast Cancer Markers", "Bone Health", "Anemia Profile"]
  },
  {
    id: 3,
    name: "Senior Citizen Package",
    icon: Users,
    originalPrice: 3999,
    discountedPrice: 1799,
    discount: 55,
    tests: 58,
    category: "Senior Care",
    popular: false,
    description: "Comprehensive health screening for seniors 60+",
    features: ["Heart Health", "Diabetes", "Kidney Function", "Vitamin Deficiency"]
  },
  {
    id: 4,
    name: "Fitness Package",
    icon: Activity,
    originalPrice: 2999,
    discountedPrice: 1299,
    discount: 57,
    tests: 35,
    category: "Fitness",
    popular: true,
    description: "Health checkup for fitness enthusiasts and athletes",
    features: ["Energy Levels", "Muscle Health", "Metabolism", "Vitamin B12"]
  }
];

export const HealthPackages = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('packages.title')}</h2>
          <p className="text-gray-600">{t('packages.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthPackages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card key={pkg.id} className="relative hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-medical-orange text-white px-3 py-1">
                      {t('packages.mostPopular')}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-medical-light rounded-full">
                      <IconComponent className="w-8 h-8 text-medical-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </CardTitle>
                  <Badge variant="outline" className="mb-3">
                    {pkg.tests} {t('packages.testsIncluded')}
                  </Badge>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-medical-primary">₹{pkg.discountedPrice}</span>
                      <div className="text-right">
                        <div className="text-lg text-gray-400 line-through">₹{pkg.originalPrice}</div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {pkg.discount}% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700">{t('packages.keyTests')}</h4>
                    <div className="space-y-1">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-medical-secondary rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                    {t('packages.bookPackage')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white">
            {t('packages.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};
