// Utilities
import { formatDateString } from "./date.util";

describe("'formatDateString'", () => {
  it("formats with default readable format", () => {
    const input = "2021-11-28T05:03:59.744Z";

    const output = formatDateString(input);

    const expected = "2021-Nov-28";

    expect(output).toBe(expected);
  });

  it("formats with custom format", () => {
    const input = "2021-11-28T05:03:59.744Z";

    const output = formatDateString(input, "MMMM DD, YYYY");

    const expected = "November 28, 2021";

    expect(output).toBe(expected);
  });
});
