import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utilities
import { LANGUAGES } from "@utilities/constants";
import { addDebugDataAction, resetStoreAction } from "../actions";

// Types
import { AppLanguage, IAppLanguageConfig } from "@typings";
import { RootState } from "../index";

interface SettingsState {
  /** App language (for internationalization) */
  language: AppLanguage;
}

const initialState: SettingsState = {
  // Default to English until app settings are loaded
  language: AppLanguage.ENGLISH,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<AppLanguage>) => {
      if (!action.payload) return;

      state.language = action.payload;
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

export { addDebugData, resetApp };
export const { setAppLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
