import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useWishlist } from "../../context api/WishlistContext";

const products = [
  {
    id: 1,
    name: "Premium Formal Blazer",
    rentalPrice: 599,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 128,
    category: "men",
    savings: 76,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Embroidered Kurti",
    rentalPrice: 399,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 256,
    category: "women",
    savings: 69,
    image: "https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RW1icm9pZGVyZWQlMjBLdXJ0aXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Designer Saree",
    rentalPrice: 899,
    originalPrice: 3499,
    rating: 4.4,
    reviews: 167,
    category: "women",
    savings: 74,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Traditional Kurta Pajama",
    rentalPrice: 549,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 189,
    category: "men",
    savings: 75,
    image: "https://images.unsplash.com/photo-1710242350089-65eef7e49364?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VydGElMjBwYWphbWF8ZW58MHx8MHx8fDA%3D%3D",
  },
  {
    id: 5,
    name: "Blue Denim Jeans",
    rentalPrice: 399,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 342,
    category: "men",
    savings: 75,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Printed Cotton Dress",
    rentalPrice: 349,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 134,
    category: "women",
    savings: 71,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
  },
];

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Savings Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Save {product.savings}%
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg"
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 md:w-5 h-4 md:h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold capitalize">
          {product.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 md:w-4 h-3 md:h-4 ${
                  i < Math.floor(product.rating) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-2xl font-bold text-purple-600">
              ₹{product.rentalPrice}
            </span>
            <span className="text-sm md:text-base text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Rental price • Save ₹
            {(product.originalPrice - product.rentalPrice).toLocaleString()}
          </p>
        </div>

        {/* Button */}
        <button 
          onClick={() => navigate('/rentals')}
          className="mt-auto w-full py-2 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-sm md:text-base flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 md:w-5 h-4 md:h-5" />
          Rent Now
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect - 2 seconds with smooth transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 2000); // Change slide every 2 secondsf

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  // Get visible products (4 items visible at once, auto-scrolling)
  const getVisibleProducts = () => {
    const itemsPerSlide = 4;
    const visible = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      visible.push(products[(currentIndex + i) % products.length]);
    }
    return visible;
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Trending rentals this season
            </p>
          </div>
          <a
            href="/rentals"
            className="text-purple-600 font-bold text-sm md:text-base"
          >
            View All →
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          {/* Carousel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-0 transition-all duration-500">
            {getVisibleProducts().map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Fixed CSS */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-full hover:bg-pink-600 shadow-lg hidden lg:flex items-center justify-center z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-full hover:bg-pink-600 shadow-lg hidden lg:flex items-center justify-center z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-purple-600 w-8"
                    : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
