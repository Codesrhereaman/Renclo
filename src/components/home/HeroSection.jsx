import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function HeroSection() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.3 });
      gsap.from(descRef.current, { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
      gsap.from(buttonsRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.9 });
      gsap.from(imageRef.current, { opacity: 0, scale: 0.9, duration: 1, delay: 0.5 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen md:h-screen bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden py-12 md:py-0">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-5 w-40 h-40 md:w-72 md:h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 md:w-72 md:h-72 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div className="text-white text-center md:text-left">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Rent Premium <span className="text-yellow-300">Fashion</span>
          </h1>
          <p ref={descRef} className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-6 md:mb-8 leading-relaxed">
            Wear stunning outfits at just 25% of the retail price. Rent for any occasion, zero commitment, unlimited style.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <button 
              onClick={() => navigate('/rentals')}
              className="px-6 sm:px-8 py-3 md:py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105 text-sm md:text-base">
              Rent Now
            </button>
            <button 
              onClick={() => navigate('/become-owner')}
              className="px-6 sm:px-8 py-3 md:py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition text-sm md:text-base">
              Become an Owner
            </button>
          </div>
        </div>
        
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-full hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-50"></div>
          <img 
            ref={imageRef}
            src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=700&fit=crop" 
            alt="Fashion Rental"
            className="relative w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
