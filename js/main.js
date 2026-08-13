/* ===================================================================
   THEME TOGGLE
   =================================================================== */
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
      if (window.lucide) lucide.createIcons();
    }
  }

  applyTheme(root.getAttribute('data-theme') || 'dark');
  toggleBtn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
});

/* ===================================================================
   ACTIVE NAV ON SCROLL
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

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

/* ===================================================================
   SMOOTH NAV
   =================================================================== */
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===================================================================
   YEAR
   =================================================================== */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===================================================================
   EN / ES LANGUAGE
   =================================================================== */
function currentLang() {
  return localStorage.getItem('portfolio-lang') || 'es';
}

(function () {
  const btn = document.getElementById('lang-toggle');
  const label = document.getElementById('lang-label');
  if (!btn || !label) return;

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    label.textContent = lang === 'es' ? 'EN' : 'ES';
    localStorage.setItem('portfolio-lang', lang);

    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
    });
    window._portfolioLang = lang;
  }

  btn.addEventListener('click', () => applyLang(currentLang() === 'es' ? 'en' : 'es'));
  applyLang(currentLang());
})();

/* ===================================================================
   REVEAL ON SCROLL (staggered within each grid)
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".contact-form, .contact-info-card, .site-footer, .skill-box, .cert-box"
  );
  revealElements.forEach(el => el.classList.add("reveal"));

  [".skills-grid", ".certs-grid"].forEach(gridSel => {
    const grid = document.querySelector(gridSel);
    if (!grid) return;
    grid.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--stagger", i));
  });

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
});

/* ===================================================================
   PROJECT CARD STAGGER REVEAL
   =================================================================== */
(function () {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const staggerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.stagger || '0', 10) * 120;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, i) => {
    card.dataset.stagger = i;
    staggerObserver.observe(card);
  });
})();

/* ===================================================================
   SCROLL FADE + SECTION TITLE UNDERLINE
   =================================================================== */
(function () {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".scroll-fade").forEach(el => fadeObserver.observe(el));

  const titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-visible");
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".section-title").forEach(el => titleObserver.observe(el));
})();

/* ===================================================================
   STAT COUNT-UP
   =================================================================== */
(function () {
  const counters = document.querySelectorAll(".stat-number[data-count]");
  if (!counters.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    const duration = 1400, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
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

/* ===================================================================
   SCROLL TO TOP
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.id = "scrollTopBtn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Volver arriba");
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
});

/* ===================================================================
   WHATSAPP FAB — hide while scrolling down through body copy
   -------------------------------------------------------------------
   Fixed position means it can land on top of a line of text on long
   pages (about.html) on mobile. Hiding it on downward scroll keeps it
   clear of text the visitor is about to read; scrolling back up (or
   resting at the top) brings it back.
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const waBtn = document.querySelector(".whatsapp-btn");
  if (!waBtn) return;

  const DIRECTION_THRESHOLD = 6;   // ignore sub-pixel jitter from layout shifts / momentum scroll
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const delta = y - lastY;
    if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
    waBtn.classList.toggle("is-hidden", delta > 0 && y > 80);
    lastY = y;
  }, { passive: true });
});

/* ===================================================================
   CONTACT FORM — validation, states, real submission
   -------------------------------------------------------------------
   Set FORM_ENDPOINT to a Formspree form URL (https://formspree.io/f/xxxx)
   to send asynchronously. While it's empty, the form opens the visitor's
   email client with the message prefilled — it always does something real.
   =================================================================== */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const FORM_ENDPOINT = "";                                   // ← set your Formspree URL to enable async send
  const CONTACT_EMAIL = "josephmurillo1621@gmail.com";

  const T = {
    es: {
      required: "Este campo es obligatorio.",
      nameShort: "Escribe tu nombre completo.",
      emailBad: "Ingresa un correo electrónico válido.",
      msgShort: "Cuéntame un poco más (mínimo 10 caracteres).",
      sending: "Enviando…",
      sent: "¡Mensaje enviado! Te responderé pronto.",
      mailOpening: "Abriendo tu cliente de correo…",
      error: "No se pudo enviar. Intenta de nuevo o escríbeme a " + CONTACT_EMAIL + ".",
      send: "Enviar mensaje"
    },
    en: {
      required: "This field is required.",
      nameShort: "Please enter your full name.",
      emailBad: "Please enter a valid email address.",
      msgShort: "Tell me a bit more (at least 10 characters).",
      sending: "Sending…",
      sent: "Message sent! I'll get back to you soon.",
      mailOpening: "Opening your email client…",
      error: "Couldn't send. Try again or email me at " + CONTACT_EMAIL + ".",
      send: "Send message"
    }
  };
  const t = () => T[currentLang() === 'en' ? 'en' : 'es'];

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    message: form.querySelector("#message")
  };
  const errors = {
    name: form.querySelector("#name-error"),
    email: form.querySelector("#email-error"),
    message: form.querySelector("#message-error")
  };
  const submitBtn = form.querySelector("#contact-submit");
  const btnLabel = submitBtn.querySelector(".btn-label");
  const status = form.querySelector("#form-status");
  const counter = form.querySelector("#message-count");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* live character counter */
  if (counter) {
    const updateCount = () => { counter.textContent = `${fields.message.value.length} / 1200`; };
    fields.message.addEventListener("input", updateCount);
    updateCount();
  }

  function setError(key, msg) {
    errors[key].textContent = msg || "";
    fields[key].classList.toggle("has-error", !!msg);
    fields[key].setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validate() {
    const v = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim()
    };
    const tr = t();
    let firstInvalid = null;

    const nameErr = !v.name ? tr.required : (v.name.length < 2 ? tr.nameShort : "");
    const emailErr = !v.email ? tr.required : (!EMAIL_RE.test(v.email) ? tr.emailBad : "");
    const msgErr = !v.message ? tr.required : (v.message.length < 10 ? tr.msgShort : "");

    setError("name", nameErr);
    setError("email", emailErr);
    setError("message", msgErr);

    if (nameErr) firstInvalid = fields.name;
    else if (emailErr) firstInvalid = fields.email;
    else if (msgErr) firstInvalid = fields.message;

    return { ok: !firstInvalid, values: v, firstInvalid };
  }

  /* clear a field's error as the user fixes it */
  Object.keys(fields).forEach(key => {
    fields[key].addEventListener("input", () => {
      if (fields[key].classList.contains("has-error")) setError(key, "");
    });
  });

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = kind ? "status-" + kind : "";
  }

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.classList.toggle("is-loading", on);
    btnLabel.textContent = on ? t().sending : t().send;
  }

  function openMailto(v) {
    const subject = `Portafolio — ${v.name}`;
    const body = `${v.message}\n\n— ${v.name} (${v.email})`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(t().mailOpening, "info");
    window.location.href = href;
    setTimeout(() => { setLoading(false); form.reset(); if (counter) counter.textContent = "0 / 1200"; }, 600);
  }

  async function sendAsync(v) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: v.name, email: v.email, message: v.message, _replyto: v.email })
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setStatus(t().sent, "success");
      form.reset();
      if (counter) counter.textContent = "0 / 1200";
    } catch (err) {
      setStatus(t().error, "error");
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    setStatus("", null);
    const { ok, values, firstInvalid } = validate();
    if (!ok) { firstInvalid.focus(); return; }

    setLoading(true);
    if (FORM_ENDPOINT) sendAsync(values);
    else openMailto(values);
  });
})();
