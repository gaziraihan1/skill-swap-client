'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-100">
      <motion.h1
        className="text-6xl font-bold text-red-500 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        404
      </motion.h1>
      <p className="text-xl text-gray-700 mb-6">Page not found</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </main>
  )
}
