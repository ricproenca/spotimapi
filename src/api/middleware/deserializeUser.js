import { get } from 'lodash';

import config from '../../config/default';
import { verifyJwt } from '../../services/jwt';
import { reIssueAccessToken } from '../components/session/service';

const deserializeUser = async (req, res, next) => {
  const accessToken = get(req, 'cookies.accessToken') || get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
      res.cookie('accessToken', newAccessToken, config.accessTokenCookie);
    }

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
