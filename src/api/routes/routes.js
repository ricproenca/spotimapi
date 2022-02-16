import logger from '../../utils/logger';
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from '../components/session/controller';
import { createSessionSchema } from '../components/session/schema';
import { createUserHandler } from '../components/user/controller';
import { createUserSchema } from '../components/user/schema';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

const routes = app => {
  app.get('/api/v1/healthcheck', (_req, res) => {
    logger.http('POST /healthcheck');
    res.sendStatus(200);
  });

  app.post('/api/v1/users', validateResource(createUserSchema), createUserHandler);
  app.post('/api/v1/sessions', validateResource(createSessionSchema), createSessionHandler);
  app.get('/api/v1/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/v1/sessions', requireUser, deleteSessionHandler);
};

export default routes;
