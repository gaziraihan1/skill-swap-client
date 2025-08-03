'use client'
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useState } from 'react';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('swap'); 
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    swapId: '',
    targetUser: '',
    rating: 5,
    message: '',
    generalType: '',
    subject: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axiosSecure.post('/feedback', formData);
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Give Your Feedback</h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFeedbackType('swap')}
          className={`btn ${feedbackType === 'swap' ? 'btn-primary' : 'btn-outline'}`}
        >
          Swap Feedback
        </button>
        <button
          onClick={() => setFeedbackType('general')}
          className={`btn ${feedbackType === 'general' ? 'btn-primary' : 'btn-outline'}`}
        >
          General Feedback
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {feedbackType === 'swap' ? (
          <>
            <select
              name="swapId"
              className="select w-full"
              onChange={handleChange}
              value={formData.swapId}
              required
            >
              <option value="">Select Completed Swap</option>
              {/* map your completed swaps here */}
              <option value="abc123">Web Dev with Alex</option>
              <option value="def456">UI Design with Sara</option>
            </select>

            <input
              type="text"
              name="targetUser"
              placeholder="Person You Swapped With"
              className="input w-full"
              onChange={handleChange}
              value={formData.targetUser}
              required
            />

            <div>
              <label className="block mb-1">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                className="input w-full"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="Describe your experience..."
              className="textarea w-full"
              rows={4}
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </>
        ) : (
          <>
            <select
              name="generalType"
              className="select w-full"
              onChange={handleChange}
              value={formData.generalType}
              required
            >
              <option value="">Select Feedback Type</option>
              <option value="platform">Platform Experience</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Feedback Subject"
              className="input w-full"
              onChange={handleChange}
              value={formData.subject}
              required
            />

            <textarea
              name="message"
              placeholder="Write your feedback..."
              className="textarea w-full"
              rows={4}
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

