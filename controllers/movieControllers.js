const Movies = require("../models/Movies");

const movie_get = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

module.exports = {
  movie_get,
};
