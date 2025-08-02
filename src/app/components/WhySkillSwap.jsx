'use client';
import React from 'react';
import { CheckCircle, Globe, ShieldCheck, CalendarCheck2 } from 'lucide-react';
import {motion} from 'framer-motion'

const features = [
  {
    title: '100% Free',
    description: 'SkillSwap is completely free to use — no hidden costs or subscriptions.',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  },
  {
    title: 'Global & Local Community',
    description: 'Connect with people nearby or from across the world.',
    icon: <Globe className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Secure Communication',
    description: 'Private messaging and secure connections to protect your data.',
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
  },
  {
    title: 'Smart Booking System',
    description: 'Easily schedule and manage your skill swaps.',
    icon: <CalendarCheck2 className="w-8 h-8 text-yellow-500" />,
  },
];

export default function WhySkillSwap() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why SkillSwap?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity:1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 1.2}}
              key={idx}
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
