import { FadeIn } from '../common/PageTransition';
import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email.');
      return;
    }
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="relative rounded-[40px] overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl p-8 md:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12 group">
            
            {/* Animated mesh gradient background specifically for the card */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover:opacity-70">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-pink-600 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20 backdrop-blur-md">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>Join our VIP Club</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Unlock Secret Styles & Offers
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0">
                Get priority access to highly-anticipated designer drops, exclusive invite-only sales, and personal styling tips.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto flex-1 max-w-md">
              <form onSubmit={handleSubscribe} className="relative group/form">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-focus-within/form:opacity-75 transition duration-500"></div>
                <div className="relative flex flex-col sm:flex-row gap-3 bg-gray-900 p-2 rounded-2xl border border-gray-700">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent px-6 py-4 text-white focus:outline-none placeholder-gray-500 font-medium"
                  />
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg active:scale-95 flex flex-row items-center justify-center gap-2"
                  >
                    Subscribe <ArrowRight className="w-5 h-5 group-hover/form:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-6 text-center font-medium">
                No spam. Unsubscribe anytime with one click.
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
