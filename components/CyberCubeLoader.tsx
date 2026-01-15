import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Network } from 'lucide-react';

const CyberCubeLoader: React.FC = () => {
  // Generate 27 cubes (3x3x3 grid)
  const cubes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push({ x, y, z });
      }
    }
  }

  const CUBE_SIZE = 40;
  const GAP = 2; 
  const OFFSET = CUBE_SIZE + GAP;

  const [loadingState, setLoadingState] = useState(0);

  const loadingStates = [
    { text: "BUILDING RAG SYSTEMS...", icon: <Network className="w-6 h-6 text-cyan-500" /> },
    { text: "DEPLOYING AI AGENTS...", icon: <Bot className="w-6 h-6 text-purple-500" /> }
  ];

  useEffect(() => {
    // Switch to the second text after 1.5 seconds
    // This gives the first text 1.5s and the second text ~2s (based on total app load time)
    const timer = setTimeout(() => {
      setLoadingState(1);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020005] overflow-hidden relative z-[9999]">
       {/* Background Grid for Loader */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent)] pointer-events-none" />

      {/* 3D Scene Container - Added mt-16 to shift visual center lower */}
      <div className="relative w-80 h-80 flex items-center justify-center mt-16" style={{ perspective: '1200px' }}>
        {/* Main Rotating Assembly - Tumbles the entire cube in 3D */}
        <motion.div
          className="relative preserve-3d"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 12, // Slow tumble
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            width: 0, 
            height: 0,
            transformStyle: 'preserve-3d' 
          }}
        >
          {cubes.map((pos, i) => {
             // Logic for Rubik's style rotation
             // Phase 1: Middle Horizontal (y=0) rotates around Y axis
             // Phase 2: Middle Vertical (x=0) rotates around X axis
             
             const isMiddleY = pos.y === 0;
             const isMiddleX = pos.x === 0; 
             
             return (
              <motion.div
                key={i}
                className="absolute top-0 left-0 preserve-3d"
                style={{
                  width: 0, height: 0, 
                  transformStyle: 'preserve-3d'
                }}
                animate={{
                    // Rotate horizontal middle layer 360 deg from 0 to 0.4 time
                    rotateY: isMiddleY ? [0, 360, 360, 360] : 0,
                    // Rotate vertical middle layer 360 deg from 0.5 to 0.9 time
                    rotateX: isMiddleX ? [0, 0, 360, 360] : 0
                }}
                transition={{
                  duration: 3, // Total cycle time
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.5, 1] // Keyframe timing
                }}
              >
                  {/* The Cube itself, offset from center */}
                  <div
                    className="absolute preserve-3d"
                    style={{
                      width: CUBE_SIZE,
                      height: CUBE_SIZE,
                      // Center the cube on the wrapper point, then translate to grid position
                      transform: `translate(-50%, -50%) translate3d(${pos.x * OFFSET}px, ${pos.y * OFFSET}px, ${pos.z * OFFSET}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Increased opacity from 0.1 to 0.3 (+20%) for better visibility */}
                    <CubeFace transform={`rotateY(0deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 243, 255, 0.3)" borderColor="#00f3ff" />
                    <CubeFace transform={`rotateY(180deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(188, 19, 254, 0.3)" borderColor="#bc13fe" />
                    <CubeFace transform={`rotateY(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(249, 240, 2, 0.3)" borderColor="#f9f002" />
                    <CubeFace transform={`rotateY(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 255, 100, 0.3)" borderColor="#00ff66" />
                    <CubeFace transform={`rotateX(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 255, 255, 0.3)" borderColor="#ffffff" />
                    <CubeFace transform={`rotateX(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 0, 60, 0.3)" borderColor="#ff003c" />
                    
                    {/* Inner Core Glow - Increased opacity */}
                    <div className="absolute inset-0 bg-cyan-500/50 blur-md rounded-full transform scale-50" />
                  </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Loading Text - Reduced margin top from mt-8 to mt-2 for tight spacing */}
      <motion.div 
        className="mt-2 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-12 flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.div 
               key={loadingState}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="flex items-center gap-3"
             >
               <motion.div 
                 animate={{ scale: [1, 1.25, 1] }} 
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               >
                 {loadingStates[loadingState].icon}
               </motion.div>
               <h2 className="text-lg md:text-xl font-orbitron text-cyan-500 tracking-[0.2em] uppercase glitch-text" data-text={loadingStates[loadingState].text}>
                 {loadingStates[loadingState].text}
               </h2>
             </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-900 mt-6 relative overflow-hidden rounded-full border border-gray-800">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-500 to-purple-500"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: '50%' }}
            />
        </div>
      </motion.div>
    </div>
  );
};

const CubeFace: React.FC<{ transform: string; color: string; borderColor: string }> = ({ transform, color, borderColor }) => (
  <div
    className="absolute inset-0"
    style={{
      transform,
      backgroundColor: color,
      border: `1px solid ${borderColor}`,
      boxShadow: `inset 0 0 15px ${color}`,
      backfaceVisibility: 'visible' // Keep visible for transparent glass effect
    }}
  >
    {/* Tech details */}
    <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white/70" />
    <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/70" />
    <div className="absolute inset-2 border border-white/10 rounded-sm" />
  </div>
);

export default CyberCubeLoader;