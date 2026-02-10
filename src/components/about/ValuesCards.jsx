import { Users, Globe, Truck } from 'lucide-react';

export default function ValuesCards() {
  const values = [
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a community of fashion enthusiasts who share their style and inspire each other.',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: "We're committed to sustainable practices and ethical sourcing in our supply chain.",
      color: 'text-pink-600'
    },
    {
      icon: Truck,
      title: 'Reliability',
      description: 'From quality products to customer service, we deliver excellence at every touchpoint.',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="mb-12 md:mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          These core values guide everything we do
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <IconComponent className={`w-12 h-12 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-700">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
