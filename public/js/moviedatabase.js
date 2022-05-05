const movieSearchResult = document.getElementById("movie-search-result");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const cards = Array.from(document.getElementsByClassName("card"));

if (cards.length !== 0) {
  const getCards = Array.from(document.getElementsByClassName("card"));
  getCards.forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.getAttribute("data-id");
      window.location.href = `/movie/${id}`;
    });
  });
}
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const inputText = searchBar.value.trim();

  if (inputText) {
    window.location = "/moviedb?movietitle=" + inputText;
  }
});
