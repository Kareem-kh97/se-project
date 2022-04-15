const User = require("../models/User");
const bcrypt = require("bcrypt");

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

const register_get = (req, res) => {
  res.render("register");
};

const register_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const error = registerFormValidation(username, email, password);

    if (error) {
      return res.json({ error });
    }

    const hashedPassword = await hashPassword(password);

    const data = await User.addNewUser(
      ["username", "email", "password"],
      [username, email, hashedPassword]
    );
    res.json({ userId: data[0].insertId });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register_get,
  register_post,
};
