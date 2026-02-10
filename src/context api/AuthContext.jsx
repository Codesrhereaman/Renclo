import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Sign up with email and password
  const signup = (fullName, email, phone, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      password: btoa(password), // Simple encoding (not secure, use bcrypt in production)
      createdAt: new Date().toISOString(),
      authMethod: 'email'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  // Login with email and password
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = users.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('User not found');
    }

    const decodedPassword = atob(foundUser.password);
    if (decodedPassword !== password) {
      throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  // Social login (Google, Facebook)
  const socialLogin = (provider, email, fullName, photoUrl) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    let foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      // Create new user if doesn't exist
      foundUser = {
        id: Date.now().toString(),
        fullName,
        email,
        phone: '',
        password: null,
        photoUrl,
        createdAt: new Date().toISOString(),
        authMethod: provider
      };
      users.push(foundUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Update user profile
  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return updatedUser;
    }
    throw new Error('User not found');
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
      {children}
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
