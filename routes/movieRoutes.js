const router = require("express").Router();
const movieControllers = require("../controllers/movieControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", authenticateUser, movieControllers.displayHomepage);

router.get("/addreview", authenticateUser, movieControllers.showReviewPage);

router.post("/addmovie", authenticateUser, movieControllers.addNewMovieReview);

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
  movieControllers.fillMovieActorAssociativeTable
);

router.get("/moviedb", authenticateUser, movieControllers.movieDbGet);

router.get("/movie/:id", authenticateUser, movieControllers.displayMovieById);

router.put(
  "/movie/:id",
  authenticateUser,
  movieControllers.updateMovieFieldsById
);

router.delete("/movie/:id", authenticateUser, movieControllers.movieByIdDelete);

module.exports = router;
