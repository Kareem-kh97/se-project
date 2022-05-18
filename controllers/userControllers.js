const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      domain: ".herokuapp.com",
      secure: true,
      httpOnly: true,
      sameSite: "none",
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

const bookmark_post = async (req, res) => {
  //Continue here
  const movie_id = req.params.id;
};

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,
  bookmark_post,
};
