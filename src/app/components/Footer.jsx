"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    const pathname = usePathname();
    if(pathname.includes('dashboard')) {
        return null
    }
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">SkillSwap</h2>
          <p className="text-sm text-gray-400">
            Empowering people to share skills, connect, and grow together.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/how-it-works" className="hover:text-white">How it Works</a></li>
            <li><a href="/skills" className="hover:text-white">Popular Skills</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="/join" className="hover:text-white">Join as Mentor</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
