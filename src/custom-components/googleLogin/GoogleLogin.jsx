'use client';

import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleLogin() {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: 'user',
      };

      const res = await axiosSecure.post('/users', userData);

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  return (
    <button
  onClick={handleGoogleLogin}
  className="flex justify-center items-center gap-2 px-5 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md shadow-sm transition duration-200 w-full"
>
  <FcGoogle className="text-xl " />
  Login with Google
</button>

  );
}
