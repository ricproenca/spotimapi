import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'Pong!' });
});

export default app;
