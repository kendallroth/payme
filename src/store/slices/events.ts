import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// Utilites
import { RootState } from "../index";

// Types
import { IEvent } from "@typings/event.types";

interface IEventsState {
  sample: string;
}

export const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const eventsSelectors = eventsAdapter.getSelectors<RootState>(
  (state) => state.events,
);

const eventsSlice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState<IEventsState>({
    // NOTE: Sample only intended to provide example
    sample: "key",
  }),
  reducers: {
    addEvent(state, action: PayloadAction<IEvent>): void {
      const newEvent: IEvent = {
        ...action.payload,
        // TODO: Add any additional fields?
      };

      eventsAdapter.addOne(state, newEvent);
    },
    // NOTE: Probably a temporary action (deleting has consequences!)
    removeEvent(state, action: PayloadAction<string>): void {
      eventsAdapter.removeOne(state, action.payload);
    },
  },
});

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
