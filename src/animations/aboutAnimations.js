import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  pageTransitionIn,
  glowEffect,
  magneticHover,
  shimmerEffect,
  flipIn,
  countupNumber,
  rotateIn
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateAboutContainer = () => {
  pageTransitionIn(0.8);

  gsap.from('.about-container', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

export const animateAboutHeader = () => {
  gsap.from('.about-header', {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.about-header');
    }
  });

  gsap.from('.about-subtitle', {
    duration: 0.8,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });
};

export const animateStorySection = () => {
  gsap.from('.story-section', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 80%',
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.story-section');
    }
  });
};

export const animateValuesCards = () => {
  gsap.utils.toArray('.values-card').forEach((card, index) => {
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
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateTeamCards = () => {
  gsap.utils.toArray('.team-card').forEach((card, index) => {
    // Apply flip animation
    flipIn(card, 0.6 + (index * 0.08));

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      duration: 0.6,
      opacity: 0,
      delay: index * 0.1,
      ease: 'back.out'
    });

    const image = card.querySelector('.team-image');
    if (image) {
      shimmerEffect(image);
    }

    // Image zoom on hover
    card.addEventListener('mouseenter', () => {
      if (image) {
        gsap.to(image, {
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      gsap.to(card.querySelector('.team-info'), {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });

      glowEffect(card);
    });

    card.addEventListener('mouseleave', () => {
      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      gsap.to(card.querySelector('.team-info'), {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

export const animateStatsSection = () => {
  gsap.utils.toArray('.stats-item').forEach((item, index) => {
    const number = item.querySelector('.stat-number');
    
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    });

    // Enhanced counter animation with rollup effect
    if (number) {
      gsap.from({ value: 0 }, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.to({ value: 0 }, {
              value: parseInt(number.textContent) || 100,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: function() {
                number.textContent = Math.floor(this.targets()[0].value);
              }
            });
          }
        },
        duration: 2.5,
      });

      // Pulse on complete
      gsap.utils.toArray('.stats-item').forEach(statsItem => {
        magneticHover(statsItem);
      });
    }
  });
};

export const animateWhyChooseSection = () => {
  gsap.from('.why-choose-section', {
    scrollTrigger: {
      trigger: '.why-choose-section',
      start: 'top 80%',
    },
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    onComplete: () => {
      glowEffect('.why-choose-section');
    }
  });

  gsap.utils.toArray('.why-choose-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out',
      onComplete: () => {
        magneticHover(item);
      }
    });
  });
};

export const initAboutAnimations = () => {
  animateAboutContainer();
  animateAboutHeader();
  animateStorySection();
  animateValuesCards();
  animateTeamCards();
  animateStatsSection();
  animateWhyChooseSection();
};
