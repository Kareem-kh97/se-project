const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

//Import routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

//Setup ejs as our templating language
app.set("view engine", "ejs");
app.set("trust proxy", 1);

//Start server
app.listen(PORT || 3000, () => {
  console.log("Listening on port 3000");
});

//Allow client access to public folder
app.use(express.static(__dirname));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://se-project-burch.herokuapp.com",
    credentials: true,
  })
);

//Include routes
app.use(userRoutes);
app.use(movieRoutes);

//Handles invalid routes
app.use((req, res) => {
  res.render("404");
});

app.use((error, req, res, next) => {
  console.log(error);
  res.render("404");
});
