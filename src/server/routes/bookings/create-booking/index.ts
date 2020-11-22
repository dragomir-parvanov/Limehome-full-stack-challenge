import { Router } from 'express';
import { either, taskEither } from 'fp-ts';
import { flow, pipe, tuple } from 'fp-ts/lib/function';
import { draw } from 'io-ts/lib/Decoder';
import { id } from 'io-ts/lib/Kleisli';
import { getConnection } from 'typeorm';
import BookingEntity from '../../../../entities/booking.entity';
import PropertyEntity from '../../../../entities/property.entity';
import { CreateBookingInputDecoder } from '../../../../functions/decoders/booking';
import { validateBookingInput } from '../../../../functions/validators/booking';

export const createBookingRoute = Router();
const createBookingProperty = flow(
  CreateBookingInputDecoder.decode,
  either.mapLeft(draw),
  either.chain(validateBookingInput),
  either.mapLeft((err) => tuple(400, err)),
  taskEither.fromEither,
  taskEither.chain(({ from, to, propertyId }) => {
    const connection = getConnection();
    const propertyRepository = connection.getRepository(PropertyEntity);
    const bookingsRepository = connection.getRepository(BookingEntity);
    const property = propertyRepository.create({ id: propertyId });
    return pipe(
      taskEither.tryCatch(
        () => propertyRepository.save(property),
        (err) =>
          tuple(500, `Database error durign the saving of the property: ${err}`)
      ),
      taskEither.map((property) =>
        bookingsRepository.create({ from, to, property })
      ),
      taskEither.chain(
        taskEither.tryCatchK(bookingsRepository.save, (err) =>
          tuple(500, `Database error during saving of the booking: ${err}`)
        )
      )
    );
  }),
  (r) =>
    r().then(
      either.fold(
        (e) => e,
        (r) => tuple(200, 'Successfuly created booking')
      )
    )
);
createBookingRoute.post('', (req, res) => {});
