require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Actors = require("../models/Actors");
const ActorsMovies = require("../models/ActorsMovies");

const decodeTokenAndGetUserFromDb = async (token) => {
  const decodedToken = await decodeToken(token);
  let [user] = await User.getUserById(decodedToken.id);
  user = user[0];
  return user;
};

const decodeToken = async (token) => {
  const decodedToken = await jwt.verify(token, process.env.SECRET);
  return decodedToken;
};

const renderCreateActorPage = async (req, res) => {
  const user = await decodeTokenAndGetUserFromDb(req.cookies.jwt);

  if (!user.isEditor) {
    return res.render("403");
  }
  res.render("addactor");
};

const createNewActor = async (req, res) => {
  const newActorData = req.body;

  await Actors.addActor(Object.keys(newActorData), Object.values(newActorData));

  res.json({ status: "Done" });
};

const renderActorDatabasePage = async (req, res) => {
  res.render("actordatabase");
};

const searchForActor = async (req, res) => {
  const actorName = req.params.actorname;

  const [actors] = await Actors.getActorByNameWithPattern(actorName);

  res.render("actordatabase", { actors });
};

const renderActorDetails = async (req, res) => {
  const actorId = req.params.id;

  const [actorDetails] = await Actors.getActorById(actorId);
  const user = await decodeTokenAndGetUserFromDb(req.cookies.jwt);

  res.render("actordetails", { actorDetails, isEditor: user.isEditor });
};

const deleteActorById = async (req, res) => {
  const actorId = req.params.id;

  await ActorsMovies.deleteMoviesAndActors("actor_id", actorId);
  await Actors.deleteActorById(actorId);

  res.json({ message: "Actor successfuly deleted" });
};

const editActorById = async (req, res) => {
  const actorId = req.params.id;
  const newData = req.body;

  try {
    await Actors.updateActorById(
      Object.keys(newData),
      Object.values(newData),
      actorId
    );
    res.json({ message: "Successfuly updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renderCreateActorPage,
  createNewActor,
  renderActorDatabasePage,
  searchForActor,
  renderActorDetails,
  deleteActorById,
  editActorById,
};
