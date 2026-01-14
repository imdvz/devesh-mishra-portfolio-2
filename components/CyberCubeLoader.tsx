import React from 'react';
import { motion } from 'framer-motion';

const CyberCubeLoader: React.FC = () => {
  // Create an array of 27 cubes (3x3x3 grid)
  const cubes = Array.from({ length: 27 }, (_, i) => i);

  // Helper to calculate position in 3D grid based on index
  const getPosition = (index: number) => {
    const x = (index % 3) - 1;
    const y = (Math.floor(index / 3) % 3) - 1;
    const z = (Math.floor(index / 9)) - 1;
    return { x: x * 120, y: y * 120, z: z * 120 }; // Spacing of 60px
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden perspective-1000">
      <div className="relative w-64 h-64 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{
            rotateX: [0, 360, 360, 0],
            rotateY: [0, 360, 0, 360],
            rotateZ: [0, 0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cubes.map((cube, i) => {
            const pos = getPosition(i);
            const isCenter = pos.x === 0 && pos.y === 0 && pos.z === 0;
            
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                initial={{ 
                  x: pos.x * 0.4, 
                  y: pos.y * 0.4, 
                  z: pos.z * 0.4 
                }}
                animate={{
                  x: [pos.x * 0.4, pos.x * 0.8, pos.x * 0.4],
                  y: [pos.y * 0.4, pos.y * 0.8, pos.y * 0.4],
                  z: [pos.z * 0.4, pos.z * 0.8, pos.z * 0.4],
                  scale: [1, 0.8, 1],
                  opacity: isCenter ? [1, 0.5, 1] : 1
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05 // Staggered ripple effect
                }}
              >
                {/* Cube Faces */}
                {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
                  <div
                    key={face}
                    className={`absolute w-full h-full border border-cyan-400 bg-cyan-900/20 box-shadow-neon ${face}`}
                    style={{
                      transform: getFaceTransform(face),
                      boxShadow: '0 0 5px #00f3ff, inset 0 0 5px #00f3ff'
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-orbitron text-cyan-400 tracking-widest uppercase glitch-text" data-text="System Initializing...">
          System Initializing...
        </h2>
        <div className="w-64 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "circInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Helper for face transforms
const getFaceTransform = (face: string) => {
  const translate = 'translateZ(16px)'; // half of 32px width
  switch (face) {
    case 'front': return `rotateY(0deg) ${translate}`;
    case 'back': return `rotateY(180deg) ${translate}`;
    case 'right': return `rotateY(90deg) ${translate}`;
    case 'left': return `rotateY(-90deg) ${translate}`;
    case 'top': return `rotateX(90deg) ${translate}`;
    case 'bottom': return `rotateX(-90deg) ${translate}`;
    default: return '';
  }
};

export default CyberCubeLoader;