const User = require("../models/User");

// Create user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "User creation failed" });
  }
};

// Save bias actor
exports.saveBias = async (req, res) => {
  const { userId, biasActor } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { biasActor },
    { new: true }
  );

  res.json(user);
};

// Save Top 3 Movies
exports.saveTopMovies = async (req, res) => {
  const { userId, movies } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { selectedTopMovies: movies },
    { new: true }
  );

  res.json(user);
};

// Save moods
exports.saveMoods = async (req, res) => {
  const { userId, moods } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { moods },
    { new: true }
  );

  res.json(user);
};

// Save bio
exports.saveBio = async (req, res) => {
  const { userId, bio } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { bio },
    { new: true }
  );

  res.json(user);
};

// Get full profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};