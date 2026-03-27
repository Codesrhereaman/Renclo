import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, StaggerContainer } from '../common/PageTransition';

export default function CategorySection() {
  const categories = [
    {
      id: 'women',
      title: 'Womenswear',
      subtitle: 'From Designer Lehengas to Elegant Gowns',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&fit=crop',
      colSpan: 'lg:col-span-8',
      link: '/women'
    },
    {
      id: 'jewelry',
      title: 'Luxe Jewelry',
      subtitle: 'Premium AI-matched Accessories',
      image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f29136?w=800&fit=crop',
      colSpan: 'lg:col-span-4',
      link: '/accessories'
    },
    {
      id: 'men',
      title: 'Menswear Couture',
      subtitle: 'Precision Tailored Suits & Sherwanis',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&fit=crop',
      colSpan: 'lg:col-span-12',
      link: '/men'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <FadeIn className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            Shop by <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Category</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Explore curated collections designed to make you the center of attention. Every piece is thoroughly dry-cleaned, insured, and ready for you.
          </p>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] lg:h-[450px]">
            {categories.map((category) => (
              <FadeIn key={category.id} className={`${category.colSpan} h-full`}>
                <Link to={category.link} className="block relative w-full h-full rounded-[32px] overflow-hidden group cursor-pointer shadow-xl border border-slate-200/50">
                  {/* Background Image */}
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  
                  {/* Dynamic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent group-hover:from-slate-900 transition-colors duration-500"></div>

                  {/* Top Right Decorative Arrow */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border border-white/30 text-white">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-slate-200 text-lg font-medium">
                      {category.subtitle}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </StaggerContainer>

      </div>
    </section>
  );
}
