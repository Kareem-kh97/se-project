const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkIfUserIsLoggedIn = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  console.log(jwtToken);

  if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        res.redirect("/index");
      }
    });
  } else {
    next();
  }
};

module.exports = {
  authenticateUser,
  checkIfUserIsLoggedIn,
};
