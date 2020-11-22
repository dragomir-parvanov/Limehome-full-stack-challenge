import { configureNodeEnvironmentVariables } from '../../environment/configure.node';
configureNodeEnvironmentVariables();

import express from 'express';
import { API_PORT } from '../constants/port';
import rootApiRouter from './routes/root';

const app = express();

app.use('/api', rootApiRouter);

app.listen(API_PORT, () => console.log(`Listening to ${API_PORT}`));
