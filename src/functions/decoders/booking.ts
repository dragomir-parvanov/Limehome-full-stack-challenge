import { pipe } from 'fp-ts/lib/pipeable';
import * as D from 'io-ts/Decoder';
import { CreateBookingInput } from '../../types/interfaces/input/booking';

export const CreateBookingInputDecoder: D.Decoder<
  unknown,
  CreateBookingInput
> = pipe(
  D.type({
    propertyId: D.string,
    from: D.number,
    to: D.number,
  }),
  D.withMessage(() => 'The input does not match the schema')
);
