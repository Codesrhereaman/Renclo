import gsap from 'gsap';
import { 
  pageTransitionIn,
  shimmerEffect, 
  glowEffect, 
  magneticHover, 
  particleEffect,
  bounceIn,
  floatingAnimation 
} from './advancedEffects';

export const animateProductCard = () => {
  // Page transition
  pageTransitionIn(0.8);

  gsap.utils.toArray('.product-card').forEach((card, index) => {
    gsap.from(card, {
      duration: 0.6,
      opacity: 0,
      y: 30,
      delay: index * 0.08,
      ease: 'power2.out'
    });

    // Apply shimmer to product images
    const image = card.querySelector('.product-image');
    if (image) {
      shimmerEffect(image);
    }

    // Hover animation with glow
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Apply glow effect
      glowEffect(card);

      if (image) {
        gsap.to(image, {
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      // Floating animation
      floatingAnimation(card, 0.5);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
};

export const animateFilterSidebar = () => {
  gsap.from('.filter-sidebar', {
    duration: 0.8,
    x: -50,
    opacity: 0,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.filter-group').forEach((group, index) => {
    gsap.from(group, {
      duration: 0.6,
      opacity: 0,
      y: 20,
      delay: index * 0.08,
      ease: 'power2.out',
      onComplete: () => {
        glowEffect(group);
      }
    });
  });
};

export const animateProductGrid = () => {
  gsap.from('.products-grid', {
    duration: 0.8,
    opacity: 0,
    ease: 'power3.out'
  });
};

export const animatePagination = () => {
  gsap.utils.toArray('.pagination-button').forEach((btn, index) => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        boxShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateAddToCartButton = () => {
  gsap.utils.toArray('.add-to-cart-btn').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      // Bounce animation
      bounceIn(btn);

      // Particle effect
      particleEffect(btn, 25);

      // Ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      btn.appendChild(ripple);
      
      gsap.to(ripple, {
        width: 300,
        height: 300,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });
};

export const animateEmptyState = () => {
  gsap.from('.empty-state', {
    duration: 0.8,
    opacity: 0,
    scale: 0.9,
    ease: 'back.out'
  });

  gsap.from('.empty-state-icon', {
    duration: 1,
    rotation: -15,
    opacity: 0,
    delay: 0.2,
    ease: 'back.out'
  });

  // Floating animation for empty state
  const emptyIcon = document.querySelector('.empty-state-icon');
  if (emptyIcon) {
    floatingAnimation(emptyIcon, 2);
  }
};

export const initProductsAnimations = () => {
  animateProductCard();
  animateFilterSidebar();
  animateProductGrid();
  animatePagination();
  animateAddToCartButton();
  animateEmptyState();
};
