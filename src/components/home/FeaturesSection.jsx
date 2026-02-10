import { Zap, ShieldCheck, Truck, RotateCcw, Sparkles, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, title: 'Affordable Rentals', desc: 'Pay just 25% of retail price', color: 'from-purple-100 to-purple-50' },
  { icon: ShieldCheck, title: 'Secure & Verified', desc: 'QR verification system', color: 'from-blue-100 to-blue-50' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day or next-day delivery', color: 'from-green-100 to-green-50' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Free pickup & return', color: 'from-yellow-100 to-yellow-50' },
  { icon: Sparkles, title: 'AI Styling', desc: 'Virtual try-on preview', color: 'from-pink-100 to-pink-50' },
  { icon: Users, title: 'Earn Money', desc: 'Monetize your wardrobe', color: 'from-indigo-100 to-indigo-50' }
];

export default function FeaturesSection() {
  const featureRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      featureRefs.current.forEach((ref, idx) => {
        gsap.from(ref, {
          opacity: 0,
          y: 40,
          duration: 0.3,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          delay: idx * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose CLOTHONRENT?</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">Experience the future of fashion with our innovative peer-to-peer rental platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              ref={(el) => (featureRefs.current[idx] = el)}
              className={`p-8 bg-gradient-to-br ${feature.color} rounded-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-white/80`}>
              <div className="flex items-start gap-4">
                <feature.icon className="w-12 h-12 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
