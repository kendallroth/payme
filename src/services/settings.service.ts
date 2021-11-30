import { locale } from "expo-localization";
import { Appearance } from "react-native";

// Utilities
import { validateEnum } from "@utilities/enum.util";

// Types
import { AppLanguage, AppTheme } from "@typings/settings.types";

class SettingsService {
  /** Language defaults to English */
  DEFAULT_LANGUAGE = AppLanguage.ENGLISH;

  /**
   * Get device language
   *
   * NOTE: Only accepts languages defined in 'AppLanguage'!
   *
   * @returns Device language
   */
  getDeviceLanguage(): AppLanguage {
    const localeString = locale?.split("-")[0];
    if (!localeString) return this.DEFAULT_LANGUAGE;

    const [, language] = validateEnum<AppLanguage>(
      AppLanguage,
      localeString,
      this.DEFAULT_LANGUAGE,
    );

    return language;
  }

  /**
   * Get device theme
   *
   * @returns Device theme
   */
  getDeviceTheme(): AppTheme {
    // NOTE: Apparently colour scheme can be 'null' (indicating no selection)
    const colorScheme = Appearance.getColorScheme();

    // No device theme will default to using light theme
    return colorScheme === "dark" ? AppTheme.DARK : AppTheme.LIGHT;
  }
}

const singleton = new SettingsService();
export default singleton;
