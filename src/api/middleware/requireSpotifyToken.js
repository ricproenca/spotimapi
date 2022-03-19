import dotenv from 'dotenv';
import { get } from 'lodash';
import spotifyWebApi from 'spotify-web-api-node';

dotenv.config();

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
};

const spotifyApi = new spotifyWebApi(credentials);

const requireSpotifyToken = (req, res, next) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  spotifyApi.setAccessToken(accessToken);
  res.locals.spotifyApi = spotifyApi;

  return next();
};

export default requireSpotifyToken;
