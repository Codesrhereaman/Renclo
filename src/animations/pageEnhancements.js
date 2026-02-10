import gsap from 'gsap';
import { 
  pageTransitionIn, 
  staggerIn, 
  floatingAnimation, 
  shimmerEffect,
  particleEffect,
  awesomeEntrance,
  magneticHover
} from './advancedEffects';

// Enhanced Home Page Animations
export const enhanceHomeAnimations = () => {
  // Page transition
  pageTransitionIn(0.6);

  // Hero section particles on scroll
  const heroBtn = document.querySelector('.hero-button');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      particleEffect(heroBtn, 25);
    });
    magneticHover(heroBtn);
  }

  // Floating product cards
  gsap.utils.toArray('.featured-card').forEach((card, index) => {
    floatingAnimation(card, 3 + index * 0.2);
  });

  // Shimmer effect on images
  shimmerEffect('.featured-card img');

  // Stagger featured products
  staggerIn('.featured-card', 0.8, 0.15);

  // Category items with awesome entrance
  gsap.utils.toArray('.category-item').forEach((item) => {
    awesomeEntrance(item, 0.8);
  });

  // Feature boxes with scale stagger
  gsap.from('.feature-box', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    ease: 'back.out'
  });
};

// Enhanced Login Animations
export const enhanceLoginAnimations = () => {
  pageTransitionIn(0.5);

  const form = document.querySelector('form');
  if (form) {
    awesomeEntrance(form, 0.8);
  }

  // Input fields with magnetic hover
  gsap.utils.toArray('input[type="email"], input[type="password"]').forEach((input) => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
        scale: 1.02,
        duration: 0.3
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        scale: 1,
        duration: 0.3
      });
    });
  });

  // Button ripple effect
  const submitBtn = document.querySelector('.login-button');
  if (submitBtn) {
    magneticHover(submitBtn);
    submitBtn.addEventListener('click', () => {
      particleEffect(submitBtn, 15);
    });
  }

  // Social buttons bouncing
  gsap.utils.toArray('.social-button').forEach((btn, i) => {
    gsap.to(btn, {
      y: -5,
      duration: 2 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
};

// Enhanced Products Animations
export const enhanceProductsAnimations = () => {
  pageTransitionIn(0.6);

  // Product cards with advanced hover
  gsap.utils.toArray('.product-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -15,
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(card.querySelector('.product-image'), {
        scale: 1.15,
        duration: 0.3
      });

      // Glow effect on image
      gsap.to(card, {
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3
      });

      gsap.to(card.querySelector('.product-image'), {
        scale: 1,
        duration: 0.3
      });

      gsap.to(card, {
        background: 'white',
        duration: 0.3
      });
    });
  });

  // Add to cart button with particle effect
  gsap.utils.toArray('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      particleEffect(btn, 20);
    });
  });

  // Filter sidebar entrance
  gsap.from('.filter-sidebar', {
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out'
  });
};

