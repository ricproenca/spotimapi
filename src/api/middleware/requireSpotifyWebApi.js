import { get } from 'lodash';
import spotifyWebApi from 'spotify-web-api-node';

const credentials = {
  clientId: '05647fe3b2f54b7786acea04e66bfea7',
  clientSecret: '2612dd99d3984463962d82511853c5ed',
  redirectUri: 'http://localhost:3000/redirect/'
};

const spotifyApi = new spotifyWebApi(credentials);

const requireSpotifyWebApi = (req, res, next) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  spotifyApi.setAccessToken(accessToken);
  res.locals.spotifyApi = spotifyApi;

  return next();
};

export default requireSpotifyWebApi;
