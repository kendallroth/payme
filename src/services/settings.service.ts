import AsyncStorage from "@react-native-async-storage/async-storage";

// Utilities
import { isInEnum } from "@utilities/enum.util";

// Types
import { AppLanguage } from "@typings";

class SettingsService {
  /** Language defaults to English */
  DEFAULT_LANGUAGE = AppLanguage.ENGLISH;

  /** Language storage key */
  STORAGE_KEY_LANGUAGE = "language";

  /**
   * Get app's stored language
   */
  async getLanguage(): Promise<AppLanguage> {
    // NOTE: Not implemented yet (using Redux Persist instead)...

    try {
      const languageString = await AsyncStorage.getItem(
        this.STORAGE_KEY_LANGUAGE,
      );
      if (!languageString) return this.DEFAULT_LANGUAGE;

      return isInEnum(AppLanguage, languageString)
        ? (languageString as AppLanguage)
        : this.DEFAULT_LANGUAGE;
    } catch {
      return this.DEFAULT_LANGUAGE;
    }
  }

  /**
   * Set app's stored language
   *
   * @param language - App's current language
   */
  async setLanguage(language: AppLanguage): Promise<void> {
    // NOTE: Not implemented yet (using Redux Persist instead)...

    try {
      await AsyncStorage.setItem(this.STORAGE_KEY_LANGUAGE, language);
    } catch {
      // TODO
    }
  }
}

const singleton = new SettingsService();
export default singleton;
