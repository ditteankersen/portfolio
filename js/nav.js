document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");

  if (!navContainer) return;

  /* =========================================
       FIND DEN RIGTIGE STI TIL NAV.HTML
    ========================================== */

  const isProjectPage = window.location.pathname.includes("/projects/");

  const navPath = isProjectPage
    ? "../../components/nav.html"
    : "../components/nav.html";

  /* =========================================
       HENT NAVIGATION
    ========================================== */

  fetch(navPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Kunne ikke hente navigationen: ${response.status}`);
      }

      return response.text();
    })

    .then((html) => {
      navContainer.innerHTML = html;

      /* =========================================
               RET LINKS PÅ PROJEKTSIDER
            ========================================== */

      if (isProjectPage) {
        const logoLink = navContainer.querySelector(".logo-link");

        const navLinks = navContainer.querySelectorAll(".nav-links a");

        /* Logo */

        if (logoLink) {
          logoLink.href = "../index.html";
        }

        /* OM MIG */

        if (navLinks[0]) {
          navLinks[0].href = "../about.html";
        }

        /* PROJEKTER */

        if (navLinks[1]) {
          navLinks[1].href = "../index.html#projects";
        }

        /* BRUG AF AI */

        if (navLinks[2]) {
          navLinks[2].href = "../ai.html";
        }
      }

      /* =========================================
               FORTÆL RESTEN AF SIDEN,
               AT NAVIGATIONEN ER LOADED
            ========================================== */

      document.dispatchEvent(new CustomEvent("navigationLoaded"));
    })

    .catch((error) => {
      console.error("Fejl ved indlæsning af navigation:", error);
    });
});
