const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");
const checkIfUserIsLoggedIn = require("../middleware/checkIfUserIsLoggedIn");

router.get("/index", authenticateUser, (req, res) => res.render("index"));

//Registration routes
router.get("/register", checkIfUserIsLoggedIn, userControllers.register_get);

router.post("/register", userControllers.register_post);

//Login routes
router.get("/login", checkIfUserIsLoggedIn, userControllers.login_get);

router.post("/login", userControllers.login_post);

module.exports = router;
