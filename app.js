const express = require("express");
const app = express();

//Start server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//Setup ejs as our templating language
app.set("view engine", "ejs");

//landing page route
app.get("/", (req, res) => {
  res.render("index");
});
