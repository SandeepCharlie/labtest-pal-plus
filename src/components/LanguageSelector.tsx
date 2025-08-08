
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { languages, setSelectedLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-medical-primary to-medical-dark flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-12 max-w-2xl w-full mx-6 shadow-2xl">
        <div className="text-center mb-8">
          <Globe className="w-16 h-16 text-medical-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('language.chooseLanguage')}</h1>
          <p className="text-gray-600 text-lg">{t('language.selectPreferred')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="outline"
              className="justify-center h-20 text-center hover:bg-medical-light hover:border-medical-primary border-2 transition-all duration-200 hover:scale-105"
              onClick={() => handleLanguageSelect(language)}
            >
              <div>
                <div className="font-semibold text-gray-900 text-lg">{language.name}</div>
                <div className="text-sm text-gray-600 mt-1">{language.nativeName}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
