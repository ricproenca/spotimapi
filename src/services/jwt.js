import jwt from 'jsonwebtoken';

import config from '../config/default';

export const signJwt = (object, options) => {
  return jwt.sign(object, config.privateKey, {
    ...options,
    algorithm: 'RS256'
  });
};

export const verifyJwt = token => {
  try {
    const decoded = jwt.verify(token, config.publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    };
  }
};
