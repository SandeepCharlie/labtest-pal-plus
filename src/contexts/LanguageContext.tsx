
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'mag', name: 'Magahi', nativeName: 'मगही' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
];

type LanguageContextType = {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  languages: Language[];
  isLanguageSelected: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedLanguageSelection = localStorage.getItem('isLanguageSelected');
    
    if (savedLanguage && savedLanguageSelection === 'true') {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setSelectedLanguage(language);
        setIsLanguageSelected(true);
      }
    }
  }, []);

  const handleSetSelectedLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsLanguageSelected(true);
    localStorage.setItem('selectedLanguage', language.code);
    localStorage.setItem('isLanguageSelected', 'true');
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        selectedLanguage, 
        setSelectedLanguage: handleSetSelectedLanguage, 
        languages, 
        isLanguageSelected 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
