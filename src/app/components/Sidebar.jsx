'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUserCircle, FaEnvelope, FaExchangeAlt, FaChartBar, FaFileAlt,
  FaUser, FaUserShield, FaCog, FaTasks, FaUserFriends, FaUsers,
  FaAddressBook, FaGift, FaList, FaHome
} from 'react-icons/fa';

const Sidebar = ({ role, showSidebar, setShowSidebar, userEmail }) => {
  const pathname = usePathname();

  const linkClass = (href) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition font-medium ${
      pathname === href
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`;

  const adminLinks = [
    { href: '/dashboard/admin/analytics', icon: <FaChartBar />, label: 'Analytics' },
    { href: '/dashboard/admin/feedback', icon: <FaEnvelope />, label: 'Feedback' },
    { href: '/dashboard/admin/messages', icon: <FaEnvelope />, label: 'Messages' },
    { href: '/dashboard/admin/posts', icon: <FaFileAlt />, label: 'Posts' },
    { href: '/dashboard/admin/profile', icon: <FaUserCircle />, label: 'Profile' },
    { href: '/dashboard/admin/reports', icon: <FaTasks />, label: 'Reports' },
    { href: '/dashboard/admin/roles', icon: <FaUserShield />, label: 'Roles' },
    { href: '/dashboard/admin/settings', icon: <FaCog />, label: 'Settings' },
    { href: '/dashboard/admin/skills', icon: <FaList />, label: 'Skills' },
    { href: '/dashboard/admin/swaps', icon: <FaExchangeAlt />, label: 'Swaps' },
    { href: '/dashboard/admin/users', icon: <FaUsers />, label: 'Users' },
  ];

  const userLinks = [
    { href: '/dashboard/user/feedback', icon: <FaEnvelope />, label: 'Feedback' },
    { href: '/dashboard/user/messages', icon: <FaEnvelope />, label: 'Messages' },
    { href: '/dashboard/user/my-offers', icon: <FaGift />, label: 'My Offers' },
    { href: '/dashboard/user/profiles', icon: <FaAddressBook />, label: 'Profiles' },
    { href: '/dashboard/user/requests', icon: <FaTasks />, label: 'Requests' },
    { href: '/dashboard/user/swaps', icon: <FaExchangeAlt />, label: 'Swaps' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 z-50 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out
    ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-6 shadow-md">
        <h2 className="text-white text-xl font-bold capitalize">{role} Panel</h2>
        <p className="text-blue-100 text-sm break-words mt-1">{userEmail}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <Link href="/" className={linkClass('/')}>
          <FaHome /> Home
        </Link>
        {links.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={linkClass(href)}
            onClick={() => {
              if (window.innerWidth < 1024) setShowSidebar(false);
            }}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
