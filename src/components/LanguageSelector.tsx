
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="text-center mb-6">
          <Globe className="w-12 h-12 text-medical-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('language.chooseLanguage')}</h2>
          <p className="text-gray-600">{t('language.selectPreferred')}</p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant="outline"
                className="justify-start h-auto p-4 text-left hover:bg-medical-light hover:border-medical-primary"
                onClick={() => handleLanguageSelect(language)}
              >
                <div>
                  <div className="font-medium text-gray-900">{language.name}</div>
                  <div className="text-sm text-gray-600">{language.nativeName}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
