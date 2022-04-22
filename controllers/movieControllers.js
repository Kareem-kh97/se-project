require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Movies = require("../models/Movies");
const ActorsMovies = require("../models/ActorsMovies");

const decodeToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET);
  return decoded;
};

const movie_get = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

const movie_by_id_get = async (req, res) => {
  const id = req.params.id;
  const [movieAndActors] = await ActorsMovies.getMoviesAndActors(id);
  res.render("moviedetails", { movieAndActors });
};

const add_review_get = async (req, res) => {
  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);

  if (!user[0].isEditor) {
    res.render("403");
  }

  res.render("addmoviereview");
};

module.exports = {
  movie_get,
  movie_by_id_get,
  add_review_get,
};
