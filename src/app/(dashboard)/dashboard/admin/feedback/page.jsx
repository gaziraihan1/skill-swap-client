'use client';

import { useEffect, useState, Suspense } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaStar, FaUserCircle } from 'react-icons/fa';


const FeedbackSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <Skeleton height={20} width={100} />
    <Skeleton height={15} count={2} className="my-2" />
    <Skeleton height={20} width={80} />
  </div>
);

const FeedbackCard = ({ feedback }) => {
  const { userName, feedbackUserPhoto
, generalType, message,  createdAt, subject } = feedback;

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <div className="flex items-center gap-3 mb-2">
        {feedbackUserPhoto ? (
          <img src={feedbackUserPhoto} alt={userName} className="w-10 h-10 rounded-full" />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
        <div>
          <h4 className="font-semibold">{userName}</h4>
          <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <h3 className='my-2 font-semibold'>
        {subject}
      </h3>
      <p className="text-gray-700 mb-2">{message}</p>
      <div className="flex gap-1 text-yellow-400 mb-2">
        {Array.from({ length: feedback?.rating }, (_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      
      <p className="text-xs text-gray-400 mt-2 capitalize">Type: {generalType}</p>
    </div>
  );
};

const FeedbackList = () => {
  const axiosSecure = useAxiosSecure();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/feedbacks?page=${page}&limit=${limit}`)
      .then((res) => {
        setFeedbacks(res.data.feedbacks);
        setTotalPages(Math.ceil(res.data.totalCount / limit));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, page]);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">User Feedback</h2>
      {loading
        ? Array.from({ length: limit }).map((_, i) => <FeedbackSkeleton key={i} />)
        : feedbacks.map((fb) => <FeedbackCard key={fb._id} feedback={fb} />)}

      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 border rounded ${page === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function FeedbackPage() {
  return (
    <Suspense fallback={<FeedbackSkeleton />}>
      <FeedbackList />
    </Suspense>
  );
}
