
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { TranslationKey } from '@/utils/translations';

export const useTranslation = () => {
  const { selectedLanguage } = useLanguage();

  const t = (key: TranslationKey): string => {
    return translations[selectedLanguage.code]?.[key] || translations.en[key] || key;
  };

  return { t };
};
