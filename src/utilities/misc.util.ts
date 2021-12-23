/**
 * Lerp between two colours by a ratio
 *
 * Source: https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 *
 * @param   from  - Start colour
 * @param   to    - End colour
 * @param   ratio - Ratio between inputs
 * @returns Colour between inputs
 */
const lerpColor = (from: string, to: string, ratio: number): string => {
  /* eslint-disable no-bitwise */
  const fromHex = +from.replace("#", "0x");
  const toHex = +to.replace("#", "0x");

  const fromRed = fromHex >> 16;
  const fromGreen = (fromHex >> 8) & 0xff;
  const fromBlue = fromHex & 0xff;
  const toRed = toHex >> 16;
  const toGreen = (toHex >> 8) & 0xff;
  const toBlue = toHex & 0xff;
  const outputRed = fromRed + ratio * (toRed - fromRed);
  const outputGreen = fromGreen + ratio * (toGreen - fromGreen);
  const outputBlue = fromBlue + ratio * (toBlue - fromBlue);

  const outputHex = (((1 << 24) + (outputRed << 16) + (outputGreen << 8) + outputBlue) | 0).toString(16).slice(1); // prettier-ignore
  return `#${outputHex}`;
  /* eslint-enable no-bitwise */
};

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

/**
 * Sleep for a short period of time
 *
 * @param time Delay time (milliseconds)
 */
const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export { lerpColor, randomBool, randomItem, randomNumber, sleep };
