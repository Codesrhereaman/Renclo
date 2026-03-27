import { Star, Quote } from 'lucide-react';
import { StaggerContainer, StaggerItem, FadeIn } from '../common/PageTransition';

const testimonials = [
  {
    text: "I rented a designer Lehenga for my sister's wedding. It arrived in pristine condition, fit perfectly, and saved me over ₹45,000. WardroWave is a lifesaver!",
    name: "Priya Sharma",
    role: "Bride's Sister",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
  },
  {
    text: "As a guy who rarely wears suits, buying one for a gala felt like a waste. I rented a timeless tuxedo here—the quality was stellar and returning it was zero hassle.",
    name: "Rahul Desai",
    role: "Business Consultant",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    rating: 5,
  },
  {
    text: "Listing my unused designer sarees on WardroWave has been amazing. The platform handles the logistics, and I've already made enough passive income to buy new outfits!",
    name: "Ananya Patel",
    role: "Lender / Fashion Blogger",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      {/* Background soft meshes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-emerald-50 to-transparent blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-cyan-50 to-transparent blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn delay={0.1} className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 font-bold tracking-wider text-xs uppercase mb-4 border border-indigo-100">
            Real Experiences
          </span>
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Loved By Thousands
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
            Don't just take our word for it. Look at what our community of renters and lenders have to say about WardroWave.
          </p>
        </FadeIn>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col relative group">
                
                {/* Large Background Quote Icon */}
                <Quote className="absolute top-6 right-6 w-24 h-24 text-slate-50 group-hover:text-pink-50 transition-colors duration-500 z-0 transform rotate-12" />

                {/* Rating */}
                <div className="flex text-yellow-400 mb-8 relative z-10 gap-1 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed mb-10 flex-grow relative z-10">
                  "{testimonial.text}"
                </p>
                
                {/* User Info Wrapper */}
                <div className="flex items-center gap-5 mt-auto relative z-10 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      loading="lazy"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-50 group-hover:ring-pink-100 transition-all duration-300 shadow-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-purple-600 font-medium text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
