import "./css/main.scss";

const menu = document.querySelector(".menu");
const navWrapper = document.querySelector(".nav__wrapper");

const toggleNav = function () {
  navWrapper.classList.toggle("hidden");
  menu.classList.toggle("toggled");
};

navWrapper.addEventListener("click", toggleNav);
menu.addEventListener("click", toggleNav);

// SLIDER

let slider = document.querySelector(".slider");

console.log(slider);
let slides = slider.querySelectorAll("figure");

let currSlide = 0;
const maxSlides = slides.length - 1;

const goToSlide = (currSlide = 0) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translatex(${(index - currSlide) * 100}%)`;
  });
};

goToSlide();

const nextSlide = () => {
  if (currSlide >= maxSlides) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  console.log("next");
  goToSlide(currSlide);
};

const previousSlide = () => {
  if (currSlide === 0) {
    currSlide = maxSlides;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};

const leftArrow = document.querySelector(".arrow.left");

leftArrow.addEventListener("click", nextSlide);

const rightArrow = document.querySelector(".arrow.right");

rightArrow.addEventListener("click", previousSlide);

// CONTINOUS SLIDE EXPERIMENT

let count = 0;
const maxAnimates = 3;

const animateSlide = () => {
  // continueSlide();
  nextSlide();

  if (count <= maxAnimates) {
    setTimeout(animateSlide, 2000);
    count = count + 1 / slides.length;
  }
};

animateSlide();

// Animating visibility

const services = document.querySelectorAll(".service");
const amenities = document.querySelectorAll(".amenity");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
    rootMargin: "-10% 0%",
  }
);

services.forEach((service, index) => {
  // console.log(index);
  observer.observe(service);
});

amenities.forEach((amenity, index) => {
  // console.log(index);
  observer.observe(amenity);
});
