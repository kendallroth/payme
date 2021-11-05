// TODO: Figure out typings
import { ES, FR, US } from "country-flag-icons/string/3x2";

// Types
import { AppLanguage, IAppLanguageConfig } from "@typings";

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
    title: "French",
  },
  [AppLanguage.SPANISH]: {
    code: AppLanguage.SPANISH,
    disabled: false,
    flag: ES,
    title: "Spanish",
  },
};
