import * as D from 'io-ts/Decoder';
import { CreateBookingInput } from '../../types/interfaces/input/booking';

export const CreateBookingInputDecoder: D.Decoder<
  unknown,
  CreateBookingInput
> = D.type({
  propertyId: D.string,
  from: D.number,
  to: D.number,
});
