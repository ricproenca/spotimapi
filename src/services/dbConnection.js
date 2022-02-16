import mongoose from 'mongoose';

import logger from '../utils/logger';

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // eslint-disable-next-line no-console
    logger.info('DB connection established.');
  } catch (err) {
    // eslint-disable-next-line no-console
    logger.error('DB connection Error', err);
    process.exit(1);
  }
};

export default connect;
