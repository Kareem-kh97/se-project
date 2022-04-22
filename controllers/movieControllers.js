const Movies = require("../models/Movies");

const movie_get = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

const movie_by_id_get = async (req, res) => {
  const id = req.params.id;
  const [movie] = await Movies.getById(id);
  res.render("moviedetails", { movie: movie[0] });
};

module.exports = {
  movie_get,
  movie_by_id_get,
};
