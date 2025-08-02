'use client'

import Link from 'next/link'
import {
  BarChart3, FileText, MessageCircle, FilePlus2, User,
  ShieldCheck, BadgeCheck, Settings, Atom, Repeat, Users
} from 'lucide-react'

const adminRoutes = [
  {
    name: 'Analytics',
    icon: <BarChart3 className="w-6 h-6 text-cyan-600" />,
    href: '/dashboard/admin/analytics',
  },
  {
    name: 'Feedback',
    icon: <FileText className="w-6 h-6 text-green-600" />,
    href: '/dashboard/admin/feedback',
  },
  {
    name: 'Messages',
    icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
    href: '/dashboard/admin/messages',
  },
  {
    name: 'Posts',
    icon: <FilePlus2 className="w-6 h-6 text-pink-600" />,
    href: '/dashboard/admin/posts',
  },
  {
    name: 'Profile',
    icon: <User className="w-6 h-6 text-blue-600" />,
    href: '/dashboard/admin/profile',
  },
  {
    name: 'Reports',
    icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    href: '/dashboard/admin/reports',
  },
  {
    name: 'Roles',
    icon: <BadgeCheck className="w-6 h-6 text-yellow-600" />,
    href: '/dashboard/admin/roles',
  },
  {
    name: 'Settings',
    icon: <Settings className="w-6 h-6 text-gray-600" />,
    href: '/dashboard/admin/settings',
  },
  {
    name: 'Skills',
    icon: <Atom className="w-6 h-6 text-orange-600" />,
    href: '/dashboard/admin/skills',
  },
  {
    name: 'Swaps',
    icon: <Repeat className="w-6 h-6 text-indigo-600" />,
    href: '/dashboard/admin/swaps',
  },
  {
    name: 'Users',
    icon: <Users className="w-6 h-6 text-teal-600" />,
    href: '/dashboard/admin/users',
  },
]

export default function AdminMainPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome Admin 👨‍💼</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminRoutes.map((route) => (
          <Link
            key={route.name}
            href={route.href}
            className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="shrink-0">{route.icon}</div>
            <div className="text-lg font-medium text-gray-800">{route.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

