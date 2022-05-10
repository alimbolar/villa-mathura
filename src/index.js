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

let slides = slider.querySelectorAll("figure");

let currSlide = 0;
const maxSlides = slides.length - 1;

const goToSlide = (currSlide = 0) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translatex(${(index - currSlide) * 100}%)`;
  });
};

const nextSlide = () => {
  if (currSlide >= maxSlides) {
    currSlide = 0;
  } else {
    currSlide++;
  }
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

leftArrow.addEventListener("click", previousSlide);

const rightArrow = document.querySelector(".arrow.right");

rightArrow.addEventListener("click", nextSlide);

goToSlide();

// CONTINOUS SLIDE EXPERIMENT

let count = -((1 / slides.length) * 2); // setting to stop the animation at the first image
const maxAnimates = 2;

const animateSlide = () => {
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

// SEND MESSAGE

const form = document.querySelector("#message");
console.log(form);

// form.submit();

const messageHeadline = document.querySelector(".messageHeadline");
const contactUsContent = document.querySelector(".contact-us__content");

function submitMessage(event) {
  event.preventDefault();

  const formData = new FormData(form);

  formData.append("recipient", "alimbolar@gmail.com");
  formData.append("subject", "Message from website submission");

  const message = Object.fromEntries(formData);

  console.log(message);

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };

  const url = "https://alimbolar.cyclic.app/api/v1/mails/sendContactUsMessage";

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.status, data.message);
      if (data.status == "success") {
        this.style.opacity = 0;
        contactUsContent.style.opacity = 0;
        messageHeadline.textContent = data.message;
      }
    });
}

form.addEventListener("submit", submitMessage);
