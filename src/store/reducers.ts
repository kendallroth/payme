import { combineReducers } from "@reduxjs/toolkit";

// Utilities
import settingsReducer from "./slices/settings";

const reducers = combineReducers({
  settings: settingsReducer,
});

export default reducers;
