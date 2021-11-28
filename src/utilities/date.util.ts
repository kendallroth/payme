/**
 * Since dates are stored in Redux as ISO strings, they must be parsed to JS Dates
 *   before they can be manipulated with 'date-fns.'
 */

// import { format, parseISO } from "date-fns";
import dayjs from "dayjs";

// Human-readable date format
export const DATE_FORMAT_NICE = "YYYY-MMM-DD";

/**
 * Format an ISO date string
 *
 * @param  dateString   - ISO date string
 * @param  formatString - Date format string
 * @return - Formatted date string
 */
const formatDateString = (
  dateString: string,
  formatString: string = DATE_FORMAT_NICE,
): string => {
  if (!dateString) return "";

  try {
    return dayjs(dateString).format(formatString);
  } catch (e) {
    // NOTE: Fallthrough
    // eslint-disable-next-line no-console
    console.error("Error formatting/parsing date string!", dateString);
  }

  return "";
};

export { formatDateString };
