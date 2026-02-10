import gsap from 'gsap';
import {
  glowEffect,
  magneticHover,
  particleEffect,
  continuousRotate,
  shimmerEffect
} from './advancedEffects';

export const initUserProfileAnimations = () => {
  // Right-slide animation for profile container
  const profileSlide = document.querySelector('.profile-slide-in');
  if (profileSlide) {
    gsap.from(profileSlide, {
      duration: 0.6,
      x: 300,
      opacity: 0.8,
      ease: 'power3.out'
    });
  }

  // Alert slide animations
  const alerts = document.querySelectorAll('.alert-slide-in');
  alerts.forEach((alert) => {
    gsap.from(alert, {
      duration: 0.5,
      x: 200,
      opacity: 0.8,
      ease: 'power2.out'
    });
  });

  // Info card slide animation
  const infoCard = document.querySelector('.info-slide-in');
  if (infoCard) {
    gsap.from(infoCard, {
      duration: 0.6,
      x: 300,
      opacity: 0.8,
      delay: 0.1,
      ease: 'power3.out'
    });
  }

  // Animate avatar if present
  const avatar = document.querySelector('.profile-avatar, [class*="avatar"]');
  if (avatar) {
    continuousRotate(avatar);
  }

  // Animate form labels if present
  const labels = document.querySelectorAll('label');
  labels.forEach((label) => {
    shimmerEffect(label);
  });

  // Add glow effects
  const headers = document.querySelectorAll('h1, h2');
  headers.forEach((header) => {
    glowEffect(header);
  });

  // Animate buttons with magnetic hover and glow
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('click', () => {
      // Particle effect on logout and edit buttons
      if (btn.textContent.includes('Edit') || btn.textContent.includes('Logout') || btn.textContent.includes('Save')) {
        const particleCount = btn.textContent.includes('Logout') ? 25 : 20;
        particleEffect(btn, particleCount);
      }
    });
  });
};

