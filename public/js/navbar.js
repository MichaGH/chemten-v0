const navbarToggleButton = document.getElementById("navbar-toggle-btn");
const navbarItemsContainer = document.getElementById("navbar-items");

let isOpen = false;


navbarToggleButton.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    navbarItemsContainer.classList.remove("max-h-0");
    navbarItemsContainer.classList.add("max-h-[500px]");
  } else {
    navbarItemsContainer.classList.remove("max-h-[500px]");
    navbarItemsContainer.classList.add("max-h-0");
  }
});