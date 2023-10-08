const overlay = document.querySelector(".overlay");
const hamburger = document.querySelector(".hamburger");
const body = document.body;

const links = document.querySelectorAll('.overlay .menu__link');

links.forEach((element) => {
  element.addEventListener("click",  toggleMenu);
})

function toggleMenu(element) {
  element.preventDefault();
  overlay.classList.toggle("overlay--active");
  hamburger.classList.toggle("hamburger--active");
  hamburger.classList.toggle("body--active-menu");
}

hamburger.addEventListener("click",  toggleMenu);