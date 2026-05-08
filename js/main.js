/* ======================================= THEME TOGGLE ======================================= */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      lucide.createIcons();
    }
  }

  applyTheme(root.getAttribute('data-theme') || 'dark');

  toggleBtn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
});

/* ======================================= ACTIVE NAV ON SCROLL ======================================= */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link =>
          link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => sectionObserver.observe(s));
});

/* ======================================= YEAR ======================================= */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ======================================= CONTACT FORM ======================================= */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("form-status");
    status.textContent = "¡Mensaje enviado correctamente!";
    status.style.color = "#00ff9d";
    this.reset();
  });
}

/* ======================================= MODAL ======================================= */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
}

window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal-freelancer").forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-freelancer").forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "";
  }
});

/* ======================================= REVEAL ON SCROLL ======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".card, .project, .contact-form, .site-footer"
  );
  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
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

  revealElements.forEach((el) => revealObserver.observe(el));
});

/* ======================================= SCROLL TO TOP ======================================= */
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

/* ======================================= GTRANSLATE ======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const flags = document.querySelectorAll(".lang-flag");
  flags.forEach(flag => {
    flag.addEventListener("click", () => {
      const lang = flag.dataset.lang;
      const realSelect = document.querySelector(".gtranslate_wrapper select");
      if (realSelect) {
        realSelect.value = lang;
        realSelect.dispatchEvent(new Event("change"));
      }
      flags.forEach(f => f.classList.remove("active"));
      flag.classList.add("active");
    });
  });
});

/* ======================================= SCROLL FADE ======================================= */
const scrollFadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      scrollFadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".scroll-fade").forEach(el => scrollFadeObserver.observe(el));

/* ======================================= SMOOTH NAV + SECTION GLOW ======================================= */
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.classList.add("section-highlight");
    setTimeout(() => target.classList.remove("section-highlight"), 1200);
  });
});

/* ======================================= PAGE TRANSITION ======================================= */
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const url = link.getAttribute("href");
    if (!url) return;
    if (url.startsWith("#")) return;
    if (link.hasAttribute("download")) return;
    if (link.classList.contains("modal-btn")) return;
    if (url.includes("wa.me")) return;
    if (link.closest(".modal-freelancer")) return;

    e.preventDefault();
    const overlay = document.getElementById("page-transition");
    overlay.classList.add("show");
    setTimeout(() => { window.location.href = url; }, 700);
  });
});
