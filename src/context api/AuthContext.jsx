import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch our DB profile to get roles and addresses
          const res = await api.auth.getMe();
          setUser(res.data.user);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Sign up with email and password
  const signup = async (fullName, email, phone, password) => {
    // 1. Create user in Firebase
    await createUserWithEmailAndPassword(auth, email, password);
    // 2. Sync profile to our backend (creates Firestore doc + cart + wishlist)
    const res = await api.auth.syncProfile({ fullName, phone });
    setUser(res.data.user);
    return res.data.user;
  };

  // Login with email and password
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged automatically fetches and sets the user profile
  };

  // Social login (Google, Facebook)
  const socialLogin = async (providerName) => {
    let provider;
    if (providerName === 'google') provider = new GoogleAuthProvider();
    else if (providerName === 'facebook') provider = new FacebookAuthProvider();
    else throw new Error('Unsupported provider');

    // 1. Popup Firebase login
    await signInWithPopup(auth, provider);
    // 2. Sync profile (creates backend profile if first login)
    const res = await api.auth.syncProfile({});
    setUser(res.data.user);
    return res.data.user;
  };

  // Logout
  const logout = async () => {
    try {
      await api.auth.logout(); // Optional: Revoke refresh tokens on server
    } catch (e) {
      // Ignore if server is down or token is invalid
    }
    await signOut(auth); // Clear Firebase local session
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (updates) => {
    const res = await api.user.updateProfile(updates);
    setUser(res.data.user);
    return res.data.user;
  };

  const value = {
    user,
    isLoading,
    signup,
    login,
    socialLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Wait for Firebase to determine auth state before rendering children so protected routes don't flash */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
