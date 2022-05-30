const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const emailSender = require("../config/emailsender");
require("dotenv").config();

const registerFormValidation = (username, email, password) => {
  let errors = {};
  if (username.length < 3) errors.usernameError = "Username is too short";
  if (password.length < 5) errors.passwordError = "Password is too short";
  return Object.keys(errors).length === 0 ? undefined : errors;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const checkIfUserExists = async (username, email) => {
  let errors = {};
  const [getUserByEmail] = await User.getUserByEmail(email);
  const [getUserByUsername] = await User.getUserByUsername(username);
  if (getUserByEmail.length !== 0)
    errors.emailExistsError = "This email is already registered";
  if (getUserByUsername.length !== 0)
    errors.usernameExistsError = "This username is already taken";
  return Object.keys(errors).length === 0 ? undefined : errors;
};

const checkUserLoginCredentials = async (email, password) => {
  const [dbUser] = await User.getUserByEmail(email);
  if (dbUser.length == 0) return { error: "The given email is not registered" };

  const comparePasswords = await bcrypt.compare(password, dbUser[0].password);
  if (!comparePasswords) return { error: "Invalid password" };

  return dbUser[0];
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

//Routes
const register_get = (req, res) => {
  res.render("register");
};

const register_post = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //Check form values

    const error = registerFormValidation(username, email, password);
    if (error) return res.json({ error });

    //Check if user is unique
    const userExists = await checkIfUserExists(username, email);
    if (userExists) return res.json({ error: { ...userExists } });

    const hashedPassword = await hashPassword(password);

    const data = await User.addNewUser(
      ["username", "email", "password"],
      [username, email, hashedPassword]
    );

    res.json({ userId: data[0].insertId });
  } catch (error) {
    next(error);
  }
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const verifyLogin = await checkUserLoginCredentials(email, password);

    if (verifyLogin.error) return res.json({ error: verifyLogin.error });

    //Just renaming the variable name so the below code makes sense
    const dbUser = verifyLogin;

    const jwtToken = createJwtToken(dbUser.id);
    res.cookie("jwt", jwtToken, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.render("login");
};

const forgotPasswordRender = (req, res) => {
  res.render("forgotpassword");
};

const forgotPassword = async (req, res) => {
  const email = req.params.email;
  const [user] = await User.getUserByEmail(email);
  if (user.length === 0) {
    return res.json({ message: "No user found" });
  }

  const passwordResetToken = randomString.generate(10);
  //mysql unixtime
  const timestamp = Date.now() / 1000;

  await User.addPasswordResetToken(passwordResetToken, timestamp, user[0].id);

  //Send reset link dynamically either in test environment or in production
  const url = req.get("host");

  emailSender(user[0].email, passwordResetToken, url);

  res.json({ message: "Email has been sent!" });
};

const passwordResetRender = async (req, res) => {
  const token = req.params.token;

  const [user] = await User.getUserByPasswordResetToken(token);

  if (user.length == 0) {
    return res.render("404");
  }
  const currentUnixTime = Date.now() / 1000;

  const timeDifference = currentUnixTime - user[0].tokenCreatedAt;

  if (timeDifference >= 900) {
    return res.render("tokenexpired");
  }

  res.render("passwordreset", { token: user[0].passwordToken });
};

const passwordReset = async (req, res) => {
  const { password, token } = req.body;

  const hashedPassword = await hashPassword(password);
  await User.changeUserPassword(hashedPassword, token);
  await User.setTokenDataToNull(token);

  res.json({ message: "Success" });
};

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,
  forgotPasswordRender,
  forgotPassword,
  passwordResetRender,
  passwordReset,
};
