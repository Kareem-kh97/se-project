const Movies = require("../models/Movies");
const ActorsMovies = require("../models/ActorsMovies");

const movie_get = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

const movie_by_id_get = async (req, res) => {
  const id = req.params.id;
  const [movieAndActors] = await ActorsMovies.getMoviesAndActors(id);
  res.render("moviedetails", { movieAndActors });
};

module.exports = {
  movie_get,
  movie_by_id_get,
};
