'use client';

import React from "react";
import Navbar from "@/components/nav/Navbar";

export default function Aviation() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />


            {/* Hero Banner Section */}
            <div className="relative isolate overflow-hidden bg-gray-900">
                <img
                    src="/images/banners/blog.jpg"
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
                            Aviation
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
                            Soaring through the skies - my journey as a pilot in training and aviation enthusiast!
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

            {/* Flight Stats Content */}
            <div className="flex-grow flex items-center justify-center bg-gray-900">
                <div className="text-center px-4 py-16">
                    <div className="mb-8">
                        <i className="fas fa-tachometer-alt text-6xl text-cyan-500 mb-6"></i>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Flight Statistics
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Tracking my journey through the skies - from training hours to solo flights and adventures.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 max-w-4xl mx-auto">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="text-3xl font-bold text-cyan-500 mb-2">0</div>
                            <div className="text-gray-400 text-sm">Total Hours</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="text-3xl font-bold text-cyan-500 mb-2">0</div>
                            <div className="text-gray-400 text-sm">Solo</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="text-3xl font-bold text-cyan-500 mb-2">0</div>
                            <div className="text-gray-400 text-sm">Dual</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="text-3xl font-bold text-cyan-500 mb-2">0</div>
                            <div className="text-gray-400 text-sm">Cross Country</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="text-3xl font-bold text-cyan-500 mb-2">23</div>
                            <div className="text-gray-400 text-sm">Non-Loggable</div>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-500">
                        <div className="flex items-center justify-center">
                            <i className="fas fa-plane-departure text-cyan-500 mr-3"></i>
                            <span>0 Takeoffs & Landings This Month</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-cyan-500 mr-3"></i>
                            <span>0% Progress Toward PPL</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-route text-cyan-500 mr-3"></i>
                            <span>7 Different Airports Visited</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-clock text-cyan-500 mr-3"></i>
                            <span>1.5 Hours Average Flight Time</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Licenses Section */}
            <div className="bg-gray-800 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">Aviation Licenses & Certifications</h3>
                        <p className="text-gray-400">My current and future pilot certifications</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PPL */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="mb-4">
                                <i className="fas fa-graduation-cap text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white mb-2">Private Pilot License (PPL)</h4>
                                <p className="text-gray-400 text-sm mb-4">Single-engine aircraft operation for non-commercial purposes</p>
                            </div>
                            <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium text-sm">
                                In Training
                            </span>
                        </div>

                        {/* Multi-Engine */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="mb-4">
                                <i className="fas fa-cogs text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white mb-2">Multi-Engine Rating</h4>
                                <p className="text-gray-400 text-sm mb-4">Operation of aircraft with multiple engines</p>
                            </div>
                            <span className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                                Future Goal
                            </span>
                        </div>

                        {/* CPL */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="mb-4">
                                <i className="fas fa-briefcase text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white mb-2">Commercial Pilot License (CPL)</h4>
                                <p className="text-gray-400 text-sm mb-4">Flying for compensation or hire</p>
                            </div>
                            <span className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                                Future Goal
                            </span>
                        </div>

                        {/* ATPL */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="mb-4">
                                <i className="fas fa-plane-departure text-4xl text-cyan-500 mb-3"></i>
                                <h4 className="text-xl font-semibold text-white mb-2">Airline Transport Pilot License (ATPL)</h4>
                                <p className="text-gray-400 text-sm mb-4">Pilot-in-command for scheduled air carriers</p>
                            </div>
                            <span className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                                Future Goal
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Notice */}
            <div className="py-8 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-red-900 rounded-lg p-6 text-center">
                        <div className="mb-4">
                            <i className="fas fa-shield-alt text-4xl text-red-400 mb-3"></i>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Security Notice</h4>
                        <p className="text-red-200">
                            Detailed flight logs and sensitive aviation data are not displayed here for security and privacy reasons.
                            You must login to access the secure Yote Portal for comprehensive flight records.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
