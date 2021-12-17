import dayjs from "dayjs";
import {
  createAction,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

// Utilites
import { addDebugDataAction, resetAppAction } from "../actions";
import { fakeEvents } from "../data/events";
import { RootState } from "../index";

// Types
import { IEvent, IEventBase, IEventStatsUpdate } from "@typings/event.types";

interface IEventsState {
  sample: string;
}

export const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const eventStatsUpdate =
  createAction<IEventStatsUpdate>("eventStatsUpdate");

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
    addEvent(state, action: PayloadAction<IEventBase>): void {
      const newEvent: IEvent = {
        ...action.payload,
        archivedAt: null,
        createdAt: dayjs().toISOString(),
        title: action.payload.title.trim(),
        stats: {
          attending: 0,
          unpaid: 0,
        },
      };

      eventsAdapter.addOne(state, newEvent);
    },
    removeEvent(state, action: PayloadAction<string>): void {
      // NOTE: Cleaning up attendance is handled by 'attendance' slice
      eventsAdapter.removeOne(state, action.payload);
    },
    updateEvent(state, action: PayloadAction<IEvent>): void {
      const update: Update<IEvent> = {
        id: action.payload.id,
        changes: {
          cost: action.payload.cost,
          date: action.payload.date,
          title: action.payload.title,
        },
      };

      eventsAdapter.updateOne(state, update);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDebugDataAction, (state, action) => {
      if (!action.payload.events) return;

      // Only add debug events if not already populated in store
      const existingEvents = Object.values(state.entities);
      fakeEvents.forEach((event) => {
        if (existingEvents.find((e) => e?.title === event.title)) return;

        eventsAdapter.addOne(state, event);
      });
    });
    builder.addCase(eventStatsUpdate, (state, action) => {
      const { attending, eventId, unpaid } = action.payload;

      eventsAdapter.updateOne(state, {
        id: eventId,
        changes: {
          stats: {
            attending,
            unpaid,
          },
        },
      });
    });
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

export const { addEvent, removeEvent, updateEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
