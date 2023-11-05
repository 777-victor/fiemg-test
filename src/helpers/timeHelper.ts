import { parseISO } from 'date-fns';

/**
 * Parse date or string to date instance
 * @param {String/Date} time
 * @returns {Date}
 */
export const parseTime = (time: string | Date) => {
  if (typeof time !== 'string') {
    return time;
  }
  return parseISO(time);
};
