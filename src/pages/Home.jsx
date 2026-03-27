import { useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AiTryOnSection from '../components/home/AiTryOnSection';
import AiStylistSection from '../components/home/AiStylistSection';
import CategorySection from '../components/home/CategorySection';
import NewsletterSection from '../components/home/NewsletterSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { initHomeAnimations } from '../animations/homeAnimations';

export default function Home() {
  useEffect(() => {
    initHomeAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <AiStylistSection />
      <AiTryOnSection />

      <NewsletterSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
