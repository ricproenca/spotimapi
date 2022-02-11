import connectLiveReload from 'connect-livereload';
import express from 'express';
import livereload from 'livereload';

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.get('/ping', (_req, res) => {
  res.status(200).json({ data: 'Pong!!' });
});

export default app;
