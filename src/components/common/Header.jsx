import { ShoppingCart, Heart, Search, Menu, X, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useWishlist } from '../../context api/WishlistContext';
import { useCart } from '../../context api/CartContext';
import { useAuth } from '../../context api/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RENTAL_ITEMS } from '../../data/productsData';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Generate suggestions based on query
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      const uniqueSuggestions = new Set();
      
      RENTAL_ITEMS.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          uniqueSuggestions.add(item.name);
        }
        if (item.category.toLowerCase().includes(query)) {
          uniqueSuggestions.add(`${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}`);
        }
      });

      setSuggestions(Array.from(uniqueSuggestions).slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate('/rentals', { state: { searchQuery: suggestion } });
    setSearchQuery('');
    setShowSuggestions(false);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/rentals', { state: { searchQuery: searchQuery.trim() } });
      setSearchQuery('');
      setShowSuggestions(false);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">CLOTHONRENT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="/" className="text-gray-700 hover:text-purple-600 transition font-medium">Home</a>
          <a href="/rentals" className="text-gray-700 hover:text-purple-600 transition font-medium">Rent Clothes</a>
          <a href="/about" className="text-gray-700 hover:text-purple-600 transition font-medium">About</a>
          <a href="/contact" className="text-gray-700 hover:text-purple-600 transition font-medium">Contact</a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative w-80" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search items, brands, colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                onFocus={() => searchQuery && setSuggestions.length > 0 && setShowSuggestions(true)}
                className="w-full pl-12 pr-12 py-2.5 bg-slate-100 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 transition flex items-center gap-2 border-b last:border-b-0"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-sm">{suggestion}</span>
                      <span className="text-xs text-gray-500 ml-auto">
                        ({RENTAL_ITEMS.filter(item => 
                          item.name.toLowerCase().includes(suggestion.toLowerCase()) ||
                          item.category.toLowerCase().includes(suggestion.toLowerCase())
                        ).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center relative">
          <button 
            onClick={() => navigate('/wishlist')}
            className="p-2 hover:bg-slate-100 rounded-full transition relative hidden md:block"
          >
            <Heart className="w-6 h-6 text-gray-700" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-slate-100 rounded-full transition relative"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => navigate('/profile')}
                className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full hover:bg-slate-100 transition"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.fullName.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-medium"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-full transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6">
          <a href="/" className="block py-2 text-gray-700 hover:text-purple-600 transition font-medium">Home</a>
          <a href="/rentals" className="block py-2 text-gray-700 hover:text-purple-600 transition font-medium">Rent Clothes</a>
          <a href="/wishlist" className="block py-2 text-gray-700 hover:text-purple-600 transition font-medium flex items-center gap-2">
            Wishlist
            {wishlistCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </a>
          <a href="/about" className="block py-2 text-gray-700 hover:text-purple-600 transition font-medium">About</a>
          <a href="/contact" className="block py-2 text-gray-700 hover:text-purple-600 transition font-medium">Contact</a>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="relative mb-4" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search items, brands, colors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  onFocus={() => searchQuery && setSuggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-100 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown Mobile */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="max-h-64 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition flex items-center gap-2 border-b last:border-b-0"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 text-sm">{suggestion}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          ({RENTAL_ITEMS.filter(item => 
                            item.name.toLowerCase().includes(suggestion.toLowerCase()) ||
                            item.category.toLowerCase().includes(suggestion.toLowerCase())
                          ).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Auth Section */}
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-slate-50">
                  <p className="font-semibold text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 transition flex items-center gap-2 text-gray-700 rounded"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 transition flex items-center gap-2 text-red-600 rounded"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-slate-100 font-medium transition rounded"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
