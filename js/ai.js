/* ==================================================
   AI CAROUSEL
================================================== */

const slides = document.querySelectorAll(".ai-slide");
const dots = document.querySelectorAll(".ai-dot");

const prevButton = document.querySelector("#aiPrev");
const nextButton = document.querySelector("#aiNext");

let currentSlide = 0;

/* ==================================================
   SHOW SLIDE
================================================== */

function showSlide(index) {
  /* Fjern active fra alle slides */

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  /* Fjern active fra alle dots */

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  /* Sæt den valgte slide */

  slides[index].classList.add("active");

  dots[index].classList.add("active");

  currentSlide = index;
}

/* ==================================================
   NEXT
================================================== */

function nextSlide() {
  currentSlide++;

  /*
   * Hvis vi går forbi sidste slide,
   * starter vi forfra på første.
   */

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

/* ==================================================
   PREVIOUS
================================================== */

function previousSlide() {
  currentSlide--;

  /*
   * Hvis vi går før første slide,
   * går vi til sidste.
   */

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

/* ==================================================
   BUTTONS
================================================== */

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);

/* ==================================================
   DOT NAVIGATION
================================================== */

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

/* ==================================================
   INITIAL SLIDE
================================================== */

showSlide(0);
