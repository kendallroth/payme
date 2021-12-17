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
  IAppBehaviours,
  IAppLanguageConfig,
  IAppPopulateOptions,
  IAppResetOptions,
  IAppThemeConfig,
} from "@typings/settings.types";
import { RootState } from "../index";

interface SettingsState {
  /** App behaviour settings */
  behaviours: IAppBehaviours;
  /** Whether app is in development mode */
  developer: boolean;
  /** App language (for internationalization) */
  language: AppLanguage;
  /** App theme */
  theme: AppTheme;
}

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

// Provide some basic defaults until app settings are loaded
const initialState: SettingsState = {
  behaviours: {
    tabsResetHistory: true,
  },
  developer: false,
  language: SettingsService.getDeviceLanguage(),
  theme: SettingsService.getDeviceTheme(),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAppBehaviour: (
      state,
      action: PayloadAction<Partial<IAppBehaviours>>,
    ) => {
      state.behaviours = {
        ...state.behaviours,
        ...action.payload,
      };
    },
    setAppDeveloper: (state, action: PayloadAction<boolean>) => {
      state.developer = action.payload;
    },
    setAppLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
    },
    setAppTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state, action) => {
      if (!action.payload.settings) return;

      state.behaviours = initialState.behaviours;
      state.language = initialState.language;
      state.theme = initialState.theme;
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Thunks
////////////////////////////////////////////////////////////////////////////////

// Add debug data to the store
const addDebugDataThunk = createAsyncThunk(
  "settings/addDebugData",
  async (options: IAppPopulateOptions, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(addDebugDataAction(options));
  },
);

// Reset the store state
const resetAppThunk = createAsyncThunk(
  "settings/resetApp",
  async (options: IAppResetOptions, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (options.settings) {
      // Change language in localization context
      i18n.changeLanguage(initialState.language);
    }

    dispatch(resetAppAction(options));
  },
);

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const selectBehaviours = (state: RootState): IAppBehaviours =>
  state.settings.behaviours;
export const selectDeveloperMode = (state: RootState): boolean =>
  state.settings.developer;
export const selectLanguage = (state: RootState): AppLanguage =>
  state.settings.language;
export const selectLanguageConfig = (state: RootState): IAppLanguageConfig =>
  LANGUAGES[state.settings.language];
export const selectThemeConfig = (state: RootState): IAppThemeConfig =>
  THEMES[state.settings.theme];

export { addDebugDataThunk, resetAppThunk };
export const { setAppBehaviour, setAppDeveloper, setAppLanguage, setAppTheme } =
  settingsSlice.actions;

export default settingsSlice.reducer;