// Enhanced Rentals Animations
export const enhanceRentalsAnimations = () => {
  pageTransitionIn(0.6);

  // Rental cards with flip effect
  gsap.utils.toArray('.rental-card').forEach((card, index) => {
    gsap.from(card, {
      rotationY: 90,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'back.out'
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotationZ: 2,
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationZ: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3
      });
    });
  });

  // Search bar with focus glow
  const searchBar = document.querySelector('.rental-search-bar input');
  if (searchBar) {
    searchBar.addEventListener('focus', () => {
      gsap.to(searchBar.parentElement, {
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
        scale: 1.02,
        duration: 0.3
      });
    });

    searchBar.addEventListener('blur', () => {
      gsap.to(searchBar.parentElement, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        scale: 1,
        duration: 0.3
      });
    });
  }

  // Rent button bounce animation
  gsap.utils.toArray('.rent-button').forEach((btn) => {
    gsap.to(btn, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
};

// Enhanced Wishlist Animations
export const enhanceWishlistAnimations = () => {
  pageTransitionIn(0.5);

  // Wishlist items with heart animation
  gsap.utils.toArray('.wishlist-item').forEach((item) => {
    gsap.from(item, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out'
    });

    // Heart icon pulse
    const heart = item.querySelector('[class*="heart"]');
    if (heart) {
      gsap.to(heart, {
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });

  // Remove button with ripple
  gsap.utils.toArray('.remove-from-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      particleEffect(btn, 12);
    });
  });
};

// Enhanced Cart Animations
export const enhanceCartAnimations = () => {
  pageTransitionIn(0.5);

  // Cart items with slide animation
  staggerIn('.cart-item', 0.6, 0.1);

  // Quantity buttons with pulse
  gsap.utils.toArray('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gsap.to(btn, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    });
  });

  // Cart total with animated color
  const total = document.querySelector('.cart-summary');
  if (total) {
    gsap.to(total, {
      backgroundColor: 'rgba(168, 85, 247, 0.05)',
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Checkout button glow
  const checkoutBtn = document.querySelector('.checkout-button');
  if (checkoutBtn) {
    gsap.to(checkoutBtn, {
      boxShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    checkoutBtn.addEventListener('click', () => {
      particleEffect(checkoutBtn, 25);
    });
  }
};

// Enhanced Profile Animations
export const enhanceProfileAnimations = () => {
  pageTransitionIn(0.5);

  // Avatar with rotation
  const avatar = document.querySelector('.profile-avatar');
  if (avatar) {
    gsap.to(avatar, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'none'
    });

    magneticHover(avatar);
  }

  // Profile info with stagger
  staggerIn('.profile-section', 0.6, 0.1);

  // Edit button with magnetic effect
  const editBtn = document.querySelector('.edit-profile-button');
  if (editBtn) {
    magneticHover(editBtn);
  }

  // Logout button confirmation glow
  const logoutBtn = document.querySelector('.logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('mouseenter', () => {
      gsap.to(logoutBtn, {
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)',
        scale: 1.05,
        duration: 0.3
      });
    });
  }
};

// Enhanced About Animations
export const enhanceAboutAnimations = () => {
  pageTransitionIn(0.6);

  // Team cards with flip and rotate
  gsap.utils.toArray('.team-card').forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotationY: 10,
        rotationX: 5,
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.5
      });
    });
  });

  // Values cards shimmer
  shimmerEffect('.values-card');

  // Stats with counter animation
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const number = parseInt(stat.textContent);
    gsap.to({ value: 0 }, {
      value: number,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        stat.textContent = Math.floor(this.targets()[0].value);
      }
    });
  });
};

// Enhanced Contact Animations
export const enhanceContactAnimations = () => {
  pageTransitionIn(0.6);

  // Form fields with glow on focus
  gsap.utils.toArray('.contact-input, .contact-textarea').forEach(field => {
    field.addEventListener('focus', () => {
      gsap.to(field, {
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
        scale: 1.02,
        duration: 0.3
      });
    });

    field.addEventListener('blur', () => {
      gsap.to(field, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        scale: 1,
        duration: 0.3
      });
    });
  });

  // Submit button with ripple
  const submitBtn = document.querySelector('.contact-submit-button');
  if (submitBtn) {
    magneticHover(submitBtn);
    submitBtn.addEventListener('click', () => {
      particleEffect(submitBtn, 20);
    });
  }

  // FAQ items with rotation
  gsap.utils.toArray('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        gsap.to(trigger.querySelector('.faq-icon'), {
          rotation: 180,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });

  // Social media icons with orbit effect
  gsap.utils.toArray('.social-media-link').forEach((link, i) => {
    gsap.to(link, {
      y: -5,
      duration: 2 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
};

// Apply all enhancements based on page
export const applyPageEnhancements = (pageName) => {
  const enhancements = {
    'home': enhanceHomeAnimations,
    'login': enhanceLoginAnimations,
    'products': enhanceProductsAnimations,
    'rentals': enhanceRentalsAnimations,
    'wishlist': enhanceWishlistAnimations,
    'cart': enhanceCartAnimations,
    'profile': enhanceProfileAnimations,
    'about': enhanceAboutAnimations,
    'contact': enhanceContactAnimations
  };

  const enhancement = enhancements[pageName.toLowerCase()];
  if (enhancement) {
    enhancement();
  }
};
