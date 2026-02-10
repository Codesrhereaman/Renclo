import gsap from 'gsap';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  scaleStagger,
  pulseEffect,
  shimmerEffect
} from './advancedEffects';

export const animateWishlistContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.wishlist-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateWishlistHeader = () => {
  gsap.from('.wishlist-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.wishlist-header');
    }
  });
};

export const animateWishlistCard = () => {
  gsap.utils.toArray('.wishlist-item').forEach((item, index) => {
    gsap.from(item, {
      duration: 0.6,
      opacity: 0,
      x: -30,
      delay: 0.2 + (index * 0.08),
      ease: 'power2.out'
    });

    const image = item.querySelector('img');
    if (image) {
      shimmerEffect(image);
    }

    // Hover animation with scale and glow
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 10,
        boxShadow: '0 15px 40px rgba(168, 85, 247, 0.3)',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });

      glowEffect(item);

      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.3
        });
      }
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.3
        });
      }
    });
  });
};

export const animateRemoveButton = () => {
  gsap.utils.toArray('.remove-from-wishlist').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      const item = btn.closest('.wishlist-item');
      if (item) {
        particleEffect(btn, 20);
        gsap.to(item, {
          x: 100,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: 'back.in',
          onComplete: () => item.remove()
        });
      }
    });
  });
};

export const animateAddToCartButton = () => {
  gsap.utils.toArray('.wishlist-add-to-cart').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      particleEffect(btn, 25);
      pulseEffect(btn);
    });
  });
};

export const animateEmptyWishlist = () => {
  gsap.from('.wishlist-empty', {
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    ease: 'back.out'
  });

  const emptyIcon = document.querySelector('.wishlist-empty-icon');
  if (emptyIcon) {
    gsap.from(emptyIcon, {
      duration: 1,
      rotation: 15,
      opacity: 0,
      delay: 0.2,
      ease: 'back.out',
      onComplete: () => {
        pulseEffect(emptyIcon);
      }
    });
  }
};

export const animateWishlistBadge = () => {
  gsap.utils.toArray('.wishlist-badge').forEach(badge => {
    gsap.from(badge, {
      duration: 0.5,
      scale: 0,
      opacity: 0,
      ease: 'back.out',
      onComplete: () => {
        pulseEffect(badge);
      }
    });
  });
};

export const initWishlistAnimations = () => {
  animateWishlistContainer();
  animateWishlistHeader();
  animateWishlistCard();
  animateRemoveButton();
  animateAddToCartButton();
  animateEmptyWishlist();
  animateWishlistBadge();
};
