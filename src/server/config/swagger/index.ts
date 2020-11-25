import { ExpressApp } from '../../../types/express';
import swaggerDocument from './swagger.json';
import swaggerUi from 'swagger-ui-express';

export const configureSwagger = (app: ExpressApp) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
