import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import * as D from 'io-ts/Decoder';

export const LatitudeDecoder: D.Decoder<unknown, number> = {
  decode: (data) =>
    pipe(
      data as string,
      parseFloat,
      either.fromPredicate(
        (r) => !Number.isNaN(r),
        () => `be parsed to a number`
      ),
      either.chain(
        either.fromPredicate(
          (n) => isFinite(n) && Math.abs(n) <= 90,
          () => `a valid latitude`
        )
      ),
      either.mapLeft((err) => D.failure(data, err)),
      either.fold((e) => e, D.success)
    ),
};

export const LongtitudeDecoder: D.Decoder<unknown, number> = {
  decode: (data) =>
    pipe(
      data as string,
      parseFloat,
      either.fromPredicate(
        (r) => !Number.isNaN(r),
        () => `be parsed to a number`
      ),
      either.chain(
        either.fromPredicate(
          (n) => isFinite(n) && Math.abs(n) <= 180,
          () => `a valid longtitude`
        )
      ),
      either.mapLeft((err) => D.failure(data, err)),
      either.fold((e) => e, D.success)
    ),
};
