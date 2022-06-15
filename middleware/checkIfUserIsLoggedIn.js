const jwt = require("jsonwebtoken");

const checkIfUserIsLoggedIn = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        res.redirect("/");
      }
    });
  } else {
    next();
  }
};

module.exports = checkIfUserIsLoggedIn;
