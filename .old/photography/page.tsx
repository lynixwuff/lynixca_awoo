'use client';
import React, { useState } from "react";
import Navbar from "@/components/nav/Navbar";

export default function Photography() {
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDownloadClick = () => {
        setShowModal(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 300); // Match the fade-out animation duration
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Banner Section */}
            <div className="relative isolate overflow-hidden bg-gray-900">
                <img
                    src="/images/new/bg3.jpg"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover blur-[1px]"
                />
                <div className="absolute inset-0 -z-10 bg-gray-900/40"></div>
                <div className="w-full px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-black/50 via-black/50 to-transparent z-0">
                    <div className="mt-[73px] mx-auto max-w-2xl text-center">
                        <div className="mb-6 hidden">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
                                <i className="fas fa-calendar-alt text-cyan-400 mr-2"></i>
                                <span className="text-cyan-300 text-sm font-medium">%CON_NAME% is starting soon!</span>
                            </div>
                        </div>
                        <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                            Photography
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
                            Capturing memories from conventions, events, and adventures through my lens!
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

            {/* Coming Soon Content */}
            <div className="flex-grow flex items-center justify-center bg-gray-900">
                <div className="text-center px-4 py-16">
                    <div className="mb-8">
                        <i className="fas fa-camera text-6xl text-cyan-500 mb-6"></i>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Lynix Photography is on the way!
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        I'm curating my photography collection, redesigning my portfolio, and acquiring new camera equipment. Stay tuned for exciting updates!
                    </p>

                    <div className="space-y-4 text-gray-500">
                        <div className="flex items-center justify-center">
                            <i className="fas fa-mountain text-cyan-500 mr-3"></i>
                            <span>Landscape Photography</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-paw text-cyan-500 mr-3"></i>
                            <span>Furry Photography</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-star text-cyan-500 mr-3"></i>
                            <span>Event Photography</span>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm text-gray-500">
                            Check back soon for updates!
                        </p>
                    </div>
                </div>
            </div>

            {/* Download Section */}
            <div className="bg-gray-800 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Event Photography Collections</h3>
                        <p className="text-gray-400">Photo collections from conventions and events</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Furry Weekend Atlanta 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Furry Weekend Atlanta 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Furnal Equinox 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Furnal Equinox 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* AnthrOhio 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">AnthrOhio 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Motor City Furry Con 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Motor City Furry Con 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Comic Con Toronto 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Comic Con Toronto 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Anthro New England 2025 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Anthro New England 2025</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Smoke in the Smoke 6 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Smoke in the Smoke 6</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Unavailable for Download
                            </button>
                        </div>

                        {/* Smoke in the Smoke 6 */}
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <i className="fas fa-folder text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white">Bark in the Dark 1</h4>
                            </div>
                            <button
                                className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-all duration-300"
                                onClick={handleDownloadClick}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className={`fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 transition-all duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                    <div
                        className={`bg-gray-800 rounded-lg p-8 max-w-md mx-4 text-center transform transition-all duration-300 ease-out shadow-2xl ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                    >
                        <div className="mb-6">
                            <i className="fas fa-clock text-6xl text-cyan-500 mb-4 animate-pulse"></i>
                            <h3 className="text-2xl font-bold text-white mb-2">Too New for Download</h3>
                            <p className="text-gray-400">
                                This event is too recent for photos to be available for download yet.
                                Please check back later as I process and organize the photos.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-center text-gray-300 transform transition-all duration-700 delay-200">
                                <i className="fas fa-camera text-cyan-500 mr-2"></i>
                                <span className="text-sm">Photos are being processed</span>
                            </div>
                            <div className="flex items-center justify-center text-gray-300 transform transition-all duration-700 delay-400">
                                <i className="fas fa-edit text-cyan-500 mr-2"></i>
                                <span className="text-sm">Editing and organizing in progress</span>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-cyan-500 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-cyan-600 hover:scale-105 transition-all duration-300 transform hover:shadow-lg"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
