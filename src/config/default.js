import dotenv from 'dotenv';

dotenv.config();

export default {
  origin: 'http://localhost:3000',
  saltWorkFactor: 10,
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  publicKey: process.env.PUBLIC_KEY.replace(/\n/g, '\n'),
  privateKey: process.env.PRIVATE_KEY.replace(/\n/g, '\n'),
  accessTokenCookie: {
    maxAge: 90000, // '15m'
    httpOnly: true,
    domain: process.env.AUTH_DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: process.env.HTTPS
  },
  refreshTokenCookie: {
    maxAge: 3.154e10, // '1y'
    httpOnly: true,
    domain: process.env.AUTH_DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: process.env.HTTPS
  }
};
