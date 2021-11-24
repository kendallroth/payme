/**
 * Check whether a value is valid for an enum
 *
 * @param   enumeration - Target enum
 * @param   value       - Test value
 * @returns Whether value is within enum
 */
const isInEnum = (enumeration: any, value: string | null): boolean => {
  return Object.values(enumeration).includes(value);
};

/**
 * Validate and cast an enum value
 *
 * @param   enumeration  - Target enum
 * @param   value        - Test value
 * @param   defaultValue - Default value (if empty or invalid)
 * @returns Validated and cast enum value
 */
const validateEnum = <T>(
  enumeration: any,
  value: string | null,
  defaultValue: T,
): [boolean, T] => {
  if (!value) return [false, defaultValue];

  return isInEnum(enumeration, value)
    ? [true, value as unknown as T]
    : [false, defaultValue];
};

export { isInEnum, validateEnum };
