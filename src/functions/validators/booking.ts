import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { CreateBookingInput } from '../../types/interfaces/input/booking';

export const validateBookingInput = (
  input: CreateBookingInput
): either.Either<string, CreateBookingInput> =>
  pipe(
    input,
    either.fromPredicate(
      (i) => i.to > i.from,
      () => `The 'to' date must be bigger than the 'from' date`
    ),
    either.chain(
      either.fromPredicate(
        (e) => e.from > new Date().getTime() - 100000, // some tolerance
        () => 'Cannot make booking for a past date'
      )
    )
  );
