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

/* ======================================= REVEAL ON SCROLL (staggered) ======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".card, .project, .contact-form, .site-footer, .skill-box, .cert-box"
  );
  revealElements.forEach((el) => el.classList.add("reveal"));

  // assign stagger index within each grid parent
  [".bento-grid", ".skills-grid", ".certs-grid"].forEach(gridSel => {
    const grid = document.querySelector(gridSel);
    if (!grid) return;
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.setProperty("--stagger", i);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
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

/* ======================================= SECTION TITLE UNDERLINE ======================================= */
const titleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("title-visible");
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".section-title").forEach(el => titleObserver.observe(el));

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

/* ======================================= SCROLL PROGRESS BAR ======================================= */
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  let rafId = null;
  function update() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${docH > 0 ? window.scrollY / docH : 0})`;
    rafId = null;
  }
  window.addEventListener("scroll", () => {
    if (!rafId) rafId = requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

/* ======================================= COUNT-UP ANIMATION ======================================= */
(function () {
  const counters = document.querySelectorAll(".stat-number[data-count]");
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach(el => countObserver.observe(el));
})();

/* ======================================= TYPED TAGLINE ======================================= */
(function () {
  const el = document.querySelector(".hero-tagline");
  if (!el) return;

  const phrases = [
    "Soluciones digitales que impactan.",
    "Código que transforma ideas.",
    "Datos que cuentan historias.",
    "Interfaces que enamoran."
  ];
  const SPEED_TYPE   = 55;
  const SPEED_DELETE = 28;
  const PAUSE_END    = 2200;
  const PAUSE_START  = 400;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }

  // start after hero entrance animation settles
  setTimeout(tick, 1000);
})();

/* ======================================= 3-D CARD TILT (RAF-throttled) ======================================= */
(function () {
  const TILT_MAX = 8;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll(".project").forEach(card => {
    let rafId = null;
    let lastX = 0, lastY = 0;

    card.addEventListener("mouseenter", () => {
      card.style.transition = "box-shadow 0.28s ease, border-color 0.28s ease";
    });

    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      lastX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      lastY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          card.style.transform = [
            "perspective(900px)",
            `rotateY(${(lastX * TILT_MAX).toFixed(2)}deg)`,
            `rotateX(${(-lastY * TILT_MAX).toFixed(2)}deg)`,
            "translateY(-6px) scale(1.01)"
          ].join(" ");
          rafId = null;
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s ease, border-color 0.28s ease";
      card.style.transform = "";
    });
  });
})();

/* ======================================= MAGNETIC CTA BUTTON ======================================= */
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll(".btn-cv, .btn-contact").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.25;
      const y = (e.clientY - r.top  - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
      btn.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, box-shadow 0.25s ease";
    });

    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "transform 0.12s ease, background 0.25s ease, box-shadow 0.25s ease";
    });
  });
})();
