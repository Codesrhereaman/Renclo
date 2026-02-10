import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-white">WardroWave</span>
            </div>
            <p className="text-gray-400 mb-4">Your ultimate destination for premium fashion and style.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-400 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-purple-400 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-purple-400 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-purple-400 transition"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="/products" className="hover:text-purple-400 transition">Shop</a></li>
              <li><a href="/about" className="hover:text-purple-400 transition">About Us</a></li>
              <li><a href="/blog" className="hover:text-purple-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="/contact" className="hover:text-purple-400 transition">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-purple-400 transition">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-purple-400 transition">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-purple-400 transition">Returns</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm">support@wardowave.com</p>
                  <p className="text-xs text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-purple-400 flex-shrink-0" />
                <p className="text-sm">+1 (800) 123-4567</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-purple-400 flex-shrink-0" />
                <p className="text-sm">123 Fashion St, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2025 WardroWave. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-purple-400 transition">Terms of Service</a>
              <a href="/cookies" className="hover:text-purple-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
