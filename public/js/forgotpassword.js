const emailField = document.getElementById("email");
const form = document.getElementById("form");
const errorField = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorField.textContent = "";

  const userEmail = emailField.value;

  let respone = await fetch("/forgotpassword/" + userEmail, {
    method: "GET",
  });

  response = await respone.json();

  errorField.textContent = response.message;

  console.log(response.message);
});
