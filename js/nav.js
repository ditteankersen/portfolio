document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");

  if (!navContainer) return;

  fetch("components/nav.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Kunne ikke hente navigationen: ${response.status}`);
      }

      return response.text();
    })
    .then((html) => {
      // Indsæt navigationen på siden
      navContainer.innerHTML = html;

      // Find navigationens links
      const logoLink = navContainer.querySelector(".logo-link");
      const aboutLink = navContainer.querySelector(".nav-about");
      const projectsLink = navContainer.querySelector(".nav-projects");
      const aiLink = navContainer.querySelector(".nav-ai");

      // Find burger-menuens elementer
      const burger = navContainer.querySelector(".burger-menu");
      const navLinks = navContainer.querySelector(".nav-links");

      // Behold dine eksisterende links
      if (logoLink) logoLink.href = "index.html";
      if (aboutLink) aboutLink.href = "about.html";
      if (projectsLink) projectsLink.href = "index.html#projects";
      if (aiLink) aiLink.href = "ai.html";

      // Kontroller, at burger-elementerne findes
      if (burger && navLinks) {
        // Åbn og luk menuen
        burger.addEventListener("click", () => {
          const isOpen = navLinks.classList.toggle("open");

          burger.classList.toggle("active", isOpen);

          burger.setAttribute("aria-expanded", String(isOpen));

          burger.setAttribute("aria-label", isOpen ? "Luk menu" : "Åbn menu");
        });

        // Luk menuen, når et link vælges
        navLinks.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            closeMenu();
          });
        });

        // Luk menuen, hvis brugeren klikker udenfor den
        document.addEventListener("click", (event) => {
          if (
            !navContainer.contains(event.target) &&
            navLinks.classList.contains("open")
          ) {
            closeMenu();
          }
        });

        // Luk menuen, når Escape trykkes
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            closeMenu();
          }
        });

        // Luk menuen, hvis vinduet skifter til desktop
        window.addEventListener("resize", () => {
          if (window.innerWidth > 768) {
            closeMenu();
          }
        });

        // Samlet funktion til at lukke menuen
        function closeMenu() {
          navLinks.classList.remove("open");
          burger.classList.remove("active");

          burger.setAttribute("aria-expanded", "false");
          burger.setAttribute("aria-label", "Åbn menu");
        }
      }

      // Fortæl resten af hjemmesiden, at navigationen er indlæst
      document.dispatchEvent(new CustomEvent("navigationLoaded"));
    })
    .catch((error) => {
      console.error("Fejl ved indlæsning af navigation:", error);
    });
});
