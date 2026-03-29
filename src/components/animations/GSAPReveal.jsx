import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GSAPReveal({ children, stagger = false, className = '' }) {
  const container = useRef(null);

  useGSAP(() => {
    if (stagger) {
      const elements = container.current.children;
      gsap.from(elements, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    } else {
      gsap.from(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
