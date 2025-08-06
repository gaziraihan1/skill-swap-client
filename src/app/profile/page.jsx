'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'
import useAxiosSecure from '@/hooks/useAxiosSecure'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserProfile() {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure();
  const router = useRouter()

  const [offersMade, setOffersMade] = useState(0)
  const [offersReceived, setOffersReceived] = useState(0)
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);
  useEffect(() => {
    
    axiosSecure.get(`/offers/made/${user.email}`).then((res) => {
      setOffersMade(res.data.count || 0)
    })

    axiosSecure.get(`/offers/received/${user.email}`).then((res) => {
      setOffersReceived(res.data.count || 0)
    })
  }, [user?.email, axiosSecure])

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl shadow-md p-6 md:flex items-center gap-8">
        <div className="flex-shrink-0">
          <Image
            src={user?.photoURL || '/default-avatar.png'}
            alt={user?.displayName || 'User'}
            width={100}
            height={100}
            className="rounded-full h-25 w-25 border border-gray-300 object-cover"
          />
        </div>

        <div className="mt-6 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName || 'Anonymous User'}
          </h2>
          <p className="text-gray-600">{user?.email}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2">
              <p className="text-lg font-semibold">{offersMade}</p>
              <p className="text-sm font-medium">Offers Made</p>
            </div>
            <div className="bg-green-100 text-green-700 rounded-lg px-4 py-2">
              <p className="text-lg font-semibold">{offersReceived}</p>
              <p className="text-sm font-medium">Offers Received</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
