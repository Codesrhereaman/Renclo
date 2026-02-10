const categories = [
  {
    name: 'Men',
    image: 'https://plus.unsplash.com/premium_photo-1661434624086-e02557c68815?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwc2VjdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    icon: '👔'
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1751399566412-ad1194241c5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWVuJTIwaW4lMjBzdWl0fGVufDB8fDB8fHww%3D%3D',
    icon: '👗'
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=300&fit=crop',
    icon: '⌚'
  }
];

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CategoryCard({ category }) {
  const navigate = useNavigate();
  
  const getCategoryPath = (categoryName) => {
    switch(categoryName.toLowerCase()) {
      case 'men':
        return '/men';
      case 'women':
        return '/women';
      case 'accessories':
        return '/accessories';
      default:
        return '/rentals';
    }
  };
  
  return (
    <div className="relative h-48 sm:h-60 md:h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 group-hover:opacity-40 transition"></div>
      <img 
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition flex flex-col items-center justify-center gap-4">
        <span className="text-5xl md:text-6xl">{category.icon}</span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">{category.name}</h3>
        <button 
          onClick={() => navigate(getCategoryPath(category.name))}
          className="mt-2 px-6 py-2 bg-white text-purple-600 rounded-full font-bold text-sm md:text-base hover:bg-purple-600 hover:text-white transition">Shop Now</button>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  const categoryRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoryRefs.current.forEach((ref, idx) => {
        gsap.from(ref, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          delay: idx * 0.12
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-base md:text-lg">Find the perfect rental for any occasion</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => (categoryRefs.current[idx] = el)}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
