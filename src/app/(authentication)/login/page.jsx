import React from 'react';
import Link from 'next/link';
import GoogleLogin from '@/custom-components/googleLogin/GoogleLogin';

export default function Login() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">Login to Your Account</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
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
