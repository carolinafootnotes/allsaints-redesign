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
    var mobileLinks = Array.prototype.slice.call(mobileNav.querySelectorAll('a'));

    function trapFocus(e) {
      if (!mobileNav.classList.contains('open')) return;
      var focusable = mobileLinks;
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    function toggleMenu() {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.body.classList.toggle('menu-open', isOpen);
      if (isOpen) {
        if (mobileLinks.length) mobileLinks[0].focus();
        mobileNav.addEventListener('keydown', trapFocus);
      } else {
        mobileNav.removeEventListener('keydown', trapFocus);
      }
    }

    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileNav.classList.contains('open')) {
          mobileNav.removeEventListener('keydown', trapFocus);
          toggleMenu();
        }
      });
    });

    // Single Escape handler: close an open mobile sub-menu first (stay in the
    // overlay), then the overlay itself, then any desktop dropdown.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (mobileNav.classList.contains('open')) {
        var openDd = mobileNav.querySelector('.mobile-dd.open');
        if (openDd) {
          openDd.classList.remove('open');
          var ddBtn = openDd.querySelector('.mobile-dd-btn');
          if (ddBtn) { ddBtn.setAttribute('aria-expanded', 'false'); ddBtn.focus(); }
          return;
        }
        mobileNav.removeEventListener('keydown', trapFocus);
        toggleMenu();
        hamburger.focus();
        return;
      }
      closeDropdowns();
    });
  }

  // ---- Nav dropdowns (desktop click/touch + mobile accordion) ----
  // Desktop also opens on CSS :hover/:focus-within; this handles click, touch, and keyboard toggle.
  var ddToggles = Array.prototype.slice.call(document.querySelectorAll('.nav-dd-btn, .mobile-dd-btn'));
  ddToggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = btn.closest('.nav-dd, .mobile-dd');
      if (!dd) return;
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  function closeDropdowns(filter) {
    document.querySelectorAll('.nav-dd.open, .mobile-dd.open').forEach(function (dd) {
      if (filter && !filter(dd)) return;
      dd.classList.remove('open');
      var b = dd.querySelector('.nav-dd-btn, .mobile-dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', function (e) {
    closeDropdowns(function (dd) { return !dd.contains(e.target); });
  });
  // Escape handling lives in the unified handler in the mobile-menu block above.

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
