const router = require("express").Router();
const movieControllers = require("../controllers/movieControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", authenticateUser, movieControllers.movie_get);

module.exports = router;
