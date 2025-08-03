'use client';

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { FaClock } from 'react-icons/fa6';

const SwapRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/swap-requests?email=${user.email}`)
        .then(res => {
          setRequests(res.data);
        });
    }
  }, [user?.email, axiosSecure]);

  const renderStatusLabel = (status) => {
    const base = "px-2 py-1 text-xs rounded font-semibold";
    if (status === 'pending') return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
    if (status === 'accepted') return <span className={`${base} bg-green-100 text-green-800`}>Accepted</span>;
    if (status === 'completed') return <span className={`${base} bg-blue-100 text-blue-800`}>Completed</span>;
    return <span className={`${base} bg-gray-200 text-gray-800`}>Unknown</span>;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Swap Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">No swap requests yet.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((request, idx) => {
            const isSent = request.fromUser.email === user.email;
            const otherUser = isSent ? request.toUser : request.fromUser;
            const yourSkill = isSent ? request.fromOffer.label : request.toOffer.label;
            const theirSkill = isSent ? request.toOffer.label : request.fromOffer.label;

            return (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm bg-white flex justify-between items-center gap-6"
              >
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    {formatDistanceToNow(new Date(request.createdAt))} ago
                  </p>

                  <p className="text-lg font-semibold">
                    {isSent ? 'You requested to swap with' : 'Swap request from'}{' '}
                    <span className="text-blue-600 font-bold">{otherUser.name}</span>
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm mt-2">
                    <div className="bg-gray-100 px-3 py-1 rounded">
                      🎓 Your Skill: <span className="font-medium">{yourSkill}</span>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded">
                      🔁 Their Skill: <span className="font-medium">{theirSkill}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {renderStatusLabel(isSent ? request.status : 'accepted')}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwapRequests;

