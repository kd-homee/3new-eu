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

  if (emailText) { emailText.textContent = email; }
  if (emailLink) {
    emailLink.href = `mailto:${email}?subject=${encodeURIComponent('お問い合わせ：EU MDR対応支援について')}`;
  }

  /* -----------------------------------------------------------
     Contact form: build mailto with prefilled body
     ----------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const topic = contactForm.querySelector('input[name="topic"]:checked')?.value || 'その他';
      const name  = document.getElementById('cf-name').value.trim();
      const msg   = document.getElementById('cf-msg').value.trim();
      const subject = `【30分無料相談】${topic}｜${name}`;
      const body =
        `お名前・会社名：${name}\n` +
        `ご相談区分：${topic}\n\n` +
        `ご相談内容：\n${msg}\n\n` +
        `（3new.eu のフォームから作成）`;
      window.location.href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* -----------------------------------------------------------
     Mobile sticky CTA: hide while #contact is on screen
     ----------------------------------------------------------- */
  const mobileCta  = document.getElementById('mobile-cta');
  const contactSec = document.getElementById('contact');
  if (mobileCta && contactSec && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      entries => entries.forEach(en =>
        mobileCta.classList.toggle('is-hidden', en.isIntersecting)),
      { threshold: 0.15 }
    ).observe(contactSec);
  }

  /* -----------------------------------------------------------
     Current year in footer copyright (optional)
     ----------------------------------------------------------- */
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    const year = new Date().getFullYear();
    copyEl.innerHTML = copyEl.innerHTML.replace('2024', String(year));
  }

  /* -----------------------------------------------------------
     Cookie / privacy consent banner
     ----------------------------------------------------------- */
  (function initCookieBanner() {
    const KEY = '3new-cookie-consent';
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (_) { return; }
    window.__cookieConsent = stored;
    if (stored === 'accepted' || stored === 'rejected') return;

    const isEn = (document.documentElement.lang || '').toLowerCase().startsWith('en') ||
                 location.pathname.indexOf('/en/') === 0;
    const t = isEn ? {
      label: 'Cookie & privacy notice',
      text: 'This site processes minimal data only for functions such as form submission and newsletter sign-up (Brevo). ' +
            'We do not use analytics or advertising tracking. See our ' +
            '<a href="/en/#disclaimer">Disclaimer</a> for details.',
      reject: 'Essential only',
      accept: 'Accept'
    } : {
      label: 'Cookie・プライバシーに関するお知らせ',
      text: '当サイトは、フォーム送信やメルマガ登録（Brevo）に必要な機能のみを目的として最小限のデータを扱います。' +
            '解析・広告目的のトラッキングは行っていません。詳細は' +
            '<a href="/privacy-policy/">プライバシーポリシー</a>をご覧ください。',
      reject: '必要なもののみ',
      accept: '同意する'
    };

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.label);
    banner.innerHTML =
      '<p class="cookie-banner-text">' + t.text + '</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="cookie-btn cookie-btn-reject" data-consent="rejected">' + t.reject + '</button>' +
      '<button type="button" class="cookie-btn cookie-btn-accept" data-consent="accepted">' + t.accept + '</button>' +
      '</div>';

    function decide(value) {
      try { localStorage.setItem(KEY, value); } catch (_) {}
      window.__cookieConsent = value;
      banner.classList.add('is-leaving');
      setTimeout(() => banner.remove(), 300);
    }

    banner.querySelectorAll('.cookie-btn').forEach(btn => {
      btn.addEventListener('click', () => decide(btn.dataset.consent));
    });

    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('is-visible'));
  })();

})();
