import { createAction } from "@reduxjs/toolkit";

/** DEBUG: Action to add dummy data */
const addDebugDataAction = createAction("addDebugData");
/** DEBUG: Action to reset store */
const resetStoreAction = createAction("resetStore");

export { addDebugDataAction, resetStoreAction };
