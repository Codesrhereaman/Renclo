export default function WhyChooseSection() {
  const features = [
    { title: 'Authentic Collections', description: 'Carefully curated to blend traditional and modern styles' },
    { title: 'Affordable Rental', description: 'Access luxury fashion at a fraction of the purchase price' },
    { title: 'Secure Transactions', description: 'Safe payments with multiple options and buyer protection' },
    { title: 'Easy Returns', description: 'Hassle-free returns and exchanges within rental period' },
    { title: '24/7 Support', description: 'Dedicated customer service team always ready to help' },
    { title: 'Sustainable Fashion', description: 'Reduce environmental impact through smart rental choices' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Why Choose CLOTHONRENT?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${index % 2 === 0 ? 'bg-purple-100 text-purple-600' : 'bg-pink-100 text-pink-600'} font-bold`}>
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
