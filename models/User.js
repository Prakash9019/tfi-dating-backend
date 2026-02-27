const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    favoriteActors: [
      {
        actorId: Number,
        name: String,
        image: String
      }
    ],

    biasActor: {
      actorId: Number,
      name: String,
      image: String
    },

    selectedTopMovies: [
      {
        movieId: Number,
        title: String,
        poster: String
      }
    ],

    moods: {
      comfortCinema: Object,
      comfortSong: String,
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