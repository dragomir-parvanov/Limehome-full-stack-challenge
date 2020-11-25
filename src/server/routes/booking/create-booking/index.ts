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
 * It returns a promise which always resolves with a tuple of a status code and value
 * If the status code is 200, then the value will be the booking id
 */
export const createBookingForProperty: (
  body: unknown
) => Promise<[statusCode: number, value: any]> = flow(
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
        bookingsRepository.create({
          from: new Date(from),
          to: new Date(to),
          property,
        })
      ),
      taskEither.chain(
        taskEither.tryCatchK(
          (b) => bookingsRepository.save(b),
          (err) =>
            tuple(500, `Database error during saving of the booking: ${err}`)
        )
      )
    );
  }),
  (r) =>
    r()
      .then(
        either.fold(
          (e) => e as [statusCode: number, value: any], // ommiting the string type
          (r) => tuple(200, r.id)
        )
      )
      .catch((err) => tuple(500, `Unhandled rejection: ${err}`))
);
createBookingRoute.post('', async (req, res) => {
  const [statusCode, value] = await createBookingForProperty(req.body);

  res.status(statusCode).send(String(value));
});

export default createBookingRoute;
