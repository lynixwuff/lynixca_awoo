'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
    onLoginClick?: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOtherBarksOpen, setIsOtherBarksOpen] = useState(false);

    // Animation variants for mobile menu
    const menuVariants = {
        closed: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    // Animation variants for menu items
    const itemVariants = {
        closed: { opacity: 0, x: -10 },
        open: { opacity: 1, x: 0 },
    };

    // Animation variants for dropdown
    const dropdownVariants = {
        closed: { opacity: 0, y: -10, height: 0 },
        open: { opacity: 1, y: 0, height: 'auto' },
    };

    const navItems = [
        { href: '/about', label: 'About' },
        { href: '/events', label: 'Events' },
        { href: '/blog', label: 'Blog' },
        { href: '/gallery', label: 'Gallery' },
    ];

    const otherBarksItems = [
        { href: '/artists', label: 'Artists' },
        { href: '/aviation', label: 'Aviation' },
        { href: '/projects', label: 'Projects' },
    ];

    return (
        <nav className="bg-neutral-950/60 dark:bg-neutral-950/60 backdrop-blur-lg text-gray-100 z-50 shadow-sm border-b border-gray-700/20 dark:border-gray-800/20 fixed top-0 w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#5B8FB9] transition-colors duration-300">
                        <Image
                            src="/lynix-logo.png"
                            alt="Lynix Logo"
                            width={60}
                            height={60}
                            className="inline-block align-middle p-3"
                        />
                    </Link>

                    {/* Centered Desktop Menu */}
                    <ul className="hidden md:flex items-center justify-center space-x-8 flex-1">
                        {navItems.map((item) => (
                            <motion.li
                                key={item.href}
                            >
                                <Link
                                    href={item.href}
                                    className="font-semibold text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
                                >
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}

                        {/* Other Barks Dropdown */}
                        <li className="relative">
                            <motion.button
                                className="font-semibold text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center focus:outline-none"
                                onClick={() => setIsOtherBarksOpen(!isOtherBarksOpen)}
                            >
                                Barks
                                <motion.i
                                    className="fas fa-chevron-down ml-1 text-sm"
                                    animate={{ rotate: isOtherBarksOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                            <AnimatePresence>
                                {isOtherBarksOpen && (
                                    <motion.ul
                                        className="absolute top-13 left-0 w-48 bg-[#1A1A2E]/60 dark:bg-[#0F0F1C]/60 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700/20 dark:border-gray-800/20 py-2 z-10"
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={dropdownVariants}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setIsOtherBarksOpen(false)}
                                    >
                                        {otherBarksItems.map((item, index) => (
                                            <motion.li
                                                key={item.href}
                                                variants={itemVariants}
                                                initial="closed"
                                                animate="open"
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-300"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    </ul>

                    {/* Right side icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* User Login */}
                        <button
                            onClick={onLoginClick}
                            className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="User login"
                        >
                            <i className="fas fa-user text-lg"></i>
                        </button>
                    </div>
                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center space-x-4">
                        {/* Mobile User Login */}
                        <button
                            onClick={onLoginClick}
                            className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="User login"
                        >
                            <i className="fas fa-user text-lg"></i>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none focus:ring-2 focus:ring-[#5B8FB9] rounded-md p-2"
                            aria-label="Toggle menu"
                        >
                            <motion.i
                                className={`text-gray-300 text-xl transition-all duration-300 ${
                                    isOpen ? 'fas fa-times' : 'fas fa-bars'
                                }`}
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            className="md:hidden px-4 py-6 space-y-4"
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.href}
                                    variants={itemVariants}
                                    initial="closed"
                                    animate="open"
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-lg font-semibold text-gray-300 hover:text-[#5B8FB9] transition-colors duration-300 py-2"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}

                            {/* Mobile Other Barks Dropdown */}
                            <motion.li
                                variants={itemVariants}
                                initial="closed"
                                animate="open"
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                <button
                                    onClick={() => setIsOtherBarksOpen(!isOtherBarksOpen)}
                                    className="flex items-center text-lg font-semibold text-gray-300 hover:text-[#5B8FB9] transition-colors duration-300 py-2 w-full"
                                >
                                    Other Barks
                                    <motion.i
                                        className="fas fa-chevron-down ml-2 text-sm"
                                        animate={{ rotate: isOtherBarksOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOtherBarksOpen && (
                                        <motion.ul
                                            className="pl-4 space-y-2 mt-2"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {otherBarksItems.map((item, index) => (
                                                <motion.li
                                                    key={item.href}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setIsOtherBarksOpen(false);
                                                        }}
                                                        className="block text-gray-300 hover:text-[#5B8FB9] transition-colors duration-300 py-1"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}