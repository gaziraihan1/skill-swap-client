'use client';
import { FaUserPlus, FaRegListAlt, FaSearch, FaExchangeAlt } from 'react-icons/fa';
import {motion} from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Sign Up',
      icon: <FaUserPlus className="text-3xl text-sky-600" />,
      description: 'Create your free account and join the SkillSwap community.',
    },
    {
      title: 'List Your Skill',
      icon: <FaRegListAlt className="text-3xl text-emerald-600" />,
      description: 'Tell others what you can offer – design, coding, music, anything!',
    },
    {
      title: 'Browse & Request',
      icon: <FaSearch className="text-3xl text-orange-500" />,
      description: 'Explore available skills and request the ones you need.',
    },
    {
      title: 'Swap & Grow',
      icon: <FaExchangeAlt className="text-3xl text-purple-600" />,
      description: 'Connect, exchange, and grow together by sharing your skills.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 1, ease: 'easeInOut'}}
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
