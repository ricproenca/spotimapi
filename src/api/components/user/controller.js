import { omit } from 'lodash';

import logger from '../../../services/logger';

import { createUser } from './service';

export const createUserHandler = async (req, res) => {
  logger.info('GET /api/v1/users');
  try {
    const user = await createUser(req.body);

    logger.info(`New user created [${user._id}]`);
    return res.status(200).send(omit(user, ['password', '__v']));
  } catch (err) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
};

export const getCurrentUserHandler = async (_req, res) => {
  logger.info('GET /api/v1/me');
  return res.status(200).send(res.locals.user);
};
