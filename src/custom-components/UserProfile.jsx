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

  const [offersMade, setOffersMade] = useState(null)
  const [offersReceived, setOffersReceived] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (user?.email) {
      setLoading(true)
      Promise.all([
        axiosSecure.get(`/offers/made/${user.email}`),
        axiosSecure.get(`/offers/received/${user.email}`)
      ])
        .then(([madeRes, receivedRes]) => {
          setOffersMade(madeRes.data.count || 0)
          setOffersReceived(receivedRes.data.count || 0)
        })
        .finally(() => setLoading(false))
    }
  }, [user?.email, axiosSecure])

  return (
    <motion.div
      className="max-w-3xl mx-auto px-2 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl shadow-md p-4 md:flex items-center gap-8">
        
        <div className="mt-6 md:mt-0 w-full">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            {user?.displayName || 'Anonymous User'}
          </h2>
          <p className="text-gray-600">{user?.email}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-blue-300 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold">{offersMade}</p>
                  <p className="text-sm font-medium">Offers Made</p>
                </>
              )}
            </div>
            <div className="bg-green-100 text-green-700 rounded-lg px-4 py-2">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-green-300 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-4 bg-green-200 rounded w-3/4 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold">{offersReceived}</p>
                  <p className="text-sm font-medium">Offers Received</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
