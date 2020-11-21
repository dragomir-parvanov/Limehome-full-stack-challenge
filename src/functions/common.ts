/** Common functions */

/**
 * A thrower wrapper function so we can avoid unnecessary function wrapping.
 *
 * @param error The constructed error object or a string. If this is a string a new Error object will be constructed and then thrown.
 * @example
 * const APP_URL = process.env.APP_URL ?? thrower(new Error("APP_URL must be defined as environment variable"))
 * const MAX_RETRIES = process.env.MAX_RETRIES ?? thrower("MAX_RETRIES must be defined as environment variable")
 */
export const thrower = <T extends Error>(error: T | string): never => {
  if (typeof error === 'string') {
    throw new Error(error);
  }

  throw error;
};
