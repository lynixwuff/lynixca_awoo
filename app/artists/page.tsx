'use client';

import Navbar from '@/components/nav/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Dog mode utility function
const convertToDogSpeak = (text: string): string => {
  const dogWords = ['bark', 'woof', 'arf', 'ruff', 'bork', 'wag', 'tail'];
  const words = text.split(' ');
  return words.map(() => dogWords[Math.floor(Math.random() * dogWords.length)]).join(' ');
};

interface Artist {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  socialLinks: {
    twitter?: string;
    furaffinity?: string;
    website?: string;
    telegram?: string;
    discord?: string;
  };
  avatar?: string;
  featured?: boolean;
}

const artists: Artist[] = [
  {
    id: 'phosfurus',
    name: 'Phosfurus',
    description: 'An incredibly talented artist known for their vibrant digital artwork and character designs. Their style brings characters to life with amazing detail and personality.',
    specialties: ['Digital Art', 'Character Design', 'Commissions'],
    socialLinks: {
      twitter: 'https://twitter.com/phosfurus',
      furaffinity: 'https://www.furaffinity.net/user/phosfurus',
    },
    featured: true,
  },
  {
    id: 'camphowl',
    name: 'Camp HOWL',
    description: 'A wonderful artist and friend who creates amazing furry artwork. Known for their warm and inviting art style that captures the essence of the furry community.',
    specialties: ['Furry Art', 'Character Art', 'Digital Illustration'],
    socialLinks: {
      twitter: 'https://twitter.com/camphowl',
      furaffinity: 'https://www.furaffinity.net/user/camphowl',
    },
    featured: true,
  },
];

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

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/20 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Artist Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-bold text-xl">
            {artist.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
          {artist.featured && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full">
              <i className="fas fa-star mr-1"></i>
              Featured Artist
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-4 leading-relaxed">
        {artist.description}
      </p>

      {/* Specialties */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Specialties</h4>
        <div className="flex flex-wrap gap-2">
          {artist.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/30"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3">
        {artist.socialLinks.twitter && (
          <a
            href={artist.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
          >
            <i className="fab fa-twitter mr-2"></i>
            Twitter
          </a>
        )}
        {artist.socialLinks.furaffinity && (
          <a
            href={artist.socialLinks.furaffinity}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 text-sm bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors duration-200"
          >
            <i className="fas fa-paw mr-2"></i>
            FurAffinity
          </a>
        )}
        {artist.socialLinks.website && (
          <a
            href={artist.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors duration-200"
          >
            <i className="fas fa-globe mr-2"></i>
            Website
          </a>
        )}
        {artist.socialLinks.telegram && (
          <a
            href={artist.socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 text-sm bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors duration-200"
          >
            <i className="fab fa-telegram mr-2"></i>
            Telegram
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Artists() {
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
                {getText("Fellow Artists")}
              </h1>
              <p className="text-xl text-gray-300 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {getText("Celebrating the incredible talent in our community")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-palette mr-2"></i>
                <span className="text-sm">{getText("Amazing Artwork")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-heart mr-2"></i>
                <span className="text-sm">{getText("Community Love")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-users mr-2"></i>
                <span className="text-sm">{getText("Furry Artists")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Introduction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {getText("Talented Artists I Admire")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {getText("Here are some of the incredible artists I've had the pleasure of meeting and whose work continues to inspire me. Each brings their own unique style and creativity to the furry art community.")}
            </p>
          </motion.div>

          {/* Artists Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
          >
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
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
              {getText("Supporting Artists")}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {getText("If you're looking for amazing artwork, I highly recommend checking out these talented individuals. They create beautiful pieces and are wonderful members of our community!")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-info-circle mr-2"></i>
                <span className="text-sm">{getText("Always respect artists' terms of service")}</span>
              </div>
              <div className="flex items-center text-cyan-300">
                <i className="fas fa-dollar-sign mr-2"></i>
                <span className="text-sm">{getText("Support artists through commissions")}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
