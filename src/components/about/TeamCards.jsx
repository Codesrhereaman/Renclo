export default function TeamCards() {
  const teamMembers = [
    { name: 'Priya Sharma', role: 'Founder & CEO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { name: 'Rajesh Kumar', role: 'Head of Design', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
    { name: 'Ananya Gupta', role: 'Marketing Director', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
    { name: 'Vikram Singh', role: 'Operations Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
  ];

  return (
    <div className="mb-12 md:mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Meet the passionate people behind CLOTHONRENT
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-48 object-cover bg-gradient-to-br from-purple-200 to-pink-200"
            />
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
