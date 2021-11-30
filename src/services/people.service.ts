// Utilities
import { makeSafeString } from "@utilities/string";

// Types
import { IPerson } from "@typings/people.types";

class PeopleService {
  /**
   * Determine whether a name may already exist in a list of people
   *
   * @param   people - List of people
   * @param   name   - Comparison name
   * @returns Potentially duplicate user
   */
  compareAllNames(people: IPerson[], name: string): IPerson | null {
    return (
      people.find((person) => this.compareNames(person.name, name)) ?? null
    );
  }

  /**
   * Determine whether names are similar enough to possibly be identical
   *
   * @param   target - Name to compare input against
   * @param   name   - Comparison name
   * @returns Whether name is likely a duplicate
   */
  compareNames(target: string, name: string): string | null {
    const safeTarget = makeSafeString(target);
    const safeName = makeSafeString(name);

    return safeTarget === safeName ? target : null;
  }
}

const singleton = new PeopleService();
export default singleton;
