'use client';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useEffect, useState } from 'react';

const statusOptions = ['pending', 'completed', 'rejected'];

export default function AdminSwaps() {
  const axiosSecure = useAxiosSecure();
  const [allSwap, setAllSwap] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    axiosSecure.get('/swaps')
      .then(res => setAllSwap(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const filteredSwaps = allSwap.filter(swap => swap.status === selectedStatus);

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <tr key={i} className="border-t animate-pulse">
        <td className="px-4 py-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Admin Swaps</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded border ${
              selectedStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Sender Email</th>
              <th className="px-4 py-2">Receiver Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Offer</th>
              <th className="px-4 py-2">Return Offer</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? renderSkeletonRows()
              : filteredSwaps.length > 0
              ? filteredSwaps.map(swap => (
                  <tr key={swap._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={swap.userPhoto}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2">{swap.senderEmail}</td>
                    <td className="px-4 py-2">{swap.receiverEmail}</td>
                    <td className="px-4 py-2 capitalize">{swap.status}</td>
                    <td className="px-4 py-2">{swap.offer?.title || 'N/A'}</td>
                    <td className="px-4 py-2">{swap.returnOffer?.title || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs text-gray-600">
                      {new Date(swap.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No swaps with status "{selectedStatus}"
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
