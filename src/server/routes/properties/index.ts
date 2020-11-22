import { Router } from 'express';
import getPropertiesAtRouter from './get-at';
import getPropertyBookingsRouter from './get-bookings';

const propertiesRouter = Router();

propertiesRouter.use(getPropertiesAtRouter);

propertiesRouter.use(getPropertyBookingsRouter);

export default propertiesRouter;
