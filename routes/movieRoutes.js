const router = require("express").Router();
const movieControllers = require("../controllers/movieControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", authenticateUser, movieControllers.movie_get);

router.get("/addreview", authenticateUser, movieControllers.add_review_get);

router.post("/addmovie", authenticateUser, movieControllers.add_movie_post);

router.get(
  "/bookmarks",
  authenticateUser,
  movieControllers.bookmarkedMoviesGet
);

router.post(
  "/bookmarkmovie",
  authenticateUser,
  movieControllers.bookmarkMoviePost
);

router.post(
  "/addmoviesactors",
  authenticateUser,
  movieControllers.add_movies_actors_post
);

router.get("/moviedb", authenticateUser, movieControllers.movieDbGet);

router.get("/movie/:id", authenticateUser, movieControllers.movie_by_id_get);

router.put(
  "/movie/:id",
  authenticateUser,
  movieControllers.updateMovieFieldsById
);

router.delete("/movie/:id", authenticateUser, movieControllers.movieByIdDelete);

module.exports = router;
