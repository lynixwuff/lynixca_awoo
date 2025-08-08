'use client';
import LoaderEvents from "@/components/LoaderEvents";
import Navbar from "@/components/nav/Navbar";
import { Link } from "lucide-react";
import Image from 'next/image';
import { useState } from 'react';

export default function About() {
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
          src="/images/bark.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-0">
          <div className="mt-[73px] mx-auto max-w-2xl text-center">
            <div className="mb-6 hidden">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
                <i className="fas fa-calendar-alt text-cyan-400 mr-2"></i>
                <span className="text-cyan-300 text-sm font-medium">%CON_NAME% is starting soon!</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Fursona
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              Meet Lynix, my cosmic Freakhound! From the depths of space to digital adventures, discover the character that represents my journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 hidden">
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-rocket mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-users mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
              <div className="flex items-center text-cyan-300 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fas fa-star mr-2"></i>
                <span className="text-sm">AAAAAAAAAAAAA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Character Introduction */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                  Meet <span className="text-cyan-500">Lynix</span>
                </h2>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Freakhound</h3>
              </div>

              {/* Character Stats */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <i className="fas fa-info-circle text-cyan-500 mr-2"></i>
                  Character Info
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Species:</span>
                    <span className="text-white font-medium">Freakhound</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Environment:</span>
                    <span className="text-white font-medium">Deep Space</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Personality:</span>
                    <span className="text-white font-medium">Curious, Playful, Alert</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Likes:</span>
                    <span className="text-white font-medium">Art, Space, Adventures</span>
                  </div>
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <i className="fas fa-paw text-red-400 text-xl mr-2"></i>
                    <span className="text-white font-medium">Fursuit</span>
                  </div>
                  <span className="text-red-400 text-sm">Not Available</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <i className="fas fa-star text-green-400 text-xl mr-2"></i>
                    <span className="text-white font-medium">Main Sona</span>
                  </div>
                  <span className="text-green-400 text-sm">Yes</span>
                </div>
              </div>
            </div>

            {/* Reference Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-2xl"></div>
                <div className="relative bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <div
                    className="relative w-full aspect-[2451/1580] cursor-pointer group"
                    onClick={openModal}
                  >
                    <Image
                      src="/images/refsheet.png"
                      alt="Lynix Refsheet"
                      fill
                      className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                        <i className="fas fa-expand text-white text-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Color Palette</h3>

            {/* Main Colors */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Main Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0c1831] border border-gray-600 mx-auto mb-3 shadow-lg"></div>
                  <code className="text-xs text-gray-300 block">#0c1831</code>
                  <span className="text-xs text-gray-400">Primary Dark</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#003a78] border border-gray-600 mx-auto mb-3 shadow-lg"></div>
                  <code className="text-xs text-gray-300 block">#003a78</code>
                  <span className="text-xs text-gray-400">Deep Blue</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#235081] border border-gray-600 mx-auto mb-3 shadow-lg"></div>
                  <code className="text-xs text-gray-300 block">#235081</code>
                  <span className="text-xs text-gray-400">Medium Blue</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#fffcf1] border border-gray-600 mx-auto mb-3 shadow-lg"></div>
                  <code className="text-xs text-gray-300 block">#fffcf1</code>
                  <span className="text-xs text-gray-400">Cream</span>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#7dedda] border border-gray-600 mx-auto mb-3 shadow-lg"></div>
                  <code className="text-xs text-gray-300 block">#7dedda</code>
                  <span className="text-xs text-gray-400">Cyan Accent</span>
                </div>
              </div>
            </div>

            {/* Eye Colors */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <i className="fas fa-eye text-blue-400 mr-2"></i>
                  Left Eye
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2e9ef0] border border-gray-600 mx-auto mb-2 shadow-lg"></div>
                    <code className="text-xs text-gray-300 block">#2e9ef0</code>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#0b4b75] border border-gray-600 mx-auto mb-2 shadow-lg"></div>
                    <code className="text-xs text-gray-300 block">#0b4b75</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <i className="fas fa-eye text-green-400 mr-2"></i>
                  Right Eye
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#76e170] border border-gray-600 mx-auto mb-2 shadow-lg"></div>
                    <code className="text-xs text-gray-300 block">#76e170</code>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2f6d12] border border-gray-600 mx-auto mb-2 shadow-lg"></div>
                    <code className="text-xs text-gray-300 block">#2f6d12</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Features */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <i className="fas fa-moon text-yellow-400 mr-2"></i>
                Moon Crescent
              </h4>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 text-center inline-block">
                <div className="w-12 h-12 rounded-full bg-[#ffeec2] border border-gray-600 mx-auto mb-2 shadow-lg"></div>
                <code className="text-xs text-gray-300 block">#ffeec2</code>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <div
              className={`relative w-full h-full max-w-6xl max-h-[90vh] bg-gray-900/20 rounded-lg overflow-hidden transition-all duration-300 ${isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
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
                src="/images/refsheet.png"
                alt="Lynix Refsheet - Full Size"
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
