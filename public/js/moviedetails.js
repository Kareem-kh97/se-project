const deleteButton = document.getElementById("delete-button");
const editButton = document.getElementById("edit-button");
const bookmarkButton = document.getElementById("bookmark-button");
const openEditModal = document.getElementById("open-edit-modal");
const movie_id = document
  .getElementById("movie-title")
  .getAttribute("data-movie-id");

//Update logic
if (openEditModal) {
  openEditModal.addEventListener("click", (e) => {
    e.preventDefault();

    const movieTitle = document
      .getElementById("movie-title")
      .textContent.trim();
    const movieDescription = document
      .getElementById("movie-description")
      .textContent.trim();
    const movieReview = document
      .getElementById("movie-review")
      .textContent.trim();

    document.getElementById("title-edit").value = movieTitle;
    document.getElementById("description-edit").textContent = movieDescription;
    document.getElementById("review-edit").textContent = movieReview;
  });

  editButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const newTitle = document.getElementById("title-edit").value;
    const newDescription = document.getElementById("description-edit").value;
    const newReview = document.getElementById("review-edit").value;

    const editedMovieFields = {
      title: newTitle,
      description: newDescription,
      review: newReview,
    };

    console.log(editedMovieFields);

    let updateRequestResult = await fetch(`/movie/` + movie_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMovieFields),
    });

    updateRequestResult = await updateRequestResult.json();

    if (updateRequestResult.message == "Successfuly updated") location.reload();
  });
}

//Delete logic
if (deleteButton) {
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log(movie_id);

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
});
