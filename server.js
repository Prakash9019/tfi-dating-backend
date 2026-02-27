// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const tmdbRoutes = require("./routes/tmdbRoutes");
// const getSpotifyToken = require("./spotifyAuth");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", tmdbRoutes);
// app.get("/search", async (req, res) => {
//   try {
//     const q = req.query.q;
//     const token = await getSpotifyToken();
//     console.log("Spotify token:", token);
//     const response = await axios.get(
//       `https://api.spotify.com/v1/search?q=${q}&type=track&limit=10`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//     console.log("Spotify search query:", q);
//     console.log("Spotify search response:", response.data);
//     const tracks = response.data.tracks.items.map(track => ({
//       id: track.id,
//       name: track.name,
//       artist: track.artists[0].name,
//       image: track.album.images[0].url,
//       preview: track.preview_url
//     }));
//    console.log(tracks);
//     res.json(tracks);
//   } catch (err) {
//     console.error("Error fetching Spotify tracks:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log("Server running on 5000"));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const tmdbRoutes = require("./routes/tmdbRoutes");
const userRoutes = require("./routes/userRoutes");

// connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tmdb", tmdbRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);