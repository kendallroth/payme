import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// Utilites
import { fakePeople } from "../data/people";
import { addDebugDataAction, resetAppAction } from "../actions";
import { RootState } from "../index";

// Types
import { IPerson } from "@typings/people.types";

export const peopleAdapter = createEntityAdapter<IPerson>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

////////////////////////////////////////////////////////////////////////////////
// Slice
////////////////////////////////////////////////////////////////////////////////

const initialState = peopleAdapter.getInitialState();

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<IPerson>): void {
      const newPerson: IPerson = {
        ...action.payload,
        archivedAt: null,
        name: action.payload.name.trim(),
        // TODO: Add any additional fields?
      };

      peopleAdapter.addOne(state, newPerson);
    },
    // NOTE: Probably a temporary action (deleting has consequences!)
    removePerson(state, action: PayloadAction<string>): void {
      peopleAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDebugDataAction, (state, action) => {
      if (!action.payload.people) return;

      // Only add debug people if not already populated in store
      const existingPeople = Object.values(state.entities);
      fakePeople.forEach((person) => {
        if (existingPeople.find((e) => e?.name === person.name)) return;

        peopleAdapter.addOne(state, person);
      });
    });
    builder.addCase(resetAppAction, (state, action) => {
      if (!action.payload.people) return;

      peopleAdapter.removeAll(state);
    });
  },
});

////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const peopleSelectors = peopleAdapter.getSelectors<RootState>(
  (state) => state.people,
);

/**
 * Select a specific person
 *
 * @param   state - Store state
 * @param   id    - Person ID
 * @returns Selected person
 */
export const selectPerson = (
  state: RootState,
  id: string,
): IPerson | undefined => peopleSelectors.selectById(state, id);
/**
 * Select a list of all people
 *
 * @param   state - Store state
 * @returns All people
 */
export const selectPeople = peopleSelectors.selectAll;

export const { addPerson, removePerson } = peopleSlice.actions;

export default peopleSlice.reducer;
