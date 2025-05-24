
import { enTranslations } from './en';
import { hiTranslations } from './hi';
import { mrTranslations } from './mr';
import { TranslationData } from '../utils/translations';

export const translations: Record<string, TranslationData> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
  // Add placeholders for other languages - they can be translated later
  gu: enTranslations, // Gujarati - using English as fallback
  ta: enTranslations, // Tamil - using English as fallback  
  te: enTranslations, // Telugu - using English as fallback
  kn: enTranslations, // Kannada - using English as fallback
  bn: enTranslations, // Bengali - using English as fallback
};
