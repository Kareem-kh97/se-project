const select = document.getElementById("actors-select");
const submitButton = document.getElementById("submit-button");

//Inputs
const movieTitleInput = document.getElementById("title");
const movieDescInput = document.getElementById("description");
const movieReviewInput = document.getElementById("review");
const movieRatingInput = document.getElementById("rating");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const newMovieData = {
    title: movieTitleInput.value,
    description: movieDescInput.value,
    review: movieReviewInput.value,
    rating: Math.round(movieRatingInput.value * 10) / 10,
  };

  const movieResponse = await fetch("/addmovie", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovieData),
  });

  //ID of the last inserted movie row
  let movieId = await movieResponse.json();
  movieId = movieId.insertedMovieId;

  //Grab id's of the selected actors
  let selected = [];
  for (const option of select) {
    if (option.selected) {
      selected.push(option.getAttribute("data-id"));
    }
  }

  const newActorsMoviesData = {
    movie_id: movieId,
    actor_id: selected,
  };

  const actorsMoviesResponse = await fetch("/addmoviesactors", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newActorsMoviesData),
  });

  let successStatus = await actorsMoviesResponse.json();

  if (successStatus) {
    window.location.href = "/";
  }
});
