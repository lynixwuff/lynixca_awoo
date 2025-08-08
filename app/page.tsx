import LoaderEvents from '@/components/LoaderEvents';
import Navbar from '@/components/nav/Navbar';
import HowlNetworkModal from '@/components/HowlNetworkModal';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="min-h-screen text-gray-200 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('/images/test.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Navbar */}
      <Navbar />

      {/* HOWL Network Modal */}
      <HowlNetworkModal />

      <div className="fixed top-20 left-4 right-4 z-40 max-w-4xl mx-auto hidden">
        <div className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-500 rounded-lg p-3 shadow-lg border border-cyan-400/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-paw text-white"></i>
              <div>
                <span className="text-white font-bold text-sm">Furnal Equinox 2026 is happening now, join the adventure with Lynix!</span>
              </div>
            </div>
            <Link href="/events" className="hidden  md:block bg-black/50 hover:bg-black/30 text-white text-xs font-medium py-1 px-3 rounded-full transition-all duration-300 flex items-center gap-1">
              <i className="fas fa-calendar-alt text-xs mr-1"></i>
              View Events
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {/* Darker Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 z-0" />

      <section className="text-center max-w-3xl relative z-10">

        {/* Fursona Profile Picture */}
        <div className="relative w-40 h-40 mb-5 mx-auto">
          <Image
            src="/blep.gif"
            alt="Lynix Fursona Profile Picture"
            fill
            className="object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Hey! I'm Lynix!
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl mb-6 text-white font-semibold drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)]">
          Hey there! I'm <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient font-bold">Lynix</span>, 
          a biotechnological space freakhound with a passion for 
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient font-bold"> technology</span> and 
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient font-bold"> adventure</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/about"
            className="inline-block bg-cyan-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/50"
            aria-label="Learn more about Lynix"
          >
            <span className="flex items-center gap-2">
              <i className="fas fa-paper-plane"></i>
              Contact Me
            </span>
          </Link>
          <Link
            href="/fursona"
            className="inline-block bg-cyan-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/50"
            aria-label="View Lynix's fursona"
          >
            <span className="flex items-center gap-2">
              <i className="fas fa-paw"></i>
              My Fursona
            </span>
          </Link>
        </div>

      </section>

    </div>
    );
}