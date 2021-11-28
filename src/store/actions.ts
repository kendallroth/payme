import { createAction } from "@reduxjs/toolkit";

// Types
import { IAppResetPortions } from "@typings";

/** DEBUG: Action to add dummy data */
const addDebugDataAction = createAction("addDebugData");

/** Reset parts of the app data */
const resetAppAction = createAction<IAppResetPortions>("resetStore");

export { addDebugDataAction, resetAppAction };
