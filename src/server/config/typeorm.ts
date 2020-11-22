import { createConnection } from 'typeorm';
import { DATABASE_URL } from '../../constants/database';
import path from 'path';
import BookingEntity from '../../entities/booking.entity';
import PropertyEntity from '../../entities/property.entity';
export const connectToDatabaseTypeorm = () =>
  createConnection({
    type: 'postgres',
    url: DATABASE_URL,
    synchronize: true,
    logging: false,
    database: 'limehome',
    entities: [BookingEntity, PropertyEntity],
  });
