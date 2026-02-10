import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  pageTransitionIn,
  shimmerEffect,
  glowEffect,
  magneticHover,
  particleEffect,
  flipIn,
  floatingAnimation
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateRentalCard = () => {
  // Page transition
  pageTransitionIn(0.8);

  gsap.utils.toArray('.rental-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      delay: index * 0.08,
      ease: 'power2.out'
    });

    // Apply flip animation
    flipIn(card, 0.4 + (index * 0.05));

    // Apply shimmer to images
    const image = card.querySelector('.rental-image');
    if (image) {
      shimmerEffect(image);
    }

    // Hover animation with glow
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 25px 50px rgba(168, 85, 247, 0.4)',
        duration: 0.3,
        ease: 'power2.out'
      });

      glowEffect(card);

      if (image) {
        gsap.to(image, {
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

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

export const animateSearchBar = () => {
  gsap.from('.rental-search-bar', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.rental-search-bar');
    }
  });
};

export const animateFilterSidebar = () => {
  gsap.from('.rental-filter-sidebar', {
    duration: 0.8,
    x: -50,
    opacity: 0,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.rental-filter-group').forEach((group, index) => {
    gsap.from(group, {
      scrollTrigger: {
        trigger: group,
        start: 'top 90%',
      },
      duration: 0.6,
      opacity: 0,
      x: -20,
      delay: index * 0.05,
      ease: 'power2.out',
      onComplete: () => {
        glowEffect(group);
      }
    });
  });
};

export const animateTopBar = () => {
  gsap.from('.rental-top-bar', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateViewDetailsButton = () => {
  gsap.utils.toArray('.view-details-btn').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      particleEffect(btn, 20);
    });
  });
};

export const animateRentButton = () => {
  gsap.utils.toArray('.rent-button').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });

      particleEffect(btn, 25);
    });

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.7)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateLoadingState = () => {
  gsap.to('.loading-spinner', {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear'
  });
};

export const animateEmptyState = () => {
  gsap.from('.rental-empty-state', {
    duration: 0.8,
    opacity: 0,
    scale: 0.9,
    ease: 'back.out'
  });

  const emptyIcon = document.querySelector('.rental-empty-state-icon');
  if (emptyIcon) {
    floatingAnimation(emptyIcon, 2);
  }
};

export const initRentalsAnimations = () => {
  animateSearchBar();
  animateFilterSidebar();
  animateTopBar();
  animateRentalCard();
  animateViewDetailsButton();
  animateRentButton();
  animateLoadingState();
  animateEmptyState();
};
