/**
 * Class that extends the error object.
 *
 * @example
 * try{
 * const data = response.data ?? thrower(new ArgumentNullError("response.data"))
 * }
 * catch(err){
 * console.log(err)
 * // err will be 'Argument with name "response.data" cannot be undefined or null
 * }
 */
export default class ArgumentNullError extends Error {
  constructor(argumentName: string) {
    super(`Argument with name "${argumentName}" cannot be undefined or null`);
  }
}
