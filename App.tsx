import React, { useState, useEffect } from 'react';
import CyberCubeLoader from './components/CyberCubeLoader';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // 2.8 seconds loader
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  if (loading) {
    return <CyberCubeLoader />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 scanlines font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-gray-800 h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-xl font-orbitron font-bold text-white tracking-widest">
            DM<span className="text-cyan-500">.AI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider relative group"
              >
                <span className="relative z-10"> {item.label} </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-cyan-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-gray-900 border-b border-gray-800 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 font-mono block py-2 border-l-2 border-transparent hover:border-cyan-500 pl-4 transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative z-0">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Global CSS animation injections */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }

        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #00f3ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #bc13fe;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.3deg); }
          5% { clip: rect(12px, 9999px, 59px, 0); transform: skew(0.3deg); }
          10% { clip: rect(48px, 9999px, 29px, 0); transform: skew(0.3deg); }
          15% { clip: rect(42px, 9999px, 73px, 0); transform: skew(0.3deg); }
          20% { clip: rect(63px, 9999px, 27px, 0); transform: skew(0.3deg); }
          25% { clip: rect(34px, 9999px, 55px, 0); transform: skew(0.3deg); }
          30% { clip: rect(86px, 9999px, 73px, 0); transform: skew(0.3deg); }
          35% { clip: rect(20px, 9999px, 20px, 0); transform: skew(0.3deg); }
          40% { clip: rect(26px, 9999px, 60px, 0); transform: skew(0.3deg); }
          45% { clip: rect(25px, 9999px, 66px, 0); transform: skew(0.3deg); }
          50% { clip: rect(57px, 9999px, 98px, 0); transform: skew(0.3deg); }
          55% { clip: rect(5px, 9999px, 46px, 0); transform: skew(0.3deg); }
          60% { clip: rect(82px, 9999px, 31px, 0); transform: skew(0.3deg); }
          65% { clip: rect(54px, 9999px, 27px, 0); transform: skew(0.3deg); }
          70% { clip: rect(28px, 9999px, 99px, 0); transform: skew(0.3deg); }
          75% { clip: rect(45px, 9999px, 69px, 0); transform: skew(0.3deg); }
          80% { clip: rect(23px, 9999px, 85px, 0); transform: skew(0.3deg); }
          85% { clip: rect(54px, 9999px, 84px, 0); transform: skew(0.3deg); }
          90% { clip: rect(45px, 9999px, 47px, 0); transform: skew(0.3deg); }
          95% { clip: rect(37px, 9999px, 20px, 0); transform: skew(0.3deg); }
          100% { clip: rect(4px, 9999px, 91px, 0); transform: skew(0.3deg); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); transform: skew(0.3deg); }
          5% { clip: rect(52px, 9999px, 74px, 0); transform: skew(0.3deg); }
          10% { clip: rect(79px, 9999px, 85px, 0); transform: skew(0.3deg); }
          15% { clip: rect(75px, 9999px, 5px, 0); transform: skew(0.3deg); }
          20% { clip: rect(67px, 9999px, 61px, 0); transform: skew(0.3deg); }
          25% { clip: rect(14px, 9999px, 79px, 0); transform: skew(0.3deg); }
          30% { clip: rect(1px, 9999px, 66px, 0); transform: skew(0.3deg); }
          35% { clip: rect(86px, 9999px, 30px, 0); transform: skew(0.3deg); }
          40% { clip: rect(23px, 9999px, 98px, 0); transform: skew(0.3deg); }
          45% { clip: rect(85px, 9999px, 72px, 0); transform: skew(0.3deg); }
          50% { clip: rect(71px, 9999px, 75px, 0); transform: skew(0.3deg); }
          55% { clip: rect(2px, 9999px, 48px, 0); transform: skew(0.3deg); }
          60% { clip: rect(30px, 9999px, 16px, 0); transform: skew(0.3deg); }
          65% { clip: rect(59px, 9999px, 50px, 0); transform: skew(0.3deg); }
          70% { clip: rect(41px, 9999px, 62px, 0); transform: skew(0.3deg); }
          75% { clip: rect(2px, 9999px, 82px, 0); transform: skew(0.3deg); }
          80% { clip: rect(47px, 9999px, 73px, 0); transform: skew(0.3deg); }
          85% { clip: rect(3px, 9999px, 27px, 0); transform: skew(0.3deg); }
          90% { clip: rect(26px, 9999px, 55px, 0); transform: skew(0.3deg); }
          95% { clip: rect(42px, 9999px, 97px, 0); transform: skew(0.3deg); }
          100% { clip: rect(38px, 9999px, 49px, 0); transform: skew(0.3deg); }
        }
      `}</style>
    </div>
  );
};

export default App;