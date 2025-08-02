/* Tumunu NGO - minimal interactivity */

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof Element && t.tagName === 'A' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll enhancement (native CSS handles most cases)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    }
  });
});

// Impact counters
function animateCounters() {
  const stats = document.querySelectorAll('.stat .num');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.getAttribute('data-target') || '0');
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.floor(eased * target);
          el.textContent = val.toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(s => obs.observe(s));
}
animateCounters();

// Simple, accessible form handling
const form = document.getElementById('interest-form');
if (form) {
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const interest = String(data.get('interest') || '').trim();

    if (!name || !email || !interest) {
      setMessage('Please fill out all fields.', 'error');
      return;
    }
    if (!/.+@.+\..+/.test(email)) {
      setMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Demo only: no backend yet. Replace with fetch() to your endpoint.
    setMessage("Thank you! We've recorded your interest.", 'success');
    form.reset();
  });

  function setMessage(text, type) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = type === 'error' ? '#ffb4b4' : '#b9ffd2';
  }
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Optional: simple analytics hook (noop)
window.tumunu = window.tumunu || {};
window.tumunu.track = function(event, payload) {
  // Replace console.log with your analytics provider.
  console.log('[Tumunu]', event, payload || {});
};
