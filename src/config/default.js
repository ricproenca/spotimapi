import dotenv from 'dotenv';

dotenv.config();

export default {
  saltWorkFactor: 10,
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  publicKey: process.env.PUBLIC_KEY.replace(/\n/g, '\n'),
  privateKey: process.env.PRIVATE_KEY.replace(/\n/g, '\n')
};
