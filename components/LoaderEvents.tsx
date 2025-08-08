'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoaderEvents() {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 2000); // Show error after 2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="text-center">
        {!showError ? (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Modern loading animation */}
            <div className="relative inline-block">
              <motion.div
                className="w-16 h-16 border-4 border-gray-600 border-t-cyan-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 w-12 h-12 border-4 border-transparent  border-t-cyan-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Modern icon with glow */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-lg"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                <i className="fas fa-calendar-xmark text-white text-2xl"></i>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">No Events Available</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                I'm currently working on bringing you amazing events! Check back soon for conventions, meetups, and more.
              </p>
            </div>

            {/* Modern call-to-action */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium">
                <i className="fas fa-bell text-sm"></i>
                <span>Stay tuned for announcements!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
