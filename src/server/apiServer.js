import connectLiveReload from 'connect-livereload';
import express from 'express';
import './liveReload';

const app = express();

app.use(connectLiveReload());

app.get('/ping', (_req, res) => {
  res.status(200).json({ data: 'Pong!!' });
});

export default app;
