import lyricsFinder from 'lyrics-finder';

export const lyricsFinderHandler = () => async (req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.title);
  if (lyrics) {
    return res.status(200).send(lyrics);
  }

  return res.status(404);
};
