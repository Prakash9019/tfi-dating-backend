// const axios = require("axios");

// // Search songs via iTunes
// exports.searchSongs = async (req, res) => {
//   try {
//     const query = req.query.q;
//     if (!query) {
//       return res.status(400).json({ message: "Query required" });
//     }

//     const response = await axios.get(
//       "https://itunes.apple.com/search",
//       {
//         params: {
//           term: query,
//           entity: "song",
//           limit: 30
//         }
//       }
//     );

//     const tracks = response.data.results.map(track => ({
//       id: track.trackId,
//       name: track.trackName,
//       artist: track.artistName,
//       album: track.collectionName,
//       image: track.artworkUrl100,
//       preview_url: track.previewUrl
//     }));

//     res.json(tracks);

//   } catch (error) {
//     console.error("Music API Error:", error.message);
//     res.status(500).json({ message: "Failed to search songs" });
//   }
// }; 


const axios = require("axios");

// Search songs via iTunes
exports.searchSongs = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Query required" });

    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term: query, entity: "song", limit: 30 }
    });

    const tracks = response.data.results.map(track => ({
      id: track.trackId,
      type: "song", // Added type for consistency with TMDB
      name: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      // PRO TIP: Replace '100x100' with '600x600' for HD images in your UI!
      image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '600x600bb') : null,
      preview_url: track.previewUrl
    }));

    res.json(tracks);
  } catch (error) {
    console.error("Music API Error:", error.message);
    res.status(500).json({ message: "Failed to search songs" });
  }
};