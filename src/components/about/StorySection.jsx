import { Award, Heart, Zap } from 'lucide-react';

export default function StorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
        <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
          CLOTHONRENT was born from a simple idea: everyone deserves access to premium, stylish fashion without breaking the bank. Founded in 2024, we started with a vision to revolutionize fashion through sustainable peer-to-peer rentals.
        </p>
        <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
          What began as a small community has grown into a comprehensive rental marketplace. Today, we connect thousands of fashion enthusiasts across India, making luxury fashion accessible to everyone through our innovative rental model.
        </p>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Our journey is driven by passion for fashion, commitment to sustainability, and dedication to our community. Every piece in our collection is carefully curated to ensure quality, style, and value.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 md:p-12">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Quality Assured</h3>
              <p className="text-gray-700">Every piece undergoes strict quality checks</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-600 text-white">
                <Heart className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Community First</h3>
              <p className="text-gray-700">Your satisfaction is our top priority</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Sustainable Fashion</h3>
              <p className="text-gray-700">Reduce, reuse, rent - for a better tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
