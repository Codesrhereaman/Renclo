import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============= PAGE TRANSITIONS =============

export const pageTransitionIn = (duration = 0.8) => {
  const timeline = gsap.timeline();
  
  timeline.from('main', {
    opacity: 0,
    y: 30,
    duration: duration,
    ease: 'power3.out'
  });

  return timeline;
};

export const pageTransitionOut = (duration = 0.5) => {
  return gsap.to('main', {
    opacity: 0,
    y: -20,
    duration: duration,
    ease: 'power3.in'
  });
};

// ============= PARALLAX EFFECTS =============

export const createParallax = (element, speed = 0.5) => {
  gsap.to(element, {
    y: window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false
    }
  });
};

export const parallaxBackground = (selector, speed = -0.3) => {
  gsap.utils.toArray(selector).forEach((element) => {
    gsap.to(element, {
      y: () => ScrollTrigger.getVelocity() * speed,
      scrollTrigger: {
        trigger: element,
        onUpdate: (self) => {
          gsap.to(element, {
            y: self.getVelocity() * speed,
            duration: 1,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }
      }
    });
  });
};

// ============= FLOATING ANIMATIONS =============

export const floatingAnimation = (element, duration = 3) => {
  gsap.to(element, {
    y: -20,
    duration: duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
};

export const floatingRotation = (element, duration = 4) => {
  gsap.to(element, {
    rotation: 360,
    duration: duration,
    ease: 'none',
    repeat: -1
  });
};

// ============= GLOW & SHIMMER EFFECTS =============

export const glowEffect = (element, intensity = 1) => {
  gsap.to(element, {
    boxShadow: `0 0 ${20 * intensity}px rgba(168, 85, 247, 0.8)`,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
};

export const shimmerEffect = (selector) => {
  gsap.utils.toArray(selector).forEach((element) => {
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer-overlay';
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    `;
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);

    gsap.to(shimmer, {
      left: '100%',
      duration: 2,
      repeat: -1,
      ease: 'linear'
    });
  });
};

// ============= PARTICLE ANIMATIONS =============

export const particleEffect = (element, particleCount = 20) => {
  const rect = element.getBoundingClientRect();
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #a855f7, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
    `;
    document.body.appendChild(particle);

    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 200 + Math.random() * 200;

    gsap.to(particle, {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity,
      opacity: 0,
      duration: 1,
      ease: 'power1.out',
      onComplete: () => particle.remove()
    });
  }
};

// ============= BLUR & BACKDROP EFFECTS =============

export const blurIn = (element, blurAmount = 10, duration = 0.6) => {
  gsap.from(element, {
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
    duration: duration,
    ease: 'power2.out'
  });
};

export const blurOut = (element, blurAmount = 10, duration = 0.4) => {
  return gsap.to(element, {
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
    duration: duration,
    ease: 'power2.in'
  });
};

// ============= STAGGER & CASCADE EFFECTS =============

export const staggerIn = (selector, duration = 0.6, staggerDelay = 0.1) => {
  gsap.from(selector, {
    opacity: 0,
    y: 20,
    duration: duration,
    stagger: staggerDelay,
    ease: 'power2.out'
  });
};

export const cascadeIn = (selector, duration = 0.8, cascadeDelay = 0.15) => {
  gsap.from(selector, {
    opacity: 0,
    x: -50,
    duration: duration,
    stagger: cascadeDelay,
    ease: 'back.out'
  });
};

export const scaleStagger = (selector, duration = 0.5, staggerDelay = 0.08) => {
  gsap.from(selector, {
    scale: 0,
    opacity: 0,
    duration: duration,
    stagger: staggerDelay,
    ease: 'back.out'
  });
};

// ============= PULSE & HEARTBEAT EFFECTS =============

export const pulseEffect = (element, intensity = 1.2) => {
  gsap.to(element, {
    scale: intensity,
    duration: 0.4,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};

export const heartbeatEffect = (element) => {
  gsap.timeline({ repeat: -1 }).to(element, {
    scale: 1.1,
    duration: 0.3
  }).to(element, {
    scale: 0.95,
    duration: 0.2
  }).to(element, {
    scale: 1.15,
    duration: 0.3
  }).to(element, {
    scale: 1,
    duration: 0.2
  });
};

// ============= BOUNCE & ELASTIC EFFECTS =============

export const bounceIn = (element, duration = 0.6) => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: duration,
    ease: 'back.out'
  });
};

export const elasticBounce = (element, power = 1.5) => {
  gsap.to(element, {
    y: -10,
    duration: 0.4,
    ease: `elastic.out(${power})`,
    repeat: -1,
    repeatDelay: 2
  });
};

// ============= FLIP & ROTATE EFFECTS =============

export const flipIn = (element, duration = 0.8) => {
  gsap.from(element, {
    rotationY: 90,
    opacity: 0,
    duration: duration,
    ease: 'back.out'
  });
};

export const rotateIn = (element, duration = 0.8, angle = 360) => {
  gsap.from(element, {
    rotation: angle,
    opacity: 0,
    duration: duration,
    ease: 'back.out'
  });
};

export const continuousRotate = (element, duration = 8, loop = true) => {
  gsap.to(element, {
    rotation: 360,
    duration: duration,
    ease: 'none',
    repeat: loop ? -1 : 0
  });
};

// ============= REVEAL EFFECTS =============

export const revealLeft = (element, duration = 0.8) => {
  gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: duration,
    ease: 'power3.out'
  });
};

export const revealRight = (element, duration = 0.8) => {
  gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: duration,
    ease: 'power3.out'
  });
};

export const revealTop = (element, duration = 0.8) => {
  gsap.from(element, {
    y: -100,
    opacity: 0,
    duration: duration,
    ease: 'power3.out'
  });
};

export const revealBottom = (element, duration = 0.8) => {
  gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: duration,
    ease: 'power3.out'
  });
};

