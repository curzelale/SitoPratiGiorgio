document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Active link highlight on scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = '';

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.getAttribute('id');
      }
    });

    navAnchors.forEach((anchor) => {
      anchor.classList.toggle(
        'active',
        anchor.getAttribute('href') === `#${currentId}`
      );
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Interactive Carousel / Slider
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slides.length > 0) {
    let currentIndex = 0;
    let intervalId = null;

    if (dotsContainer) {
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Vai alla foto ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      intervalId = setInterval(nextSlide, 3500);
    }

    function resetAutoplay() {
      if (intervalId) clearInterval(intervalId);
      startAutoplay();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    startAutoplay();
  }

  // Lightbox for Gallery Thumbnails & Featured Photos
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxTriggers = document.querySelectorAll('.gallery-thumb, .js-lightbox-trigger');

  if (lightbox && lightboxImg && lightboxTriggers.length > 0) {
    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const img = trigger.querySelector('img');
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
});
