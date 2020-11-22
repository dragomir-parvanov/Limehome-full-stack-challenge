import { Router } from 'express';
import createBookingRoute from './create-booking';

const bookingRouter = Router();

bookingRouter.use(createBookingRoute);

export default bookingRouter;
