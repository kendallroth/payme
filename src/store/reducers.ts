import { combineReducers } from "@reduxjs/toolkit";

// Utilities
import eventsReducer from "./slices/events";
import settingsReducer from "./slices/settings";

const reducers = combineReducers({
  events: eventsReducer,
  settings: settingsReducer,
});

export default reducers;
