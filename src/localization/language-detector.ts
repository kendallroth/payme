import { LanguageDetectorModule } from "i18next";

// Utilities
import { SettingsService } from "@services";

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  // If true, the detect function receives a callback function to set language (for async retrieval)
  // async: false,
  init: (): void => {
    // Use services and options...
  },
  /**
   * Detect the default user language
   *
   * NOTE: This will be replaced once Redux has loaded!
   *
   * @returns Current user language
   */
  detect: (): string => {
    // Device locale is used UNTIL stored language is loaded (currently from Redux)
    return SettingsService.getDeviceLanguage();
  },
  /**
   * Cache the user language
   *
   * @param lng - Current user language
   */
  cacheUserLanguage: (): void => {},
};

export default languageDetector;
