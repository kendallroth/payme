import { createAction } from "@reduxjs/toolkit";

// Types
import { IAppPopulateOptions, IAppResetOptions } from "@typings/settings.types";

/** DEBUG: Action to add dummy data */
const addDebugDataAction = createAction<IAppPopulateOptions>("addDebugData");

/** Reset parts of the app data */
const resetAppAction = createAction<IAppResetOptions>("resetApp");

export { addDebugDataAction, resetAppAction };
