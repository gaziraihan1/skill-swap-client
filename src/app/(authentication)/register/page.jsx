'use client'
import { FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import GoogleLogin from '@/custom-components/googleLogin/GoogleLogin'
import useAuth from '@/hooks/useAuth'
import useAxiosSecure from '@/hooks/useAxiosSecure';

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`


export default function RegisterPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { createUser, 
    logout,
    setLoading,
    updateUser,
    user, } = useAuth()
  const router = useRouter()
  const axiosSecure = useAxiosSecure()
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  const onSubmit = async (data) => {
    setUploading(true)
    try {
      if (!imageFile) {
        alert('Please upload a profile image')
        setUploading(false)
        return
      }

      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
  method: 'POST',
  body: formData,
})


      const cloudData = await cloudRes.json()

      if (!cloudRes.ok) {
        alert('Image upload failed')
        setUploading(false)
        return
      }

      const backendRes = await axiosSecure.post('/users', {
        name: data.name,
        email: data.email,
        profileImage: cloudData.secure_url,
        role: 'user' 
      })

      if (backendRes.data.message === 'User already exists') {
        alert('User already exists')
        setUploading(false)
        return
      }

      await createUser(data.email, data.password)
      await updateUser({ displayName: data.name })

      await logout()
      reset()
      setLoading(false)
      router.push('/login')
    } catch (err) {
      console.error('Registration Error:', err)
      alert('Registration failed. Please try again.')
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              {...register('name')}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                validate: (value) =>
                  value.length >= 8 &&
                  /[A-Z]/.test(value) &&
                  /[a-z]/.test(value) &&
                  /[0-9]/.test(value) &&
                  /[^A-Za-z0-9]/.test(value) || 'Password must be 8+ chars and include uppercase, lowercase, number, and special char',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
  <label className="block text-sm mb-1">Profile Image</label>

  <label
    htmlFor="profileImage"
    className="cursor-pointer flex items-center justify-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
  >
    <FaCamera className="text-gray-600" />
    <span>{imageFile ? imageFile.name : "Click to upload image"}</span>
    <input
      id="profileImage"
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="hidden"
      required
    />
  </label>

  {imageFile && (
    <img
      src={URL.createObjectURL(imageFile)}
      alt="Preview"
      className="mt-2 w-24 h-24 object-cover rounded-md border border-gray-300"
    />
  )}
</div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <GoogleLogin />

        <p className="text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
