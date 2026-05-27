const axios = require("axios");

let spotifyToken = null;
let tokenExpiresAt = 0;

// 🔥 Get Spotify Access Token (auto refresh)
const getSpotifyToken = async () => {
  if (spotifyToken && Date.now() < tokenExpiresAt) {
    return spotifyToken;
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
    }
  );

  spotifyToken = response.data.access_token;
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

  return spotifyToken;
};

// 🎵 Search Songs
exports.searchSongs = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    console.log("Spotify Access Token:", token);

    const response = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: req.query.q,
          type: "track",
          limit: 20,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("FULL SPOTIFY ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed" });
  }
};