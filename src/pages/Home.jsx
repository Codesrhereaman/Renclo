import { useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
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
      <FeaturesSection />
      <FeaturedProducts />
      <CategoriesSection />
      <NewsletterSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
