import logger from '../../services/logger';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler
} from '../components/session/controller';
import { createSessionSchema } from '../components/session/schema';
import { loginUserHandler, refreshUserHandler } from '../components/spotify/authController';
import { lyricsFinderHandler } from '../components/spotify/lyricsController';
import { getMeHandler } from '../components/spotify/userController';
import { createUserHandler, getCurrentUserHandler } from '../components/user/controller';
import { createUserSchema } from '../components/user/schema';
import requireSpotifyWebApi from '../middleware/requireSpotifyWebApi';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

const routes = app => {
  // HEALTH CHECK
  app.get('/api/v1/healthcheck', (_req, res) => {
    logger.info('GET /api/v1/healthcheck');
    res.sendStatus(200);
  });

  // USERS
  app.post('/api/v1/users', validateResource(createUserSchema), createUserHandler);
  app.get('/api/v1/me', requireUser, getCurrentUserHandler);

  // SESSIONS
  app.post('/api/v1/sessions', validateResource(createSessionSchema), createUserSessionHandler);
  app.get('/api/v1/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/v1/sessions', requireUser, deleteSessionHandler);

  // SPOTIFY AUTH
  app.post('/api/v1/spotify/login', loginUserHandler);
  app.post('/api/v1/spotify/refresh', refreshUserHandler);

  // SPOTIFY USER
  app.get('/api/v1/spotify/me', requireSpotifyWebApi, getMeHandler);

  // LYRICS
  app.post('/api/v1/spotify/lyrics', requireSpotifyWebApi, lyricsFinderHandler);
};

export default routes;
