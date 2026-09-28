document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

const revealSections = document.querySelectorAll(".about-intro, .projects");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealSections.forEach((section) => {
  revealObserver.observe(section);
});

/* Nulstil animationerne når man er helt tilbage på toppen */
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY <= 10) {
          revealSections.forEach((section) => {
            section.classList.remove("is-visible");
          });
        }

        ticking = false;
      });

      ticking = true;
    }
  },
  { passive: true },
);

/*ACCORDION*/

const skillHeaders = document.querySelectorAll(".skill-header");

skillHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const isOpen = header.getAttribute("aria-expanded") === "true";

    skillHeaders.forEach((otherHeader) => {
      otherHeader.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      header.setAttribute("aria-expanded", "true");
    }
  });
});

/*Quotes*/

const quotes = [
  {
    text: "I pressede situationer er Ditte løsningsorienteret. Hun tager én ting ad gangen og arbejder gerne ekstra for at lette presset.",
    author: "Citat: Lærke Lønne, studiekammerat",
  },

  {
    text: "Ditte er stædig og en go-getter, hun ved hvad hun vil og går hårdt efter det. Hun er samtidig et skønt menneske, både i sin humoristiske sans, men også når man har brug for en god samtale.",
    author: "Citat: Mille Ankersen, søster",
  },

  {
    text: "Ditte is very easygoing. We had a great experience with her when she worked for us.",
    author: "Citat: Ryan Kroft, tidligere værtsforælder",
  },
];

let currentQuote = 0;

const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");

const previousButton = document.querySelector(".quote-prev");
const nextButton = document.querySelector(".quote-next");

function showQuote(index) {
  quoteText.textContent = quotes[index].text;

  quoteAuthor.textContent = quotes[index].author;
}

previousButton.addEventListener("click", () => {
  currentQuote--;

  if (currentQuote < 0) {
    currentQuote = quotes.length - 1;
  }

  showQuote(currentQuote);
});

nextButton.addEventListener("click", () => {
  currentQuote++;

  if (currentQuote >= quotes.length) {
    currentQuote = 0;
  }

  showQuote(currentQuote);
});