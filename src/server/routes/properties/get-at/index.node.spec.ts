import request from 'supertest';

import { ExpressApp } from '../../../../types/express';
import expressApp from '../../../main';

let app: ExpressApp;
before(async () => {
  app = await expressApp;
});

describe('properties at', () => {
  it('valid parameters should return 200', (done) => {
    request(app)
      .get('/api/properties/at=42.698334,23.319941')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('not valid parameters should return 400', (done) => {
    request(app)
      .get('/api/properties/at=191.698334,23.319941')
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});
