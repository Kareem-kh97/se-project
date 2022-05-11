const cards = Array.from(document.getElementsByClassName("card"));

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const movieId = card.getAttribute("data-id");
    location.href = "/movie/" + movieId;
  });
});
