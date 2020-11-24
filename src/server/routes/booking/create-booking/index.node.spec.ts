import { ExpressApp } from '../../../../types/express';
import expressApp from '../../../main';
import request from 'supertest';
import { CreateBookingInput } from '../../../../types/interfaces/input/booking';

let app: ExpressApp;

before(async () => {
  // TODO: database clear
  app = await expressApp;
});

describe('create-booking', () => {
  it('should create booking', (done) => {
    const propertyId = 'propertyId';
    const bookingInput: CreateBookingInput = {
      propertyId,
      from: new Date().getTime() + 500,
      to: new Date().getTime() + 1000,
    };
    request(app)
      .post('/api/booking')
      .send(bookingInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
  it('should return 400', (done) => {
    const badInput = {
      from: new Date().getTime(),
      to: new Date().getTime() - 1000,
    };
    request(app)
      .post('/api/booking/')
      .send(badInput)
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});
