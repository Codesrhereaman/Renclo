import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  shimmerEffect,
  rotateIn,
  scaleStagger
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateBecomeOwnerContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.become-owner-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateBecomeOwnerHeader = () => {
  gsap.from('.become-owner-header', {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.become-owner-header');
    }
  });

  gsap.from('.become-owner-subtitle', {
    duration: 0.8,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });
};

export const animateBenefitsSection = () => {
  gsap.utils.toArray('.benefit-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      delay: index * 0.1,
      ease: 'power2.out',
      onComplete: () => {
        shimmerEffect(card);
      }
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 50px rgba(168, 85, 247, 0.3)',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });

      glowEffect(card);

      gsap.to(card.querySelector('.benefit-icon'), {
        scale: 1.3,
        rotation: 15,
        duration: 0.3,
        ease: 'back.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(card.querySelector('.benefit-icon'), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out'
      });
    });
  });
};

export const animateStepsSection = () => {
  gsap.utils.toArray('.step-card').forEach((card, index) => {
    rotateIn(card, 0.6 + (index * 0.08));

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      delay: index * 0.1,
      ease: 'power2.out'
    });

    // Step number animation with scale and glow
    const stepNumber = card.querySelector('.step-number');
    if (stepNumber) {
      gsap.from(stepNumber, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        duration: 0.8,
        scale: 0,
        opacity: 0,
        delay: 0.2,
        ease: 'back.out',
        onComplete: () => {
          glowEffect(stepNumber);
        }
      });
    }
  });
};

export const animateRequirementsSection = () => {
  gsap.from('.requirements-section', {
    scrollTrigger: {
      trigger: '.requirements-section',
      start: 'top 80%',
    },
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.requirements-section');
    }
  });

  gsap.utils.toArray('.requirement-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      x: -30,
      delay: index * 0.05,
      ease: 'power2.out'
    });

    magneticHover(item);
  });
};

export const animateTestimonialsSection = () => {
  gsap.utils.toArray('.owner-testimonial').forEach((testimonial, index) => {
    gsap.from(testimonial, {
      scrollTrigger: {
        trigger: testimonial,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      delay: index * 0.1,
      ease: 'power2.out',
      onComplete: () => {
        shimmerEffect(testimonial);
      }
    });

    magneticHover(testimonial);
  });
};

export const animateCtaSection = () => {
  gsap.from('.cta-section', {
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 80%',
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.cta-section');
    }
  });

  const ctaBtn = document.querySelector('.cta-button');
  if (ctaBtn) {
    gsap.from(ctaBtn, {
      scrollTrigger: {
        trigger: ctaBtn,
        start: 'top 80%',
      },
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      delay: 0.3,
      ease: 'back.out',
      onComplete: () => {
        magneticHover(ctaBtn);
        glowEffect(ctaBtn);
      }
    });
  }
};

export const animateCtaButton = () => {
  gsap.utils.toArray('.cta-button').forEach(btn => {
    magneticHover(btn);

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        boxShadow: '0 20px 50px rgba(168, 85, 247, 0.5)',
        duration: 0.3,
        ease: 'back.out'
      });

      const arrow = btn.querySelector('.btn-arrow');
      if (arrow) {
        gsap.to(arrow, {
          x: 15,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'back.out'
      });

      const arrow = btn.querySelector('.btn-arrow');
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('click', () => {
      particleEffect(btn, 30);
    });
  });
};

export const initBecomeOwnerAnimations = () => {
  animateBecomeOwnerContainer();
  animateBecomeOwnerHeader();
  animateBenefitsSection();
  animateStepsSection();
  animateRequirementsSection();
  animateTestimonialsSection();
  animateCtaSection();
  animateCtaButton();
};
