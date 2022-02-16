import { get } from 'lodash';

import config from '../../../config/default';
import { signJwt, verifyJwt } from '../../../utils/jwt';
import { findUser } from '../user/service';

import SessionModel from './model';

export const createSession = async (userId, userAgent) => {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (err) {
    throw new Error(err);
  }
};

export const findSessions = async query => {
  try {
    return await SessionModel.find(query).lean();
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSession = async (query, update) => {
  try {
    return await SessionModel.updateOne(query, update);
  } catch (err) {
    throw new Error(err);
  }
};

export const reIssueAccessToken = async refreshToken => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ _id: session.user });

  if (!user) {
    return false;
  }

  // Create a new Access Token
  return signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTtl') });
};
