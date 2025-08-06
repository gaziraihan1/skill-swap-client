"use client";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {  FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RequestPage({ params }) {
  const id = params.id;
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const [offer, setOffer] = useState(null);
  const [myOffers, setMyOffers] = useState([]);
  const [selectedReturnOfferId, setSelectedReturnOfferId] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      axiosSecure.get(`/offers/${id}`).then((res) => setOffer(res.data));
      axiosSecure.get(`/offers?userEmail=${user.email}`).then((res) => setMyOffers(res.data));
    }
  }, [user, axiosSecure, id]);

  const handleSendRequest = async () => {
    if (!selectedReturnOfferId) {
      Swal.fire({
        icon: "warning",
        title: "Select Your Offer",
        text: "Please select one of your offers to swap.",
      });
      return;
    }

    setLoadingRequest(true);

    try {
      const checkRes = await axiosSecure.get(`/requests/by-user/${user?.email}`, {
        params: { offerId: id },
      });

      if (checkRes.data.requested) {
        Swal.fire({
          icon: "info",
          title: "Already Requested",
          text: "You have already sent a swap request for this offer.",
        });
        return;
      }

      const returnOffer = myOffers.find((item) => item._id === selectedReturnOfferId);

      await axiosSecure.post("/swap-requests", {
        offerId: id,
        senderEmail: user.email,
        receiverEmail: offer?.userEmail,
        status: "pending",
        userPhoto: user.photoURL,
        offer,
        returnOffer,
        createdAt: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Your swap request has been successfully sent.",
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Requested",
          text: "You have already sent a swap request for this offer.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: "Something went wrong while sending the request.",
        });
      }
    } finally {
      setLoadingRequest(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Swap Request
      </h1>

      {offer ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600">{offer.title}</h2>
          <p className="text-gray-700">{offer.description}</p>

          <div className="flex items-center space-x-4 mt-4">
            {offer.userPhoto && (
              <img
                src={offer.userPhoto}
                alt={offer.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-gray-800 font-medium">{offer.userName}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <span>{offer.userEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-gray-500" />
            <p className="text-gray-600">
              Posted on {new Date(offer.createdAt).toLocaleDateString()}
            </p>
          </div>

          {offer.userEmail !== user.email && (
            <>
              <div className="mt-6">
                <label htmlFor="return-offer" className="block text-gray-700 font-medium mb-2">
                  Select one of your offers to return:
                </label>
                <select
                  id="return-offer"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedReturnOfferId}
                  onChange={(e) => setSelectedReturnOfferId(e.target.value)}
                >
                  <option value="">-- Select Your Offer --</option>
                  {myOffers.map((myOffer) => (
                    <option key={myOffer._id} value={myOffer._id}>
                      {myOffer.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSendRequest}
                disabled={loadingRequest}
                className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                {loadingRequest ? "Sending..." : "Send Swap Request"}
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Offer not found.</p>
      )}
    </div>
  );
}
