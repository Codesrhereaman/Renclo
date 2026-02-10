import { Filter, X } from 'lucide-react';

export default function FilterSidebar({ showFilters, setShowFilters, selectedCategory, setSelectedCategory, selectedPrice, setSelectedPrice }) {
  return (
    <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Items' },
              { value: 'men', label: 'Men' },
              { value: 'women', label: 'Women' },
              { value: 'accessories', label: 'Accessories' }
            ].map(cat => (
              <label key={cat.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={selectedCategory === cat.value}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-3 text-gray-700 text-sm">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Rental Price</h3>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Prices' },
              { value: 'low', label: 'Under ₹300' },
              { value: 'mid', label: '₹300 - ₹600' },
              { value: 'high', label: 'Over ₹600' }
            ].map(price => (
              <label key={price.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  value={price.value}
                  checked={selectedPrice === price.value}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-3 text-gray-700 text-sm">{price.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSelectedPrice('all');
          }}
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
