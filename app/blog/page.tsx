'use client';

import Navbar from '@/components/nav/Navbar';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Welcome to My Blog!",
    excerpt: "Starting my journey into blogging about tech, furry fandom, and life adventures.",
    date: "2025-08-09",
    readTime: "3 min read",
    category: "Personal",
    slug: "welcome-to-my-blog"
  },
  {
    id: 2,
    title: "Convention Adventures",
    excerpt: "Sharing my experiences from various furry conventions and the amazing people I've met.",
    date: "2025-08-08",
    readTime: "5 min read",
    category: "Conventions",
    slug: "convention-adventures"
  },
  {
    id: 3,
    title: "Tech Stack Deep Dive",
    excerpt: "A look into the technologies I use for my projects and why I chose them.",
    date: "2025-08-07",
    readTime: "7 min read",
    category: "Technology",
    slug: "tech-stack-deep-dive"
  }
];

function BlogPostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <motion.article
      variants={itemVariants}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/20 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full">
          {post.category}
        </span>
        <span className="text-sm text-gray-400">{post.date}</span>
        <span className="text-sm text-gray-400">•</span>
        <span className="text-sm text-gray-400">{post.readTime}</span>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      
      <p className="text-gray-300 mb-4 leading-relaxed">
        {post.excerpt}
      </p>
      
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      >
        Read more
        <i className="fas fa-arrow-right ml-2"></i>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
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
                {getText("Blog")}
              </h1>
              <p className="text-xl text-gray-300 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {getText("Thoughts, experiences, and tech adventures")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-pen mr-2"></i>
                <span className="text-sm">{getText("Personal Stories")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-code mr-2"></i>
                <span className="text-sm">{getText("Tech Insights")}</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-paw mr-2"></i>
                <span className="text-sm">{getText("Furry Community")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Introduction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {getText("Latest Posts")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {getText("Welcome to my blog where I share thoughts on technology, adventures in the furry fandom, convention experiences, and various projects I'm working on.")}
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 mb-16"
          >
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </motion.div>

          {/* Categories and Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {getText("What I Write About")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <i className="fas fa-laptop-code text-3xl text-cyan-400 mb-3"></i>
                <h4 className="text-lg font-semibold text-white mb-2">{getText("Technology")}</h4>
                <p className="text-gray-300 text-sm">{getText("Programming insights, project deep-dives, and tech reviews")}</p>
              </div>
              <div className="text-center">
                <i className="fas fa-users text-3xl text-cyan-400 mb-3"></i>
                <h4 className="text-lg font-semibold text-white mb-2">{getText("Community")}</h4>
                <p className="text-gray-300 text-sm">{getText("Convention stories, furry fandom experiences, and community highlights")}</p>
              </div>
              <div className="text-center">
                <i className="fas fa-user text-3xl text-cyan-400 mb-3"></i>
                <h4 className="text-lg font-semibold text-white mb-2">{getText("Personal")}</h4>
                <p className="text-gray-300 text-sm">{getText("Life updates, thoughts, and random adventures")}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
