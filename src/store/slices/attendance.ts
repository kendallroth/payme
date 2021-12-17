import dayjs from "dayjs";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// Utilites
import { addDebugDataAction, resetAppAction } from "../actions";
import { RootState } from "../index";

// Types
import {
  IAttendanceTogglePayment,
  IAttendanceTogglePerson,
  IEventAttendance,
  IPersonForEvent,
} from "@typings/attendance.types";
import { removeEvent } from "./events";
import { removePerson } from "./people";

interface IAttendanceState {}

export const attendanceAdapter = createEntityAdapter<IEventAttendance>();

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

const initialState = attendanceAdapter.getInitialState<IAttendanceState>({});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    toggleAttendancePerson(
      state,
      action: PayloadAction<IAttendanceTogglePerson>,
    ): void {
      const { attending, eventId, personId } = action.payload;

      // NOTE: ID is a "composite" key from event and person IDs (easier lookup)
      const id = `${eventId}:${personId}`;
      const existingAttendance = state.entities[id];

      // Handle updating an event attendee (adding/removing)
      if (attending && !existingAttendance) {
        const newAttendance: IEventAttendance = {
          id,
          eventId,
          paidAt: null,
          personId,
        };

        attendanceAdapter.addOne(state, newAttendance);
        // TODO: Update stats if using
      } else if (!attending && existingAttendance) {
        // TODO: Update stats if using
        attendanceAdapter.removeOne(state, existingAttendance.id);
      }
    },
    toggleAttendancePayment(
      state,
      action: PayloadAction<IAttendanceTogglePayment>,
    ): void {
      const { eventId, paid, personId } = action.payload;

      const id = `${eventId}:${personId}`;
      const existingAttendance = state.entities[id];
      if (!existingAttendance) return;

      existingAttendance.paidAt = paid ? dayjs().toISOString() : null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDebugDataAction, (state, action) => {
      if (!action.payload.events || !action.payload.people) return;

      // TODO: Only add debug attendance if not already populated in store
    });
    // Clean up attendance when an event is removed
    builder.addCase(removeEvent, (state, action) => {
      const removedIds = Object.values(state.entities).reduce(
        (accum, attendance) => {
          return !attendance || attendance.eventId !== action.payload
            ? accum
            : [...accum, action.payload];
        },
        [] as string[],
      );

      attendanceAdapter.removeMany(state, removedIds);
    });
    // Clean up attendance when a person is removed
    builder.addCase(removePerson, (state, action) => {
      const removedIds = Object.values(state.entities).reduce(
        (accum, attendance) => {
          return !attendance || attendance.personId !== action.payload
            ? accum
            : [...accum, action.payload];
        },
        [] as string[],
      );

      attendanceAdapter.removeMany(state, removedIds);
    });
    builder.addCase(resetAppAction, (state, action) => {
      if (!action.payload.events && !action.payload.people) return;

      attendanceAdapter.removeAll(state);
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const attendanceSelector = attendanceAdapter.getSelectors<RootState>(
  (state) => state.attendance,
);

/**
 * Select people with relation to an event
 *
 * @param   state   - Store state
 * @param   eventId - Event ID
 * @returns Relationships of all people with event
 */
export const selectPeopleForEvent = (
  state: RootState,
  eventId: string,
): IPersonForEvent[] => {
  return state.people.ids.reduce((accum, personId) => {
    const person = state.people.entities[personId];
    if (!person) return accum;

    const attendanceId = `${eventId}:${person.id}`;
    const attendance = state.attendance.entities[attendanceId];

    return [
      ...accum,
      {
        ...person,
        attending: Boolean(attendance),
        paidAt: attendance?.paidAt ?? null,
      },
    ];
  }, [] as IPersonForEvent[]);
};

export const {
  toggleAttendancePerson: toggleAttendance,
  toggleAttendancePayment: togglePayment,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
