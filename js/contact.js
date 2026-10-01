/* =========================================
   CONTACT POPUP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
       FIND CONTACT.HTML
    ====================================== */

  const contactPath = "components/contact.html";

  /* =====================================
       LOAD CONTACT POPUP
    ====================================== */

  fetch(contactPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Kunne ikke hente contact.html: ${response.status}`);
      }

      return response.text();
    })

    .then((html) => {
      /* Indsæt popup'en i body */

      document.body.insertAdjacentHTML("beforeend", html);

      /* Start popup-funktionaliteten */

      initContactPopup();
    })

    .catch((error) => {
      console.error("Fejl ved indlæsning af contact popup:", error);
    });
});

/* =========================================
   CONTACT POPUP FUNCTIONALITY
========================================= */

function initContactPopup() {
  const modal = document.getElementById("contactModal");

  const closeButton = document.getElementById("contactClose");

  const overlay = document.querySelector(".contact-overlay");

  if (!modal || !closeButton || !overlay) {
    console.error("Contact popup kunne ikke initialiseres.");

    return;
  }

  /* =====================================
       OPEN
    ====================================== */

  const openModal = (event) => {
    event.preventDefault();

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
  };

  /* =====================================
       CLOSE
    ====================================== */

  const closeModal = () => {
    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  };

  /* =====================================
       CONTACT BUTTONS

       Event delegation gør, at det virker
       selvom nav/footer bliver loaded
       efter contact.js.
    ====================================== */

  document.addEventListener("click", (event) => {
    const contactButton = event.target.closest(".contact-button");

    if (contactButton) {
      openModal(event);
    }
  });

  /* =====================================
       CLOSE BUTTON
    ====================================== */

  closeButton.addEventListener("click", closeModal);

  /* =====================================
       CLICK OUTSIDE
    ====================================== */

  overlay.addEventListener("click", closeModal);

  /* =====================================
       ESCAPE
    ====================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
