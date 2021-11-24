import { ES, FR, US } from "country-flag-icons/string/3x2";

// Types
import {
  AppLanguage,
  AppTheme,
  IAppLanguageConfig,
  IAppThemeConfig,
} from "@typings";

// TODO: Move to better location (likely store?) or at least populate store
export const LANGUAGES: Record<AppLanguage, IAppLanguageConfig> = {
  [AppLanguage.ENGLISH]: {
    code: AppLanguage.ENGLISH,
    disabled: false,
    flag: US,
    title: "English",
  },
  [AppLanguage.FRENCH]: {
    code: AppLanguage.FRENCH,
    disabled: true,
    flag: FR,
    title: "Français",
  },
  [AppLanguage.SPANISH]: {
    code: AppLanguage.SPANISH,
    disabled: false,
    flag: ES,
    title: "Español",
  },
};

export const THEMES: Record<AppTheme, IAppThemeConfig> = {
  [AppTheme.AUTO]: {
    code: AppTheme.AUTO,
    icon: "brightness-auto",
    title: "screens:settingsTheme.itemAuto",
  },
  [AppTheme.LIGHT]: {
    code: AppTheme.LIGHT,
    icon: "weather-sunny",
    title: "screens:settingsTheme.itemLight",
  },
  [AppTheme.DARK]: {
    code: AppTheme.DARK,
    icon: "weather-night",
    title: "screens:settingsTheme.itemDark",
  },
};
