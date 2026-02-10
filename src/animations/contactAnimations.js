import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  rotateIn,
  shimmerEffect,
  revealLeft,
  revealRight
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateContactContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.contact-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateContactHeader = () => {
  gsap.from('.contact-header', {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.contact-header');
    }
  });

  gsap.from('.contact-subtitle', {
    duration: 0.8,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });
};

export const animateContactForm = () => {
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    x: -30,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.contact-form-group').forEach((group, index) => {
    gsap.from(group, {
      duration: 0.6,
      opacity: 0,
      y: 20,
      delay: 0.2 + (index * 0.08),
      ease: 'power2.out'
    });

    const label = group.querySelector('label');
    if (label) {
      shimmerEffect(label);
    }
  });
};

export const animateContactInput = () => {
  gsap.utils.toArray('.contact-input').forEach(input => {
    gsap.set(input, {
      boxShadow: '0 0 0 0px rgba(168, 85, 247, 0)'
    });

    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateTextarea = () => {
  gsap.utils.toArray('.contact-textarea').forEach(textarea => {
    gsap.set(textarea, {
      boxShadow: '0 0 0 0px rgba(168, 85, 247, 0)'
    });

    textarea.addEventListener('focus', () => {
      gsap.to(textarea, {
        scale: 1.02,
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    textarea.addEventListener('blur', () => {
      gsap.to(textarea, {
        scale: 1,
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateSubmitButton = () => {
  const btn = document.querySelector('.contact-submit-button');
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
    particleEffect(btn, 25);
  });
};

export const animateContactInfo = () => {
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    x: 30,
    delay: 0.2,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.contact-info');
    }
  });

  gsap.utils.toArray('.contact-info-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      y: 20,
      delay: 0.3 + (index * 0.1),
      ease: 'power2.out'
    });

    magneticHover(item);

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 10,
        boxShadow: '0 15px 35px rgba(168, 85, 247, 0.2)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        boxShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateSocialMedia = () => {
  gsap.utils.toArray('.social-media-link').forEach((link, index) => {
    magneticHover(link);

    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.3,
        y: -8,
        boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
        duration: 0.3,
        ease: 'back.out'
      });

      gsap.to(link.querySelector('svg'), {
        rotation: 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'back.out'
      });

      gsap.to(link.querySelector('svg'), {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateFAQSection = () => {
  gsap.from('.faq-section', {
    scrollTrigger: {
      trigger: '.faq-section',
      start: 'top 80%',
    },
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.faq-section');
    }
  });

  gsap.utils.toArray('.faq-item').forEach((item, index) => {
    rotateIn(item, 0.6 + (index * 0.05));

    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      y: 20,
      delay: index * 0.05,
      ease: 'power2.out'
    });

    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        gsap.to(trigger.querySelector('.faq-icon'), {
          rotation: trigger.classList.contains('active') ? 180 : 0,
          duration: 0.3,
          ease: 'back.out'
        });

        gsap.to(trigger, {
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          duration: 0.3
        });
      });
    }
  });
};

export const initContactAnimations = () => {
  animateContactContainer();
  animateContactHeader();
  animateContactForm();
  animateContactInput();
  animateTextarea();
  animateSubmitButton();
  animateContactInfo();
  animateSocialMedia();
  animateFAQSection();
};
