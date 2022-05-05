const bookmarkButton = document.getElementById("bookmark-button");
const movie_id = document
  .getElementById("movie-title")
  .getAttribute("data-movie-id");

bookmarkButton.addEventListener("click", async () => {
  bookmarkButton.setAttribute("disabled", true);

  const bookmarkData = {
    movie_id: Number(movie_id),
  };

  let movieResponse = await fetch("/bookmarkmovie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmarkData),
  });

  movieResponse = await movieResponse.json();

  console.log(movieResponse);
});
