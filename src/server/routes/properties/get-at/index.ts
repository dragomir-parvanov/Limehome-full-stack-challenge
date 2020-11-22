import { Router } from 'express';
import { either, taskEither } from 'fp-ts';
import { pipe, tuple } from 'fp-ts/lib/function';
import {
  HERE_API_KEY,
  HERE_PLACES_BASE_URL,
  HERE_PLACES_DEFAULT_PARAMS,
  HERE_PLACES_DEFAULT_RADIUS,
} from '../../../../constants/here';
import {
  LatitudeDecoder,
  LongtitudeDecoder,
} from '../../../../functions/decoders/position';
import * as D from 'io-ts/Decoder';
import { NodeAxios } from '../../../utils/axios.node';

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
    LatitudeDecoder.decode,
    either.chain((parsedLatitude) =>
      pipe(
        LongtitudeDecoder.decode(longitude),
        either.map((parsedLongitude) => ({
          in: `${parsedLatitude},${parsedLongitude};r=${HERE_PLACES_DEFAULT_RADIUS}`,
          apiKey: HERE_API_KEY,
          ...HERE_PLACES_DEFAULT_PARAMS,
        }))
      )
    ),
    either.mapLeft((e) => tuple(400, D.draw(e))),
    taskEither.fromEither,
    taskEither.chain((params) =>
      taskEither.tryCatch(
        () =>
          NodeAxios.get(HERE_PLACES_BASE_URL, {
            params,
            paramsSerializer: (p) => new URLSearchParams(p).toString(),
          }),
        (err) => tuple(500, `Here API error: ${err}`)
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
getPropertiesAtRouter.get('/at=:latitude,:longitude', async (req, res) => {
  const { latitude, longitude } = req.params;
  const [statusCode, value] = await getPropertiesAt(latitude, longitude);

  if (statusCode === 200) {
    res.status(200).json(value);
  } else {
    res.status(statusCode).send(value);
  }
});

export default getPropertiesAtRouter;
