'use client';

import { useEffect, useState, Suspense } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import SkeletonCard from '../components/SkeletonCard';

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

const AnalyticsCard = ({ title, value }) => (
  <div className="p-4 bg-white shadow-md rounded-xl">
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
  </div>
);

const AnalyticsContent = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosSecure.get('/admin/analytics')
      .then(res => setData(res.data))
      .catch(() => setData(null));
  }, [axiosSecure]);

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3).fill(null).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard title="Total Users" value={data.totalUsers} />
        <AnalyticsCard title="Total Offers" value={data.totalOffers} />
        <AnalyticsCard title="Completed Swaps" value={data.totalCompletedSwaps} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Top Skills</h2>
        <ul className="space-y-2">
          {data.topSkills.map(skill => {
            const skillDisplay = skillMap[skill._id] || skill._id;
            return (
              <li
                key={skill._id}
                className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
              >
                <span>{skillDisplay}</span>
                <span className="text-xs md:text-sm text-gray-600">{skill.count} offers</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <AnalyticsContent />
    </Suspense>
  );
}

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(3).fill(null).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);
