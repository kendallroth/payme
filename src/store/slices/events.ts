import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// Utilites
import { resetAppAction } from "../actions";
import { RootState } from "../index";

// Types
import { IEvent } from "@typings/event.types";

interface IEventsState {
  sample: string;
}

export const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

const initialState = eventsAdapter.getInitialState<IEventsState>({
  // NOTE: Sample only intended to provide example
  sample: "key",
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<IEvent>): void {
      const newEvent: IEvent = {
        ...action.payload,
        title: action.payload.title.trim(),
        // TODO: Add any additional fields?
      };

      eventsAdapter.addOne(state, newEvent);
    },
    // NOTE: Probably a temporary action (deleting has consequences!)
    removeEvent(state, action: PayloadAction<string>): void {
      eventsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppAction, (state, action) => {
      if (!action.payload.events) return;

      eventsAdapter.removeAll(state);
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const eventsSelectors = eventsAdapter.getSelectors<RootState>(
  (state) => state.events,
);

/**
 * Select a specific event
 *
 * @param   state - Store state
 * @param   id    - Event ID
 * @returns Selected event
 */
export const selectEvent = (state: RootState, id: string): IEvent | undefined =>
  eventsSelectors.selectById(state, id);
/**
 * Select a list of all events (ordered by date)
 *
 * @param   state - Store state
 * @returns All events
 */
export const selectEvents = eventsSelectors.selectAll;

export const { addEvent, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
