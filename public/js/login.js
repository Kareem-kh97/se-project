const form = document.getElementById("form");
const emailErrorField = document.getElementById("email-error");
const passwordErrorField = document.getElementById("password-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  passwordErrorField.textContent = "";
  emailErrorField.textContent = "";

  const data = {
    email: form.email.value,
    password: form.password.value,
  };

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const fetchedData = await response.json();

  //Check if fetchedData contains any errors and displays them
  if (fetchedData.error) {
    const { error } = fetchedData;
    if (error.includes("The given email is not registered"))
      emailErrorField.textContent = error;
    if (error.includes("Invalid password"))
      passwordErrorField.textContent = error;
  }

  if (fetchedData.message) {
    window.location.href = "/";
  }
});
