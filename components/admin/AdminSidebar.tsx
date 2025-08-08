'use client';

import { useState, useEffect } from 'react';

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Handle responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setCollapsed(true);
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
        { id: 'events', label: 'Events', icon: 'fa-calendar-alt' },
        { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
        { id: 'flights', label: 'Flight Tracker', icon: 'fa-plane' },
        { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
        { id: 'content', label: 'Content', icon: 'fa-file-alt' },
        { id: 'settings', label: 'Settings', icon: 'fa-cog' }
    ];

    const toggleSidebar = () => {
        if (isMobile) {
            setIsVisible(!isVisible);
        } else {
            setCollapsed(!collapsed);
        }
    };

    const handleMenuClick = (tabId: string) => {
        setActiveTab(tabId);
        if (isMobile) {
            setIsVisible(false);
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && isVisible && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsVisible(false)}
                />
            )}

            {/* Mobile toggle button */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-lg shadow-lg"
                >
                    <i className="fas fa-bars text-sm"></i>
                </button>
            )}

            {/* Sidebar */}
            <div 
                className={`
                    bg-gray-800/95 backdrop-blur-sm h-screen transition-all duration-300 ease-in-out
                    ${isMobile 
                        ? `fixed ${isVisible ? 'translate-x-0' : '-translate-x-full'} w-64 z-50` 
                        : `fixed ${collapsed ? 'w-16' : 'w-64'} z-30`
                    }
                    left-0 top-0 border-r border-gray-700/50 shadow-2xl flex flex-col
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0 min-h-[80px]">
                    {(!collapsed || isMobile) && (
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <img src="/lynix-logo.png" alt="Lynix Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-white font-bold text-lg tracking-tight truncate">YOTE Portal</h2>
                                <p className="text-gray-400 text-xs">v1.0.0</p>
                            </div>
                        </div>
                    )}
                    
                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50 flex-shrink-0"
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm`}></i>
                        </button>
                    )}

                    {/* Mobile close button */}
                    {isMobile && (
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50 ml-2"
                            aria-label="Close sidebar"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 px-3 py-4 overflow-y-auto">
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`
                                    w-full flex items-center rounded-lg transition-all duration-200 group
                                    ${(collapsed && !isMobile) ? 'px-3 py-3 justify-center' : 'px-4 py-3 gap-3'}
                                    ${activeTab === item.id
                                        ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-600/30 shadow-lg shadow-cyan-600/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border border-transparent'
                                    }
                                `}
                                title={(collapsed && !isMobile) ? item.label : undefined}
                                aria-label={item.label}
                            >
                                <i className={`
                                    fas ${item.icon} text-lg transition-colors
                                    ${activeTab === item.id ? 'text-cyan-400' : 'text-cyan-400 group-hover:text-cyan-300'}
                                `}></i>
                                {(!collapsed || isMobile) && (
                                    <span className="font-medium truncate">{item.label}</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
                    {(!collapsed || isMobile) && (
                        <div className="flex items-center gap-2 mb-3 p-2 bg-gray-700/30 rounded-lg">
                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                                <img src="/images/profile.jpg" alt="Lynix Logo" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">Lynix</p>
                                <p className="text-gray-400 text-xs truncate">Administrator</p>
                            </div>
                        </div>
                    )}
                    
                    {(collapsed && !isMobile) && (
                        <div className="w-8 h-8 flex items-center justify-center mx-auto mb-3">
                            <img src="/images/profile.jpg" alt="Lynix Logo" className="w-full h-full object-contain" />
                        </div>
                    )}
                    
                    <button
                        onClick={onLogout}
                        className={`
                            w-full flex items-center px-3 py-2 text-red-400 hover:text-red-300 
                            hover:bg-red-500/10 rounded-lg transition-colors border border-transparent 
                            hover:border-red-500/20 group
                            ${(collapsed && !isMobile) ? 'justify-center' : 'gap-3'}
                        `}
                        title={(collapsed && !isMobile) ? 'Logout' : undefined}
                        aria-label="Logout"
                    >
                        <i className="fas fa-sign-out-alt text-sm"></i>
                        {(!collapsed || isMobile) && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Spacer for desktop */}
            {!isMobile && (
                <div className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0`} />
            )}
        </>
    );
}
