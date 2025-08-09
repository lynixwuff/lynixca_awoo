'use client';

import Navbar from '@/components/nav/Navbar';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Dog mode utility function
const convertToDogSpeak = (text: string): string => {
  const dogWords = ['bark', 'woof', 'arf', 'ruff', 'bork', 'wag', 'tail'];
  const words = text.split(' ');
  return words.map(() => dogWords[Math.floor(Math.random() * dogWords.length)]).join(' ');
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Gallery() {
  const [isDogMode, setIsDogMode] = useState(false);

  // Listen for dog mode changes from navbar (localStorage)
  useEffect(() => {
    const checkDogMode = () => {
      const dogMode = localStorage.getItem('dogMode') === 'true';
      setIsDogMode(dogMode);
    };

    // Check initial state
    checkDogMode();

    // Listen for storage events (when navbar toggles dog mode)
    window.addEventListener('storage', checkDogMode);
    
    // Also check periodically in case localStorage changes
    const interval = setInterval(checkDogMode, 100);

    return () => {
      window.removeEventListener('storage', checkDogMode);
      clearInterval(interval);
    };
  }, []);

  const getText = (originalText: string) => {
    return isDogMode ? convertToDogSpeak(originalText) : originalText;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/banner2.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {getText("Gallery")}
              </h1>
              <p className="text-xl text-gray-300 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {getText("A collection of memories and moments")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-camera mr-2"></i>
                <span className="text-sm">{getText("Photography")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-images mr-2"></i>
                <span className="text-sm">{getText("Digital Art")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-heart mr-2"></i>
                <span className="text-sm">{getText("Memories")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {getText("Coming Soon")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {getText("I'm working on building an amazing gallery to showcase photos, digital art, and special moments. Check back soon for updates!")}
            </p>
          </motion.div>

          {/* Placeholder Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/20 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 aspect-square flex items-center justify-center"
              >
                <div className="text-center">
                  <i className="fas fa-image text-4xl text-gray-600 mb-4"></i>
                  <p className="text-gray-400">{getText("Gallery Item")}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20 p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {getText("Stay Tuned")}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {getText("The gallery will feature a mix of photography, digital artwork, convention photos, and other visual content. Follow my social media for updates!")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-clock mr-2"></i>
                <span className="text-sm">{getText("Under Development")}</span>
              </div>
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-star mr-2"></i>
                <span className="text-sm">{getText("High Quality Content")}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
