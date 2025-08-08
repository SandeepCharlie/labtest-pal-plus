import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Activity, Shield, Baby, Stethoscope } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

export const TestCategories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    {
      id: 'men',
      icon: Users,
      titleKey: 'categories.menHealth',
      descriptionKey: 'categories.menHealthDesc',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'women',
      icon: Heart,
      titleKey: 'categories.womenHealth',
      descriptionKey: 'categories.womenHealthDesc',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: 'senior',
      icon: Activity,
      titleKey: 'categories.seniorCitizens',
      descriptionKey: 'categories.seniorCitizensDesc',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'allergies',
      icon: Shield,
      titleKey: 'categories.allergyTests',
      descriptionKey: 'categories.allergyTestsDesc',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'pregnancy',
      icon: Baby,
      titleKey: 'categories.pregnancyCare',
      descriptionKey: 'categories.pregnancyCareDesc',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'chronic',
      icon: Stethoscope,
      titleKey: 'categories.chronicConditions',
      descriptionKey: 'categories.chronicConditionsDesc',
      color: 'bg-red-50 text-red-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/tests/${categoryId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('categories.title')}</h2>
          <p className="text-gray-600 text-lg">{t('categories.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 shadow-md"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(category.titleKey as any)}</h3>
                  <p className="text-gray-600 mb-4">{t(category.descriptionKey as any)}</p>
                  <Button variant="outline" className="w-full hover:bg-medical-primary hover:text-white">
                    {t('categories.viewTests')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};