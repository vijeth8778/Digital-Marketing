(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetForm');
  const nameInput = document.getElementById('name');

  const NAVBAR_OFFSET = 72;

  function getScrollTarget(el) {
    const scrollId = el.getAttribute('data-scroll');
    if (scrollId) return document.getElementById(scrollId);
    const href = el.getAttribute('href');
    if (href && href.startsWith('#')) return document.querySelector(href);
    return null;
  }

  function scrollToSection(target, focusContact) {
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });

    if (focusContact && nameInput) {
      setTimeout(function () {
        nameInput.focus();
      }, 600);
    }
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('[data-scroll], .nav-link, .logo').forEach(function (el) {
    el.addEventListener('click', function (e) {
      const target = getScrollTarget(el);
      if (!target) return;

      e.preventDefault();
      const focusContact = el.getAttribute('data-scroll') === 'contact';
      scrollToSection(target, focusContact);
      closeMobileMenu();
    });
  });

  menuToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', function (e) {
    if (!navMenu.classList.contains('open')) return;
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    if (input) input.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearErrors() {
    ['name', 'email', 'message'].forEach(function (fieldId) {
      const input = document.getElementById(fieldId);
      const errorEl = document.getElementById(fieldId + 'Error');
      if (input) input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let valid = true;

    if (!name) {
      showError('name', 'Please enter your name.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email address.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!message) {
      showError('message', 'Please enter a message.');
      valid = false;
    }

    if (!valid) return;
    const formData = new FormData(contactForm);

fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: {
        "Accept": "application/json"
    }
})
.then(response => {
    if (response.ok) {
        contactForm.hidden = true;
        formSuccess.hidden = false;
    } else {
        alert("Failed to send message.");
    }
})
.catch(error => {
    console.error(error);
    alert("Something went wrong.");
});

    
  });

  resetFormBtn.addEventListener('click', function () {
    contactForm.reset();
    clearErrors();
    formSuccess.hidden = true;
    contactForm.hidden = false;
    nameInput.focus();
  });
})();
