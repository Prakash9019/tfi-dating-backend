const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    slogan: { type: String, default: "" },
    recentSlogans: { type: [String], default: [] },
    
    favoriteActors: [
      { actorId: Number, name: String, image: String }
    ],
    biasActor: { actorId: Number, name: String, image: String },
    selectedTopMovies: [
      { movieId: Number, title: String, poster: String }
    ],

    // UPDATED: ALL moods are now Objects to store rich metadata
    moods: {
      comfortCinema: Object,
      comfortSong: Object, 
      readyToDance: Object,
      lovedFlop: Object,
      mostAnticipated: Object,
      reRelease: Object,
      firstInTheatre: Object,
      bestInTheatre: Object
    },

    bio: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);