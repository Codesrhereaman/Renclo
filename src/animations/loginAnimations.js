import gsap from 'gsap';
import { 
  pageTransitionIn, 
  magneticHover, 
  particleEffect, 
  glowEffect, 
  awesomeEntrance,
  shimmerEffect 
} from './advancedEffects';

export const animateLoginForm = () => {
  // Page transition entrance
  pageTransitionIn(0.8);

  // Form container entrance
  gsap.from('.login-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });

  // Form header animation with glow
  gsap.from('.login-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.login-header');
    }
  });

  // Form fields staggered animation with awesome entrance
  gsap.utils.toArray('.form-group').forEach((field, index) => {
    gsap.from(field, {
      duration: 0.8,
      x: -30,
      opacity: 0,
      delay: 0.2 + (index * 0.1),
      ease: 'power3.out'
    });

    // Add shimmer effect to labels
    const label = field.querySelector('label');
    if (label) {
      shimmerEffect(label);
    }
  });

  // Button animation with magnetic hover
  const loginBtn = document.querySelector('.login-button');
  if (loginBtn) {
    gsap.from(loginBtn, {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      delay: 0.5,
      ease: 'back.out',
      onComplete: () => {
        magneticHover(loginBtn);
        loginBtn.addEventListener('click', (e) => {
          particleEffect(loginBtn, 20);
        });
      }
    });

    // Add glow on hover
    glowEffect(loginBtn);
  }

  // Links animation
  gsap.from('.login-links', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
  });
};

export const animateSocialButtons = () => {
  gsap.utils.toArray('.social-button').forEach((btn, index) => {
    // Apply awesome entrance animation
    gsap.from(btn, {
      duration: 0.6,
      opacity: 0,
      scale: 0.6,
      delay: 0.7 + (index * 0.1),
      ease: 'back.out'
    });

    // Magnetic hover effect
    magneticHover(btn);

    // Particle effect on click
    btn.addEventListener('click', () => {
      particleEffect(btn, 15);
    });

    // Glow effect
    glowEffect(btn);
  });
};

export const animateInputFields = () => {
  gsap.utils.toArray('.form-group input').forEach(input => {
    // Initial state
    gsap.set(input, { 
      boxShadow: '0 0 0 0px rgba(168, 85, 247, 0)' 
    });

    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateErrorMessages = () => {
  gsap.utils.toArray('.error-message').forEach(msg => {
    gsap.from(msg, {
      duration: 0.5,
      x: -20,
      opacity: 0,
      ease: 'back.out'
    });

    // Add red glow to error
    gsap.to(msg, {
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
      duration: 0.5
    });
  });
};

export const animateSuccessMessages = () => {
  gsap.utils.toArray('.success-message').forEach(msg => {
    gsap.from(msg, {
      duration: 0.5,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out'
    });

    // Add green glow to success
    gsap.to(msg, {
      boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
      duration: 0.5
    });
  });
};

export const initLoginAnimations = () => {
  animateLoginForm();
  animateSocialButtons();
  animateInputFields();
  animateErrorMessages();
  animateSuccessMessages();
};
