// Utilities
import { lerpColor } from "./misc.util";

describe("'lerpColor'", () => {
  it("lerps between colours", () => {
    const from = "#000000";
    const to = "#ffffff";

    const output = lerpColor(from, to, 0.5);

    const expected = "#7f7f7f";

    expect(output).toBe(expected);
  });
});
