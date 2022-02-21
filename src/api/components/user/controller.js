import { omit } from 'lodash';

import logger from '../../../services/logger';

import { createUser } from './service';

export const createUserHandler = async (req, res) => {
  logger.http('GET /api/v1/users');
  try {
    const user = await createUser(req.body);

    logger.info(`New user created [${user._id}]`);
    return res.status(200).send(omit(user.toJSON(), ['password', '__v']));
  } catch (err) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
};
