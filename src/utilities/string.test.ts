// Utilities
import {
  compareSafeStrings,
  includesSafeString,
  makeSafeString,
  stripNonAlphabetic,
} from "./string";

describe("'compareSafeStrings'", () => {
  it("Detects loosely identical strings", () => {
    const target = "somerandomstring";
    const input = " Some Random String! ";

    const output = compareSafeStrings(target, input);

    expect(output).toBe(true);
  });

  it("Ignores non-identical strings", () => {
    const target = "somerandomstring";
    const input = " Some Random String! Extra ";

    const output = compareSafeStrings(target, input);

    expect(output).toBe(false);
  });
});

describe("'includesSafeString'", () => {
  it("Detects loosely included string", () => {
    const target = "Stephen O'Malley";
    const input = "omall";

    const output = includesSafeString(target, input);

    expect(output).toBe(true);
  });

  it("Ignores non-included string", () => {
    const target = "Stephen O'Malley";
    const input = "omell";

    const output = includesSafeString(target, input);

    expect(output).toBe(false);
  });
});

describe("'makeSafeString'", () => {
  it("Makes a safe URL/search string", () => {
    const input = " Random str1ng with Ch@rs ";

    const output = makeSafeString(input);

    const expected = "randomstrngwithchrs";
    expect(output).toBe(expected);
  });
});

describe("'stripNonAlphabetic'", () => {
  it("Strips non-alphabetic characters", () => {
    const input = " Random str1ng with Ch@rs ";

    const output = stripNonAlphabetic(input);

    const expected = "RandomstrngwithChrs";
    expect(output).toBe(expected);
  });
});
