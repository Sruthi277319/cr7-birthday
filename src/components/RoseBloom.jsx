import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { playSuccessChime, playKickSound } from '../utils/audio';

export default function RoseBloom({ onProceedToAdventure, sfxEnabled }) {
  // Bloom stages: 0 (bud), 1 (opening), 2 (full bloom), 3 (reveal button)
  const [bloomStage, setBloomStage] = useState(0);

  useEffect(() => {
    // Stage 1: bud starts opening (at 800ms)
    const t1 = setTimeout(() => {
      setBloomStage(1);
    }, 900);

    // Stage 2: full bloom (at 2200ms)
    const t2 = setTimeout(() => {
      setBloomStage(2);
      if (sfxEnabled) playSuccessChime();
    }, 2400);

    // Stage 3: reveal GO button (at 3600ms)
    const t3 = setTimeout(() => {
      setBloomStage(3);
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sfxEnabled]);

  const handleGo = () => {
    if (sfxEnabled) playKickSound();
    onProceedToAdventure();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-[#07070b] text-white selection:bg-red-700">
      
      {/* Soft Ambient Cinematic Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating Rose Petals & Golden Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 18 + 12}px`,
              background: 'radial-gradient(circle, #e60000 20%, #7a0012 90%)',
              borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
              opacity: 0.6,
            }}
            animate={{
              y: [-20, 40, -20],
              x: [-15, 15, -15],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Tiny Golden Sparkles */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full bg-amber-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              boxShadow: '0 0 8px #ffd700',
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        {/* Animated Blooming Rose SVG */}
        <div className="relative w-56 h-56 sm:w-68 sm:h-68 my-4 flex items-center justify-center">
          
          {/* Rose Stem & Leaves */}
          <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_0_35px_rgba(200,16,46,0.5)]">
            {/* Green Stem */}
            <path
              d="M100 130 C100 170 95 195 90 230"
              stroke="#1b4d24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Side Leaves */}
            <path
              d="M96 170 C70 160 60 175 65 185 C75 190 92 180 94 172"
              fill="#226330"
              stroke="#133d1b"
              strokeWidth="1.5"
            />
            <path
              d="M94 190 C118 180 130 195 125 205 C115 210 98 200 93 192"
              fill="#226330"
              stroke="#133d1b"
              strokeWidth="1.5"
            />

            {/* BLOOMING PETALS (Animated via Scale & Rotation) */}
            {/* Outer Petals (Reveal in full bloom) */}
            <g
              style={{
                transformOrigin: '100px 105px',
                transition: 'all 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: bloomStage >= 2 ? 'scale(1)' : bloomStage === 1 ? 'scale(0.55)' : 'scale(0.2)',
                opacity: bloomStage >= 1 ? 1 : 0.2,
              }}
            >
              {/* Petal Outer 1 */}
              <path
                d="M100 50 C50 65 50 130 100 135 C150 130 150 65 100 50 Z"
                fill="url(#outerPetalGrad)"
              />
              {/* Petal Outer Left Wings */}
              <path
                d="M100 110 C60 70 40 105 70 130 C90 135 98 125 100 110 Z"
                fill="#b8001f"
              />
              {/* Petal Outer Right Wings */}
              <path
                d="M100 110 C140 70 160 105 130 130 C110 135 102 125 100 110 Z"
                fill="#b8001f"
              />
            </g>

            {/* Mid Petals */}
            <g
              style={{
                transformOrigin: '100px 100px',
                transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: bloomStage >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-15deg)',
              }}
            >
              <path
                d="M100 65 C75 75 70 115 100 125 C130 115 125 75 100 65 Z"
                fill="url(#midPetalGrad)"
              />
              <path
                d="M100 70 C85 80 80 105 100 115 C118 105 115 80 100 70 Z"
                fill="#e60026"
              />
            </g>

            {/* Center Rosebud Core */}
            <g style={{ transformOrigin: '100px 95px' }}>
              <path
                d="M100 75 C90 82 88 98 100 105 C112 98 110 82 100 75 Z"
                fill="#ff1a40"
              />
              {/* Velvet Rosebud Spiral Highlight */}
              <path
                d="M98 80 C104 80 105 88 100 92 C95 88 97 83 100 83"
                stroke="#ffd700"
                strokeWidth="1.2"
                fill="none"
              />
            </g>

            {/* Gradients */}
            <defs>
              <radialGradient id="outerPetalGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e60026" />
                <stop offset="70%" stopColor="#9e0017" />
                <stop offset="100%" stopColor="#5c000d" />
              </radialGradient>
              <radialGradient id="midPetalGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff1a40" />
                <stop offset="80%" stopColor="#c8001e" />
                <stop offset="100%" stopColor="#800013" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Text 1: A LITTLE SURPRISE FOR SOMEONE SPECIAL... */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs sm:text-sm font-tech text-amber-300 uppercase tracking-widest mb-3 font-semibold"
        >
          A LITTLE SURPRISE FOR SOMEONE SPECIAL...
        </motion.div>

        {/* Text 2: HAPPINESS LOOKS GOOD ON YOU, ROSHAN! ❤️ */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-2xl sm:text-4xl md:text-5xl font-sports tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] mb-8"
        >
          HAPPINESS LOOKS GOOD ON YOU, ROSHAN! ❤️
        </motion.h2>

        {/* GO BUTTON – LET'S GO! ❤️⚽ */}
        {bloomStage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-2"
          >
            <button
              onClick={handleGo}
              className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full font-sports text-lg sm:text-2xl uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_35px_rgba(200,16,46,0.8)] hover:shadow-[0_0_55px_rgba(212,175,55,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300 animate-pulse"
            >
              <span>LET'S GO! ❤️⚽</span>
              <ArrowRight className="w-6 h-6 text-amber-200 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
