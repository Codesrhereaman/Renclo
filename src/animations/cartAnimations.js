import gsap from 'gsap';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  staggerIn,
  pulseEffect,
  shimmerEffect
} from './advancedEffects';

export const animateCartContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.cart-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateCartHeader = () => {
  gsap.from('.cart-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.cart-header');
    }
  });
};

export const animateCartItem = () => {
  gsap.utils.toArray('.cart-item').forEach((item, index) => {
    gsap.from(item, {
      duration: 0.6,
      opacity: 0,
      x: -30,
      delay: 0.2 + (index * 0.08),
      ease: 'power2.out'
    });

    // Apply shimmer to item images
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
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateQuantityButtons = () => {
  gsap.utils.toArray('.quantity-btn').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      // Pulse effect on quantity change
      pulseEffect(btn);
      
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    });
  });
};

export const animateRemoveButton = () => {
  gsap.utils.toArray('.remove-from-cart').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
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

export const animateCartSummary = () => {
  gsap.from('.cart-summary', {
    duration: 0.8,
    opacity: 0,
    x: 50,
    delay: 0.3,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.cart-summary');
    }
  });

  gsap.utils.toArray('.summary-row').forEach((row, index) => {
    gsap.from(row, {
      duration: 0.6,
      opacity: 0,
      y: 10,
      delay: 0.4 + (index * 0.08),
      ease: 'power2.out'
    });
  });
};

export const animateCheckoutButton = () => {
  const btn = document.querySelector('.checkout-button');
  if (!btn) return;

  magneticHover(btn);
  glowEffect(btn);

  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      boxShadow: '0 20px 40px rgba(168, 85, 247, 0.5)',
      duration: 0.3,
      ease: 'back.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'back.out'
    });
  });

  btn.addEventListener('click', () => {
    particleEffect(btn, 30);
    pulseEffect(btn);
  });
};

export const animateContinueShoppingButton = () => {
  const btn = document.querySelector('.continue-shopping-button');
  if (!btn) return;

  magneticHover(btn);
  glowEffect(btn);

  btn.addEventListener('click', () => {
    particleEffect(btn, 20);
  });
};

export const animateEmptyCart = () => {
  gsap.from('.cart-empty', {
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    ease: 'back.out'
  });

  const emptyIcon = document.querySelector('.cart-empty-icon');
  if (emptyIcon) {
    gsap.from(emptyIcon, {
      duration: 1,
      rotation: -15,
      opacity: 0,
      delay: 0.2,
      ease: 'back.out',
      onComplete: () => {
        pulseEffect(emptyIcon);
      }
    });
  }
};

export const initCartAnimations = () => {
  animateCartContainer();
  animateCartHeader();
  animateCartItem();
  animateQuantityButtons();
  animateRemoveButton();
  animateCartSummary();
  animateCheckoutButton();
  animateContinueShoppingButton();
  animateEmptyCart();
};
