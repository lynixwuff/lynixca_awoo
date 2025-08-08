'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isFursonasOpen, setIsFursonasOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Persist dark mode in localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

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
    ];

    const fursonaItems = [
        { href: '/fursona', label: 'Lynix' },
        { href: '/fursona/neptune', label: 'Neptune' },
    ]

    const projectItems = [
        { href: '/aviation', label: 'Aviation' },
        { href: '/photography', label: 'Lynix Photography' },
    ];

    return (
        <nav className="bg-neutral-950/60 dark:bg-neutral-950/60 backdrop-blur-lg text-gray-100 z-50 shadow-sm border-b border-gray-700/20 dark:border-gray-800/20 fixed top-0 w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#5B8FB9] transition-colors duration-300">
                        <Image
                            src="/lynix-logo.png"
                            alt="Lynix Logo"
                            width={60} // or your desired size
                            height={60}
                            className="inline-block align-middle p-3"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-6">
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

                        {/* Fursona Dropdown */}
                        <li className="relative hidden">
                            <motion.button
                                className="font-semibold text-gray-300 hover:text-cyan-400  transition-colors duration-300 flex items-center focus:outline-none"
                                onClick={() => { setIsFursonasOpen(!isFursonasOpen); setIsProjectsOpen(false); }}
                            >
                                Fursona
                                <motion.svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: isFursonasOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </motion.button>
                            <AnimatePresence>
                                {isFursonasOpen && (
                                    <motion.ul
                                        className="absolute top-13 left-0 w-48 bg-[#1A1A2E]/60 dark:bg-[#0F0F1C]/60 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700/20 dark:border-gray-800/20 py-2 z-10"
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={dropdownVariants}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setIsFursonasOpen(false)}
                                    >
                                        {fursonaItems.map((item, index) => (
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

                        {/* Projects Dropdown */}
                        <li className="relative hidden">
                            <motion.button
                                className="font-semibold text-gray-300 hover:text-cyan-400  transition-colors duration-300 flex items-center focus:outline-none"
                                onClick={() => { setIsProjectsOpen(!isProjectsOpen); setIsFursonasOpen(false); }}
                            >
                                Projects
                                <motion.svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </motion.button>
                            <AnimatePresence>
                                {isProjectsOpen && (
                                    <motion.ul
                                        className="absolute top-13 left-0 w-48 bg-[#1A1A2E]/60 dark:bg-[#0F0F1C]/60 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700/20 dark:border-gray-800/20 py-2 z-10"
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={dropdownVariants}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setIsProjectsOpen(false)}
                                    >
                                        {projectItems.map((item, index) => (
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

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none focus:ring-2 focus:ring-[#5B8FB9] rounded-md p-2"
                            aria-label="Toggle menu"
                        >
                            <motion.svg
                                className="w-6 h-6 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                animate={isOpen ? 'open' : 'closed'}
                            >
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    variants={{
                                        closed: { d: 'M4 6h16M4 12h16M4 18h16' },
                                        open: { d: 'M6 18L18 6M6 6l12 12' },
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.svg>
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
                            {/* Mobile Projects Dropdown */}
                            <motion.li variants={itemVariants} initial="closed" animate="open" transition={{ delay: navItems.length * 0.1 }}>
                                <button
                                    onClick={() => setIsFursonasOpen(!isFursonasOpen)}
                                    className="flex items-center text-lg font-semibold text-gray-300 hover:text-[#5B8FB9] transition-colors duration-300 py-2 w-full hidden"
                                >
                                    Fursonas
                                    <motion.svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        animate={{ rotate: isFursonasOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence>
                                    {isFursonasOpen && (
                                        <motion.ul
                                            className="pl-4 space-y-2 mt-2"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {fursonaItems.map((item, index) => (
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
                                                            setIsProjectsOpen(false);
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

                            {/* Mobile Projects Dropdown */}
                            <motion.li variants={itemVariants} initial="closed" animate="open" transition={{ delay: navItems.length * 0.1 }}>
                                <button
                                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                                    className="flex items-center text-lg font-semibold text-gray-300 hover:text-[#5B8FB9] transition-colors duration-300 py-2 w-full hidden"
                                >
                                    Projects
                                    <motion.svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>
                                <AnimatePresence>
                                    {isProjectsOpen && (
                                        <motion.ul
                                            className="pl-4 space-y-2 mt-2"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {projectItems.map((item, index) => (
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
                                                            setIsProjectsOpen(false);
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