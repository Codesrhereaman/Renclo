import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cursorTrail } from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

// Global animation setup
export const initGlobalAnimations = () => {
  // Enable smooth scrolling globally
  gsap.registerPlugin(ScrollTrigger);

  // Cursor trail effect (optional - can be disabled if too intensive)
  // Uncomment the line below to enable cursor trail
  // cursorTrail();

  // Refresh ScrollTrigger on page load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';

  // Global hover effects for buttons
  setupGlobalButtonAnimations();

  // Global link animations
  setupGlobalLinkAnimations();

  // Loading spinner animation
  setupLoadingAnimation();
};

// Setup global button animations
const setupGlobalButtonAnimations = () => {
  gsap.utils.toArray('button').forEach((btn) => {
    // Skip if button already has animation
    if (btn._gsapAnimating) return;

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.2,
        ease: 'back.out',
        overwrite: 'auto'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out',
        overwrite: 'auto'
      });
    });

    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.15,
        ease: 'back.out'
      });
    });
  });
};

// Setup global link animations
const setupGlobalLinkAnimations = () => {
  gsap.utils.toArray('a').forEach((link) => {
    if (link.classList.contains('nav-link') || link.classList.contains('footer-link')) {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          color: '#a855f7',
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          color: 'inherit',
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    }
  });
};

// Loading spinner animation
const setupLoadingAnimation = () => {
  const loaders = document.querySelectorAll('.loading-spinner, .spinner');
  
  gsap.to(loaders, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center'
  });
};

// Animate on scroll - intersection observer based
export const observeElementsOnScroll = () => {
  const elements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute('data-animate');
        const duration = parseFloat(entry.target.getAttribute('data-duration') || '0.6');
        const delay = parseFloat(entry.target.getAttribute('data-delay') || '0');

        gsap.from(entry.target, {
          opacity: 0,
          y: 50,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
          onComplete: () => {
            observer.unobserve(entry.target);
          }
        });
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach((el) => observer.observe(el));
};

// Page loader animation
export const pageLoaderAnimation = () => {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  gsap.to(loader, {
    opacity: 0,
    y: -100,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.5,
    onComplete: () => {
      loader.style.display = 'none';
    }
  });
};

// Scroll to top button animation
export const scrollToTopButtonAnimation = () => {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      gsap.to(scrollBtn, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(scrollBtn, {
        opacity: 0,
        y: 20,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });

  scrollBtn.addEventListener('click', () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: 'power3.inOut'
    });
  });
};

// Navbar animation on scroll
export const navbarScrollAnimation = () => {
  const navbar = document.querySelector('header, nav');
  if (!navbar) return;

  let lastScrollY = 0;
  let scrollVelocity = 0;
  let scrollTicker = gsap.ticker.add(() => {
    const scrollY = window.scrollY;
    scrollVelocity = scrollY - lastScrollY;
    lastScrollY = scrollY;

    if (scrollY > 100) {
      gsap.to(navbar, {
        y: Math.min(scrollVelocity, 0),
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    } else {
      gsap.to(navbar, {
        y: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  });
};

// Form field animations
export const setupFormAnimations = () => {
  gsap.utils.toArray('input, textarea, select').forEach((field) => {
    field.addEventListener('focus', () => {
      gsap.to(field, {
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)',
        borderColor: '#a855f7',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    field.addEventListener('blur', () => {
      gsap.to(field, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        borderColor: 'inherit',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Character count animation
    field.addEventListener('input', () => {
      if (field.maxLength) {
        const length = field.value.length;
        const percentage = (length / field.maxLength) * 100;
        
        gsap.to(field, {
          '--progress': percentage,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
};

// Modal animations
export const setupModalAnimations = () => {
  // Modal entrance
  const modals = document.querySelectorAll('.modal, [role="dialog"]');
  
  modals.forEach((modal) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (modal.classList.contains('open') || modal.style.display !== 'none') {
            gsap.from(modal, {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: 'back.out'
            });
          }
        }
      });
    });

    observer.observe(modal, { attributes: true });
  });
};

// Notification animations
export const animateNotification = (element, duration = 4) => {
  gsap.timeline()
    .from(element, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: 'back.out'
    })
    .to(element, {
      opacity: 1,
      duration: 3.5
    })
    .to(element, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: 'back.in'
    }, duration - 0.5);
};

// Initialize all global animations
export const initializeWebsiteAnimations = () => {
  initGlobalAnimations();
  observeElementsOnScroll();
  setupFormAnimations();
  setupModalAnimations();
  navbarScrollAnimation();
  scrollToTopButtonAnimation();
  pageLoaderAnimation();
};
