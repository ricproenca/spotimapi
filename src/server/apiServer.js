import bodyParser from 'body-parser';
import connectLiveReload from 'connect-livereload';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import './liveReload';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection Success.');
  })
  .catch(err => {
    console.error('DB Connection Error', err);
  });

const app = express();

app.use(connectLiveReload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
  res.status(200).json({ data: null, message: 'Server is healthy!', error: false });
});

export default app;
