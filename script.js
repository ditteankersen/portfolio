document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

/* ==================================================
   SCROLL REVEAL
================================================== */

const revealSections = document.querySelectorAll(
    ".about-intro, .projects"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
        });

    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealSections.forEach((section) => {
    revealObserver.observe(section);
});