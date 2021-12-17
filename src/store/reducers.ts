import { combineReducers } from "@reduxjs/toolkit";

// Utilities
import attendanceReducer from "./slices/attendance";
import eventsReducer from "./slices/events";
import peopleReducer from "./slices/people";
import settingsReducer from "./slices/settings";

const reducers = combineReducers({
  attendance: attendanceReducer,
  events: eventsReducer,
  people: peopleReducer,
  settings: settingsReducer,
});

export default reducers;
