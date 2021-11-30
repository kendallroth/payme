/**
 * Get a random boolean
 *
 * @returns Random boolean
 */
const randomBool = (): boolean => {
  return Math.random() > 0.5;
};

/**
 * Get a random item from a list
 *
 * @param   list - List of items
 * @returns Random list item
 */
const randomItem = <T>(list: T[]): T => {
  return list[randomNumber(0, list.length)];
};

/**
 * Get a random number in a range
 *
 * @param   min       - Range start
 * @param   max       - Range end
 * @param   inclusive - Whether end number is inclusive (default false)
 * @returns Random number from range
 */
const randomNumber = (min: number, max: number, inclusive = false): number => {
  const inclusiveFactor = inclusive ? 1 : 0;
  return Math.floor(Math.random() * (max - min + inclusiveFactor) + min);
};

export { randomBool, randomItem, randomNumber };
