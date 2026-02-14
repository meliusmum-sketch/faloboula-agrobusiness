/* ================================================================
   FALOBOULA AGROBUSINESS SUARL — Main JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === LOADER ===
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 2200);
  });

  // === NAV SCROLL ===
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // === HAMBURGER MENU ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // === REVEAL ON SCROLL ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // === BACK TO TOP ===
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === ANIMATED COUNTERS ===
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // === CONTACT FORM ===
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');

  if (form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

    // Real-time validation on blur and input
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all
      let isValid = true;
      requiredFields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });
      if (!isValid) return;

      // Loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';

      try {
        // Netlify Forms compatible submission
        const formData = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'flex';
          if (errorMsg) errorMsg.style.display = 'none';
        } else {
          throw new Error('Network error');
        }
      } catch (err) {
        if (errorMsg) errorMsg.style.display = 'flex';
        if (successMsg) successMsg.style.display = 'none';
      } finally {
        submitBtn.disabled = false;
        const btnText2 = submitBtn.querySelector('.btn-text');
        const btnLoading2 = submitBtn.querySelector('.btn-loading');
        if (btnText2) btnText2.style.display = 'inline';
        if (btnLoading2) btnLoading2.style.display = 'none';
      }
    });
  }

  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    let msg = '';

    if (field.required && !field.value.trim()) {
      msg = 'Ce champ est obligatoire';
    } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      msg = 'Adresse email invalide';
    } else if (field.type === 'tel' && field.value && field.value.replace(/\s/g, '').length < 8) {
      msg = 'Numéro de téléphone invalide';
    }

    if (msg) {
      field.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
      return false;
    }
    field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  // === ACTIVE NAV HIGHLIGHT ===
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.style.color = item.getAttribute('href') === '#' + id ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

});
