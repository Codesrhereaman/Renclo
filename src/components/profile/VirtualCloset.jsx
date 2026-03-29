import { useState } from 'react';
import { Camera, Plus, Sparkles, FolderHeart } from 'lucide-react';
import GSAPReveal from '../animations/GSAPReveal';
import GSAPTabTransition from '../animations/GSAPTabTransition';

const MOCK_CLOSET = [
  {
    id: 1,
    occasion: 'Summer Getaway',
    image: 'https://images.unsplash.com/photo-1507680434267-3256ce8be1ab?w=500&h=700&fit=crop',
    date: '2 Days Ago',
    tags: ['Relaxed', 'Linen']
  },
  {
    id: 2,
    occasion: 'Corporate Gala',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=700&fit=crop',
    date: '1 Week Ago',
    tags: ['Formal', 'Bold']
  },
  {
    id: 3,
    occasion: 'Date Night',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=700&fit=crop',
    date: 'Last Month',
    tags: ['Smart Casual', 'Luxe']
  }
];

export default function VirtualCloset() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-white rounded-[32px] p-1 md:p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
            <FolderHeart className="w-8 h-8 text-pink-500" /> My Virtual Closet
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Your saved AI styling generations and upcoming events.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-all font-bold flex items-center gap-2 shadow-md shadow-purple-200">
          <Plus className="w-5 h-5" /> New AI Try-On
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-4 mb-8 overflow-x-auto hide-scrollbar">
        {['all', 'Summer Getaway', 'Corporate Gala', 'Date Night'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            {tab === 'all' ? 'All Saved Looks' : tab}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <GSAPTabTransition activeTab={activeTab}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GSAPReveal direction="up" stagger={0.1} className="contents">
            {MOCK_CLOSET.filter(item => activeTab === 'all' || item.occasion === activeTab).map((item) => (
              <div
                key={item.id}
                className="group relative h-[24rem] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
              >
                <img src={item.image} alt={item.occasion} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 font-bold text-xs text-white border border-white/30 flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3 text-yellow-300" /> AI Matched
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">{item.date}</span>
                  <h3 className="text-xl font-bold text-white leading-tight mb-3">{item.occasion}</h3>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </GSAPReveal>

          {/* Empty Dropzone Card */}
          <div className="h-[24rem] rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all mb-4">
              <Camera className="w-8 h-8" />
            </div>
            <p className="font-bold text-gray-700 group-hover:text-purple-700">Add New Photo</p>
            <p className="text-sm text-gray-400 mt-1 px-8 text-center">Upload a selfie to generate more looks</p>
          </div>
        </div>
      </GSAPTabTransition>
    </div>
  );
}
