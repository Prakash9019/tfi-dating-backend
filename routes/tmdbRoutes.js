const router = require("express").Router();
const controller = require("../controllers/tmdbController");

router.get("/search", controller.searchAll);
router.get("/movie/:id/cast", controller.getMovieCast);
router.get("/actor/:id/movies", controller.getActorMovies);

module.exports = router;