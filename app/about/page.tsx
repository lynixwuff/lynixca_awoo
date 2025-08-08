'use client';

import Navbar from "@/components/nav/Navbar";
import { Link } from "lucide-react";
import Image from 'next/image';
import clsx from 'clsx';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons';
import LoaderEvents from "@/components/LoaderEvents";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}


export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/images/banner3.jpg"
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
              About Me
            </h1>
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

          {/* Introduction Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-white mb-6">
                Hey there! I'm <span className="text-cyan-500">Lynix</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                A spacefaring furry with a passion for technology and adventure. I'm always on the lookout for new experiences, whether exploring digital frontiers or attending furry conventions.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-2xl"></div>
                <Image
                  src={'/images/pfp.jpg'}
                  alt="Lynix Profile"
                  width={400}
                  height={400}
                  className="relative aspect-square rounded-2xl object-cover shadow-2xl transform rotate-3"
                />
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">My Journey</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <i className="fas fa-rocket text-cyan-500 text-2xl mr-3"></i>
                  <h4 className="text-xl font-semibold text-white">Fursonas</h4>
                </div>
                <p className="text-gray-300">
                  I've created two fursonas that reflect my journey. Neptune, a space-themed wolf inspired by my fascination with the cosmos, and Lynix, a Freakhound representing a unique blend of space and biotechnology.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <i className="fas fa-map-marked-alt text-cyan-500 text-2xl mr-3"></i>
                  <h4 className="text-xl font-semibold text-white">Origins</h4>
                </div>
                <p className="text-gray-300">
                  Originally from Atlantic Canada, I grew up surrounded by natural beauty and vibrant culture. In 2024, I made the leap to a new province, where I now live and work.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <i className="fas fa-plane text-cyan-500 text-2xl mr-3"></i>
                  <h4 className="text-xl font-semibold text-white">Passions</h4>
                </div>
                <p className="text-gray-300">
                  Beyond the furry community, I'm deeply passionate about aviation, space exploration, and traveling. I also love VR and expressing myself through fursuiting as Neptune and Lynix.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <i className="fas fa-users text-cyan-500 text-2xl mr-3"></i>
                  <h4 className="text-xl font-semibold text-white">Community</h4>
                </div>
                <p className="text-gray-300">
                  Active in various furry communities, volunteering and staffing at events. I enjoy working on personal projects and sharing my creativity with the world.
                </p>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 shadow-2xl">
            <div className="text-center mb-10">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-4">
                Let's Connect!
              </h3>
              <p className="text-gray-300 text-lg">Find me across the digital cosmos</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                onClick={() => {
                  window.open('https://bsky.app/profile/lynix.ca', '_blank');
                }}
                className="group relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-cyan-500/20 hover:to-cyan-600/20 rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 border border-gray-600/30 hover:border-cyan-500/50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center text-center">
                  <i className="fas fa-cloud text-cyan-400 text-3xl mb-3 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300"></i>
                  <span className="text-white font-semibold text-lg mb-1">Bluesky</span>
                  <span className="text-gray-400 text-sm">@lynix.ca</span>
                  <span className="text-xs text-cyan-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity copy-text">Click to visit</span>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  window.open('https://github.com/lynixhound', '_blank');
                }}
                className="group relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-cyan-500/20 hover:to-cyan-600/20 rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 border border-gray-600/30 hover:border-cyan-500/50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center text-center">
                  <i className="fab fa-github text-cyan-400 text-3xl mb-3 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300"></i>
                  <span className="text-white font-semibold text-lg mb-1">GitHub</span>
                  <span className="text-gray-400 text-sm">@lynixhound</span>
                  <span className="text-xs text-cyan-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity copy-text">Click to visit</span>
                </div>
              </button>
              
              <button 
                onClick={(e) => {
                  navigator.clipboard.writeText('lynix.wolf');
                  const button = e.currentTarget;
                  const originalText = button.querySelector('.copy-text');
                  if (originalText) {
                    originalText.textContent = 'Copied!';
                    setTimeout(() => {
                      originalText.textContent = 'Click to copy';
                    }, 1000);
                  }
                }}
                className="group relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-cyan-500/20 hover:to-cyan-600/20 rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 border border-gray-600/30 hover:border-cyan-500/50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center text-center">
                  <i className="fab fa-discord text-cyan-400 text-3xl mb-3 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300"></i>
                  <span className="text-white font-semibold text-lg mb-1">Discord</span>
                  <span className="text-gray-400 text-sm">lynix.wolf</span>
                  <span className="text-xs text-cyan-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity copy-text">Click to copy</span>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  window.open('https://t.me/lynixwolf', '_blank');
                }}
                className="group relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-cyan-500/20 hover:to-cyan-600/20 rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 border border-gray-600/30 hover:border-cyan-500/50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center text-center">
                  <i className="fab fa-telegram text-cyan-400 text-3xl mb-3 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300"></i>
                  <span className="text-white font-semibold text-lg mb-1">Telegram</span>
                  <span className="text-gray-400 text-sm">@lynixwolf</span>
                  <span className="text-xs text-cyan-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity copy-text">Click to visit</span>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 