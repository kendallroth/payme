import { combineReducers } from "@reduxjs/toolkit";

// Utilities
import eventsReducer from "./slices/events";
import peopleReducer from "./slices/people";
import settingsReducer from "./slices/settings";

const reducers = combineReducers({
  events: eventsReducer,
  people: peopleReducer,
  settings: settingsReducer,
});

export default reducers;
