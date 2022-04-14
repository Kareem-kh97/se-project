const User = require("../models/User");

const registerFormValidation = (username, email, password) => {
  if (username.length < 3) return "username is too short";
};

const register_get = (req, res) => {
  res.render("register");
};

const register_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const error = registerFormValidation(username, email, password);

    if (error) {
      res.json({ error });
    } else {
      const data = await User.addNewUser(
        ["username", "email", "password"],
        [username, email, password]
      );
      res.status(201).json({ userId: data[0].insertId });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register_get,
  register_post,
};
