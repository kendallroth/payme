// Utilities
import { isInEnum, validateEnum } from "./enum.util";

// Types
import { AppLanguage } from "@typings/app.types";

describe("'isEnum'", () => {
  it("validates enum values properly", () => {
    const inputs = ["en", "es", "invalid", null];

    const valid = inputs.map((i) => isInEnum(AppLanguage, i));

    const expected = [true, true, false, false];

    expect(valid).toEqual(expected);
  });
});

describe("'validateEnum'", () => {
  it("validates and casts enum values properly", () => {
    const inputs = ["en", "es", "invalid", null];

    const valid = inputs.map((i) =>
      validateEnum<AppLanguage>(AppLanguage, i, AppLanguage.ENGLISH),
    );

    const expected = [
      [true, AppLanguage.ENGLISH],
      [true, AppLanguage.SPANISH],
      [false, AppLanguage.ENGLISH],
      [false, AppLanguage.ENGLISH],
    ];

    expect(valid).toEqual(expected);
  });
});
