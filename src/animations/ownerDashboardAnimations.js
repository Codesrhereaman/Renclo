import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  particleEffect,
  shimmerEffect,
  staggerIn,
  countupNumber
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateOwnerDashboardContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.owner-dashboard-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateDashboardHeader = () => {
  gsap.from('.dashboard-header', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    delay: 0.1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.dashboard-header');
    }
  });

  gsap.from('.dashboard-welcome', {
    duration: 0.8,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });
};

export const animateStatsCards = () => {
  gsap.utils.toArray('.stat-card').forEach((card, index) => {
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

    // Hover animation with glow
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 50px rgba(168, 85, 247, 0.3)',
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });

      glowEffect(card);

      gsap.to(card.querySelector('.stat-icon'), {
        scale: 1.2,
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

      gsap.to(card.querySelector('.stat-icon'), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out'
      });
    });
  });
};

export const animateInventoryTable = () => {
  gsap.from('.inventory-table', {
    scrollTrigger: {
      trigger: '.inventory-table',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.inventory-table');
    }
  });

  gsap.utils.toArray('.table-row').forEach((row, index) => {
    gsap.from(row, {
      duration: 0.5,
      opacity: 0,
      x: -20,
      delay: 0.3 + (index * 0.05),
      ease: 'power2.out'
    });

    row.addEventListener('mouseenter', () => {
      gsap.to(row, {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    row.addEventListener('mouseleave', () => {
      gsap.to(row, {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
};

export const animateRecentActivitySection = () => {
  gsap.from('.recent-activity-section', {
    scrollTrigger: {
      trigger: '.recent-activity-section',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.activity-item').forEach((item, index) => {
    gsap.from(item, {
      duration: 0.5,
      opacity: 0,
      x: -20,
      delay: 0.2 + (index * 0.05),
      ease: 'power2.out'
    });

    magneticHover(item);
  });
};

export const animateUploadItemForm = () => {
  gsap.from('.upload-item-form', {
    scrollTrigger: {
      trigger: '.upload-item-form',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    x: -30,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.form-group').forEach((group, index) => {
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

export const animateUploadButton = () => {
  gsap.utils.toArray('.upload-button').forEach(btn => {
    magneticHover(btn);
    glowEffect(btn);

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.5)',
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
  });
};

export const animatePayoutInfo = () => {
  gsap.from('.payout-info', {
    scrollTrigger: {
      trigger: '.payout-info',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.payout-info');
    }
  });

  gsap.utils.toArray('.payout-item').forEach((item, index) => {
    gsap.from(item, {
      duration: 0.6,
      opacity: 0,
      y: 20,
      delay: 0.2 + (index * 0.08),
      ease: 'power2.out'
    });
  });
};

export const initOwnerDashboardAnimations = () => {
  animateOwnerDashboardContainer();
  animateDashboardHeader();
  animateStatsCards();
  animateInventoryTable();
  animateRecentActivitySection();
  animateUploadItemForm();
  animateUploadButton();
  animatePayoutInfo();
};
