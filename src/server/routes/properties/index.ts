import { Router } from 'express';
import getPropertiesAtRouter from './get-at';

const propertiesRouter = Router();

propertiesRouter.use(getPropertiesAtRouter);

export default propertiesRouter;
