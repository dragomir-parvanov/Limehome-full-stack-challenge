import { Router } from 'express';
import { either, taskEither } from 'fp-ts';
import { flow, pipe, tuple } from 'fp-ts/lib/function';
import {
  HERE_API_KEY,
  HERE_PLACES_BASE_URL,
  HERE_PLACES_DEFAULT_PARAMS,
  HERE_PLACES_DEFAULT_RADIUS,
} from '../../../../constants/here';
import {
  LatitudeDecoder,
  LongitudeDecoder,
} from '../../../../functions/decoders/position';
import * as D from 'io-ts/Decoder';
import { NodeAxios } from '../../../utils/axios.node';
import { PropertyDoceder } from '../../../../functions/decoders/properties';

const getPropertiesAtRouter = Router();

/**
 * Decodes the input and then gets properties from the HERE_API.
 * On success this will return a tuple of status code and array of properties.
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
        LongitudeDecoder.decode(longitude),
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
    taskEither.map((r) => r.data?.results?.items),
    taskEither.chainEitherK(
      flow(
        D.array(PropertyDoceder).decode,
        either.mapLeft((err) =>
          tuple(
            500,
            `The 'Here' api did not return what we expected, error:\n${D.draw(
              err
            )}`
          )
        )
      )
    ),
    (r) =>
      r().then(
        either.fold(
          (e) => e as [statusCode: number, value: any], // to omit the "string" type
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
