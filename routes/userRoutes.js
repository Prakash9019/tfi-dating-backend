const router = require("express").Router();
const controller = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/bias", protect, controller.saveBias);
router.post("/top-movies", protect, controller.saveTopMovies);
router.post("/moods", protect, controller.saveMoods);
router.post("/bio", protect, controller.saveBio);
router.get("/profile", protect, controller.getProfile);

module.exports = router;