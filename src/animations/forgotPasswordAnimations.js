import gsap from 'gsap';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  shimmerEffect,
  continuousRotate,
  pulseEffect
} from './advancedEffects';

export const animateForgotPasswordForm = () => {
  pageTransitionIn(0.8);

  gsap.from('.forgot-password-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });

  gsap.from('.forgot-password-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.forgot-password-header');
    }
  });

  gsap.from('.forgot-password-description', {
    duration: 0.8,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.form-group').forEach((group, index) => {
    gsap.from(group, {
      duration: 0.8,
      x: -30,
      opacity: 0,
      delay: 0.3 + (index * 0.08),
      ease: 'power3.out'
    });

    const label = group.querySelector('label');
    if (label) {
      shimmerEffect(label);
    }
  });

  const btn = document.querySelector('.forgot-password-button');
  if (btn) {
    gsap.from(btn, {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      delay: 0.5,
      ease: 'back.out',
      onComplete: () => {
        magneticHover(btn);
        glowEffect(btn);
        btn.addEventListener('click', () => {
          particleEffect(btn, 20);
        });
      }
    });
  }

  gsap.from('.back-to-login-link', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
  });
};

export const animateSuccessState = () => {
  gsap.from('.success-message', {
    duration: 0.6,
    scale: 0,
    opacity: 0,
    ease: 'back.out',
    onComplete: () => {
      pulseEffect('.success-message');
      glowEffect('.success-message');
    }
  });

  const successIcon = document.querySelector('.success-icon');
  if (successIcon) {
    gsap.from(successIcon, {
      duration: 1,
      rotation: 360,
      opacity: 0,
      delay: 0.2,
      ease: 'back.out',
      onComplete: () => {
        continuousRotate(successIcon, 0.5);
      }
    });
  }

  gsap.from('.success-text', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.4,
    ease: 'power2.out'
  });
};

export const animateInputField = () => {
  gsap.utils.toArray('.form-group input').forEach(input => {
    gsap.set(input, {
      boxShadow: '0 0 0 0px rgba(168, 85, 247, 0)'
    });

    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateErrorState = () => {
  gsap.utils.toArray('.error-message').forEach(msg => {
    gsap.from(msg, {
      duration: 0.5,
      x: -20,
      opacity: 0,
      ease: 'power2.out'
    });

    gsap.to(msg, {
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
      duration: 0.5
    });
  });
};

export const initForgotPasswordAnimations = () => {
  animateForgotPasswordForm();
  animateSuccessState();
  animateInputField();
  animateErrorState();
};
