export default function StatsSection() {
  const stats = [
    { number: '5K+', label: 'Collections' },
    { number: '50K+', label: 'Happy Users' },
    { number: '100K+', label: 'Rentals Completed' },
    { number: '4.8★', label: 'User Rating' }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-12 md:py-16 mb-12 md:mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
            <p className="text-gray-100 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
