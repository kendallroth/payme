// TODO: Figure out typings
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
    title: "screens.settingsLanguage.itemEnglish",
  },
  [AppLanguage.FRENCH]: {
    code: AppLanguage.FRENCH,
    disabled: true,
    flag: FR,
    title: "screens.settingsLanguage.itemFrench",
  },
  [AppLanguage.SPANISH]: {
    code: AppLanguage.SPANISH,
    disabled: false,
    flag: ES,
    title: "screens.settingsLanguage.itemSpanish",
  },
};

export const THEMES: Record<AppTheme, IAppThemeConfig> = {
  [AppTheme.AUTO]: {
    code: AppTheme.AUTO,
    disabled: true,
    icon: "brightness-auto",
    title: "screens.settingsTheme.itemAuto",
  },
  [AppTheme.LIGHT]: {
    code: AppTheme.LIGHT,
    icon: "weather-sunny",
    title: "screens.settingsTheme.itemLight",
  },
  [AppTheme.DARK]: {
    code: AppTheme.DARK,
    icon: "weather-night",
    title: "screens.settingsTheme.itemDark",
  },
};
