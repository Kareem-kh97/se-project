const getCards = Array.from(document.getElementsByClassName("card"));
getCards.forEach((element) => {
  element.addEventListener("click", () => {
    const id = element.getAttribute("data-id");
    window.location.href = `/movie/${id}`;
  });
});
