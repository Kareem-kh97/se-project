const searchButton = document.getElementById("search-button");
const actorContainer = Array.from(document.getElementsByClassName("card"));

actorContainer.forEach((card) => {
  card.addEventListener("click", () => {
    const actorId = card.getAttribute("data-id");
    window.location.href = "/actor/" + actorId;
  });
});

searchButton.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    const searchInput = document.getElementById("search-bar").value;

    if (searchInput) {
      window.location.href = "/actordb/" + searchInput;
    }
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const searchInput = document.getElementById("search-bar").value;

  if (searchInput) {
    window.location.href = "/actordb/" + searchInput;
  }
});
