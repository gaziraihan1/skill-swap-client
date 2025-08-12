'use client';

import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { FiSearch } from 'react-icons/fi';
import { FaRegClock } from 'react-icons/fa';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-md p-5 border flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="flex-1 space-y-1">
        <div className="h-4 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="h-5 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-5/6" />
    <div className="flex justify-between mt-4">
      <div className="h-6 w-24 bg-gray-300 rounded-full" />
      <div className="h-4 w-16 bg-gray-300 rounded" />
    </div>
    <div className="h-10 bg-gray-300 rounded w-full mt-4" />
  </div>
);

export default function ExploreSkills() {
  const axiosInstance = useAxios();
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
  const limit = 6;

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/offers-collection?page=${page}&limit=${limit}&search=${searchText}&skill=${skillFilter}`
      );
      setAllOffers(res.data.offers);
      setTotalOffers(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const skillMap = {
    web_development: '💻 Web Development',
    frontend_development: '🌐 Frontend Development',
    backend_development: '🖥️ Backend Development',
    fullstack_development: '🧠 Full Stack Development',
    app_development: '📱 Mobile App Development',
    game_development: '🎮 Game Development',
    ai_ml: '🤖 AI / Machine Learning',
    data_science: '📊 Data Science',
    cybersecurity: '🔐 Cybersecurity',
    devops: '⚙️ DevOps',
    blockchain: '⛓️ Blockchain Development',
    graphic_design: '🎨 Graphic Design',
    ui_ux_design: '🧩 UI/UX Design',
    video_editing: '🎬 Video Editing',
    animation: '🌀 Animation',
    illustration: '🖌️ Illustration',
    '3d_modeling': '📐 3D Modeling',
    digital_marketing: '📢 Digital Marketing',
    seo: '🔍 SEO',
    content_marketing: '✍️ Content Marketing',
    social_media: '📱 Social Media Marketing',
    business_strategy: '📊 Business Strategy',
    project_management: '🗂️ Project Management',
    content_writing: '📝 Content Writing',
    copywriting: '📄 Copywriting',
    technical_writing: '🧾 Technical Writing',
    creative_writing: '🎭 Creative Writing',
    translation: '🌍 Translation',
    public_speaking: '🎤 Public Speaking',
    leadership: '👑 Leadership',
    time_management: '⏰ Time Management',
    problem_solving: '🧠 Problem Solving',
    teamwork: '🤝 Teamwork',
  };

  useEffect(() => {
    fetchOffers();
  }, [searchText, skillFilter, page]);

  const totalPages = Math.ceil(totalOffers / limit);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full pl-10"
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
        </div>
        <select
          className="select select-bordered w-full md:w-64"
          value={skillFilter}
          onChange={(e) => {
            setSkillFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Skills</option>
          {Object.entries(skillMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {
        allOffers.length === 0 && !loading && (
          <h2 className='text-center my-2 text-red-500'>There is no offer available for this skill now</h2>
        )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />) 
          : 
           allOffers.map((offer) => (
  <div
    key={offer._id}
    className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
  >
    <div className="bg-blue-800 text-white p-4 flex items-center gap-3">
      <Image
        src={offer.userPhoto}
        width={40}
        height={40}
        alt="user"
        className="w-10 h-10 rounded-full border-2 border-white"
      />
      <div>
        <h4 className="font-semibold text-sm">{offer.userName}</h4>
        <p className="text-xs opacity-90">{offer.userEmail}</p>
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1 justify-between">
      <div>
        <h3 className="md:text-lg font-bold text-blue-700">{offer.title}</h3>
        <p className="text-sm text-gray-700 mt-2">{offer.description}</p>
      </div>

      <div className="flex justify-between items-center mt-4 text-xs md:text-sm">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
          {skillMap[offer.skill] || offer.skill}
        </span>
        <span className="flex items-center text-gray-500 gap-1">
          <FaRegClock /> {moment(offer.createdAt).fromNow()}
        </span>
      </div>

      <div className="mt-4">
        {offer.completed ? (
          <button
            disabled
            className="py-2 px-5 text-center w-full bg-gray-600 rounded text-gray-300 pointer-events-none"
          >
            Already swapped
          </button>
        ) : (
          <Link href={`/explore/${offer._id}`}>
            <button className="w-full py-2 px-5 text-center bg-green-600 rounded text-white">
              Request
            </button>
          </Link>
        )}
      </div>
    </div>
  </div>
))
}
      </div>

      {totalPages > 1 && !loading && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                i + 1 === page ? 'btn-primary text-white' : 'btn-outline'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