// ============= GRADIENT ANIMATIONS =============

export const gradientShift = (element, colors, duration = 3) => {
  const animation = gsap.to(element, {
    backgroundPosition: '200% center',
    duration: duration,
    ease: 'none',
    repeat: -1,
    yoyo: true
  });
  
  element.style.background = `linear-gradient(90deg, ${colors.join(', ')})`;
  element.style.backgroundSize = '200% center';
  
  return animation;
};

// ============= TEXT ANIMATIONS =============

export const textReveal = (element, duration = 0.8) => {
  const chars = element.textContent.split('');
  element.textContent = '';
  
  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
  });

  gsap.to(element.querySelectorAll('span'), {
    opacity: 1,
    duration: duration / chars.length,
    stagger: duration / chars.length,
    ease: 'back.out'
  });
};

export const typewriterEffect = (element, duration = 2) => {
  const text = element.textContent;
  element.textContent = '';

  gsap.to({}, {
    onUpdate: function() {
      const progress = this.progress();
      const charCount = Math.floor(text.length * progress);
      element.textContent = text.substring(0, charCount);
    },
    duration: duration,
    ease: 'none'
  });
};

// ============= MORPHING & SHAPE SHIFTS =============

export const morphShape = (element, duration = 1.5) => {
  const shapes = ['50%', '30%', '60%', '50%'];
  let shapeIndex = 0;

  setInterval(() => {
    gsap.to(element, {
      borderRadius: shapes[shapeIndex],
      duration: duration,
      ease: 'sine.inOut'
    });
    shapeIndex = (shapeIndex + 1) % shapes.length;
  }, duration * 1000);
};

// ============= COUNTDOWN ANIMATION =============

export const countupNumber = (element, startNum = 0, endNum = 100, duration = 2) => {
  gsap.to({ value: startNum }, {
    value: endNum,
    duration: duration,
    ease: 'power2.out',
    onUpdate: function() {
      element.textContent = Math.floor(this.targets()[0].value);
    }
  });
};

// ============= SMOOTH SCROLL TO ELEMENT =============

export const smoothScrollTo = (element, offset = 100) => {
  gsap.to(window, {
    scrollTo: {
      y: element,
      offsetY: offset,
      autoKill: false
    },
    duration: 1.5,
    ease: 'power2.inOut'
  });
};

// ============= COLOR MORPH ANIMATION =============

export const colorMorph = (element, colors = ['#a855f7', '#ec4899', '#f97316'], duration = 3) => {
  let colorIndex = 0;

  setInterval(() => {
    gsap.to(element, {
      backgroundColor: colors[colorIndex],
      duration: duration,
      ease: 'sine.inOut'
    });
    colorIndex = (colorIndex + 1) % colors.length;
  }, duration * 1000);
};

// ============= COMBO EFFECTS =============

export const awesomeEntrance = (element, duration = 1) => {
  gsap.timeline()
    .from(element, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: duration * 0.6,
      ease: 'back.out'
    }, 0)
    .from(element, {
      filter: 'blur(10px)',
      duration: duration * 0.4,
      ease: 'power2.out'
    }, 0);
};

export const magneticHover = (element) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (e.clientX - centerX) * 0.3;
    const offsetY = (e.clientY - centerY) * 0.3;

    gsap.to(element, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1.2)'
    });
  });
};

export const cursorTrail = () => {
  const trails = [];
  
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, #a855f7, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
    `;
    document.body.appendChild(trail);
    trails.push(trail);

    if (trails.length > 50) {
      trails.shift().remove();
    }

    gsap.to(trail, {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => trail.remove()
    });
  });
};
