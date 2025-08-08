'use client';

import { useState, useEffect } from 'react';

export default function HowlNetworkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show modal after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Trigger fade-in animation slightly after showing
      setTimeout(() => setIsVisible(true), 10);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for fade-out animation to complete before unmounting
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`bg-gradient-to-r from-red-700 to-orange-600 rounded-lg p-6 shadow-2xl max-w-md w-full border border-red-500/30 transition-all duration-300 ease-in-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-triangle-exclamation text-white text-xl"></i>
            <h3 className="text-white font-bold text-lg">Service Notice</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-red-200 transition-colors text-xl -mt-1.5"
            aria-label="Close notification"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-white text-sm leading-relaxed">
            The HOWL Network is currently offline. Some services or API requests may fail during this time.
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Dismiss
          </button>
          <button
            onClick={handleClose}
            className="bg-black/30  hover:bg-black/50 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
