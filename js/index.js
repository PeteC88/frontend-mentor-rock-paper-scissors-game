let paperNode = document.querySelector(".app__paper");
let appContainer = document.querySelector(".app__container")

paperNode.addEventListener("click", () => {
    appContainer.classList.add("app__flip--active");
})