'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-16">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unlock Your Potential with <span className="text-blue-600">SkillSwap</span>
          </motion.h1>
          <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.6}} className="mt-4 text-gray-600 text-lg md:text-xl">
            Connect, share, and grow by exchanging skills with people around the world.
          </motion.p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
            <Link
              href="/explore"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Explore Skills
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition"
            >
              Join Now
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/people-collaborating-image.png" // Make sure this image exists in /public/images/
            alt="Skill Sharing Illustration"
            width={500}
            height={400}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
