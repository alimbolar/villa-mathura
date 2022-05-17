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
const maxAnimates = 4;

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

const form = document.querySelector("#form");
const formButton = form.querySelector("button");

// form.submit();

const messageHeadline = document.querySelector(".messageHeadline");
const contactUsContent = document.querySelector(".contact-us__content");

formButton.addEventListener("transitionend", () => {
  formButton.classList.remove("clicked");
});

function submitMessage(event) {
  event.preventDefault();

  formButton.classList.add("clicked");

  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const mobile = form.querySelector('input[name="mobile"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // VALIDATION
  const nameIsValid = /[a-zA-Z]+/g.test(name);
  const messageIsValid = /[a-zA-Z]+/g.test(message);
  const emailIsValid =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const mobileIsValid = /\d{10}/.test(mobile);

  // CREATE MESSAGE STATUS OBJECT
  const messageStatus = {
    name: nameIsValid,
    email: emailIsValid,
    mobile: mobileIsValid,
    message: messageIsValid,
  };

  console.log(messageStatus);

  const errors = Object.entries(messageStatus)
    .map(([key, value]) => {
      if (!value) {
        return key;
      }
    })
    .filter((x) => x !== undefined);

  if (errors.length) {
    let errorString = "";

    errors.forEach((error, index) => {
      index !== error.length - 1
        ? (errorString += error + ",")
        : (errorString += error);
    });

    const alertMessage = `Form inputs have error in fields : ${errorString}`;
    alert(alertMessage);
    return;
  }

  const formData = new FormData(form);

  formData.append("recipient", "piladanaimade@gmail.com");
  formData.append("subject", "Message from website submission");

  const messageData = Object.fromEntries(formData);

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  };

  // const url = "https://alimbolar.cyclic.app/api/v1/mails/sendContactUsMessage";
  const url = ".netlify/functions/sendMail";

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status == "success") {
        this.style.opacity = 0;
        contactUsContent.style.opacity = 0;
        messageHeadline.textContent = data.data;
        messageHeadline.setAttribute("style", "white-space:pre;");
      }
    });
}

form.addEventListener("submit", submitMessage);
