/** Configuring the environment variables in a nodejs environment*/

import ArgumentNullError from '../src/classes/errors/ArgumentNullError';
import { thrower } from '../src/functions/common';
import path from 'path';
import { config } from 'dotenv';

/**
 * This must be included on top of every entry point in a nodejs application
 * NODE_ENV must be defined prior running this function. It needs to be set with cross-env for an example.
 */
export const configureNodeEnvironmentVariables = (): void => {
  const environment =
    process.env.NODE_ENV ?? thrower(new ArgumentNullError('NODE_ENV'));

  const environmentPath = path.join(__dirname, `/.${environment}.env`);

  config({ path: environmentPath });
};
console.log('NODE_ENV', process.env.NODE_ENV);
