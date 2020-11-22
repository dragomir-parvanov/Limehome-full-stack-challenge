import ArgumentNullError from '../classes/errors/ArgumentNullError';
import { thrower } from '../functions/common';

export const API_PORT =
  process?.env?.PORT ?? thrower(new ArgumentNullError('APP_PORT'));
