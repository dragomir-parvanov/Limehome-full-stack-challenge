import { Router } from 'express';
import { either, option, taskEither } from 'fp-ts';
import { flow, pipe, tuple } from 'fp-ts/lib/function';
import { getConnection } from 'typeorm';
import PropertyEntity from '../../../../entities/property.entity';

const getPropertyBookingsRouter = Router();

export const getPropertyBookings = (
  propertyId: string
): Promise<[statusCode: number, value: any]> =>
  pipe(
    getConnection(),
    (c) => c.getRepository(PropertyEntity),
    taskEither.tryCatchK(
      (r) => r.findOne({ id: propertyId }, { relations: ['bookings'] }),
      (err) => tuple(500, `Database error ${err}`)
    ),
    taskEither.chain(
      flow(
        option.fromNullable,
        taskEither.fromOption(() =>
          tuple(400, `Property with id ${propertyId} is not found`)
        )
      )
    ),
    taskEither.map((r) => r.bookings),
    (r) =>
      r().then(
        either.fold(
          (r) => r as [statusCode: number, value: any], // ommiting the string type
          (r) => tuple(200, r)
        )
      )
  );

getPropertyBookingsRouter.get('/:propertyId/bookings', async (req, res) => {
  const { propertyId } = req.params;
  if (!propertyId) {
    return res.status(400).send(`You must specify a propertyId`);
  }
  const [statusCode, value] = await getPropertyBookings(propertyId);

  if (statusCode === 200) {
    return res.status(200).json(value);
  } else {
    return res.status(statusCode).send(value);
  }
});

export default getPropertyBookingsRouter;
