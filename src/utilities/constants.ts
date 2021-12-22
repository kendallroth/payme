import { ES, FR, US } from "country-flag-icons/string/3x2";

// Types
import {
  AppLanguage,
  AppTheme,
  IAppLanguageConfig,
  IAppThemeConfig,
} from "@typings/settings.types";

/** Sample ISO date string */
export const SAMPLE_ISO_DATE = "2021-11-28T05:03:59.744Z";

// TODO: Move to better location (likely store?) or at least populate store
export const LANGUAGES: Record<AppLanguage, IAppLanguageConfig> = {
  [AppLanguage.ENGLISH]: {
    code: AppLanguage.ENGLISH,
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
    beta: true,
    code: AppLanguage.SPANISH,
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
