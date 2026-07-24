document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const form = document.getElementById('consultationForm');

  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link, .nav-list .btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Basic Form Handling
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Success feedback replacement
      form.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
          <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Message Sent!</h3>
          <p style="color: var(--color-text-muted);">Thanks, ${name}! Your inquiry has been received. We will get back to you shortly.</p>
        </div>
      `;
    });
  }
});
