(function () {
  'use strict';

  // ---- Header scroll behavior ----
  var header = document.getElementById('site-header');
  function updateHeader() {
    if (!header) return;
    var y = window.scrollY;
    if (y > 80) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
      header.classList.add('transparent');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ---- Mobile menu ----
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    var mobileLinks = mobileNav.querySelectorAll('a');

    function toggleMenu() {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileNav.classList.contains('open')) toggleMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu();
        hamburger.focus();
      }
    });
  }

  // ---- Scroll reveal ----
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var reveals = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

})();
