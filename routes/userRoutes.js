const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

//Registration routes
router.get("/register", userControllers.register_get);

router.post("/register", userControllers.register_post);

//Login routes

module.exports = router;
