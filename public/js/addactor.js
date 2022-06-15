const form = document.getElementById("form");

//Input elements
const actorName = document.getElementById("actor-fullname");
const actorAbout = document.getElementById("actor-about");
const actorDob = document.getElementById("actor-dob");
const actorPlaceOfBirth = document.getElementById("actor-place-of-birth");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newActorData = {
    fullname: actorName.value,
    about: actorAbout.value,
    dateOfBirth: actorDob.value,
    placeOfBirth: actorPlaceOfBirth.value,
  };

  let response = await fetch("/addactor", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newActorData),
  });

  response = await response.json();

  console.log(response);
});
