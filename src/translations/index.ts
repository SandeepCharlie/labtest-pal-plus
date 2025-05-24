
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
  ml: enTranslations, // Malayalam - using English as fallback
  pa: enTranslations, // Punjabi - using English as fallback
  or: enTranslations, // Odia - using English as fallback
  as: enTranslations, // Assamese - using English as fallback
  ur: enTranslations, // Urdu - using English as fallback
  bho: enTranslations, // Bhojpuri - using English as fallback
  raj: enTranslations, // Rajasthani - using English as fallback
  mai: enTranslations, // Maithili - using English as fallback
  mag: enTranslations, // Magahi - using English as fallback
  ne: enTranslations, // Nepali - using English as fallback
  kok: enTranslations, // Konkani - using English as fallback
  sd: enTranslations, // Sindhi - using English as fallback
};
