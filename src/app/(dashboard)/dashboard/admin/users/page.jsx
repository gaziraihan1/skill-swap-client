'use client';

import { useEffect, useState, Suspense } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaUserCircle } from 'react-icons/fa';

const UserCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse space-y-3">
      <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-center">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-16 h-16 text-gray-400" />
        )}
      </div>
      <h2 className="text-center mt-2 font-semibold text-lg">{user.name}</h2>
      <p className="text-center text-sm text-gray-600">{user.email}</p>
      <p className="mt-2 text-sm text-gray-500 text-center italic">
        {user.bio || 'No bio available'}
      </p>
      <div className="mt-2 text-center">
        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded">
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        setLoading(false);
      });
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Registered Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Suspense fallback={<UserCardSkeleton />}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))
            : users.map((user) => <UserCard key={user._id} user={user} />)}
        </Suspense>
      </div>
    </div>
  );
}
