import i18n from "i18next";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { SettingsService } from "@services";
import { LANGUAGES, THEMES } from "@utilities/constants";
import { addDebugDataAction, resetAppAction } from "../actions";

// Types
import {
  AppLanguage,
  AppTheme,
  IAppLanguageConfig,
  IAppPopulateOptions,
  IAppResetOptions,
  IAppThemeConfig,
} from "@typings/settings.types";
import { RootState } from "../index";

interface SettingsState {
  /** Whether app is in development mode */
  developer: boolean;
  /** App language (for internationalization) */
  language: AppLanguage;
  /** App theme */
  theme: AppTheme;
}

// Provide some basic defaults until app settings are loaded
const initialState: SettingsState = {
  developer: false,
  language: SettingsService.getDeviceLanguage(),
  theme: SettingsService.getDeviceTheme(),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAppDeveloper: (state, action: PayloadAction<boolean>) => {
      state.developer = action.payload;
    },
    setAppLanguage: (state, action: PayloadAction<AppLanguage>) => {
      if (!action.payload) return;

      state.language = action.payload;
    },
    setAppTheme: (state, action: PayloadAction<AppTheme>) => {
      if (!action.payload) return;

      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state, action) => {
      if (!action.payload.settings) return;

      state.language = initialState.language;
      state.theme = initialState.theme;
    });
  },
});

// Add debug data to the store
const addDebugData = createAsyncThunk(
  "settings/addDebugData",
  async (options: IAppPopulateOptions, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    await dispatch(addDebugDataAction(options));
  },
);

// Reset the store state
const resetApp = createAsyncThunk(
  "settings/resetApp",
  async (options: IAppResetOptions, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (options.settings) {
      // Change language in localization context
      i18n.changeLanguage(initialState.language);
    }

    await dispatch(resetAppAction(options));
  },
);

export const selectDeveloperMode = (state: RootState): boolean =>
  state.settings.developer;
export const selectLanguage = (state: RootState): AppLanguage =>
  state.settings.language;
export const selectLanguageConfig = (state: RootState): IAppLanguageConfig =>
  LANGUAGES[state.settings.language];
export const selectThemeConfig = (state: RootState): IAppThemeConfig =>
  THEMES[state.settings.theme];

export { addDebugData, resetApp };
export const { setAppDeveloper, setAppLanguage, setAppTheme } =
  settingsSlice.actions;

export default settingsSlice.reducer;
