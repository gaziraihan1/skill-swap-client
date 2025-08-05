'use client';

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '@/hooks/useAxiosSecure';

export default function FeedbackPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [feedbackType, setFeedbackType] = useState('swap');
  const [skeletonCount, setSkeletonCount] = useState(1);

  const [formData, setFormData] = useState({
    swapId: '',
    targetUser: '',
    rating: 5,
    message: '',
    generalType: '',
    subject: '',
  });

  const [completedSwaps, setCompletedSwaps] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/swaps/history/${user.email}`)
        .then((res) => setCompletedSwaps(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const fetchUserFeedbacks = async () => {
  if (!user?.email) return;
  try {
    setLoadingFeedbacks(true);
    const res = await axiosSecure.get(`/feedback/user/${user.email}`);
    setSkeletonCount(res.data.length || 3); 
    setUserFeedbacks(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingFeedbacks(false);
  }
};


  useEffect(() => {
    fetchUserFeedbacks();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwapSelect = (e) => {
    const selectedSwapId = e.target.value;
    const selectedSwap = completedSwaps.find((swap) => swap._id === selectedSwapId);

    setFormData({
      ...formData,
      swapId: selectedSwapId,
      targetUser:
        selectedSwap?.senderEmail === user.email
          ? selectedSwap?.receiverEmail
          : selectedSwap?.senderEmail,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let feedback;
      if (feedbackType === 'swap') {
        feedback = {
          generalType: "swap",
          rating: parseInt(formData.rating),
          message: formData.message,
          userEmail: user?.email,
          userName: user?.displayName,
          feedbackUserPhoto: user?.photoURL,
        };
      } else {
        feedback = {
          userEmail: user?.email,
          feedbackUserPhoto: user?.photoURL,
          generalType: formData.generalType,
          subject: formData.subject,
          message: formData.message,
          userName: user?.displayName,
        };
      }

      const res = await axiosSecure.post("/feedback", feedback);

      if (res.data.insertedId) {
        toast.success('Feedback submitted');
        setFormData({
          swapId: '',
          targetUser: '',
          rating: 5,
          message: '',
          generalType: '',
          subject: '',
        });

        fetchUserFeedbacks(); 
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Give Your Feedback</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFeedbackType('swap')}
          className={`px-4 py-2 rounded font-medium ${
            feedbackType === 'swap' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Swap Feedback
        </button>
        <button
          onClick={() => setFeedbackType('general')}
          className={`px-4 py-2 rounded font-medium ${
            feedbackType === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          General Feedback
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {feedbackType === 'swap' ? (
          <>
            <label className="block font-medium text-gray-700">Select Completed Swap</label>
            <select
              name="swapId"
              onChange={handleSwapSelect}
              value={formData.swapId}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- Choose a swap --</option>
              {completedSwaps.map((swap) => (
                <option key={swap._id} value={swap._id}>
                  {swap.offer?.title} ↔ {swap.returnOffer?.title}
                </option>
              ))}
            </select>

            <div>
              <label className="block font-medium text-gray-700">Rating (1 to 5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your experience..."
                className="w-full border rounded px-3 py-2"
                required
              ></textarea>
            </div>
          </>
        ) : (
          <>
            <label className="block font-medium text-gray-700">Feedback Type</label>
            <select
              name="generalType"
              value={formData.generalType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- Select type --</option>
              <option value="platform">Platform Experience</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
            </select>

            <div>
              <label className="block font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Feedback Subject"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your feedback..."
                className="w-full border rounded px-3 py-2"
                required
              ></textarea>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Feedback
        </button>
      </form>

      <div className="mt-10">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Submitted Feedback</h3>

  {loadingFeedbacks ? (
    <div className="space-y-4">
      {[...Array(skeletonCount)].map((_, i) => (
        <div key={i} className="animate-pulse p-4 border rounded shadow bg-gray-100">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  ) : userFeedbacks.length === 0 ? (
    <p className="text-gray-500">You haven’t submitted any feedback yet.</p>
  ) : (
    <div className="space-y-4">
      {userFeedbacks.map((fb) => (
        <div key={fb._id} className="p-4 border rounded shadow bg-white">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-blue-700">
              {fb.swapId ? 'Swap Feedback' : fb.generalType === 'feature' ? 'Feature Request' : fb.generalType === 'bug' ? 'Bug Report' : 'Platform Experience'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(fb.createdAt).toLocaleString()}
            </span>
          </div>

          {fb.subject && (
            <div className="text-lg font-bold text-gray-800 mb-1">{fb.subject}</div>
          )}

          {fb.rating && (
            <div className="text-yellow-500 mb-1">⭐ {fb.rating}/5</div>
          )}

          <p className="text-gray-700">{fb.message}</p>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
