import gsap from 'gsap';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  shimmerEffect,
  pulseEffect,
  continuousRotate
} from './advancedEffects';

export const animateResetPasswordForm = () => {
  pageTransitionIn(0.8);

  gsap.from('.reset-password-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });

  gsap.from('.reset-password-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.reset-password-header');
    }
  });

  gsap.from('.reset-password-description', {
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

  gsap.from('.password-strength', {
    duration: 0.6,
    opacity: 0,
    delay: 0.5,
    ease: 'power2.out',
    onComplete: () => {
      pulseEffect('.password-strength');
    }
  });

  const btn = document.querySelector('.reset-password-button');
  if (btn) {
    gsap.from(btn, {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      delay: 0.6,
      ease: 'back.out',
      onComplete: () => {
        magneticHover(btn);
        glowEffect(btn);
        btn.addEventListener('click', () => {
          particleEffect(btn, 25);
        });
      }
    });
  }

  gsap.from('.back-to-login-link', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.7,
    ease: 'power3.out'
  });
};

export const animatePasswordStrength = () => {
  const strengthBars = gsap.utils.toArray('.strength-bar');
  
  strengthBars.forEach((bar, index) => {
    bar.addEventListener('update', () => {
      gsap.to(bar, {
        scaleX: bar.classList.contains('active') ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
        background: bar.classList.contains('active')
          ? 'linear-gradient(90deg, #a855f7, #ec4899)'
          : '#e5e7eb'
      });
    });
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

export const animateShowPasswordButton = () => {
  gsap.utils.toArray('.show-password-btn').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      gsap.to(btn.querySelector('svg'), {
        rotation: 360,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateSuccessState = () => {
  gsap.from('.success-state', {
    duration: 0.6,
    scale: 0,
    opacity: 0,
    ease: 'back.out',
    onComplete: () => {
      pulseEffect('.success-state');
      glowEffect('.success-state');
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

  gsap.from('.success-message', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.4,
    ease: 'power2.out'
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

export const initResetPasswordAnimations = () => {
  animateResetPasswordForm();
  animatePasswordStrength();
  animateInputField();
  animateShowPasswordButton();
  animateSuccessState();
  animateErrorState();
};
