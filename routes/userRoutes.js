const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/index", authenticateUser, (req, res) => res.render("index"));

//Registration routes
router.get("/register", userControllers.register_get);

router.post("/register", userControllers.register_post);

//Login routes
router.get("/login", userControllers.login_get);

router.post("/login", userControllers.login_post);

module.exports = router;
