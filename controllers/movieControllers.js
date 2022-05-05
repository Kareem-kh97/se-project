require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Movies = require("../models/Movies");
const Actors = require("../models/Actors");
const ActorsMovies = require("../models/ActorsMovies");
const UserBookmarkedMovies = require("../models/UsersBookmarkedMovies");

const decodeToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET);
  return decoded;
};

const movie_get = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

const movie_by_id_get = async (req, res, next) => {
  const movie_id = req.params.id;
  const [movieAndActors] = await ActorsMovies.getMoviesAndActors(movie_id);
  if (movieAndActors.length == 0) return next("Given movie id doesn't exist");

  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);
  const user_id = user[0].id;

  let [userBookmarks] = await UserBookmarkedMovies.checkIfMovieIsBookmarked(
    user_id,
    movie_id
  );

  userBookmarks = userBookmarks.length == 0 ? true : false;

  res.render("moviedetails", { movieAndActors, userBookmarks });
};

const add_review_get = async (req, res) => {
  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);

  if (!user[0].isEditor) {
    res.render("403");
  }

  const [actors] = await Actors.getActors();

  res.render("addmoviereview", { actors });
};

const add_movie_post = async (req, res) => {
  const data = req.body;

  const [returnData] = await Movies.addMovie(
    Object.keys(data),
    Object.values(data)
  );

  //Id of the last inserted movie
  const insertedMovieId = returnData.insertId;

  res.json({ insertedMovieId });
};

//Fill out intermediary table between actors and movies
const add_movies_actors_post = async (req, res) => {
  const { movie_id, actor_id } = req.body;

  //Remove double space
  const trimmedActorIds = actor_id.map((value) => Number(value.trim()));

  for (const id of trimmedActorIds) {
    await ActorsMovies.insertMoviesAndActors(movie_id, id);
  }

  res.json({ message: "Done" });
};

const bookmarkMoviePost = async (req, res) => {
  const decodedToken = await decodeToken(req.cookies.jwt);
  let [user] = await User.getById(decodedToken.id);
  const user_id = user[0].id;

  const { movie_id } = req.body;

  await UserBookmarkedMovies.addMovieToBookmakrs(user_id, movie_id);
  //return res.json({ message: "success" });
};

const movieDbGet = async (req, res) => {
  const movieTitle = req.query.movietitle;

  if (movieTitle) {
    const [movies] = await Movies.getMovieByTitleWithPattern(movieTitle);
    return res.render("moviedatabase", { movies });
  } else {
    res.render("moviedatabase");
  }
};

module.exports = {
  movie_get,
  movie_by_id_get,
  add_review_get,
  add_movie_post,
  add_movies_actors_post,
  bookmarkMoviePost,
  movieDbGet,
};
