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
      navContainer.innerHTML = html;

      const logoLink = navContainer.querySelector(".logo-link");
      const aboutLink = navContainer.querySelector(".nav-about");
      const projectsLink = navContainer.querySelector(".nav-projects");
      const aiLink = navContainer.querySelector(".nav-ai");

      if (logoLink) logoLink.href = "index.html";
      if (aboutLink) aboutLink.href = "about.html";
      if (projectsLink) projectsLink.href = "index.html#projects";
      if (aiLink) aiLink.href = "ai.html";

      document.dispatchEvent(new CustomEvent("navigationLoaded"));
    })
    .catch((error) => {
      console.error("Fejl ved indlæsning af navigation:", error);
    });
});
