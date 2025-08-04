'use client';

import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaCheck, FaTimes, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const skillMap = {
  web_development: '💻 Web Development',
  graphic_design: '🎨 Graphic Design',
  ui_ux_design: '🎯 UI/UX Design',
  app_development: '📱 Mobile App Development',
  data_science: '📊 Data Science',
};

export default function SwapRequests() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('sent');

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/swap-requests?email=${user.email}`)
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/swap-requests/${id}`, { status: newStatus });
      if (res.data.modifiedCount > 0) {
        toast.success(`Request ${newStatus}`);
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (error) {
      toast.error('Failed to update request.');
    }
  };

  const filteredRequests = requests.filter((req) =>
    type === 'sent' ? req.senderEmail === user.email : req.receiverEmail === user.email
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Swap Requests</h2>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setType('sent')}
          className={`px-4 py-2 rounded-md font-semibold ${
            type === 'sent'
              ? 'bg-blue-600 text-white'
              : 'border border-blue-600 text-blue-600'
          }`}
        >
          Sent Requests
        </button>
        <button
          onClick={() => setType('received')}
          className={`px-4 py-2 rounded-md font-semibold ${
            type === 'received'
              ? 'bg-blue-600 text-white'
              : 'border border-blue-600 text-blue-600'
          }`}
        >
          Received Requests
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 min-h-[200px]">
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : filteredRequests.length === 0 ? (
          <p className="col-span-full text-center">No {type} requests found.</p>
        ) : (
          filteredRequests.map((req) => {
            const counterpart =
              type === 'sent'
                ? req.receiver || { email: req.receiverEmail }
                : req.sender || { email: req.senderEmail };
            const skillLabel = skillMap[req.offer?.skill] || 'Unknown Skill';
            const returnSkillLabel = skillMap[req.returnOffer?.skill] || 'Unknown Skill';

            return (
              <div
                key={req._id}
                className="border rounded-2xl shadow-md p-5 bg-white flex flex-col"
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-4 mb-4">
                  {req.userPhoto ? (
                    <img
                      src={req.userPhoto}
                      alt={counterpart?.name || counterpart?.email}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-14 h-14 text-gray-400" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {counterpart?.name || counterpart?.email}
                    </h3>
                    <p className="text-sm text-gray-500">{type === 'sent' ? 'To' : 'From'}</p>
                  </div>
                </div>

                {/* Offer Info */}
                <div className="mb-3">
                  <p className="text-sm text-gray-400">Requested Skill</p>
                  <p className="font-medium">{skillLabel}</p>
                </div>

                {req?.offer && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-400">Offer Title</p>
                    <p className="font-medium">{req.offer.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{req.offer.description}</p>
                  </div>
                )}

                {/* Return Offer — only for received */}
                {type === 'received' && req.returnOffer && (
                  <div className="mb-3 border-t pt-3 mt-3">
                    <p className="text-sm text-gray-400">They Offer You</p>
                    <p className="font-medium">{req.returnOffer.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{req.returnOffer.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Skill: {returnSkillLabel}
                    </p>
                  </div>
                )}

                {/* Status + Buttons */}
                <div className="flex justify-between items-center mt-auto pt-3 border-t">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-sm ${
                      req.status === 'pending'
                        ? 'border border-gray-400 text-gray-700'
                        : req.status === 'accepted'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {req.status}
                  </span>

                  {type === 'received' && req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(req._id, 'accepted')}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition"
                        aria-label="Accept request"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(req._id, 'rejected')}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                        aria-label="Reject request"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
