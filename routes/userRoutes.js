const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/create", controller.createUser);
router.post("/bias", controller.saveBias);
router.post("/top-movies", controller.saveTopMovies);
router.post("/moods", controller.saveMoods);
router.post("/bio", controller.saveBio);

router.get("/:id", controller.getProfile);

module.exports = router;