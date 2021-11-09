import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Utilities
import translationEN from "./en/translation.json";
import translationES from "./es/translation.json";

export const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

// NOTE: '' was installed as a pluralization polyfill (for i18next 21+)
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    // NOTE: Not needed for React!
    escapeValue: false,
  },
  // TODO: Replace with language detector or keep with language switcher!
  lng: "en",
  resources,
});
