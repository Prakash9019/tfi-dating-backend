const axios = require("axios");

const TMDB = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_KEY;

// 🔍 Common Search (Actors + Movies)
exports.searchAll = async (req, res) => {
  const q = req.query.q;

  const result = await axios.get(
    `${TMDB}/search/multi?api_key=${KEY}&query=${q}`
  );

  const formatted = result.data.results
    .filter(i => i.media_type === "movie" || i.media_type === "person")
    .map(i => ({
      id: i.id,
      type: i.media_type,
      name: i.title || i.name,
      image: i.poster_path || i.profile_path,
    }));

  res.json(formatted);
};

// 🎬 Movie → Full Cast
exports.getMovieCast = async (req, res) => {
  const movieId = req.params.id;

  const cast = await axios.get(
    `${TMDB}/movie/${movieId}/credits?api_key=${KEY}`
  );

  res.json(
    cast.data.cast.map(c => ({
      id: c.id,
      name: c.name,
      character: c.character,
      image: c.profile_path
    }))
  );
};

// ⭐ Actor → All Movies
exports.getActorMovies = async (req, res) => {
  const actorId = req.params.id;

  const movies = await axios.get(
    `${TMDB}/person/${actorId}/movie_credits?api_key=${KEY}`
  );

  res.json(
    movies.data.cast.map(m => ({
      id: m.id,
      title: m.title,
      poster: m.poster_path
    }))
  );
};
