import { BarChart3, DollarSign, TrendingUp, Package } from 'lucide-react';

export default function StatsCard({ icon: Icon, label, value, bgColor, iconColor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 ${bgColor} rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export function OwnerStats({ totalEarnings, totalRentals, totalItems }) {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Earnings',
      value: `₹${totalEarnings.toLocaleString()}`,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Active Rentals',
      value: totalRentals,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Package,
      label: 'Listed Items',
      value: totalItems,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: BarChart3,
      label: 'Avg. Rating',
      value: '4.8★',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatsCard key={idx} {...stat} />
      ))}
    </div>
  );
}
