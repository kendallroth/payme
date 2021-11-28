// Utilities
import { flatListIdExtractor } from "./list.util";

describe("'flatListIdExtractor'", () => {
  it("extracts key properly", () => {
    const id = 123;
    const input = { id, key: "value" };

    const output = flatListIdExtractor(input);

    expect(output).toEqual(id);
  });
});
