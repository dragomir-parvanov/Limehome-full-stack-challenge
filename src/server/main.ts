import { configureNodeEnvironmentVariables } from '../../environment/configure.node';
configureNodeEnvironmentVariables();
import express, { response } from 'express';
import { API_PORT } from '../constants/port';
import rootApiRouter from './routes/root';
import { connectToDatabaseTypeorm } from './config/typeorm';
import BookingEntity from '../entities/booking.entity';
import PropertyEntity from '../entities/property.entity';

connectToDatabaseTypeorm().then(async (connection) => {
  await connection.driver.afterConnect();

  console.log('initialized TypeORM');

  const app = express();

  app.use('/api', rootApiRouter);

  app.listen(API_PORT, () => console.log(`Listening to ${API_PORT}`));
  const propertyRepo = connection.getRepository(PropertyEntity);
  const bookRepo = connection.getRepository(BookingEntity);
  const property = propertyRepo.create({ id: 'heyeryteryt' });
  await propertyRepo.save(property);
  const data = bookRepo.create({
    property: { id: 'randomid', bookings: [] },
    from: new Date(),
    to: new Date(),
  });
  await bookRepo.save(data);
});
