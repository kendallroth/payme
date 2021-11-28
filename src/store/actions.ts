import { createAction } from "@reduxjs/toolkit";

// Types
import { IAppResetOptions } from "@typings";

/** DEBUG: Action to add dummy data */
const addDebugDataAction = createAction("addDebugData");

/** Reset parts of the app data */
const resetAppAction = createAction<IAppResetOptions>("resetApp");

export { addDebugDataAction, resetAppAction };
