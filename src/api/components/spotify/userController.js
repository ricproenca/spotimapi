export const getMeHandler = async (req, res) => {
  const spotifyApi = res.locals.spotifyApi;

  if (!spotifyApi) {
    return res.sendStatus(403);
  }

  spotifyApi.getMe().then(
    data => res.status(200).send(data.body),
    err => res.status(400).send(err)
  );
};
