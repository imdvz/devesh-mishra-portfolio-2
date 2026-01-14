import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CyberpunkBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms based on scroll position
  const gridY = useTransform(scrollY, [0, 1000], [0, -200]);
  const sunY = useTransform(scrollY, [0, 1000], [0, 300]);
  const bgOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);
  const perspectiveRotate = useTransform(scrollY, [0, 1000], [60, 45]);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020005] overflow-hidden pointer-events-none">
      
      {/* 1. Retro-Futuristic Sun (The Core) */}
      <motion.div 
        style={{ y: sunY, opacity: bgOpacity }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-yellow-300 via-pink-600 to-purple-900 blur-[80px] opacity-20" 
      />
      <motion.div 
        style={{ y: sunY }}
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-cyan-500 via-transparent to-transparent blur-[60px] opacity-10 mix-blend-screen" 
      />

      {/* 2. 3D Moving Grid Floor */}
      <div className="absolute inset-0 perspective-container">
        <motion.div 
          style={{ rotateX: perspectiveRotate }}
          className="absolute -left-[50%] -right-[50%] bottom-[-50%] h-[200%] origin-top bg-[linear-gradient(to_right,rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(188,19,254,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-flow"
        >
           {/* Glow fade at the horizon */}
           <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#020005] via-[#020005]/80 to-transparent" />
        </motion.div>
      </div>

      {/* 3. Floating Digital Particles */}
      <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
             <FloatingParticle key={i} index={i} />
          ))}
      </div>

      {/* 4. Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020005_100%)] opacity-80" />

      {/* CSS for the infinite grid movement */}
      <style>{`
        .perspective-container {
          perspective: 1000px;
          overflow: hidden;
        }
        @keyframes gridFlow {
          0% { transform: translateY(0) rotateX(var(--tw-rotate-x)); }
          100% { transform: translateY(60px) rotateX(var(--tw-rotate-x)); }
        }
        .animate-grid-flow {
          animation: gridFlow 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

const FloatingParticle: React.FC<{ index: number }> = ({ index }) => {
  const { scrollY } = useScroll();
  const yBase = Math.random() * 100;
  const xBase = Math.random() * 100;
  const size = Math.random() * 4 + 1;
  const duration = Math.random() * 20 + 10;
  
  // Particles move faster when scrolling
  const yParallax = useTransform(scrollY, [0, 1000], [0, -100 * (Math.random() + 0.5)]);

  return (
    <motion.div
      style={{ 
        top: `${yBase}%`, 
        left: `${xBase}%`,
        y: yParallax
      }}
      animate={{ 
        y: [0, -100], 
        opacity: [0, 1, 0] 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "linear",
        delay: Math.random() * 10
      }}
      className="absolute bg-cyan-500 shadow-[0_0_5px_#00f3ff]"
    >
      <div style={{ width: size, height: size }} />
    </motion.div>
  );
};

export default CyberpunkBackground;