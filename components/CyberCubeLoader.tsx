import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const GAP = 4; // Gap between cubies
  const OFFSET = CUBE_SIZE + GAP;

  const [loadingText, setLoadingText] = useState("INITIALIZING NEURAL NETWORKS...");

  useEffect(() => {
    const texts = [
      "INITIALIZING NEURAL NETWORKS...",
      "ESTABLISHING SECURE CONNECTION..."
    ];
    let i = 0;
    // Slowed down to 2500ms (2.5 seconds) per text
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020005] overflow-hidden perspective-container">
      {/* 3D Scene Container */}
      <div className="relative w-64 h-64 flex items-center justify-center perspective-[800px]">
        {/* Main Rotating Assembly */}
        <motion.div
          className="relative preserve-3d"
          animate={{
            rotateX: [35, 35, 215, 215, 395], // Rotates to show different angles
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
            // Determine if this cube belongs to specific slices for animation logic
            const isTop = pos.y === -1;
            const isBottom = pos.y === 1;
            const isLeft = pos.x === -1;
            const isRight = pos.x === 1;
            
            return (
              <motion.div
                key={i}
                className="absolute preserve-3d"
                style={{
                  width: CUBE_SIZE,
                  height: CUBE_SIZE,
                  // Center the cubie pivot
                  marginLeft: -CUBE_SIZE / 2,
                  marginTop: -CUBE_SIZE / 2,
                  transformStyle: 'preserve-3d',
                }}
                // Initial static position in the grid
                initial={{ 
                  x: pos.x * OFFSET, 
                  y: pos.y * OFFSET, 
                  z: pos.z * OFFSET 
                }}
                animate={{
                  // The sequence: 
                  // 1. Idle
                  // 2. Explode Y (Top goes up, Bottom goes down)
                  // 3. Rotate Y Layers (Top/Bottom spin)
                  // 4. Merge Y
                  // 5. Explode X (Left goes left, Right goes right)
                  // 6. Rotate X Layers (Left/Right spin)
                  // 7. Merge X
                  
                  x: [
                    pos.x * OFFSET, // 0%
                    pos.x * OFFSET, // 20%
                    pos.x * OFFSET, // 40%
                    pos.x * OFFSET, // 50%
                    isLeft ? pos.x * OFFSET - 40 : isRight ? pos.x * OFFSET + 40 : pos.x * OFFSET, // 60% (Explode X)
                    isLeft ? pos.x * OFFSET - 40 : isRight ? pos.x * OFFSET + 40 : pos.x * OFFSET, // 80%
                    pos.x * OFFSET, // 100%
                  ],
                  y: [
                    pos.y * OFFSET, // 0%
                    isTop ? pos.y * OFFSET - 40 : isBottom ? pos.y * OFFSET + 40 : pos.y * OFFSET, // 20% (Explode Y)
                    isTop ? pos.y * OFFSET - 40 : isBottom ? pos.y * OFFSET + 40 : pos.y * OFFSET, // 40%
                    pos.y * OFFSET, // 50% (Merge)
                    pos.y * OFFSET, // 60%
                    pos.y * OFFSET, // 80%
                    pos.y * OFFSET, // 100%
                  ],
                  z: pos.z * OFFSET, // Keep Z constant relative to container
                  
                  rotateY: [
                    0, // 0%
                    0, // 20%
                    isTop ? 90 : isBottom ? -90 : 0, // 40% (Rotate Y Layers)
                    isTop ? 90 : isBottom ? -90 : 0, // 50% (Keep rotation)
                    isTop ? 90 : isBottom ? -90 : 0, // 60%
                    isTop ? 90 : isBottom ? -90 : 0, // 80%
                    0, // 100% (Reset for loop)
                  ],
                  rotateX: [
                    0, // 0%
                    0, // 20%
                    0, // 40%
                    0, // 50%
                    0, // 60%
                    isLeft ? 90 : isRight ? -90 : 0, // 80% (Rotate X Layers)
                    0, // 100%
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut", // Mechanical snapping feel
                  times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1]
                }}
              >
                {/* Cubie Faces */}
                <CubeFace transform={`rotateY(0deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 243, 255, 0.15)" borderColor="#00f3ff" /> {/* Front - Cyan */}
                <CubeFace transform={`rotateY(180deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(188, 19, 254, 0.15)" borderColor="#bc13fe" /> {/* Back - Purple */}
                <CubeFace transform={`rotateY(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(249, 240, 2, 0.15)" borderColor="#f9f002" /> {/* Right - Yellow */}
                <CubeFace transform={`rotateY(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(0, 255, 100, 0.15)" borderColor="#00ff66" /> {/* Left - Green */}
                <CubeFace transform={`rotateX(90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 255, 255, 0.15)" borderColor="#ffffff" /> {/* Top - White */}
                <CubeFace transform={`rotateX(-90deg) translateZ(${CUBE_SIZE/2}px)`} color="rgba(255, 0, 60, 0.15)" borderColor="#ff003c" /> {/* Bottom - Red */}
                
                {/* Core Glow */}
                <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full transform scale-50" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div 
        className="mt-24 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-8">
           <AnimatePresence mode="wait">
             <motion.h2 
               key={loadingText}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.5 }}
               className="text-xl font-orbitron text-cyan-500 tracking-[0.2em] uppercase"
             >
               {loadingText}
             </motion.h2>
           </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-900 mt-4 relative overflow-hidden">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-purple-500 to-cyan-500"
                animate={{ left: ['-100%', '100%'] }}
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
      boxShadow: `inset 0 0 10px ${color}`,
    }}
  >
    {/* Micro-details for tech look */}
    <div className="absolute top-1 left-1 w-1 h-1 bg-white/40" />
    <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40" />
  </div>
);

export default CyberCubeLoader;