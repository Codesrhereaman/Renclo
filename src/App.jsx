import { useEffect } from 'react';
import AppRoutes from './Routers/AppRoutes';
import { WishlistProvider } from './context api/WishlistContext';
import { CartProvider } from './context api/CartContext';
import { AuthProvider } from './context api/AuthContext';
import { initializeWebsiteAnimations } from './animations/globalAnimations';

const demoUser = {
  email: 'demo@example.com',
  fullName: 'Demo User',
  phone: '+1 (555) 123-4567',
  authMethod: 'email',
  createdAt: new Date().toISOString(),
  password: 'demo123456' // Note: In production, never store plain passwords
};

function App(){
  // Initialize demo account on first load
  useEffect(() => {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify([demoUser]));
    }

    // Initialize global animations
    const timer = setTimeout(() => {
      initializeWebsiteAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
export default App;