import { Router } from 'express';
import propertiesRouter from './properties';

const rootApiRouter = Router();

rootApiRouter.use('/properties', propertiesRouter);

export default rootApiRouter;
