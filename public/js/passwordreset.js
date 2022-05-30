const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const passwordRepeat = document.getElementById("passwordRepeat").value;
  const token = document.getElementById("token").textContent.trim();

  if (password !== passwordRepeat) {
    error.textContent = "Passwords do not match!";
  } else {
    let response = await fetch("/passwordreset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });
    response = await response.json();
    if (response.message == "Success") {
      window.location.href = "/login";
    }
  }
});
