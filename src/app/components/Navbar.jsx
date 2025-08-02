'use client';

import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const {role} = useUserRole()

  const logoutUser = () => {
    logout().then(() => console.log('Logged out'));
  };

  const handleToggle = () => setIsMenuOpen(prev => !prev);

  const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Skills', href: '/explore' },
  ...(user?.email
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Profile', href: '/profile' },
      ]
    : [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
      ]),
];

const hideNavbar = pathname.includes('dashboard');

if(hideNavbar) {
  return null
}

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-blue-600">
          Skill<span className="text-gray-800">Swap</span>
        </Link>
  
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base transition font-medium px-2 py-1 rounded-md ${
                  isActive
                    ? 'text-blue-600 font-semibold bg-blue-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {user?.email && (
            <button
              onClick={logoutUser}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Logout
            </button>
          )}
        </div>
  
        <div className="md:hidden">
          <button onClick={handleToggle} className="text-gray-700">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
  
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="space-y-4">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base px-2 py-2 rounded-md transition font-medium ${
                    isActive
                      ? 'text-blue-600 font-semibold bg-blue-100'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {user?.email && (
              <button
                onClick={() => {
                  logoutUser();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );


};

export default Navbar;
