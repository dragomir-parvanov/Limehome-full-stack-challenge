import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import * as D from 'io-ts/Decoder';

export const PositionDecoder: D.Decoder<unknown, number> = {
  decode: (data) =>
    pipe(
      data as string,
      parseFloat,
      option.fromPredicate((r) => Number.isNaN(r)),
      (r) => r,
      option.fold(() => D.failure(data, 'Cannot decode Longitude'), D.success)
    ),
};
