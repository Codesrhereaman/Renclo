export default function NewsletterSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Stay in Style</h2>
        <p className="text-base md:text-lg text-gray-50 mb-8 md:mb-10">Get exclusive offers, new arrivals, and fashion tips straight to your inbox.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-1 px-5 md:px-7 py-3 md:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-purple-600 text-sm md:text-base bg-white/95"
          />
          <button className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 text-purple-600 font-bold rounded-xl hover:shadow-lg transition text-sm md:text-base whitespace-nowrap transform hover:scale-105">
            Subscribe
          </button>
        </div>
        
        <p className="text-xs md:text-sm text-gray-100">📧 We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
