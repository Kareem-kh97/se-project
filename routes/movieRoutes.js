const router = require("express").Router();
const movieControllers = require("../controllers/movieControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", authenticateUser, movieControllers.movie_get);

router.get("/addreview", authenticateUser, movieControllers.add_review_get);

router.post("/addmovie", authenticateUser, movieControllers.add_movie_post);

router.post(
  "/addmoviesactors",
  authenticateUser,
  movieControllers.add_movies_actors_post
);

router.get("/movie/:id", authenticateUser, movieControllers.movie_by_id_get);

module.exports = router;
