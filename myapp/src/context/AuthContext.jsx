import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { firebaseConfig } from '../firebase.config';

let app, auth, googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  auth = null;
  googleProvider = null;
}

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState(null); // 'firebase' or 'backend'

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setAuthMethod('backend');
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL
          });
          setAuthMethod('firebase');
        } else if (!token) {
          setUser(null);
          setAuthMethod(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const loginWithBackend = async (email, password) => {
    try {
      const API_BASE_URL = 'https://buildfit.onrender.com/api';

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setAuthMethod('backend');
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const registerWithBackend = async (userData) => {
    try {
      const API_BASE_URL = 'https://buildfit.onrender.com/api';

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setAuthMethod('backend');
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const loginWithGoogle = async () => {
    console.log('🔍 Attempting Google login...');
    console.log('Auth object:', auth);
    console.log('Google provider:', googleProvider);

    if (!auth || !googleProvider) {
      console.error('❌ Firebase not properly initialized');
      return {
        success: false,
        error: 'Google authentication is not configured. Please complete Firebase setup in the console.'
      };
    }

    try {
      console.log('🚀 Opening Google sign-in popup...');
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      console.log('✅ Google sign-in successful:', firebaseUser);

      const userData = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL
      };

      setUser(userData);
      setAuthMethod('firebase');
      return { success: true };
    } catch (error) {
      console.error('❌ Google login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);

      let errorMessage = error.message;
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups for this site.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled.';
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not properly configured. Please enable Google sign-in in Firebase Console.';
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      if (authMethod === 'firebase') {
        await firebaseSignOut(auth);
      }
      
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);
      setAuthMethod(null);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const getAuthToken = () => {
    if (authMethod === 'backend') {
      return localStorage.getItem('token');
    }
    return null; 
  };

  const value = {
    user,
    loading,
    authMethod,
    isAuthenticated,
    loginWithBackend,
    registerWithBackend,
    loginWithGoogle,
    logout,
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
