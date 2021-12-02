import { v4 as uuidv4 } from "uuid";
import { date as fakeDate, name as fakeName } from "faker";

// Types
import { IPerson } from "@typings/people.types";

type FakePersonNew = Pick<IPerson, "name">;

/**
 * Create a fake person
 *
 * @param   person - Partial details
 * @returns Fake person
 */
const createFakePerson = (person?: FakePersonNew): IPerson => {
  return {
    id: uuidv4(),
    createdAt: fakeDate.past(1).toISOString(),
    name: `${fakeName.firstName()} ${fakeName.lastName()}`,
    ...(person ?? {}),
  };
};

const fakePeople: IPerson[] = [
  createFakePerson({
    name: "Alex Tanners",
  }),
  createFakePerson(),
  createFakePerson(),
  createFakePerson(),
  createFakePerson(),
  createFakePerson(),
];

export { createFakePerson, fakePeople };
