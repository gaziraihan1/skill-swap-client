'use client';
import React from 'react';
import {motion} from 'framer-motion'

const popularSkills = [
  { title: 'Graphic Design', emoji: '🎨' },
  { title: 'Web Development', emoji: '💻' },
  { title: 'Yoga', emoji: '🧘' },
  { title: 'Photography', emoji: '📷' },
  { title: 'Public Speaking', emoji: '🗣' },
];

export default function PopularSkills() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Popular Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {popularSkills.map((skill, index) => (
            <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
              key={index}
              className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="text-4xl mb-3">{skill.emoji}</div>
              <h3 className="text-lg font-medium text-gray-700 text-center">
                {skill.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
