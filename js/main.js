/* ============================================
   SARESH WEDDING — main.js
   ============================================ */

'use strict';

// ─── COUNTDOWN TIMER ───────────────────────────────────
(function initCountdown() {
  // Wedding date: 25 May 2025 07:00 AM
  const weddingDate = new Date('2025-05-25T07:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// ─── NAV — scrolled class + burger ─────────────────────
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ─── SCROLL REVEAL ─────────────────────────────────────
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
})();

// ─── RSVP FORM ─────────────────────────────────────────
(function initRSVP() {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const fname = form.fname.value.trim();
    const lname = form.lname.value.trim();
    const email = form.email.value.trim();

    if (!fname || !lname) {
      showError('Please enter your full name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Simulate submission
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 1200);
  });

  function showError(msg) {
    const existing = form.querySelector('.form-error');
    if (existing) existing.remove();

    const err = document.createElement('p');
    err.className = 'form-error';
    err.style.cssText = 'color:#c0392b;font-size:0.82rem;text-align:center;margin-top:-0.5rem;';
    err.textContent = msg;
    form.insertBefore(err, form.querySelector('.btn-submit'));

    setTimeout(() => err.remove(), 3500);
  }
})();

// ─── SMOOTH ACTIVE NAV HIGHLIGHT ───────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold-dark)';
      }
    });
  }, { passive: true });
})();

// ─── PARALLAX HERO ─────────────────────────────────────
(function initParallax() {
  const hero = document.querySelector('.hero__bg');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
})();

// ─── GALLERY LIGHTBOX (simple) ─────────────────────────
(function initLightbox() {
  const items = document.querySelectorAll('.gallery__photo-ph');
  if (!items.length) return;

  // Create lightbox overlay
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    display:none;position:fixed;inset:0;z-index:999;
    background:rgba(30,15,5,0.95);
    align-items:center;justify-content:center;
    cursor:zoom-out;
  `;
  lb.innerHTML = `
    <button style="position:absolute;top:2rem;right:2rem;background:none;border:none;
      color:rgba(255,255,255,0.6);font-size:2rem;cursor:pointer;line-height:1;">✕</button>
    <div id="lb-content" style="max-width:80vw;max-height:80vh;overflow:hidden;"></div>
  `;
  document.body.appendChild(lb);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const clone = item.cloneNode(true);
      clone.style.cssText = 'max-width:80vw;max-height:80vh;min-height:0;transform:none;';
      document.getElementById('lb-content').innerHTML = '';
      document.getElementById('lb-content').appendChild(clone);
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.tagName === 'BUTTON') {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();
