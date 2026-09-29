document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");

  if (!navContainer) return;

  /* =========================================
       FIND UD AF HVOR SIDEN LIGGER
    ========================================== */

  const isProjectPage = window.location.pathname.includes("/projects/");

  /* =========================================
       FIND DEN RIGTIGE STI TIL NAV.HTML
    ========================================== */

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
               FIND NAVIGATIONENS ELEMENTER
            ========================================== */

      const logoLink = navContainer.querySelector(".logo-link");

      const logo = navContainer.querySelector(".logo");

      const aboutLink = navContainer.querySelector(".nav-about");

      const projectsLink = navContainer.querySelector(".nav-projects");

      const aiLink = navContainer.querySelector(".nav-ai");

      /* =========================================
               NORMALE SIDER
               
               index.html
               about.html
               ai.html
            ========================================== */

      if (!isProjectPage) {
        if (logoLink) {
          logoLink.href = "index.html";
        }

        if (logo) {
          logo.src = "../images/logo.svg";
        }

        if (aboutLink) {
          aboutLink.href = "about.html";
        }

        if (projectsLink) {
          projectsLink.href = "index.html#projects";
        }

        if (aiLink) {
          aiLink.href = "ai.html";
        }
      }

      /* =========================================
               PROJEKTSIDER
               
               projects/lumina.html
               projects/north.html
               projects/reset.html
            ========================================== */

      if (isProjectPage) {
        if (logoLink) {
          logoLink.href = "../index.html";
        }

        if (logo) {
          logo.src = "../../images/logo.svg";
        }

        if (aboutLink) {
          aboutLink.href = "../about.html";
        }

        if (projectsLink) {
          projectsLink.href = "../index.html#projects";
        }

        if (aiLink) {
          aiLink.href = "../ai.html";
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
