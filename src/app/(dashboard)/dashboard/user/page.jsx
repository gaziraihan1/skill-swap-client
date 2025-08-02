'use client'

import Link from 'next/link'
import { MessageCircle, FileText, User, Repeat, Send, Layers3 } from 'lucide-react'

const userRoutes = [
  {
    name: 'My Profile',
    icon: <User className="w-6 h-6 text-blue-600" />,
    href: '/dashboard/user/profiles',
  },
  {
    name: 'Feedback',
    icon: <FileText className="w-6 h-6 text-green-600" />,
    href: '/dashboard/user/feedback',
  },
  {
    name: 'Messages',
    icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
    href: '/dashboard/user/messages',
  },
  {
    name: 'Requests',
    icon: <Send className="w-6 h-6 text-pink-600" />,
    href: '/dashboard/user/requests',
  },
  {
    name: 'My Offers',
    icon: <Layers3 className="w-6 h-6 text-yellow-600" />,
    href: '/dashboard/user/my-offers',
  },
  {
    name: 'Swaps',
    icon: <Repeat className="w-6 h-6 text-indigo-600" />,
    href: '/dashboard/user/swaps',
  },
]

export default function UserMainPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userRoutes.map((route) => (
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
