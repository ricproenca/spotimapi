import bodyParser from 'body-parser';
import express from 'express';

import deserializeUser from '../api/middleware/deserializeUser';
import routes from '../api/routes/routes';

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(deserializeUser);
  app.use(bodyParser.urlencoded({ extended: true }));

  routes(app);

  return app;
};

export default createServer;
