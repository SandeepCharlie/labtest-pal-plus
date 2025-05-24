
import { Shield, Clock, Home, Award, Headphones, FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('whyChoose.nabl.title'),
      description: t('whyChoose.nabl.description')
    },
    {
      icon: Home,
      title: t('whyChoose.home.title'),
      description: t('whyChoose.home.description')
    },
    {
      icon: Clock,
      title: t('whyChoose.fastest.title'),
      description: t('whyChoose.fastest.description')
    },
    {
      icon: Award,
      title: t('whyChoose.prices.title'),
      description: t('whyChoose.prices.description')
    },
    {
      icon: Headphones,
      title: t('whyChoose.support.title'),
      description: t('whyChoose.support.description')
    },
    {
      icon: FileText,
      title: t('whyChoose.digital.title'),
      description: t('whyChoose.digital.description')
    }
  ];

  return (
    <section className="py-12 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('whyChoose.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('whyChoose.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <IconComponent className="w-8 h-8 text-medical-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
