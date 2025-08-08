
import { enTranslations } from './en';
import { hiTranslations } from './hi';
import { mrTranslations } from './mr';
import { teTranslations } from './te';
import { TranslationData } from '../utils/translations';

export const translations: Record<string, TranslationData> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
  te: teTranslations,
};
