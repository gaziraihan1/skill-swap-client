'use client';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      setLoading(false);
      const email = currentUser?.email;

      if(currentUser) {
        const res = await fetch('http://localhost:5000/jwt', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({email})
        });
        const data = await res.json();
        
        localStorage.setItem('token', data?.token)
      }
      else{
        localStorage.removeItem('token')
      }
    });
    return () => unsubscribe();
  }, []);

  const authValue = {
    createUser,
    login,
    signInWithGoogle,
    logout,
    loading,
    user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
