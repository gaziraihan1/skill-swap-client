"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const popularSkills = [
  { value: "web_development", label: "💻 Web Development" },
  { value: "frontend_development", label: "🌐 Frontend Development" },
  { value: "backend_development", label: "🖥️ Backend Development" },
  { value: "fullstack_development", label: "🧠 Full Stack Development" },
  { value: "app_development", label: "📱 Mobile App Development" },
  { value: "game_development", label: "🎮 Game Development" },
  { value: "ai_ml", label: "🤖 AI / Machine Learning" },
  { value: "data_science", label: "📊 Data Science" },
  { value: "cybersecurity", label: "🔐 Cybersecurity" },
  { value: "devops", label: "⚙️ DevOps" },
  { value: "blockchain", label: "⛓️ Blockchain Development" },
  { value: "graphic_design", label: "🎨 Graphic Design" },
  { value: "ui_ux_design", label: "🧩 UI/UX Design" },
  { value: "video_editing", label: "🎬 Video Editing" },
  { value: "animation", label: "🌀 Animation" },
  { value: "3d_modeling", label: "📐 3D Modeling" },
  { value: "illustration", label: "🖌️ Illustration" },
  { value: "digital_marketing", label: "📢 Digital Marketing" },
  { value: "seo", label: "🔍 SEO" },
  { value: "content_marketing", label: "✍️ Content Marketing" },
  { value: "social_media", label: "📱 Social Media Marketing" },
  { value: "business_strategy", label: "📊 Business Strategy" },
  { value: "project_management", label: "🗂️ Project Management" },
  { value: "content_writing", label: "📝 Content Writing" },
  { value: "copywriting", label: "📄 Copywriting" },
  { value: "technical_writing", label: "🧾 Technical Writing" },
  { value: "creative_writing", label: "🎭 Creative Writing" },
  { value: "translation", label: "🌍 Translation" },
  { value: "public_speaking", label: "🎤 Public Speaking" },
  { value: "leadership", label: "👑 Leadership" },
  { value: "time_management", label: "⏰ Time Management" },
  { value: "problem_solving", label: "🧠 Problem Solving" },
  { value: "teamwork", label: "🤝 Teamwork" },
];

export default function MyOffersPage() {
  const [title, setTitle] = useState("");
  const axiosSecure = useAxiosSecure();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [description, setDescription] = useState("");
  const [offers, setOffers] = useState([]);
  const { user } = useAuth();

  const fetchOffers = async () => {
    try {
      const res = await axiosSecure.get(`/offers?userEmail=${user?.email}`);
      setOffers(res.data);
    } catch (error) {
      toast.error("Failed to load offers.");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOffers();
    }
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedSkill || !description) {
      toast.error("All fields are required.");
      return;
    }

    const offer = {
      title,
      skill: selectedSkill.value,
      skillLabel: selectedSkill.label,
      description,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/offers", offer);
      if (res.data.insertedId) {
        toast.success("Offer added!");
        await fetchOffers(); 
        setTitle("");
        setDescription("");
        setSelectedSkill(null);
      }
    } catch (error) {
      toast.error("Failed to add offer.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-2 space-y-10">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        My Offers
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg p-3 rounded-xl border"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g. I will teach React basics"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Select a Skill</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {popularSkills.map((skill) => (
              <button
                type="button"
                key={skill.value}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 transition text-xs md:text-sm ${
                  selectedSkill?.value === skill.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Briefly describe what you're offering..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Add Offer
        </button>
      </motion.form>

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Offers</h3>

        {offers.length === 0 ? (
          <p className="text-gray-500">No offers added yet.</p>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={offer?.userPhoto || "/default-avatar.png"}
                    alt={offer.userName || "User"}
                    width={48}
                    height={48}
                    className="rounded-full h-8 w-8 md:h-12 md:w-12 object-cover border border-gray-300"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {offer.userName || "Anonymous"}
                    </h4>
                    <p className="text-sm text-gray-500">{offer.userEmail}</p>
                  </div>
                </div>

                <h5 className="md:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                  {offer.title}
                </h5>

                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                  Skill: {offer.skillLabel || offer.skill}
                </span>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {offer.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
