import { Router } from 'express';
import { either, taskEither } from 'fp-ts';
import { flow, pipe, tuple } from 'fp-ts/lib/function';
import { draw } from 'io-ts/lib/Decoder';
import { getConnection } from 'typeorm';
import BookingEntity from '../../../../entities/booking.entity';
import PropertyEntity from '../../../../entities/property.entity';
import { CreateBookingInputDecoder } from '../../../../functions/decoders/booking';
import { validateBookingInput } from '../../../../functions/validators/booking';

export const createBookingRoute = Router();

/**
 * Decodes then validates the body and then inserting to the database.
 * It returns a promise which always resolves with a tuple of status code and value
 */
export const createBookingForProperty: (
  body: unknown
) => Promise<[statusCode: number, value: string]> = flow(
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
        () => tuple(200, 'The booking was successfully created')
      )
    )
);
createBookingRoute.post('', async (req, res) => {
  const [statusCode, value] = await createBookingForProperty(req.body);

  res.status(statusCode).send(value);
});
