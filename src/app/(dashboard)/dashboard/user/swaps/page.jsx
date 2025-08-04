'use client';

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SwapPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [activeSwaps, setActiveSwaps] = useState([]);
  const [swapHistory, setSwapHistory] = useState([]);
  const [view, setView] = useState("active"); // "active" or "history"
  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/swaps/active/${user.email}`)
        .then(res => setActiveSwaps(res.data))
        .catch(err => console.error(err));

      axiosSecure.get(`/swaps/history/${user.email}`)
        .then(res => setSwapHistory(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleCompleteClick = (id) => {
    setSelectedRequestId(id);
    setShowModal(true);
  };

  const confirmComplete = async () => {
    try {
      await axiosSecure.patch(`/requests/complete/${selectedRequestId}`);
      toast.success("Swap marked as completed");
      setShowModal(false);
      // Refresh active swaps and history
      const [active, history] = await Promise.all([
        axiosSecure.get(`/swaps/active/${user.email}`),
        axiosSecure.get(`/swaps/history/${user.email}`)
      ]);
      setActiveSwaps(active.data);
      setSwapHistory(history.data);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const renderSwapCard = (swap) => (
    <div key={swap._id} className="border rounded-xl p-4 bg-white shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-1 text-gray-700">Offer:</h3>
          <p className="font-medium">{swap.offer?.title}</p>
          <p className="text-sm text-gray-600">Skill: {swap.offer?.skillLabel}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 text-gray-700">Return Offer:</h3>
          <p className="font-medium">{swap.returnOffer?.title}</p>
          <p className="text-sm text-gray-600">Skill: {swap.returnOffer?.skillLabel}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          From: {swap.senderEmail}<br />
          To: {swap.receiverEmail}
        </div>
        {view === "active" && (
          <button
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
            onClick={() => handleCompleteClick(swap._id)}
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Swaps</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("active")}
          className={`px-4 py-2 rounded ${view === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Active Swaps
        </button>
        <button
          onClick={() => setView("history")}
          className={`px-4 py-2 rounded ${view === "history" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Swap History
        </button>
      </div>

      {/* Swap List */}
      <div className="space-y-4">
        {view === "active" && activeSwaps.length === 0 && <p className="text-center text-gray-500">No active swaps found.</p>}
        {view === "active" && activeSwaps.map(renderSwapCard)}

        {view === "history" && swapHistory.length === 0 && <p className="text-center text-gray-500">No completed swaps found.</p>}
        {view === "history" && swapHistory.map(renderSwapCard)}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Completion</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to mark this swap as completed?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmComplete}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapPage;
