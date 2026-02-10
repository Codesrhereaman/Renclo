import { Star, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Sarah Johnson', role: 'Fashion Enthusiast', rating: 5, comment: 'Amazing quality and fast shipping! Will definitely rent again.', avatar: '👩' },
  { name: 'Mike Chen', role: 'Sustainable Fashion Advocate', rating: 5, comment: 'The best fashion platform I\'ve found. Great customer service!', avatar: '👨' },
  { name: 'Emma Davis', role: 'Style Creator', rating: 5, comment: 'Love the variety and modern design. Highly recommended!', avatar: '👩‍🦰' }
];

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{testimonial.avatar}</span>
        <div>
          <p className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</p>
          <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex text-yellow-400 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">"{testimonial.comment}"</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const testimonialRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      testimonialRefs.current.forEach((ref, idx) => {
        gsap.from(ref, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          delay: idx * 0.15
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">What Customers Say</h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg">Join 50K+ happy customers who trust CLOTHONRENT</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              ref={(el) => (testimonialRefs.current[idx] = el)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
