import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  particleEffect, 
  magneticHover, 
  shimmerEffect, 
  floatingAnimation,
  pageTransitionIn 
} from './advancedEffects';

gsap.registerPlugin(ScrollTrigger);

export const animateHeroSection = () => {
  // Page transition effect
  pageTransitionIn(0.8);

  // Hero title animation
  gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });

  // Hero subtitle animation
  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.2,
    ease: 'power3.out'
  });

  // Hero button with magnetic hover and particle effect
  const heroBtn = document.querySelector('.hero-button');
  if (heroBtn) {
    gsap.from(heroBtn, {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      delay: 0.4,
      ease: 'back.out'
    });

    magneticHover(heroBtn);
    heroBtn.addEventListener('click', () => {
      particleEffect(heroBtn, 25);
    });
  }

  // Hero image with advanced animation
  gsap.from('.hero-image', {
    duration: 1.2,
    x: 100,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });
};

export const animateFeaturedProducts = () => {
  gsap.utils.toArray('.featured-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Hover animation with floating effect
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -15,
        boxShadow: '0 25px 50px rgba(168, 85, 247, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });

      floatingAnimation(card, 2);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Add shimmer to images
    shimmerEffect(card.querySelector('img'));
  });
};

export const animateCategoriesSection = () => {
  gsap.utils.toArray('.category-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });
};

export const animateFeaturesSection = () => {
  gsap.from('.features-section', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
    },
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.feature-box').forEach((box, index) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power2.out'
    });

    // Icon rotation on scroll
    gsap.to(box.querySelector('.feature-icon'), {
      scrollTrigger: {
        trigger: box,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      rotation: 360,
      duration: 2,
    });
  });
};

export const animateTestimonials = () => {
  gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
};

export const animateNewsletterSection = () => {
  gsap.from('.newsletter-section', {
    scrollTrigger: {
      trigger: '.newsletter-section',
      start: 'top 80%',
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power3.out'
  });
};

export const animateStatsSection = () => {
  gsap.utils.toArray('.stat-item').forEach((item, index) => {
    const number = item.querySelector('.stat-number');
    
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Counter animation
    gsap.from({ value: 0 }, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ value: 0 }, {
            value: parseInt(number.textContent) || 100,
            duration: 2,
            onUpdate: function() {
              number.textContent = Math.floor(this.targets()[0].value);
            }
          });
        }
      },
      duration: 2,
    });
  });
};

export const initHomeAnimations = () => {
  animateHeroSection();
  animateFeaturedProducts();
  animateCategoriesSection();
  animateFeaturesSection();
  animateTestimonials();
  animateNewsletterSection();
  animateStatsSection();
};
