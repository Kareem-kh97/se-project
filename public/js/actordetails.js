const deleteButton = document.getElementById("delete-button");
const openEditModal = document.getElementById("open-edit-modal");
const editButton = document.getElementById("edit-button");
const actorId = document
  .getElementById("actor-name")
  .getAttribute("data-actor-id");

if (deleteButton) {
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();

    let deleteRequestResult = await fetch("/actor/" + actorId, {
      method: "DELETE",
    });
    deleteRequestResult = await deleteRequestResult.json();

    if ((deleteRequestResult.message = "Actor successfuly deleted"))
      window.location.href = "/";
  });
}

if (openEditModal) {
  openEditModal.addEventListener("click", (e) => {
    e.preventDefault();

    const actorName = document.getElementById("actor-name").textContent.trim();
    const actorAbout = document
      .getElementById("actor-about")
      .textContent.trim();
    const actorPlaceOfBirth = document
      .getElementById("actor-place-of-birth")
      .textContent.trim();

    document.getElementById("actor-name-edit").value = actorName;
    document.getElementById("actor-about-edit").textContent = actorAbout;
    document.getElementById("actor-place-of-birth-edit").value =
      actorPlaceOfBirth;
  });
}

if (editButton) {
  editButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const newActorName = document.getElementById("actor-name-edit").value;
    const newActorDateOfBirth = document.getElementById(
      "actor-birth-year-edit"
    ).value;
    const newActorAbout = document.getElementById("actor-about-edit").value;
    const newActorPlaceOfBirth = document.getElementById(
      "actor-place-of-birth-edit"
    ).value;

    const editedMovieFields = {
      fullname: newActorName,
      dateOfBirth: newActorDateOfBirth,
      about: newActorAbout,
      placeOfBirth: newActorPlaceOfBirth,
    };

    console.log(editedMovieFields);

    let updateRequestResult = await fetch(`/actor/` + actorId, {
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
