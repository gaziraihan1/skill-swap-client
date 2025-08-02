'use client'
import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
})

let interceptorsSet = false;

const useAxiosSecure = () => {
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!interceptorsSet && user) {
      interceptorsSet = true

      axiosSecure.interceptors.request.use(
        async (config) => {
          if (user) {
            const token = await user.getIdToken()
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )

      axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401 || error.response?.status === 403) {
            logout()
              .then(() => console.log('Logged out due to auth error'))
          }
          return Promise.reject(error)
        }
      )
    }
  }, [user, logout])

  return axiosSecure
}

export default useAxiosSecure
