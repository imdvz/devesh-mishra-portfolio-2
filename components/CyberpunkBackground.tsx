import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from 'framer-motion';

const CyberpunkBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Mouse tracking state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Grid reference for direct DOM manipulation (performance)
  const gridRef = useRef<HTMLDivElement>(null);
  const animationState = useRef({ position: 0 });

  // Handle Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transforms for cursor responsiveness
  // Tilting the floor based on mouse Y (looking up/down)
  const gridRotateX = useTransform(mouseY, [-1, 1], [60, 75]); 
  // Banking the floor based on mouse X (looking left/right)
  const gridRotateZ = useTransform(mouseX, [-1, 1], [-3, 3]); 
  
  // Parallax elements positions
  const sunX = useTransform(mouseX, [-1, 1], [-30, 30]);
  const sunY = useTransform(scrollY, [0, 1000], [0, 300]); // Sun moves down as we scroll
  
  const mountainX = useTransform(mouseX, [-1, 1], [-60, 60]);
  const mountainY = useTransform(scrollY, [0, 1000], [0, 150]); // Mountains move down slower

  // Animation Loop for Grid Speed
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      const velocity = Math.abs(smoothVelocity.get());
      // Base speed = 1.0. Adds velocity factor for "warp speed" effect on scroll.
      const speed = 1.0 + (velocity * 0.1); 
      
      animationState.current.position += speed;
      
      if (gridRef.current) {
         // Modulo grid size (40px) to prevent integer overflow and keep pattern consistent
         const yPos = animationState.current.position % 40;
         gridRef.current.style.backgroundPosition = `0 ${yPos}px`;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [smoothVelocity]);

  // Generate Stars
  const stars = useMemo(() => {
     return Array.from({ length: 100 }).map((_, i) => ({
       left: `${Math.random() * 100}%`,
       top: `${Math.random() * 60}%`, // Stars only in the top 60% (sky)
       size: Math.random() > 0.8 ? 3 : 1.5,
       delay: Math.random() * 5
     }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020005] overflow-hidden">
        {/* 1. Starfield */}
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`
            }}
          />
        ))}

        {/* 2. Retro Sun */}
        <motion.div 
           style={{ x: sunX, y: sunY }}
           className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[60vh] h-[60vh] min-w-[300px] min-h-[300px] rounded-full z-10"
        >
             <div className="w-full h-full rounded-full bg-gradient-to-b from-yellow-300 via-pink-500 to-purple-900 shadow-[0_0_100px_rgba(255,0,128,0.4)] overflow-hidden relative">
                 {/* Sun Blinds Effect */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,#020005_40%,#020005_42%,transparent_42%,transparent_48%,#020005_48%,#020005_51%,transparent_51%,transparent_58%,#020005_58%,#020005_62%,transparent_62%,transparent_69%,#020005_69%,#020005_74%,transparent_74%,transparent_82%,#020005_82%,#020005_88%,transparent_88%,transparent_95%,#020005_95%)]" />
             </div>
        </motion.div>

        {/* 3. Distant Mountains Silhouette */}
        <motion.div 
            style={{ x: mountainX, y: mountainY }}
            className="absolute bottom-[35%] left-[-20%] right-[-20%] h-[25vh] z-20"
        >
            <div 
              className="w-full h-full bg-[#020005]"
              style={{
                clipPath: 'polygon(0% 100%, 0% 60%, 5% 70%, 10% 50%, 15% 70%, 20% 40%, 25% 60%, 30% 30%, 35% 65%, 40% 40%, 45% 70%, 50% 30%, 55% 65%, 60% 30%, 65% 60%, 70% 40%, 75% 70%, 80% 50%, 85% 70%, 90% 40%, 95% 70%, 100% 60%, 100% 100%)',
                background: 'linear-gradient(to bottom, #1e0030, #020005)'
              }}
            />
        </motion.div>

        {/* 4. The Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] perspective-container z-30">
             {/* Horizon Glow Line */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 blur-[2px] z-40 shadow-[0_0_20px_#00f3ff]" />
             
             {/* The Moving Grid Plane */}
             <motion.div 
               ref={gridRef}
               style={{ rotateX: gridRotateX, rotateZ: gridRotateZ }}
               className="absolute inset-[-50%] w-[200%] h-[200%] bg-grid-pattern origin-top"
             />
             
             {/* Atmospheric Fog at Horizon */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#020005] via-[#020005]/80 to-transparent pointer-events-none z-40" />
        </div>

        <style>{`
          .perspective-container {
             perspective: 600px;
             overflow: hidden;
          }
          .bg-grid-pattern {
             background-image: 
               linear-gradient(to right, rgba(188, 19, 254, 0.4) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 243, 255, 0.4) 1px, transparent 1px);
             background-size: 40px 40px;
             /* Transform is handled by motion.div */
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
};

export default CyberpunkBackground;