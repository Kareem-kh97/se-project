const User = require("../models/User");

const registerFormValidation = (username, email, password) => {
  const errors = {};
  if (username.length < 3) errors.usernameError = "Username is too short";
  if (password.length < 5) errors.passwordError = "Password is too short";
  return errors;
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

    const data = await User.addNewUser(
      ["username", "email", "password"],
      [username, email, password]
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
