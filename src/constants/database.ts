import ArgumentNullError from '../classes/errors/ArgumentNullError';
import { thrower } from '../functions/common';

export const DATABASE_URL =
  process.env.DATABASE_URL ?? thrower(new ArgumentNullError('DATABASE_URL'));
