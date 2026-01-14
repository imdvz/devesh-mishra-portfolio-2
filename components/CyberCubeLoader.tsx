import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Hammer, Code2, BrainCircuit } from 'lucide-react';

const CyberCubeLoader: React.FC = () => {
  // Generate 27 cubes (3x3x3 grid)
  const cubes = [];
  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        cubes.push({ x, y, z });
      }
    }
  }

  const CUBE_SIZE = 40; // Size of individual cubie
  const GAP = 2; // Tighter gap for solid look
  const OFFSET = CUBE_SIZE + GAP;

  const [loadingState, setLoadingState] = useState(0);

  const loadingStates = [
    { text: "BUILDING AI ARCHITECTURE...", icon: <Code2 className="w-6 h-6 text-cyan-500" /> },
    { text: "ASSEMBLING NEURAL NETS...", icon: <BrainCircuit className="w-6 h-6 text-purple-500" /> },
    { text: "OPTIMIZING PARAMETERS...", icon: <Cpu className="w-6 h-6 text-yellow-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingState((prev) => (prev + 1) % loadingStates.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020005] overflow-hidden perspective-container relative z-[9999]">
       {/* Background Grid for Loader */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent)] pointer-events-none" />

      {/* 3D Scene Container */}
      <div className="relative w-64 h-64 flex items-center justify-center perspective-[800px]">
        {/* Main Rotating Assembly */}
        <motion.div
          className="relative preserve-3d"
          animate={{
            rotateX: [35, 35, 215, 215, 395],
            rotateY: [45, 225, 225, 405, 405],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.5, 0.9, 1]
          }}
          style={{ 
            width: CUBE_SIZE, 
            height: CUBE_SIZE,
            transformStyle: 'preserve-3d' 
          }}
        >
          {cubes.map((pos, i) => {
            const isTop = pos.y === -1;
            const isBottom = pos.y === 1;
            const isLeft = pos.x === -1;
            const isRight = pos.x === 1;
            const isFront = pos.z === 1;
            const isBack = pos.z === -1;

            return (
              <motion.div
                key={i}
                className="absolute preserve-3d"
                style={{
                  width: CUBE_SIZE,
                  height: CUBE_SIZE,
                  marginLeft: -CUBE_SIZE / 2,
                  marginTop: -CUBE_SIZE / 2,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ 
                  x: pos.x * OFFSET, 
                  y: pos.y * OFFSET, 
                  z: pos.z * OFFSET,
                  scale: 0 
                }}
                animate={{
                  scale: [0, 1, 1, 1, 1, 1, 1], // Build in effect at start
                  x: [
                    pos.x * OFFSET,
                    pos.x * OFFSET,
                    pos.x * OFFSET,
                    pos.x * OFFSET,
                    isLeft ? pos.x * OFFSET - 20 : isRight ? pos.x * OFFSET + 20 : pos.x * OFFSET, // Tight explode X
                    isLeft ? pos.x * OFFSET - 20 : isRight ? pos.x * OFFSET + 20 : pos.x * OFFSET,
                    pos.x * OFFSET,
                  ],
                  y: [
                    pos.y * OFFSET,
                    isTop ? pos.y * OFFSET - 20 : isBottom ? pos.y * OFFSET + 20 : pos.y * OFFSET, // Tight explode Y
                    isTop ? pos.y * OFFSET - 20 : isBottom ? pos.y * OFFSET + 20 : pos.y * OFFSET,
                    pos.y * OFFSET,
                    pos.y * OFFSET,
                    pos.y * OFFSET,
                    pos.y * OFFSET,
                  ],
                  z: pos.z * OFFSET,
                  
                  rotateY: [
                    0,
                    0,
                    isTop ? 90 : isBottom ? -90 : 0,
                    isTop ? 90 : isBottom ? -90 : 0,
                    isTop ? 90 : isBottom ? -90 : 0,
                    isTop ? 90 : isBottom ? -90 : 0,
                    0,
                  ],
                  rotateX: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    isLeft ? 90 : isRight ? -90 : 0,
                    0,
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.25, 0.45, 0.55, 0.75, 1],
                  delay: Math.random() * 0.5 // Random build-in delay for effect
                }}
              >
                {/* Cubie Faces */}
                <CubeFace transform={`rotateY(0deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 243, 255, 0.2)" borderColor="#00f3ff" />
                <CubeFace transform={`rotateY(180deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(188, 19, 254, 0.2)" borderColor="#bc13fe" />
                <CubeFace transform={`rotateY(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(249, 240, 2, 0.2)" borderColor="#f9f002" />
                <CubeFace transform={`rotateY(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 255, 100, 0.2)" borderColor="#00ff66" />
                <CubeFace transform={`rotateX(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 255, 255, 0.2)" borderColor="#ffffff" />
                <CubeFace transform={`rotateX(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 0, 60, 0.2)" borderColor="#ff003c" />
                
                {/* Core Glow */}
                <div className="absolute inset-0 bg-cyan-500/30 blur-sm rounded-full transform scale-50" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div 
        className="mt-24 flex flex-col items-center z-10"
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
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
    className="absolute inset-0 backface-visible"
    style={{
      transform,
      backgroundColor: color,
      border: `1px solid ${borderColor}`,
      boxShadow: `inset 0 0 15px ${color}`,
    }}
  >
    {/* Tech details */}
    <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white/70" />
    <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/70" />
    <div className="absolute inset-2 border border-white/10 rounded-sm" />
  </div>
);

export default CyberCubeLoader;