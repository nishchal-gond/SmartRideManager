import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInAnonymous, signInWithGoogle, signOut, subscribeToAuthChanges } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAnonymous(firebaseUser.isAnonymous);
      } else {
        setUser(null);
        setIsAnonymous(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAnonymous = async () => {
    const result = await signInAnonymous();
    return result;
  };

  const loginWithGoogle = async () => {
    const result = await signInWithGoogle();
    return result;
  };

  const logout = async () => {
    const result = await signOut();
    if (result.success) {
      setUser(null);
      setIsAnonymous(false);
    }
    return result;
  };

  const value = {
    user,
    loading,
    isAnonymous,
    loginAnonymous,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
