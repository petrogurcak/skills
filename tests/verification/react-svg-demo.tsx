import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * Verification: Interactive 3D Credit Card SVG
 * Patterns used: frontend-lp Workflow 4 (Interactive SVG Pattern)
 * Features: Pure SVG, No <script>, A11y titles, Framer Motion Parallax
 */
export function InteractiveCreditCard() {
  const x = useMotionValue(200);
  const y = useMotionValue(125);

  const rotateX = useTransform(y, [0, 250], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(125);
  }

  return (
    <div 
      className="flex items-center justify-center p-20 bg-zinc-950 min-h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[400px] h-[250px]"
      >
        <svg
          width="400"
          height="250"
          viewBox="0 0 400 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="card-title card-desc"
          className="rounded-2xl shadow-2xl overflow-hidden"
        >
          <title id="card-title">Interactive 3D Credit Card</title>
          <desc id="card-desc">A premium credit card with holographic shimmer and 3D tilt effect on hover.</desc>
          
          {/* Card Base */}
          <rect width="400" height="250" rx="16" fill="url(#cardGradient)" />
          
          {/* Chip */}
          <rect x="40" y="80" width="60" height="45" rx="8" fill="url(#chipGradient)" />
          
          {/* Text Placeholders */}
          <rect x="40" y="160" width="180" height="20" rx="4" fill="white" fillOpacity="0.2" />
          <rect x="40" y="200" width="240" height="15" rx="4" fill="white" fillOpacity="0.1" />
          
          {/* Holographic Logo with Shimmer */}
          <circle cx="340" cy="50" r="30" fill="url(#holoGradient)">
            <animate 
              attributeName="fill-opacity" 
              values="0.6;1;0.6" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </circle>

          <defs>
            <linearGradient id="cardGradient" x1="0" y1="0" x2="400" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#18181b" />
              <stop offset="1" stopColor="#3f3f46" />
            </linearGradient>
            <linearGradient id="chipGradient" x1="40" y1="80" x2="100" y2="125" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="holoGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(340 50) rotate(90) scale(30)">
              <stop stopColor="#60a5fa" />
              <stop offset="0.5" stopColor="#a855f7" />
              <stop offset="1" stopColor="#ec4899" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Reflection Overlays (translateZ for 3D depth) */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-tr from-white/10 to-transparent"
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>
    </div>
  );
}
