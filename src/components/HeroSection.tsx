
import { Button } from '@/components/ui/button';
import { Search, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-medical-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {t('hero.subtitle')}
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 border rounded-md">
                  <Search className="w-5 h-5 text-medical-primary" />
                  <input 
                    placeholder={t('hero.searchPlaceholder')}
                    className="flex-1 outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-md">
                  <MapPin className="w-5 h-5 text-medical-primary" />
                  <input 
                    placeholder={t('hero.locationPlaceholder')}
                    className="flex-1 outline-none"
                  />
                </div>
                <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('hero.bookNow')}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-primary">50L+</div>
                <div className="text-sm text-gray-600">{t('hero.testsBooked')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-primary">1000+</div>
                <div className="text-sm text-gray-600">{t('hero.certifiedLabs')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-primary">24hrs</div>
                <div className="text-sm text-gray-600">{t('hero.reportDelivery')}</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=400" 
              alt="Medical lab testing" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
