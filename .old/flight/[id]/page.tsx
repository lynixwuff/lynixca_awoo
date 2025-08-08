'use client';

import React, { useState, useEffect } from "react";
import Navbar from "@/components/nav/Navbar";

export default function FlightTracker() {
    const [flightProgress, setFlightProgress] = useState(65); // 65% progress
    const [isLive, setIsLive] = useState(true);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            if (isLive && flightProgress < 100) {
                setFlightProgress(prev => Math.min(prev + 0.1, 100));
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [flightProgress, isLive]);

    const departureTime = "6:46 PM";
    const arrivalTime = "9:02 PM";
    const scheduledDeparture = "6:45 PM";
    const scheduledArrival = "8:50 PM";

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />

            {/* Header Section */}
            <div className="relative isolate overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
                <div className="w-full px-6 py-16 lg:px-8 relative z-10">
                    <div className="mt-[73px] mx-auto max-w-6xl">
                        {/* Flight Status Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-4">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-green-300 text-sm font-medium">Live Tracking</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                                Flight PD1234
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300">
                                Porter Airlines • Lynix 737-800
                            </p>
                        </div>

                        {/* Route Overview */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
                            <div className="grid md:grid-cols-3 gap-8 items-center">
                                {/* Departure */}
                                <div className="text-center md:text-left">
                                    <div className="mb-4">
                                        <h3 className="text-3xl font-bold text-white mb-1">YYZ</h3>
                                        <p className="text-gray-400 mb-2">Toronto Pearson</p>
                                        <p className="text-cyan-300 font-medium">Terminal 3, Gate B2C</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-center md:justify-start">
                                            <span className="text-green-400 font-bold text-lg mr-2">{departureTime}</span>
                                            <span className="text-xs text-gray-500">({scheduledDeparture})</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Departed • Tue, Jul 22</p>
                                    </div>
                                </div>

                                {/* Flight Progress */}
                                <div className="relative order-last md:order-none">
                                    <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative"
                                            style={{ width: `${flightProgress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                                        </div>
                                        {/* Plane Icon */}
                                        <div 
                                            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
                                            style={{ left: `${flightProgress}%` }}
                                        >
                                            <div className="bg-white rounded-full p-1 shadow-lg">
                                                <i className="fas fa-plane text-cyan-600 text-xs transform rotate-45"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                                        <span>Departed</span>
                                        <span className="text-cyan-400 font-medium">{flightProgress.toFixed(1)}%</span>
                                        <span>Arriving</span>
                                    </div>
                                </div>

                                {/* Arrival */}
                                <div className="text-center md:text-right">
                                    <div className="mb-4">
                                        <h3 className="text-3xl font-bold text-white mb-1">YVR</h3>
                                        <p className="text-gray-400 mb-2">Vancouver Intl</p>
                                        <p className="text-cyan-300 font-medium">Terminal M, Gate -</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-center md:justify-end">
                                            <span className="text-green-400 font-bold text-lg mr-2">{arrivalTime}</span>
                                            <span className="text-xs text-gray-500">({scheduledArrival})</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Estimated • Tue, Jul 22</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Flight Details Grid */}
            <div className="flex-grow bg-gray-900 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Left Column - Flight Stats */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <i className="fas fa-info-circle text-cyan-500 mr-2"></i>
                                    Flight Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Aircraft:</span>
                                        <span className="text-white">Lynix 737-800</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Altitude:</span>
                                        <span className="text-white">37,000 ft</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Speed:</span>
                                        <span className="text-white">482 mph</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Distance:</span>
                                        <span className="text-white">2,070 mi</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Remaining:</span>
                                        <span className="text-cyan-400">{((100 - flightProgress) * 20.7).toFixed(0)} mi</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <i className="fas fa-clock text-cyan-500 mr-2"></i>
                                    Timing
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Elapsed:</span>
                                        <span className="text-white">1h 32m</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Remaining:</span>
                                        <span className="text-cyan-400">{Math.round((100 - flightProgress) * 0.8)}m</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Total Duration:</span>
                                        <span className="text-white">4h 17m</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Map Visualization */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-full">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <i className="fas fa-map text-cyan-500 mr-2"></i>
                                    Flight Path
                                </h3>
                                
                                {/* Simplified Map Visualization */}
                                <div className="relative bg-gray-900/50 rounded-lg p-8 h-80 overflow-hidden">
                                    {/* Background grid */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <div key={i} className="border border-gray-600"></div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Flight path line */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                                <stop offset={`${flightProgress}%`} stopColor="#06b6d4" stopOpacity="0.8" />
                                                <stop offset={`${flightProgress}%`} stopColor="#374151" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#374151" stopOpacity="0.4" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M 10 70 Q 30 30, 50 40 Q 70 50, 90 30"
                                            stroke="url(#pathGradient)"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="2,2"
                                        />
                                    </svg>
                                    
                                    {/* Departure Airport */}
                                    <div className="absolute bottom-8 left-8 flex flex-col items-center">
                                        <div className="bg-green-500 rounded-full p-2 mb-2">
                                            <i className="fas fa-plane-departure text-white text-sm"></i>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-bold">YYZ</div>
                                            <div className="text-xs text-gray-400">Toronto</div>
                                        </div>
                                    </div>
                                    
                                    {/* Current Position */}
                                    <div 
                                        className="absolute transition-all duration-1000 ease-out transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ 
                                            left: `${10 + (flightProgress * 0.8)}%`,
                                            top: `${70 - (flightProgress * 0.4)}%`
                                        }}
                                    >
                                        <div className="bg-cyan-500 rounded-full p-2 animate-pulse shadow-lg">
                                            <i className="fas fa-plane text-white text-sm transform rotate-45"></i>
                                        </div>
                                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                                            <div className="text-cyan-400 font-bold text-xs">PD1234</div>
                                        </div>
                                    </div>
                                    
                                    {/* Arrival Airport */}
                                    <div className="absolute top-8 right-8 flex flex-col items-center">
                                        <div className="bg-blue-500 rounded-full p-2 mb-2">
                                            <i className="fas fa-plane-arrival text-white text-sm"></i>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-bold">YVR</div>
                                            <div className="text-xs text-gray-400">Vancouver</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Weather Info */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900/50 rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <i className="fas fa-cloud-sun text-yellow-400 mr-2"></i>
                                            <span className="text-white font-medium">YYZ Weather</span>
                                        </div>
                                        <div className="text-gray-400 text-sm">Clear • 24°C • 10mph winds</div>
                                    </div>
                                    <div className="bg-gray-900/50 rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <i className="fas fa-cloud-rain text-blue-400 mr-2"></i>
                                            <span className="text-white font-medium">YVR Weather</span>
                                        </div>
                                        <div className="text-gray-400 text-sm">Light Rain • 18°C • 15mph winds</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Updates Section */}
                    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <i className="fas fa-bell text-cyan-500 mr-2"></i>
                            Flight Updates
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <div className="text-white">Departed Toronto (YYZ) on time</div>
                                    <div className="text-xs text-gray-400">6:46 PM • 2 minutes ago</div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <div className="text-white">Reached cruising altitude of 37,000 ft</div>
                                    <div className="text-xs text-gray-400">7:15 PM • 33 minutes ago</div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <div className="text-white">Currently over Saskatchewan</div>
                                    <div className="text-xs text-gray-400">Updated 2 minutes ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
