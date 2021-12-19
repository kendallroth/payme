import dayjs from "dayjs";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

// Utilites
import { createFakePerson, fakePeople } from "../data/people";
import { addDebugDataAction, resetAppAction } from "../actions";
import { RootState } from "../index";

// Types
import { IPerson, IPersonBase } from "@typings/people.types";

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
    addPeople(state, action: PayloadAction<IPersonBase[]>): void {
      const newPeople: IPerson[] = action.payload.map((person) => ({
        ...person,
        createdAt: dayjs().toISOString(),
        name: person.name.trim(),
      }));

      peopleAdapter.addMany(state, newPeople);
    },
    addPerson(state, action: PayloadAction<IPersonBase>): void {
      const newPerson: IPerson = {
        ...action.payload,
        createdAt: dayjs().toISOString(),
        name: action.payload.name.trim(),
      };

      peopleAdapter.addOne(state, newPerson);
    },
    removePerson(state, action: PayloadAction<string>): void {
      // NOTE: Cleaning up attendance is handled by 'attendance' slice
      peopleAdapter.removeOne(state, action.payload);
    },
    updatePerson(state, action: PayloadAction<IPerson>): void {
      const update: Update<IPerson> = {
        id: action.payload.id,
        changes: {
          name: action.payload.name,
        },
      };

      peopleAdapter.updateOne(state, update);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDebugDataAction, (state, action) => {
      if (!action.payload.people) return;

      // Only add "known" debug people if not already populated in store
      const existingPeople = Object.values(state.entities);
      fakePeople.forEach((person) => {
        if (existingPeople.find((e) => e?.name === person.name)) return;

        peopleAdapter.addOne(state, person);
      });

      // Add a few additional random people
      for (let i = 0; i < 5; i++) {
        const fakePerson = createFakePerson();
        peopleAdapter.addOne(state, fakePerson);
      }
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

export const { addPeople, addPerson, removePerson, updatePerson } =
  peopleSlice.actions;

export default peopleSlice.reducer;
