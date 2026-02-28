const User = require("../models/User");

/*
  🔒 IMPORTANT:
  All routes using this controller MUST use auth middleware.
  Because we are using req.user.id (from JWT).
*/


// ==============================
// 👤 CREATE USER (Optional)
// ==============================
exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  } catch (error) {
    console.error("Create User Error:", error.message);
    res.status(500).json({ message: "User creation failed" });
  }
};


// ==============================
// 🎭 SAVE BIAS ACTOR
// ==============================
exports.saveBias = async (req, res) => {
  try {
    console.log("Received request to save bias actor with data:", req.body);
    const userId = req.user.id;
    const { biasActor } = req.body;

    if (!biasActor) {
      return res.status(400).json({ message: "Bias actor is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { biasActor },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Save Bias Error:", error.message);
    res.status(500).json({ message: "Failed to save bias actor" });
  }
};


// ==============================
// 🎬 SAVE TOP 3 MOVIES
// ==============================
exports.saveTopMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movies } = req.body;

    if (!movies || !Array.isArray(movies)) {
      return res.status(400).json({ message: "Movies array is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { selectedTopMovies: movies },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Save Top Movies Error:", error.message);
    res.status(500).json({ message: "Failed to save top movies" });
  }
};


// ==============================
// 🔥 SAVE MOODS
// ==============================
exports.saveMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const { moods } = req.body;

    if (!moods) {
      return res.status(400).json({ message: "Moods data is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { moods },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Save Moods Error:", error.message);
    res.status(500).json({ message: "Failed to save moods" });
  }
};


// ==============================
// ✍ SAVE BIO
// ==============================
exports.saveBio = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({ message: "Bio is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Save Bio Error:", error.message);
    res.status(500).json({ message: "Failed to save bio" });
  }
};


// ==============================
// 👤 GET PROFILE (Token Based)
// ==============================
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};