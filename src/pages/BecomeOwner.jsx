import { 
  Upload, DollarSign, Shield, QrCode, TrendingUp, Clock, 
  CheckCircle, ArrowRight, Package, BarChart3 
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initBecomeOwnerAnimations } from '../animations/becomeOwnerAnimations';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function BecomeOwner() {
  const navigate = useNavigate();

  useEffect(() => {
    initBecomeOwnerAnimations();
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Extra Income',
      description: 'Turn your unused wardrobe into a revenue stream. Set your own rental prices and earn regularly.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Shield,
      title: 'Protected & Secure',
      description: 'Damage protection policies, verified users, and secure payment processing keep you safe.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: QrCode,
      title: 'QR Tag Security',
      description: 'Each item gets a unique QR code for verification during pickup and return.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: BarChart3,
      title: 'Track Everything',
      description: 'Simple dashboard to manage inventory, track earnings, and view all your orders.',
      color: 'text-pink-600',
      bg: 'bg-pink-50'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Upload Your Items',
      description: 'Take photos, add details, and set your rental price for each clothing item.',
      icon: Upload
    },
    {
      step: '2',
      title: 'Get QR Tags',
      description: 'Receive unique QR codes for each item to ensure security and easy verification.',
      icon: QrCode
    },
    {
      step: '3',
      title: 'Manage Rentals',
      description: 'Track availability, accept bookings, and coordinate pickup/return through the platform.',
      icon: Package
    },
    {
      step: '4',
      title: 'Receive Payments',
      description: 'Get regular payouts directly to your bank account. Track all earnings in real-time.',
      icon: DollarSign
    }
  ];

  const responsibilities = [
    'Keep clothes in good, rentable condition',
    'Ensure items are clean and ready for rental',
    'Follow platform guidelines and policies',
    'Respond to rental requests promptly',
    'Coordinate pickup and return schedules',
    'Report any damages or issues immediately'
  ];

  const stats = [
    { label: 'Active Owners', value: '2,500+', icon: TrendingUp },
    { label: 'Avg. Monthly Earnings', value: '₹15,000', icon: DollarSign },
    { label: 'Items Listed', value: '50,000+', icon: Package },
    { label: 'Avg. Response Time', value: '< 2 hrs', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Become a Store Partner
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Earn from your unused clothing inventory. Join 2,500+ owners making extra income safely and easily.
          </p>
          <button
            onClick={() => navigate('/owner/dashboard')}
            className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:shadow-xl transition font-bold text-lg inline-flex items-center gap-2"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 md:px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Partner With Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            CLOTHONRENT provides everything you need to earn from your wardrobe safely and efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <div className={`w-12 h-12 ${benefit.bg} rounded-lg flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start earning in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 -z-10">
                    <span className="text-6xl font-bold text-gray-100">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Responsibilities
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              We handle users, payments, and delivery coordination. You focus on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {responsibilities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of owners who are already making money from their wardrobes
          </p>
          <button
            onClick={() => navigate('/owner/dashboard')}
            className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:shadow-xl transition font-bold text-lg inline-flex items-center gap-2"
          >
            Start Your Dashboard
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}