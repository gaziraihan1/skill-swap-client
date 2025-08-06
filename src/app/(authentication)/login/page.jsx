'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import GoogleLogin from '@/custom-components/googleLogin/GoogleLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { auth } from '@/firebase/firebase.config';

export default function Login() {
  const router = useRouter();
  const { user, loading, login } = useAuth(); // no need for login() hook now
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectPath);
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setIsSubmitting(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login( email, password);
    } catch (err) {
      const errorCode = err.code;

      if (errorCode === 'auth/user-not-found') {
        setEmailError('User not registered with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        setPasswordError('Incorrect password.');
      } else if (errorCode === 'auth/invalid-email') {
        setEmailError('Invalid email format.');
      } else {
        setEmailError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">Login to Your Account</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 mt-1 border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 mt-1 border ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              required
            />
            {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-2 rounded-lg transition duration-300`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <GoogleLogin />

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
