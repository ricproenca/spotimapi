import dotenv from 'dotenv';
import spotifyWebApi from 'spotify-web-api-node';

dotenv.config();

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
};

export const loginUserHandler = async (req, res) => {
  let spotifyApi = new spotifyWebApi(credentials);

  try {
    const data = await spotifyApi.authorizationCodeGrant(req.body.code);
    if (data?.body?.access_token) {
      const accessToken = data.body.access_token;

      return res.status(200).send({ accessToken });
    }
    res.sendStatus(500);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const refreshUserHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  let spotifyApi = new spotifyWebApi({ ...credentials, refreshToken });

  try {
    const data = await spotifyApi.refreshAccessToken();
    return res.status(200).send({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  } catch (error) {
    return res.sendStatus(400);
  }
};
