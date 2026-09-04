document.addEventListener('DOMContentLoaded', function () {
  // --- MOBILE NAVIGATION DRAWERS ---
  const menuToggles = document.querySelectorAll('.js-menu-toggle');
  const mobileMenu = document.querySelector('.site-mobile-menu');
  const mainNav = document.querySelector('.js-clone-nav');
  const mobileMenuBody = document.querySelector('.site-mobile-menu-body');

  // Clone main menu navigation items dynamically for mobile drawer
  if (mainNav && mobileMenuBody) {
    mobileMenuBody.innerHTML = mainNav.innerHTML;
    // Replace desktop classes for responsive drawer menu styling
    const mobileLinks = mobileMenuBody.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.className = "block py-4 px-6 text-slate-200 hover:text-primary font-oswald text-base tracking-widest uppercase border-b border-white/10 transition-colors duration-200";
      // Close menu when link is clicked
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
      // Set focus to close button for accessibility
      const closeBtn = mobileMenu.querySelector('.js-menu-toggle');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');
    }
  }

  menuToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileMenu) {
        const isOpen = !mobileMenu.classList.contains('translate-x-full');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      }
    });
  });

  // Handle escape key to close menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
      closeMobileMenu();
      const menuTrigger = document.querySelector('.site-menu-toggle');
      if (menuTrigger) menuTrigger.focus();
    }
  });

  // --- STICKY HEADER & CONTRAST STATE ENGINE ---
  const header = document.querySelector('.js-sticky-header');
  if (header) {
    const lightSectionSelectors = ['#books-section', '#excerpts-section', '#about-section', '#testimonial-section'];

    function isOverLightSection() {
      const headerHeight = header.offsetHeight || 80;
      const checkY = headerHeight / 2; // Point under middle of sticky header

      for (let i = 0; i < lightSectionSelectors.length; i++) {
        const sec = document.querySelector(lightSectionSelectors[i]);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          // Check if top of light section is at or above header check point AND bottom extends below header top
          if (rect.top <= checkY && rect.bottom >= checkY) {
            return true;
          }
        }
      }
      return false;
    }

    function updateHeaderState() {
      const overLight = isOverLightSection();
      const scrolled = window.scrollY > 80;

      if (overLight || scrolled) {
        header.classList.add('bg-navy/95', 'backdrop-blur-md', 'border-b', 'border-white/10', 'shadow-xl', 'py-3.5', 'header-scrolled');
        header.classList.remove('py-5', 'bg-transparent');
      } else {
        header.classList.add('py-5', 'bg-transparent');
        header.classList.remove('bg-navy/95', 'backdrop-blur-md', 'border-b', 'border-white/10', 'shadow-xl', 'py-3.5', 'header-scrolled');
      }
    }

    // Attach passive listeners for scroll, resize, hashchange, and popstate
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState, { passive: true });
    window.addEventListener('hashchange', updateHeaderState);
    window.addEventListener('popstate', updateHeaderState);

    // Initial check on load
    updateHeaderState();
    // Subsequent check after render/layout stabilizes
    setTimeout(updateHeaderState, 100);
  }

  // Legacy book carousel code removed in Phase 1B.2 in favor of clean publishing catalog layout.

  // --- CAST OF CHARACTERS RESPONSIVE SHOWCASE ---
  const castContainer = document.querySelector('.carousel-inner');
  if (castContainer) {
    const originalCards = Array.from(castContainer.querySelectorAll('.card'));
    const totalCards = originalCards.length;
    
    // Clear out fallback structure to construct active track
    castContainer.innerHTML = '';
    castContainer.className = "relative w-full overflow-hidden select-none py-4";

    // Track wrapper for horizontal sliding
    const track = document.createElement('div');
    track.className = "flex transition-transform duration-500 ease-out gap-6";
    castContainer.appendChild(track);

    // Build character cards
    const cards = originalCards.map((card) => {
      const img = card.querySelector('img');
      const role = card.querySelector('.card-role');
      const title = card.querySelector('.card-title');
      const text = card.querySelector('.card-text');

      const cardWrapper = document.createElement('div');
      cardWrapper.className = "flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-navy-dark/90 border border-white/12 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:border-primary/50 group";
      
      const roleHtml = role ? `<span class="inline-block font-oswald text-[11px] font-bold text-primary tracking-widest uppercase mb-1">${role.innerText}</span>` : '';

      cardWrapper.innerHTML = `
        <div class="relative overflow-hidden bg-slate-950/40 p-4 flex items-center justify-center border-b border-white/10 min-h-[260px] sm:min-h-[280px]">
          <img 
            src="${img.getAttribute('src')}" 
            alt="${img.getAttribute('alt') || title.innerText}" 
            class="max-h-60 sm:max-h-64 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="p-6 flex flex-col flex-grow justify-between bg-navy/40">
          <div>
            ${roleHtml}
            <h4 class="text-xl font-bold font-oswald text-white uppercase tracking-wide mb-2 group-hover:text-primary transition-colors">${title.innerText}</h4>
            <p class="text-slate-300 font-roboto text-sm leading-relaxed font-light">${text.innerText}</p>
          </div>
        </div>
      `;
      
      track.appendChild(cardWrapper);
      return cardWrapper;
    });

    let currentIndex = 0;

    function getItemsPerPage() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    function maxIndex() {
      const perPage = getItemsPerPage();
      return Math.max(0, totalCards - perPage);
    }

    function updateCarouselPosition() {
      const perPage = getItemsPerPage();
      if (currentIndex > maxIndex()) {
        currentIndex = maxIndex();
      }
      
      // Calculate translate percentage
      let offset = 0;
      if (perPage === 1) {
        offset = currentIndex * 100;
        track.style.transform = `translateX(calc(-${offset}% - ${currentIndex * 24}px))`;
      } else if (perPage === 2) {
        offset = currentIndex * 50;
        track.style.transform = `translateX(calc(-${offset}% - ${currentIndex * 12}px))`;
      } else {
        offset = currentIndex * 33.333;
        track.style.transform = `translateX(calc(-${offset}% - ${currentIndex * 16}px))`;
      }
    }

    function nextSlide() {
      if (currentIndex >= maxIndex()) {
        currentIndex = 0; // loop back to start
      } else {
        currentIndex++;
      }
      updateCarouselPosition();
    }

    function prevSlide() {
      if (currentIndex <= 0) {
        currentIndex = maxIndex(); // loop to end
      } else {
        currentIndex--;
      }
      updateCarouselPosition();
    }

    const prevCastBtn = document.querySelector('#carouselMultiItemExample [data-slide="prev"]');
    const nextCastBtn = document.querySelector('#carouselMultiItemExample [data-slide="next"]');

    if (prevCastBtn) {
      prevCastBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
      });
    }

    if (nextCastBtn) {
      nextCastBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
      });
    }

    // Touch Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    castContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    castContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const threshold = 40;
      if (touchStartX - touchEndX > threshold) {
        nextSlide();
      } else if (touchEndX - touchStartX > threshold) {
        prevSlide();
      }
    }, { passive: true });

    // Keyboard support when container focused
    castContainer.setAttribute('tabindex', '0');
    castContainer.setAttribute('aria-label', 'Character ensemble carousel');
    castContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCarouselPosition, 100);
    });

    updateCarouselPosition();
  }

  // --- BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    const scrollThreshold = 450;

    function handleBackToTopVisibility() {
      if (window.scrollY > scrollThreshold) {
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-3');
        backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-3');
        backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    }

    // Passive scroll listener for maximum performance
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      backToTopBtn.blur();
    });
  }

  // --- CUSTOM AUDIO PLAYER ENGINE ---
  const audioCards = document.querySelectorAll('.custom-audio-card');
  const allAudioElements = document.querySelectorAll('.custom-audio-element');

  function formatAudioTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  audioCards.forEach((card) => {
    const playBtn = card.querySelector('.audio-play-btn');
    const playIcon = card.querySelector('.play-icon');
    const pauseIcon = card.querySelector('.pause-icon');
    const audio = card.querySelector('.custom-audio-element');
    const progressBar = card.querySelector('.audio-progress-bar');
    const progressContainer = card.querySelector('.audio-progress-container');
    const timeCurrent = card.querySelector('.audio-time-current');
    const timeDuration = card.querySelector('.audio-time-duration');

    if (!audio || !playBtn) return;

    function pausePlayer() {
      audio.pause();
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      const currentLabel = playBtn.getAttribute('aria-label') || '';
      playBtn.setAttribute('aria-label', currentLabel.replace('Pause', 'Play'));
    }

    function playPlayer() {
      // Pause all other audio players
      allAudioElements.forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          const otherCard = otherAudio.closest('.custom-audio-card');
          if (otherCard) {
            const oPlayIcon = otherCard.querySelector('.play-icon');
            const oPauseIcon = otherCard.querySelector('.pause-icon');
            if (oPlayIcon && oPauseIcon) {
              oPlayIcon.classList.remove('hidden');
              oPauseIcon.classList.add('hidden');
            }
          }
        }
      });

      audio.play().then(() => {
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        const currentLabel = playBtn.getAttribute('aria-label') || '';
        playBtn.setAttribute('aria-label', currentLabel.replace('Play', 'Pause'));
      }).catch((err) => {
        console.warn('Audio playback info:', err);
      });
    }

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        playPlayer();
      } else {
        pausePlayer();
      }
    });

    audio.addEventListener('loadedmetadata', function () {
      if (timeDuration && !isNaN(audio.duration)) {
        timeDuration.textContent = formatAudioTime(audio.duration);
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (timeCurrent) {
        timeCurrent.textContent = formatAudioTime(audio.currentTime);
      }
      if (timeDuration && audio.duration && !isNaN(audio.duration)) {
        timeDuration.textContent = formatAudioTime(audio.duration);
        const percent = (audio.currentTime / audio.duration) * 100;
        if (progressBar) {
          progressBar.style.width = `${percent}%`;
        }
      }
    });

    audio.addEventListener('ended', function () {
      pausePlayer();
      if (progressBar) progressBar.style.width = '0%';
      if (timeCurrent) timeCurrent.textContent = '00:00';
    });

    if (progressContainer) {
      progressContainer.addEventListener('click', function (e) {
        if (!audio.duration || isNaN(audio.duration)) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPos * audio.duration;
      });
    }
  });
});

// Asynchronous contact forms handler
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Quick visual feedback on submit button
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerText : 'Send';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';
  }

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then((response) => {
      form.reset();
      // Redirect or open thank_you page
      window.location.href = "pages/thank_you.html";
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    });
}
