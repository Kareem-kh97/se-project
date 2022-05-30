const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

//Middleware
const authenticateUser = require("../middleware/authMiddleware");
const checkIfUserIsLoggedIn = require("../middleware/checkIfUserIsLoggedIn");

//Registration routes
router.get("/register", checkIfUserIsLoggedIn, userControllers.register_get);

router.post("/register", userControllers.register_post);

//Login routes
router.get("/login", checkIfUserIsLoggedIn, userControllers.login_get);

router.post("/login", userControllers.login_post);

//Logout route
router.get("/logout", userControllers.logout);

//Forgot password
router.get(
  "/forgotpassword",
  checkIfUserIsLoggedIn,
  userControllers.forgotPasswordRender
);

router.get(
  "/forgotpassword/:email",
  checkIfUserIsLoggedIn,
  userControllers.forgotPassword
);

router.post("/passwordreset", userControllers.passwordReset);

router.get("/passwordreset/:token", userControllers.passwordResetRender);

module.exports = router;
