import gsap from 'gsap';
import { 
  pageTransitionIn, 
  magneticHover, 
  particleEffect, 
  glowEffect, 
  shimmerEffect,
  pulseEffect 
} from './advancedEffects';

export const animateSignupForm = () => {
  // Page transition entrance
  pageTransitionIn(0.8);

  // Form container entrance
  gsap.from('.signup-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });

  // Form header animation with glow
  gsap.from('.signup-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.signup-header');
    }
  });

  // Form fields staggered animation
  gsap.utils.toArray('.form-group').forEach((field, index) => {
    gsap.from(field, {
      duration: 0.8,
      x: -30,
      opacity: 0,
      delay: 0.2 + (index * 0.1),
      ease: 'power3.out'
    });

    const label = field.querySelector('label');
    if (label) {
      shimmerEffect(label);
    }
  });

  // Password strength indicator animation
  gsap.from('.password-strength', {
    duration: 0.6,
    opacity: 0,
    delay: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      pulseEffect('.password-strength');
    }
  });

  // Button animation with magnetic hover
  const signupBtn = document.querySelector('.signup-button');
  if (signupBtn) {
    gsap.from(signupBtn, {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      delay: 0.5,
      ease: 'back.out',
      onComplete: () => {
        magneticHover(signupBtn);
        signupBtn.addEventListener('click', (e) => {
          particleEffect(signupBtn, 20);
        });
        glowEffect(signupBtn);
      }
    });
  }

  // Social divider animation
  gsap.from('.social-divider', {
    duration: 0.8,
    opacity: 0,
    delay: 0.6,
    ease: 'power2.out'
  });

  // Social buttons animation
  gsap.utils.toArray('.social-buttons').forEach((btn, index) => {
    gsap.from(btn, {
      duration: 0.8,
      y: 20,
      opacity: 0,
      delay: 0.7 + (index * 0.1),
      ease: 'power3.out',
      onComplete: () => {
        if (btn.tagName === 'BUTTON') {
          magneticHover(btn);
          btn.addEventListener('click', () => {
            particleEffect(btn, 15);
          });
          glowEffect(btn);
        }
      }
    });
  });

  // Login link animation
  gsap.from('.login-link', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.8,
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

export const animateSocialButtons = () => {
  gsap.utils.toArray('.social-button').forEach((btn, index) => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      particleEffect(btn, 15);
    });
  });
};

export const animateCheckbox = () => {
  gsap.utils.toArray('.checkbox-input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkmark = checkbox.nextElementSibling;
      if (checkmark) {
        gsap.to(checkmark, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'back.out'
        });

        // Add glow effect
        if (checkbox.checked) {
          gsap.to(checkmark, {
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
            duration: 0.3
          });
        }
      }
    });
  });
};

export const animateFormValidation = () => {
  gsap.utils.toArray('.form-error').forEach(error => {
    gsap.from(error, {
      duration: 0.5,
      x: -15,
      opacity: 0,
      ease: 'power2.out'
    });

    gsap.to(error, {
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
      duration: 0.5
    });
  });

  gsap.utils.toArray('.form-success').forEach(success => {
    gsap.from(success, {
      duration: 0.5,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out'
    });

    gsap.to(success, {
      boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
      duration: 0.5
    });
  });
};

export const initSignupAnimations = () => {
  animateSignupForm();
  animatePasswordStrength();
  animateSocialButtons();
  animateCheckbox();
  animateFormValidation();
};
