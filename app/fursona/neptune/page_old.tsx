'use client';
import LoaderEvents from "@/components/LoaderEvents";
import Navbar from "@/components/nav/Navbar";
import { Link } from "lucide-react";
import Image from 'next/image';
import { useState } from 'react';

export default function Neptune() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsImageModalOpen(true);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setIsImageModalOpen(false), 300);
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/banners/fursona.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover blur-sm"
        />
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/50 via-black/50 to-transparent z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Neptune
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)]">
              Meet Neptune, the fierce wolf from the Andromeda Galaxy! A dangerous yet curious companion on cosmic adventures.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-left text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-3">
          Neptune’s Reference
        </h1>
       <h2 className="text-2xl font-semibold text-purple-400 mb-6">Wolf</h2>
        <ul className="space-y-1 mb-6">
          <li><strong>Name:</strong> Neptune</li>
          <li><strong>Species:</strong> Wolf</li>
          <li><strong>Living Environment:</strong> Deep Space - Andromeda Galaxy</li>
          <li><strong>Personality:</strong> Curious, Playful, Ferocious, Dangerous</li>
          <li><strong>Likes:</strong> Space, Adventuring, Outdoors</li>
          <li><strong>Has Fursuit:</strong> <i className="fa-solid fa-check text-green-400"></i></li>
          <li><strong>Is Main Fursona:</strong> <i className="fa-solid fa-xmark text-red-400"></i></li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Colors</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-6">
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#520092] border border-neutral-600"></div>
            <code className="text-sm">#520092 — Primary</code>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#eabaff] border border-neutral-600"></div>
            <code className="text-sm">#eabaff — Secondary</code>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-neutral-600"></div>
            <code className="text-sm">#ffffff — White</code>
          </li>
          <li className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2b2b2b] border border-neutral-600"></div>
            <code className="text-sm">#2b2b2b — Black</code>
          </li>
        </ul>

        <div 
          className="relative w-full aspect-square cursor-pointer group"
          onClick={openModal}
        >
          <Image
            src="/images/refsheet-neptune.png"
            alt="Neptune Refsheet"
            fill
            className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-500/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
              <i className="fas fa-expand text-white text-lg"></i>
            </div>
          </div>
        </div>

        {/*<div className="prose prose-invert mx-auto mt-10">
          <p className="mt-4">
            {/* Text 
          </p>
        </div>*/}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <div 
              className={`relative w-full h-full max-w-6xl max-h-[90vh] bg-gray-900/20 rounded-lg overflow-hidden transition-all duration-300 ${
                isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-2 right-2 z-[60] bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
              <Image
                src="/images/refsheet-neptune.png"
                alt="Neptune Refsheet - Full Size"
                fill
                className="object-contain p-4"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}



    </div>
  );
}