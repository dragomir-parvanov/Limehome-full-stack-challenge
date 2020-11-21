import ArgumentNullError from '../../classes/errors/ArgumentNullError';
import { thrower } from '../../functions/common';

export const APP_PORT = process?.env?.PORT ?? thrower(new ArgumentNullError('APP_PORT'));
