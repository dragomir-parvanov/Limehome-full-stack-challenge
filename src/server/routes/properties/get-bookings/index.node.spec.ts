import chai, { expect } from 'chai';
import BookingEntity from '../../../../entities/booking.entity';
import { CreateBookingInput } from '../../../../types/interfaces/input/booking';
import { createBookingForProperty } from '../../booking/create-booking';
import request from 'supertest';
import { ExpressApp } from '../../../../types/express';
import expressApp from '../../../main';

let app: ExpressApp;

before(async () => {
  // TODO: database clear
  app = await expressApp;
});

describe('get bookings', () => {
  it('should get bookings', async () => {
    const propertyId = 'property-id';
    const bookingInput: CreateBookingInput = {
      propertyId,
      from: new Date().getTime() + 1000,
      to: new Date().getTime() + 5000,
    };
    const [statusCode, bookingId] = await createBookingForProperty(
      bookingInput
    );
    if (statusCode !== 200) {
      throw new Error(`Received ${statusCode} instead of 200`);
    }
    const response = await request(app)
      .get(`/api/properties/${propertyId}/bookings`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.some((b: BookingEntity) => b.id === bookingId)).eq(
      true
    );
  });
  it('bookings should return 400 for non existent propertyId', async () => {
    const propertyId = 'no way there should be this id';

    await request(app)
      .get(`/api/properties/${propertyId}/bookings`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(400);
  });
});
