import Axios from 'axios';
import { Router } from 'express';
import { either, taskEither } from 'fp-ts';
import { pipe, tuple } from 'fp-ts/lib/function';
import {
  HERE_API_KEY,
  HERE_PLACES_BASE_URL,
  HERE_PLACES_DEFAULT_RADIUS,
} from '../../../../constants/here';
import { PositionDecoder } from '../../../../functions/decoders/position';
import * as D from 'io-ts/Decoder';

const getPropertiesAtRouter = Router();

/**
 * Decodes the input and then gets properties from the HERE_API.
 *
 * @param latitude This value will be parsed to a number
 * @param longitude This value will be parsed to a number
 */
export const getPropertiesAt = (
  latitude: unknown,
  longitude: unknown
): Promise<[statusCode: number, data: any]> =>
  pipe(
    latitude,
    PositionDecoder.decode,
    either.chain((parsedLatitude) =>
      pipe(
        PositionDecoder.decode(longitude),
        either.map((parsedLongitude) => ({
          in: `${parsedLatitude},${parsedLongitude}`,
          apiKey: HERE_API_KEY,
          r: HERE_PLACES_DEFAULT_RADIUS,
        }))
      )
    ),
    either.mapLeft((e) => tuple(400, D.draw(e))),
    taskEither.fromEither,
    taskEither.chain((params) =>
      taskEither.tryCatch(
        () => Axios.get(HERE_PLACES_BASE_URL, { params }),
        (err) => tuple(500, `${err}`)
      )
    ),
    taskEither.map((r) => r.data),
    (r) =>
      r().then(
        either.fold(
          (e) => e,
          (data) => [200, data]
        )
      )
  );
getPropertiesAtRouter.get('?at=:latitude,:longitude ', async (req, res) => {
  const { latitude, longitude } = req.params;
  const [statusCode, value] = await getPropertiesAt(latitude, longitude);

  if (statusCode === 200) {
    res.status(200).json(value);
  } else {
    res.status(statusCode).send(value);
  }
});

export default getPropertiesAtRouter;
