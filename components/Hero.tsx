import React, { useEffect, useState, useRef } from 'react';
import { RESUME_DATA } from '../constants';
import { Terminal, Cpu, Database, Brain } from 'lucide-react';
import GlitchText from './GlitchText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';

const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showNotification } = useNotification();
  
  // Parallax configuration
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 400]);
  const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  
  const titles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Specialist",
    "RAG & LLM Expert"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleProtocolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotification("SYSTEM UPGRADE IN PROGRESS. PROTOCOLS ARE CONSISTENTLY BUILDING...");
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* 
         Removed local background layers so the global App.tsx background is visible.
         Added a slight gradient overlay at the bottom to blend content.
      */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020005] to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Info */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex items-center gap-2 text-cyan-400 font-mono text-sm"
          >
            <Terminal size={16} />
            <span>&gt; INITIALIZING_USER_PROFILE...</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 leading-tight">
            DEVESH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              MISHRA
            </span>
          </h1>
          
          <div className="h-8 mb-8 font-mono text-xl md:text-2xl text-yellow-300">
             &gt; {titles[textIndex]}<span className="animate-pulse">_</span>
          </div>
          
          <p className="text-gray-400 max-w-lg mb-8 leading-relaxed border-l-2 border-purple-500 pl-4 bg-purple-900/10 p-4 rounded-r backdrop-blur-sm">
            {RESUME_DATA.personalInfo.summary}
          </p>
          
          <div className="flex gap-4">
            <a 
              href={RESUME_DATA.personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-cyan-900/30 border border-cyan-500 text-cyan-400 font-orbitron hover:bg-cyan-500 hover:text-black transition-all duration-300 uppercase tracking-wider relative overflow-hidden group"
            >
              <span className="relative z-10">Connect LinkedIn</span>
              <div className="absolute inset-0 h-full w-full bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <button 
              onClick={handleProtocolsClick}
              className="px-6 py-3 bg-transparent border border-purple-500 text-purple-400 font-orbitron hover:shadow-[0_0_15px_#bc13fe] transition-all duration-300 uppercase tracking-wider backdrop-blur-sm"
            >
              View Protocols
            </button>
          </div>
        </div>
        
        {/* Right Column: Visual Element */}
        <div className="relative hidden md:flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Spinning Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-dotted border-purple-500/30"
            />
             <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full border border-dashed border-yellow-500/20"
            />
            
            {/* Central Icons Hexagon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 bg-gray-900/80 backdrop-blur-md border border-cyan-500 flex items-center justify-center hexagon clip-path-hexagon shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                  <Brain size={48} className="text-cyan-400 animate-pulse" />
                </div>
            </div>

            {/* Orbiting Tech Nodes */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0"
            >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black border border-cyan-500 p-2 rounded shadow-[0_0_10px_#00f3ff]">
                    <Cpu size={20} className="text-cyan-300" />
                </div>
            </motion.div>

            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0"
            >
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black border border-purple-500 p-2 rounded shadow-[0_0_10px_#bc13fe]">
                    <Database size={20} className="text-purple-300" />
                </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Navigate</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;