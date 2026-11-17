import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSiuuSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function SiuuCelebrationModal({ isOpen, onClose, sfxEnabled, title = "SIUUUUUUUU! 🐐", subtitle = "PLAYER ROSHAN • THE GOAT CELEBRATION" }) {
  // Animation phases: 'run' (0 - 600ms), 'jump' (600 - 1300ms), 'landed' (1300ms+)
  const [phase, setPhase] = useState('run');
  const [impactShockwave, setImpactShockwave] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPhase('run');
      setImpactShockwave(false);
      return;
    }

    setPhase('run');
    setImpactShockwave(false);

    // 1. Run -> Jump transition
    const jumpTimer = setTimeout(() => {
      setPhase('jump');
    }, 600);

    // 2. Mid-air turn & Land (SIUUUU impact moment!)
    const landTimer = setTimeout(() => {
      setPhase('landed');
      setImpactShockwave(true);

      if (sfxEnabled) {
        playSiuuSound();
      }

      // Burst of crimson and champagne gold stadium fireworks!
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#c8102e', '#ffd700', '#ffffff', '#e60000', '#f3e5ab']
      });
    }, 1350);

    // 3. Auto-close after celebration completes
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 3800);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(landTimer);
      clearTimeout(closeTimer);
    };
  }, [isOpen, sfxEnabled, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-hidden">
        {/* Stadium Floodlights Flare Up */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            phase === 'landed' ? 'opacity-90' : 'opacity-40'
          }`}
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/25 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/15 rounded-full blur-[120px]" />
        </div>

        {/* Screen Impact Container */}
        <div className={`relative flex flex-col items-center justify-center max-w-xl w-full text-center ${impactShockwave ? 'animate-siuu-impact' : ''}`}>
          
          {/* Animated Footballer Character Simulation */}
          <div className="relative w-64 h-72 flex items-center justify-center my-2">
            
            {/* Ground Shadow & Shockwave Ring on Landing */}
            <motion.div
              animate={
                phase === 'jump'
                  ? { scale: 0.4, opacity: 0.2 }
                  : phase === 'landed'
                  ? { scale: [1, 2.8], opacity: [0.9, 0] }
                  : { scale: 1, opacity: 0.6 }
              }
              transition={{ duration: phase === 'landed' ? 0.8 : 0.4 }}
              className="absolute bottom-6 w-36 h-8 bg-red-600/40 rounded-full blur-md border border-amber-400/60"
            />

            {/* Footballer SVG Character */}
            <motion.div
              initial={{ y: 20, scale: 0.9 }}
              animate={
                phase === 'run'
                  ? { y: [10, 0, 10], x: [-30, 0] }
                  : phase === 'jump'
                  ? { y: -70, rotateY: [0, 180, 360], scale: 1.15 }
                  : { y: 15, scale: 1.25 }
              }
              transition={
                phase === 'run'
                  ? { duration: 0.5 }
                  : phase === 'jump'
                  ? { duration: 0.75, ease: 'easeInOut' }
                  : { type: 'spring', damping: 10, stiffness: 120 }
              }
              className="relative z-10"
            >
              {/* Stylized CR7 Silhouette & Jersey */}
              <svg viewBox="0 0 160 200" className="w-48 h-60 drop-shadow-[0_0_25px_rgba(200,16,46,0.8)]">
                {/* Head with styled hair */}
                <circle cx="80" cy="35" r="14" fill="#fcd34d" />
                <path d="M70 26 Q80 18 90 26 Q82 22 70 26 Z" fill="#1c1917" />

                {phase !== 'landed' ? (
                  /* Running / Jumping Pose */
                  <g>
                    {/* Torso #7 Crimson Jersey */}
                    <path d="M64 48 L96 48 L102 105 L58 105 Z" fill="#c8102e" stroke="#ffd700" strokeWidth="2" />
                    <text x="80" y="82" textAnchor="middle" fill="#ffd700" fontSize="24" fontWeight="900" fontFamily="Russo One">7</text>
                    {/* Running Arms */}
                    <path d="M64 52 L42 75 L35 95" stroke="#fcd34d" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M96 52 L118 70 L130 90" stroke="#fcd34d" strokeWidth="8" strokeLinecap="round" fill="none" />
                    {/* Shorts */}
                    <path d="M58 105 L102 105 L106 135 L82 135 L80 120 L78 135 L54 135 Z" fill="#ffffff" />
                    {/* Legs in stride/jump */}
                    <path d="M64 135 L55 170 L48 185" stroke="#fcd34d" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M94 135 L105 165 L118 180" stroke="#fcd34d" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </g>
                ) : (
                  /* ICONIC SIUU LANDING POSE (Arms outstretched wide behind body, chest puffed out, legs planted wide) */
                  <g>
                    {/* Torso with muscular chest */}
                    <path d="M62 48 L98 48 L104 105 L56 105 Z" fill="#c8102e" stroke="#ffd700" strokeWidth="2.5" />
                    <text x="80" y="82" textAnchor="middle" fill="#ffd700" fontSize="26" fontWeight="900" fontFamily="Russo One">7</text>
                    
                    {/* Wide-Arm Outstretched Wings Pose */}
                    <path d="M62 52 L22 80 L10 100" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none" />
                    <path d="M98 52 L138 80 L150 100" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none" />

                    {/* White Shorts */}
                    <path d="M56 105 L104 105 L110 135 L82 135 L80 118 L78 135 L50 135 Z" fill="#ffffff" />

                    {/* Legs Planted Strong & Wide */}
                    <path d="M60 135 L40 170 L34 186" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none" />
                    <path d="M100 135 L120 170 L126 186" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none" />

                    {/* Red Match Boots */}
                    <ellipse cx="32" cy="188" rx="8" ry="4" fill="#c8102e" />
                    <ellipse cx="128" cy="188" rx="8" ry="4" fill="#c8102e" />
                  </g>
                )}
              </svg>
            </motion.div>
          </div>

          {/* Huge Glowing SIUUUU Banner on landing */}
          {phase === 'landed' && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 20 }}
              animate={{ scale: 1.1, opacity: 1, y: 0 }}
              className="mt-4"
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-sports text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-300 to-yellow-400 drop-shadow-[0_0_40px_rgba(200,16,46,0.9)] tracking-wider">
                {title}
              </h2>

              <p className="text-sm sm:text-lg font-sports text-amber-300 tracking-widest mt-2 uppercase">
                {subtitle}
              </p>
            </motion.div>
          )}

          {/* Skip / Continue button */}
          <button
            onClick={onClose}
            className="mt-6 text-xs text-neutral-400 hover:text-white uppercase font-sports tracking-wider px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700"
          >
            TAP TO CONTINUE ➜
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
