import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import frTranslation from './fr.json';
import { defaultLanguage } from './translationUtils';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('i18nextLng') || defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: enTranslation
    },
    fr: {
      translation: frTranslation
    }
  }
});

export default i18n;