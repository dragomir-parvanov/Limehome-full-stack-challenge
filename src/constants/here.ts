/** 'Here' API related constants */

import ArgumentNullError from '../classes/errors/ArgumentNullError';
import { thrower } from '../functions/common';

export const HERE_API_KEY =
  process.env.HERE_API_KEY ?? thrower(new ArgumentNullError('HERE_API_KEY'));

export const HERE_PLACES_BASE_URL =
  'https://places.ls.hereapi.com/places/v1/browse';

export const HERE_PLACES_DEFAULT_RADIUS = 3000;

export const HERE_PLACES_DEFAULT_PARAMS = { cat: 'hotel' };
