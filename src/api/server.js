import bodyParser from 'body-parser';
import connectLiveReload from 'connect-livereload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import config from '../config/default';
import connect from '../services/dbConnection';
import logger from '../services/logger';

import '../utils/liveReload';
import deserializeUser from './middleware/deserializeUser';
import routes from './routes/routes';

dotenv.config();

const app = express();

app.use(cors({ origin: config.origin, credentials: true }));
app.use(cookieParser());
app.use(connectLiveReload());
app.use(express.json());
app.use(deserializeUser);
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  // eslint-disable-next-line no-console
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
