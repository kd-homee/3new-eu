/* =============================================================
   3NEW srl — script.js
   ============================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     Sticky header: add shadow on scroll
     ----------------------------------------------------------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------------------
     Mobile nav toggle
     ----------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      // Prevent body scroll when menu is open on mobile
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any nav link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* -----------------------------------------------------------
     Smooth scroll with sticky-header offset
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const offset  = headerH + 12;
      const top     = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------------------
     Active nav link highlight on scroll
     ----------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id], section.section-ar[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      const scrollY     = window.scrollY;
      const headerH     = header ? header.offsetHeight : 0;
      let currentId     = '';

      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - headerH - 40) {
          currentId = sec.id;
        }
      });

      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('nav-link-active', isActive);
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

  /* -----------------------------------------------------------
     Scroll reveal animation
     ----------------------------------------------------------- */
  const revealTargets = [
    '.card',
    '.feature',
    '.resource-card',
    '.product-card',
    '.contact-box',
    '.contact-list li',
    '.ar-main',
    '.ar-aside',
    '.about-content',
  ];

  const allReveal = document.querySelectorAll(revealTargets.join(','));

  if ('IntersectionObserver' in window && allReveal.length) {
    // Assign delay classes based on position within parent
    allReveal.forEach(el => {
      el.classList.add('reveal');

      // Add staggered delay for sibling elements (cards, features, etc.)
      const siblings = Array.from(el.parentElement.children).filter(
        c => c.classList.contains(el.classList[0])
      );
      const idx = siblings.indexOf(el);
      if (idx === 1)      el.classList.add('reveal-delay-1');
      else if (idx === 2) el.classList.add('reveal-delay-2');
      else if (idx === 3) el.classList.add('reveal-delay-3');
      else if (idx >= 4)  el.classList.add('reveal-delay-4');
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    allReveal.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all without animation
    allReveal.forEach(el => el.classList.add('reveal', 'visible'));
  }

  /* -----------------------------------------------------------
     Hero CTA: "サービスを見る" — small pulse animation on load
     ----------------------------------------------------------- */
  const heroCta = document.querySelector('.hero-cta .btn-primary');
  if (heroCta) {
    setTimeout(() => {
      heroCta.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
      heroCta.style.boxShadow  = '0 6px 28px rgba(28, 48, 104, 0.35)';
      setTimeout(() => {
        heroCta.style.boxShadow = '';
      }, 800);
    }, 1200);
  }

  /* -----------------------------------------------------------
     Email link: assembled in JS to avoid plaintext harvesting
     ----------------------------------------------------------- */
  const emailUser   = 'contact';
  const emailDomain = '3new.eu';
  const email       = `${emailUser}@${emailDomain}`;

  const emailLink = document.getElementById('email-link');
  const emailText = document.getElementById('email-text');

  if (emailLink && emailText) {
    emailLink.href        = `mailto:${email}?subject=${encodeURIComponent('お問い合わせ：EU MDR対応支援について')}`;
    emailText.textContent = email;
  }

  /* -----------------------------------------------------------
     Current year in footer copyright (optional)
     ----------------------------------------------------------- */
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    const year = new Date().getFullYear();
    copyEl.innerHTML = copyEl.innerHTML.replace('2024', String(year));
  }

})();
