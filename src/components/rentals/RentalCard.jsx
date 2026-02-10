import { Heart, ShoppingCart, Star, Calendar } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useWishlist } from "../../context api/WishlistContext";
import { useCart } from "../../context api/CartContext";

export default function RentalCard({ item }) {
  const cardRef = useRef(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFavorite = isInWishlist(item.id);
  const savings = item.originalPrice - item.rentalPrice;
  const savingsPercent = Math.round((savings / item.originalPrice) * 100);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group">
      <div className="relative h-48 sm:h-56 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          Save {savingsPercent}%
        </div>
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Not Available</span>
          </div>
        )}
        <button
          onClick={() => toggleWishlist(item)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
          {item.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 sm:w-4 h-3 sm:h-4 ${
                  i < Math.floor(item.rating) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            ({item.reviews})
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{item.rentalPrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{item.originalPrice}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            <span>{item.duration} days rental</span>
          </div>
        </div>

        <button
          onClick={() => addToCart(item)}
          disabled={!item.inStock}
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
