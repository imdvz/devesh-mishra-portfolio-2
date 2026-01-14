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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Adjust for fixed header height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return <CyberCubeLoader />;
  }

  return (
    <div className="min-h-screen text-gray-200 scanlines font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden bg-[#020005]">
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        
        {/* Hexagonal Mesh Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2300f3ff' fill-opacity='0.2' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '56px 98px'
             }} 
        />

        {/* Strong Atmospheric Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-900/30 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow translate-x-[-30%] translate-y-[-30%]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow translate-x-[30%] translate-y-[30%]" style={{ animationDelay: '4s' }} />

        {/* Moving Circuit Lines */}
        <div className="absolute inset-0">
           {/* Horizontal Line Moving Down */}
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-scan-line" />
           
           {/* Vertical Line Moving Right */}
           <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50 animate-scan-line-vertical" />
        </div>

        {/* Digital Noise Texture (Grain) */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
             }} 
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020005_90%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/80 backdrop-blur-md border-b border-gray-800/50 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-orbitron font-bold text-white tracking-widest cursor-pointer group flex items-center gap-2"
          >
            <div className="w-3 h-3 bg-cyan-500 rotate-45 group-hover:animate-spin" />
            DEVESH <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">MISHRA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider relative group cursor-pointer"
              >
                <span className="relative z-10"> {item.label} </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00f3ff]" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-cyan-500 hover:text-white transition-colors"
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
              className="md:hidden bg-gray-900/95 border-b border-gray-800 overflow-hidden backdrop-blur-xl"
            >
              <div className="flex flex-col p-4 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-300 hover:text-cyan-400 font-mono block py-2 border-l-2 border-transparent hover:border-cyan-500 pl-4 transition-all cursor-pointer"
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
        html {
          scroll-behavior: auto;
        }

        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        @keyframes scan-line {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
        
        @keyframes scan-line-vertical {
          0% { left: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        .animate-scan-line-vertical {
          animation: scan-line-vertical 12s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
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