// Utilities
import PeopleService from "./people.service";

// Types
import { IPerson } from "@typings/people.types";

describe("'compareNames'", () => {
  it("detects potentially identical names", () => {
    const existingName = "Ben O'Malley";
    const input = " Ben oMalley ";

    const output = PeopleService.compareNames(existingName, input);

    expect(output).toEqual(existingName);
  });

  it("ignores non-identical names", () => {
    const existingName = "Ben O'Malley";
    const input = " Benjamin oMalley ";

    const output = PeopleService.compareNames(existingName, input);

    expect(output).toEqual(null);
  });
});

describe("'compareAllNames'", () => {
  const basePeople: IPerson[] = [
    { id: "1", archivedAt: null, createdAt: "fake", name: "Benjamin Malley" },
    { id: "2", archivedAt: null, createdAt: "fake", name: "Jacob Petersheim" },
  ];

  it("detects potentially identical names", () => {
    const existingPerson = {
      id: "2",
      archivedAt: null,
      createdAt: "fake",
      name: "Ben O'Malley",
    };
    const people: IPerson[] = [...basePeople, existingPerson];
    const input = " Ben oMalley ";

    const output = PeopleService.compareAllNames(people, input);

    expect(output).toEqual(existingPerson);
  });

  it("ignores non-identical names", () => {
    const people: IPerson[] = [...basePeople];
    const input = " Ben oMalley ";

    const output = PeopleService.compareAllNames(people, input);

    expect(output).toEqual(null);
  });
});
