'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import useUserRole from '@/hooks/useUserRole';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  console.log(user)
  const { role } = useUserRole();
  console.log(role)
  console.log(loading)
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      localStorage.setItem('redirectAfterLogin', pathname)
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user ) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        role={role}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        userEmail={user.email}
      />

      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-lg font-bold text-gray-800 capitalize">{role} Dashboard</h1>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            {showSidebar ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
