import { useEffect } from 'react';
import { initAboutAnimations } from '../animations/aboutAnimations';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import StorySection from '../components/about/StorySection';
import ValuesCards from '../components/about/ValuesCards';
import StatsSection from '../components/about/StatsSection';
import TeamCards from '../components/about/TeamCards';
import WhyChooseSection from '../components/about/WhyChooseSection';

export default function About() {
  useEffect(() => {
    initAboutAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About CLOTHONRENT</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Revolutionizing fashion through sustainable peer-to-peer rentals
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <StorySection />
        <ValuesCards />
        <StatsSection />
        <TeamCards />
        <WhyChooseSection />

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join the CLOTHONRENT Community</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover sustainable fashion and join thousands of happy renters
          </p>
          <a 
            href="/rentals"
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-pink-600 transition font-bold text-lg"
          >
            Start Renting
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
