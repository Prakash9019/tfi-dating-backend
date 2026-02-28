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
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query required" });
    }

    const token = await getSpotifyToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "track",
          limit: 20,
        },
      }
    );

    const tracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      image: track.album.images[0]?.url,
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
    }));

    res.json(tracks);

  } catch (error) {
    console.error("Spotify Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to search songs" });
  }
};