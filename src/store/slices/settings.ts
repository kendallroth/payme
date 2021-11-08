import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { LANGUAGES, THEMES } from "@utilities/constants";
import { addDebugDataAction, resetStoreAction } from "../actions";

// Types
import {
  AppLanguage,
  AppTheme,
  IAppLanguageConfig,
  IAppThemeConfig,
} from "@typings";
import { RootState } from "../index";

interface SettingsState {
  /** App language (for internationalization) */
  language: AppLanguage;
  /** App theme */
  theme: AppTheme;
}

// Provide some basic defaults until app settings are loaded
const initialState: SettingsState = {
  language: AppLanguage.ENGLISH,
  theme: AppTheme.LIGHT,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<AppLanguage>) => {
      if (!action.payload) return;

      state.language = action.payload;
    },
    setAppTheme: (state, action: PayloadAction<AppTheme>) => {
      if (!action.payload) return;

      state.theme = action.payload;
    },
  },
  extraReducers: {},
});

// Add debug data to the store
const addDebugData = createAsyncThunk(
  "settings/addDebugData",
  async (arg, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    await dispatch(addDebugDataAction());

    return true;
  },
);

// Reset the store state
const resetApp = createAsyncThunk(
  "settings/resetApp",
  async (arg, { dispatch }) => {
    // NOTE: Delay the action to make it feel that something is happening
    await new Promise((resolve) => setTimeout(resolve, 500));

    await dispatch(resetStoreAction());

    return true;
  },
);

export const selectLanguage = (state: RootState): AppLanguage =>
  state.settings.language;
export const selectLanguageConfig = (state: RootState): IAppLanguageConfig =>
  LANGUAGES[state.settings.language];
export const selectThemeConfig = (state: RootState): IAppThemeConfig =>
  THEMES[state.settings.theme];

export { addDebugData, resetApp };
export const { setAppLanguage, setAppTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
