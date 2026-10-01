document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) return;

  /* =========================================
       HENT FOOTER
    ========================================= */

  fetch("components/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Kunne ikke hente footeren: ${response.status}`);
      }

      return response.text();
    })

    .then((html) => {
      footerContainer.innerHTML = html;

      /* Fortæl resten af siden,
         at footeren er loaded */

      document.dispatchEvent(new CustomEvent("footerLoaded"));
    })

    .catch((error) => {
      console.error("Fejl ved indlæsning af footer:", error);
    });
});
