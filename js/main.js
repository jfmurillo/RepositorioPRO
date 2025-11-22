/* =======================================
    YEAR IN FOOTER
======================================= */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* =======================================
    CONTACT FORM
======================================= */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("form-status");
    status.textContent = "Message sent successfully!";
    status.style.color = "#00ff9d";

    this.reset();
  });
}

/* =======================================
    MODAL SYSTEM (Freelancer style)
======================================= */

// Open modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Close modal on click outside
window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal-freelancer").forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

// Close modal with ESC key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-freelancer").forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "";
  }
});

/* =======================================
    SCROLL REVEAL WITHOUT LIBRARIES
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".card, .project, .contact-form, .site-footer"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
});

/* =======================================
    SCROLL TO TOP BUTTON
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.id = "scrollTopBtn";
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) btn.classList.add("visible");
    else btn.classList.remove("visible");
  });
});

/* =======================================
   GTRANSLATE PRO — CONTROLAR LENGUAJE
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const flags = document.querySelectorAll(".lang-flag");

  flags.forEach(flag => {
    flag.addEventListener("click", () => {
      const lang = flag.dataset.lang;

      // Trigger hidden GTranslate select
      const realSelect = document.querySelector(".gtranslate_wrapper select");
      if (realSelect) {
        realSelect.value = lang;
        realSelect.dispatchEvent(new Event("change"));
      }

      // Marcar bandera activa
      flags.forEach(f => f.classList.remove("active"));
      flag.classList.add("active");
    });
  });
});
