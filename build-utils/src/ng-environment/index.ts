/** Manipulating the Angular environment.ts file before building */

import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

/**
 * Converting object to a single 'code generated' string
 *
 * @param obj object where keys will be used as a constant name and value as the constant value
 * @example
 * const obj = {foo:1,bar:2}
 * const result = objectToConstantsStringFactory(obj)
 * console.log(result)
 * // will print:
 * // 'const foo = '1'
 * //  const bar = '2'
 * // '
 */
export const objectToConstantsStringFactory = <T extends Record<string, unknown>>(obj: T) =>
  pipe(obj, Object.entries, array.reduce('', (acc, [key, value]) => acc + `const ${key} = '${value}'`));

export const generateAngularEnvironmentFileContent = (stage: string): string => {

};

export const replaceAngularEnvironment = (content: string): void => {

};
