document.addEventListener('DOMContentLoaded', function () {
  // --- MOBILE NAVIGATION DRAWERS ---
  const menuToggles = document.querySelectorAll('.js-menu-toggle');
  const mobileMenu = document.querySelector('.site-mobile-menu');
  const mainNav = document.querySelector('.js-clone-nav');
  const mobileMenuBody = document.querySelector('.site-mobile-menu-body');

  // Clone main menu navigation items dynamically for mobile drawer
  if (mainNav && mobileMenuBody) {
    mobileMenuBody.innerHTML = mainNav.innerHTML;
    // Replace bootstrap or desktop classes for responsive drawer menu styling
    const mobileLinks = mobileMenuBody.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.className = "block py-3 px-6 text-slate-800 hover:text-primary font-medium text-lg border-b border-slate-100 transition-colors duration-200";
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

  // --- STICKY HEADER ---
  const header = document.querySelector('.js-sticky-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        header.classList.add('bg-white/95', 'shadow-md', 'backdrop-blur-md', 'py-3', 'header-scrolled');
        header.classList.remove('py-5', 'bg-transparent');
      } else {
        header.classList.add('py-5', 'bg-transparent');
        header.classList.remove('bg-white/95', 'shadow-md', 'backdrop-blur-md', 'py-3', 'header-scrolled');
      }
    });
  }

  // --- BOOK SCREENSHOTS CAROUSEL (VANILLA JS SLIDER) ---
  const screenshotCarousel = document.querySelector('.owl-carousel.slide-one-item');
  if (screenshotCarousel) {
    const slides = Array.from(screenshotCarousel.children);
    let currentIndex = 0;

    // Convert child list items to slider structure
    screenshotCarousel.classList.add('relative', 'overflow-hidden', 'w-full', 'aspect-[16/10]', 'rounded-xl', 'shadow-lg');
    slides.forEach((slide, index) => {
      slide.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
    });

    function showSlide(index) {
      slides[currentIndex].classList.replace('opacity-100', 'opacity-0');
      slides[currentIndex].classList.replace('z-10', 'z-0');
      
      currentIndex = (index + slides.length) % slides.length;
      
      slides[currentIndex].classList.replace('opacity-0', 'opacity-100');
      slides[currentIndex].classList.replace('z-0', 'z-10');
    }

    const prevBtn = document.querySelector('.customPrevBtn');
    const nextBtn = document.querySelector('.customNextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentIndex + 1);
      });
    }
  }

  // --- CAST OF CHARACTERS 3D AUTOPLAY CAROUSEL ---
  const castContainer = document.querySelector('.carousel-inner');
  if (castContainer) {
    // Collect all card items across original structure
    const originalCards = Array.from(castContainer.querySelectorAll('.card'));
    const totalCards = originalCards.length;
    
    // Empty out container to rebuild cleanly
    castContainer.innerHTML = '';
    castContainer.className = "carousel-inner-3d relative w-full h-[490px] md:h-[530px] flex items-center justify-center select-none py-6";

    // Create a container for dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = "carousel-dots mt-8";
    
    // Append dotsContainer to the parent section so it sits nicely below the carousel
    const parentSection = castContainer.parentNode;
    
    // Rebuild character cards
    const cards = originalCards.map((card, idx) => {
      const cardWrapper = document.createElement('div');
      cardWrapper.className = "card-3d w-[280px] sm:w-[310px] md:w-[340px] h-[410px] md:h-[450px] rounded-2xl overflow-hidden flex flex-col pointer-events-none";
      
      const img = card.querySelector('img');
      const body = card.querySelector('.card-body');
      const title = card.querySelector('.card-title');
      const text = card.querySelector('.card-text');

      cardWrapper.innerHTML = `
        <div class="card-3d-glass flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300">
          <div class="relative overflow-hidden h-48 md:h-56 bg-slate-950/25 flex items-center justify-center">
            <img 
              src="${img.getAttribute('src')}" 
              alt="${img.getAttribute('alt')}" 
              class="max-h-full max-w-full object-contain p-2 transition-transform duration-500 hover:scale-105"
              loading="lazy"
              draggable="false"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none"></div>
          </div>
          <div class="p-6 flex flex-col flex-grow bg-slate-900/10 backdrop-blur-sm justify-between">
            <div>
              <h4 class="text-lg md:text-xl font-bold font-oswald text-white tracking-wide mb-2 transition-colors duration-200">${title.innerText}</h4>
              <p class="text-slate-300 text-xs md:text-sm leading-relaxed font-light line-clamp-4">${text.innerText}</p>
            </div>
          </div>
        </div>
      `;
      
      // Click support to go directly to card if it's a side card
      cardWrapper.addEventListener('click', (e) => {
        if (idx !== activeIndex) {
          e.preventDefault();
          activeIndex = idx;
          update3DCarousel();
          resetAutoplay();
        }
      });

      // Keyboard focus transitions
      cardWrapper.addEventListener('focus', () => {
        activeIndex = idx;
        update3DCarousel();
        resetAutoplay();
      });

      castContainer.appendChild(cardWrapper);
      
      // Create dot
      const dot = document.createElement('button');
      dot.className = "carousel-dot";
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        activeIndex = idx;
        update3DCarousel();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);

      return cardWrapper;
    });

    // Append dots container below the 3D carousel
    parentSection.appendChild(dotsContainer);

    let activeIndex = 0;
    let autoplayInterval;

    function getSpacing() {
      if (window.innerWidth < 480) {
        return 75; // small screen offset
      } else if (window.innerWidth < 640) {
        return 110;
      } else if (window.innerWidth < 768) {
        return 150;
      } else if (window.innerWidth < 1024) {
        return 200;
      }
      return 270; // desktop spacing
    }

    function update3DCarousel() {
      const spacing = getSpacing();
      const isMobile = window.innerWidth < 640;
      const dots = Array.from(dotsContainer.children);
      
      cards.forEach((card, idx) => {
        // Calculate shortest distance in circular carousel
        let diff = idx - activeIndex;
        if (diff < -Math.floor(totalCards / 2)) {
          diff += totalCards;
        } else if (diff > Math.floor(totalCards / 2)) {
          diff -= totalCards;
        }

        const absDiff = Math.abs(diff);

        // Update dot states
        if (dots[idx]) {
          if (idx === activeIndex) {
            dots[idx].classList.add('active');
            dots[idx].setAttribute('aria-current', 'true');
          } else {
            dots[idx].classList.remove('active');
            dots[idx].removeAttribute('aria-current');
          }
        }

        // 3D positioning
        if (absDiff <= 2) {
          // Card is visible
          card.style.display = 'block';
          
          const translateX = diff * spacing;
          const translateZ = -absDiff * (isMobile ? 80 : 140); // push background cards back in z-space
          const rotateY = diff * -22; // angle cards towards active center
          const scale = 1 - absDiff * (isMobile ? 0.15 : 0.12); // scale background cards down
          const opacity = 1 - absDiff * 0.35; // fade background cards
          
          card.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.zIndex = 10 - absDiff;
          
          // Make interactive only if visible
          card.style.pointerEvents = 'auto';
          card.setAttribute('aria-hidden', 'false');
          card.setAttribute('tabindex', '0');
          
          if (idx === activeIndex) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        } else {
          // Hide other cards offscreen
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
          card.setAttribute('tabindex', '-1');
          card.classList.remove('active');
        }
      });
    }

    // Prev / Next actions
    function nextSlide() {
      activeIndex = (activeIndex + 1) % totalCards;
      update3DCarousel();
    }

    function prevSlide() {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      update3DCarousel();
    }

    const prevCastBtn = document.querySelector('#carouselMultiItemExample [data-slide="prev"]');
    const nextCastBtn = document.querySelector('#carouselMultiItemExample [data-slide="next"]');

    if (prevCastBtn) {
      prevCastBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextCastBtn) {
      nextCastBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      });
    }

    // Touch Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    castContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    castContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const threshold = 55;
      if (touchStartX - touchEndX > threshold) {
        nextSlide();
        resetAutoplay();
      } else if (touchEndX - touchStartX > threshold) {
        prevSlide();
        resetAutoplay();
      }
    }

    // Keyboard support for Arrow keys when focused
    castContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
      }
    });

    // Autoplay implementation
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 4500); // 4.5 seconds
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Pause autoplay on mouse hover for accessibility
    castContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    castContainer.addEventListener('mouseleave', () => {
      startAutoplay();
    });

    // Adjust position on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update3DCarousel, 100);
    });

    // Initialize
    update3DCarousel();
    startAutoplay();
  }

  // --- BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 280) {
        backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
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
