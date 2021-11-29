/**
 * Loosely compare two strings after converting to "safe" strings
 *
 * @param   target - Target string
 * @param   input  - Comparison string
 * @returns Whether strings are loosely identical
 */
export const compareSafeStrings = (target: string, input: string): boolean => {
  return makeSafeString(target) === makeSafeString(input);
};

/**
 * Loosely determine whether a safe string contains another string
 *
 * @param   target - Complete target string
 * @param   input  - Partial comparison string
 * @returns Whether target string loosely contains input string
 */
export const includesSafeString = (target: string, input: string): boolean => {
  return makeSafeString(target).includes(makeSafeString(input));
};

/**
 * Make a string "safe" for URL/searching
 *
 * Removes all non-alphabetic characters, trims whitespace, and lower cases.
 *
 * @param   input - Input string
 * @returns "Safe" string
 */
export const makeSafeString = (input: string): string => {
  return stripNonAlphabetic(input.toLowerCase()).trim();
};

/**
 * Remove non-alphabetic characters
 *
 * @param   input - Input string
 * @returns String with only alphabetic characters
 */
export const stripNonAlphabetic = (input: string): string => {
  return input.trim().replace(/[^a-zA-Z]/gi, "");
};
