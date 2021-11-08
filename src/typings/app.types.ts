/** Supported app languages */
export enum AppLanguage {
  ENGLISH = "en",
  FRENCH = "fr",
  SPANISH = "es",
}

/** App language configuration */
export interface IAppLanguageConfig {
  /** Language code */
  code: AppLanguage;
  /** Language description */
  description?: string;
  /** Whether language is disabled */
  disabled?: boolean;
  /** Language flag icon name */
  flag: string;
  /** Language title */
  title: string;
}

/** Supported app themes */
export enum AppTheme {
  AUTO = "auto",
  DARK = "dark",
  LIGHT = "light",
}

/** App theme configuration */
export interface IAppThemeConfig {
  /** Theme code/key */
  code: AppTheme;
  /** Whether theme is disabled */
  disabled?: boolean;
  /** Theme icon name */
  icon: string;
  /** Theme name */
  title: string;
}
