const form = document.getElementById("form");
const usernameErrorField = document.getElementById("username-error");
const emailErrorField = document.getElementById("email-error");
const passwordErrorField = document.getElementById("password-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  usernameErrorField.textContent = "";
  passwordErrorField.textContent = "";
  emailErrorField.textContent = "";

  const data = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  const response = await fetch("/register", {
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
    if ("usernameError" in error) {
      usernameErrorField.textContent = error.usernameError;
    }
    if ("passwordError" in error) {
      passwordErrorField.textContent = error.passwordError;
    }
    if ("emailExistsError" in error) {
      emailErrorField.textContent = error.emailExistsError;
    }
    if ("usernameExistsError" in error) {
      usernameErrorField.textContent = error.usernameExistsError;
    }
  }

  //Do something with the newly added users id (add later)
  if (fetchedData.userId) {
    window.location.href = "/login";
  }
});
