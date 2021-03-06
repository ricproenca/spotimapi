import config from '../../../config/default';
import { signJwt } from '../../../services/jwt';
import { validatePassword } from '../user/service';

import { createSession, findSessions, updateSession } from './service';

export const createUserSessionHandler = async (req, res) => {
  try {
    // validate user's password
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create an access and a refresh token
    const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: config.accessTokenTTL });
    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.refreshTokenTTL });

    // return cookies
    res.cookie('accessToken', accessToken, config.accessTokenCookie);
    res.cookie('refreshToken', refreshToken, config.refreshTokenCookie);

    // return tokens
    return res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    return res.status(409).send(err.message);
  }
};

export const getUserSessionsHandler = async (_req, res) => {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).send(sessions);
};

export const deleteSessionHandler = async (_req, res) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null
  });
};
