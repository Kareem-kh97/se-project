const router = require("express").Router();
const movieControllers = require("../controllers/movieControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", authenticateUser, movieControllers.movie_get);

router.get("/movie/:id", authenticateUser, movieControllers.movie_by_id_get);

router.get("/addreview", authenticateUser, movieControllers.add_review_get);

module.exports = router;
