import gsap from 'gsap';

export const initCheckoutAnimations = () => {
  // Slide in main checkout content
  const checkoutSlide = document.querySelector('.checkout-slide-in');
  if (checkoutSlide) {
    gsap.from(checkoutSlide, {
      duration: 0.5,
      x: 300,
      opacity: 0.8,
      ease: 'power3.out'
    });
  }

  // Slide in order summary
  const orderSummary = document.querySelector('.order-summary-slide-in');
  if (orderSummary) {
    gsap.from(orderSummary, {
      duration: 0.5,
      x: -300,
      opacity: 0.8,
      ease: 'power3.out',
      delay: 0.05
    });
  }

  // Animate form labels with reduced animation
  const labels = document.querySelectorAll('label');
  labels.forEach((label, index) => {
    gsap.from(label, {
      duration: 0.3,
      opacity: 0.9,
      y: -5,
      ease: 'power2.out',
      delay: 0.05 + index * 0.02
    });
  });

  // Animate input fields
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    gsap.from(input, {
      duration: 0.3,
      opacity: 0.9,
      y: 5,
      ease: 'power2.out',
      delay: 0.08 + index * 0.02
    });

    // Add focus animation
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.1)',
        duration: 0.2
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: 'none',
        duration: 0.2
      });
    });
  });

  // Animate buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.02,
        duration: 0.2
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.2
      });
    });
  });

  // Animate payment method cards
  const paymentCards = document.querySelectorAll('[class*="border-gray-300"]');
  paymentCards.forEach((card) => {
    if (card.parentElement?.textContent?.includes('Payment')) {
      card.addEventListener('click', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.2
        });
      });
    }
  });
};
