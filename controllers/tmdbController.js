const axios = require("axios");

const TMDB = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const KEY = process.env.TMDB_KEY;

// 🔍 Search Actors + Movies
exports.searchAll = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({ message: "Query is required" });
    }

    const result = await axios.get(`${TMDB}/search/multi`, {
      params: {
        api_key: KEY,
        query: q
      }
    });
     console.log(result.data.results);
    const formatted = result.data.results
      .filter(i => i.media_type === "movie" || i.media_type === "person")
      .map(i => ({
        id: i.id,
        type: i.media_type,
        name: i.title || i.name,
        image:
          i.poster_path || i.profile_path
            ? IMAGE_BASE + (i.poster_path || i.profile_path)
            : null
      }));

    res.json(formatted);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Search failed" });
  }
};

// 🎬 Get Movie Cast
exports.getMovieCast = async (req, res) => {
  try {
    const movieId = req.params.id;

    const cast = await axios.get(
      `${TMDB}/movie/${movieId}/credits`,
      {
        params: { api_key: KEY }
      }
    );

    const formatted = cast.data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .map(c => ({
        id: c.id,
        name: c.name,
        character: c.character,
        image: c.profile_path
          ? IMAGE_BASE + c.profile_path
          : null
      }));

    res.json(formatted);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch cast" });
  }
};

// ⭐ Get ALL Movies of Actor (For Top 3 Screen)
exports.getActorMovies = async (req, res) => {
  try {
    console.log("hello")
    console.log("Received request for actor movies with ID:", req.params);
    const actorId = req.params.id;
    console.log("Fetching movies for actor ID:", actorId);  
    const response = await axios.get(
      `${TMDB}/person/${actorId}/movie_credits`,
      {
        params: { api_key: KEY }
      }
    );
    //  res.json(response.data); 
    const movies = response.data.cast
      .filter(m => m.poster_path)
      .sort((a, b) => b.popularity - a.popularity)
      .map(m => ({
        id: m.id,
        title: m.title,
        poster: IMAGE_BASE + m.poster_path,
        releaseYear: m.release_date
          ? m.release_date.split("-")[0]
          : null,
        popularity: m.popularity
      }));

    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch actor movies" });
  }
};