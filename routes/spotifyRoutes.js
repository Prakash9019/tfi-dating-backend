const router = require("express").Router();
const controller = require("../controllers/spotifyController");

router.get("/search", controller.searchSongs);

module.exports = router;