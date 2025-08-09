'use client';

import React, { useState, useEffect } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [authMethod, setAuthMethod] = useState<'passkey' | 'otp'>('passkey');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Trigger fade-in animation slightly after showing
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAuthMethod('passkey');
        setIsOtpSent(false);
        setIsVisible(false);
        // Wait for fade-out animation to complete before calling onClose
        setTimeout(() => onClose(), 300);
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={handleClose}
        >
            <div
                className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 p-8 w-full max-w-md transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors z-10"
                    aria-label="Close login modal"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>

                {/* Modal content */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Welcome Back</h2>
                    <p className="text-gray-300">Sign in to your account securely</p>
                </div>

                {/* Auth Method Toggle */}
                <div className="relative flex bg-gray-800/30 backdrop-blur-sm rounded-lg p-1 mb-6 border border-gray-700/30">
                    {/* Sliding background indicator */}
                    <div
                        className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-md shadow-lg shadow-cyan-500/25 transition-all duration-500 ease-in-out transform ${authMethod === 'passkey' ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    />

                    <button
                        onClick={() => {
                            setAuthMethod('passkey');
                            setIsOtpSent(false);
                        }}
                        className={`relative z-10 flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-500 ease-in-out flex items-center justify-center gap-2 ${authMethod === 'passkey'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <i className={`fas fa-key transition-transform duration-500 ${authMethod === 'passkey' ? 'rotate-12' : 'rotate-0'}`}></i> Passkey
                    </button>
                    <button
                        onClick={() => {
                            setAuthMethod('otp');
                            setIsOtpSent(false);
                        }}
                        className={`relative z-10 flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-500 ease-in-out flex items-center justify-center gap-2 ${authMethod === 'otp'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <i className={`fas fa-envelope transition-transform duration-500 ${authMethod === 'otp' ? 'rotate-12' : 'rotate-0'}`}></i> One-Time Code
                    </button>
                </div>

                <form className="space-y-6">
                    {authMethod === 'otp' && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    )}

                    <div className="relative overflow-hidden">
                        {authMethod === 'passkey' ? (
                            <div className="space-y-4 transition-all duration-500 ease-in-out transform translate-x-0 opacity-100">
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                            <i className="fas fa-key text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">Passkey Authentication</h3>
                                            <p className="text-xs text-gray-300">Use your device's biometric or security key</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Passkeys provide secure, passwordless authentication using your device's built-in security features.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-cyan-400/50 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
                                >
                                    <i className="fas fa-key"></i> Sign In with Passkey
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 transition-all duration-500 ease-in-out transform translate-x-0 opacity-100">
                                {!isOtpSent ? (
                                    <div>
                                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                                    <i className="fas fa-envelope text-white text-sm"></i>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">One-Time Code</h3>
                                                    <p className="text-xs text-gray-300">We'll send a secure code to your email</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setIsOtpSent(true)}
                                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-cyan-400/50 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
                                        >
                                            <i className="fas fa-envelope"></i> Send One-Time Code
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
                                        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-600/30 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <i className="fas fa-check text-white text-xs"></i>
                                                </div>
                                                <p className="text-sm text-cyan-400 font-semibold">Code sent successfully!</p>
                                            </div>
                                            <p className="text-xs text-cyan-300/80">
                                                Check your email for a 6-digit verification code.
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="otp" className="block text-sm font-semibold text-gray-300 mb-2">
                                                Verification Code
                                            </label>
                                            <input
                                                type="text"
                                                id="otp"
                                                maxLength={6}
                                                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-center text-lg tracking-widest font-mono"
                                                placeholder="000000"
                                                required
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
                                            >
                                                <i className="fas fa-check"></i> Verify & Sign In
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsOtpSent(false)}
                                                className="px-4 py-4 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-all duration-300 text-sm flex items-center gap-2"
                                            >
                                                <i className="fas fa-redo text-xs"></i> Resend
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
