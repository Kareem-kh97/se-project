const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//Import routes
const userRoutes = require("./routes/userRoutes");

//Setup ejs as our templating language
app.set("view engine", "ejs");

//Start server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//Allow client access to public folder
app.use(express.static(__dirname));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Let the landing page be register page for now
app.get("/", (req, res) => {
  res.render("register");
});

//Include routes
app.use(userRoutes);

//Handles invalid routes
app.use((req, res) => {
  res.render("404");
});

//Handles errors edit later
app.use((error, req, res, next) => {
  console.log(error);
});
