const deleteButton = document.getElementById("delete-button");
const editButton = document.getElementById("edit-button");
const bookmarkButton = document.getElementById("bookmark-button");
const movie_id = document
  .getElementById("movie-title")
  .getAttribute("data-movie-id");

//Update logic
if (editButton) {
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

//Delete logic
if (deleteButton) {
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    let deleteRequestResult = await fetch("/movie/" + movie_id, {
      method: "DELETE",
    });
    deleteRequestResult = await deleteRequestResult.json();

    if ((deleteRequestResult.message = "Successfuly deleted the movie"))
      window.location.href = "/";
  });
}

//Bookmarking logic
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
