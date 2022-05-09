require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Movies = require("../models/Movies");
const Actors = require("../models/Actors");
const ActorsMovies = require("../models/ActorsMovies");
const UsersBookmarkedMovies = require("../models/UsersBookmarkedMovies");

const decodeToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET);
  return decoded;
};

const displayHomepage = async (req, res) => {
  const [movies] = await Movies.getMovies();
  res.render("movies", { movies });
};

const displayMovieById = async (req, res, next) => {
  const movie_id = req.params.id;
  let [movieAndActors] = await ActorsMovies.getMoviesAndActors(movie_id);

  if (movieAndActors.length == 0) {
    [movieAndActors] = await Movies.getMovieById(movie_id);
  }
  if (movieAndActors.length == 0) return next("Given movie id doesn't exist");

  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);
  const user_id = user[0].id;
  const isUserEditor = user[0].isEditor;

  let [userBookmarks] = await UsersBookmarkedMovies.checkIfMovieIsBookmarked(
    user_id,
    movie_id
  );

  userBookmarks = userBookmarks.length == 0 ? true : false;

  res.render("moviedetails", { movieAndActors, userBookmarks, isUserEditor });
};

const showReviewPage = async (req, res) => {
  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);

  if (!user[0].isEditor) {
    res.render("403");
  }

  const [actors] = await Actors.getActors();

  res.render("addmoviereview", { actors });
};

const addNewMovieReview = async (req, res) => {
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
const fillMovieActorAssociativeTable = async (req, res) => {
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

  await UsersBookmarkedMovies.addMovieToBookmakrs(user_id, movie_id);
  //return res.json({ message: "success" });
};

const bookmarkedMoviesGet = async (req, res) => {
  const decodedToken = await decodeToken(req.cookies.jwt);
  const [user] = await User.getById(decodedToken.id);
  const user_id = user[0].id;

  const [movies] = await UsersBookmarkedMovies.getBookmarkedMoviesByUserId(
    user_id
  );

  res.render("bookmarks", { movies });
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

const updateMovieFieldsById = async (req, res) => {
  const movieId = req.params.id;
  const updatedMovieObject = req.body;

  const columnNames = Object.keys(updatedMovieObject);
  const values = Object.values(updatedMovieObject);

  await Movies.updateMovieById(columnNames, values, movieId);

  res.json({ message: "Successfuly updated" });
};

const movieByIdDelete = async (req, res) => {
  const movieId = req.params.id;

  //Remove prior constraints from child tables first
  await ActorsMovies.deleteMoviesAndActors("movie_id", movieId);
  await UsersBookmarkedMovies.deleteMovieFromBookmarks(movieId);
  await Movies.deleteMovieById(movieId);

  res.json({ message: "Successfuly deleted the movie" });
};

module.exports = {
  displayHomepage,
  displayMovieById,
  showReviewPage,
  addNewMovieReview,
  fillMovieActorAssociativeTable,
  bookmarkMoviePost,
  bookmarkedMoviesGet,
  movieDbGet,
  updateMovieFieldsById,
  movieByIdDelete,
};
