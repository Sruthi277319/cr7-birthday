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
        
        {/* Animated Blooming Rose - Cinematic, Multi-Layered Velvet Petals & Dewdrops */}
        <motion.div 
          animate={{ scale: bloomStage >= 2 ? [1, 1.05, 1.03] : 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 my-4 flex items-center justify-center drop-shadow-[0_0_40px_rgba(200,16,46,0.55)]"
        >
          <svg viewBox="0 0 240 280" className="w-full h-full overflow-visible">
            <defs>
              {/* Petal Gradients */}
              <radialGradient id="deepPetalGrad" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#e60026" />
                <stop offset="50%" stopColor="#a3001a" />
                <stop offset="85%" stopColor="#630010" />
                <stop offset="100%" stopColor="#3b0009" />
              </radialGradient>

              <radialGradient id="midPetalGrad" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ff2647" />
                <stop offset="55%" stopColor="#c80022" />
                <stop offset="88%" stopColor="#800016" />
                <stop offset="100%" stopColor="#45000b" />
              </radialGradient>

              <radialGradient id="innerPetalGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ff4d68" />
                <stop offset="50%" stopColor="#e00028" />
                <stop offset="85%" stopColor="#99001b" />
                <stop offset="100%" stopColor="#57000f" />
              </radialGradient>

              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e5c2b" />
                <stop offset="50%" stopColor="#14421e" />
                <stop offset="100%" stopColor="#0c2912" />
              </linearGradient>

              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2e853f" />
                <stop offset="70%" stopColor="#195424" />
                <stop offset="100%" stopColor="#0f3616" />
              </linearGradient>

              <filter id="dewGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stem & Thorns */}
            <path
              d="M120 155 Q122 195 116 260"
              stroke="url(#stemGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Thorn */}
            <path d="M121 210 Q127 213 130 219 Q123 218 120 216 Z" fill="#14421e" />
            <path d="M117 235 Q110 238 107 244 Q114 243 117 241 Z" fill="#14421e" />

            {/* Natural Green Leaves with Ribs */}
            <g>
              {/* Left Leaf */}
              <path
                d="M118 190 C80 175 60 195 68 215 C85 220 108 205 117 195"
                fill="url(#leafGrad)"
                stroke="#0f3616"
                strokeWidth="1.2"
              />
              <path d="M117 195 Q90 198 70 212" stroke="#48b35f" strokeWidth="1" fill="none" opacity="0.6" />

              {/* Right Leaf */}
              <path
                d="M119 215 C150 200 175 220 165 240 C145 245 125 230 118 220"
                fill="url(#leafGrad)"
                stroke="#0f3616"
                strokeWidth="1.2"
              />
              <path d="M118 220 Q145 223 162 237" stroke="#48b35f" strokeWidth="1" fill="none" opacity="0.6" />
            </g>

            {/* Sepals directly beneath the flower */}
            <g fill="#1a4d25">
              <path d="M105 155 Q95 145 80 150 Q96 160 110 160 Z" />
              <path d="M135 155 Q145 145 160 150 Q144 160 130 160 Z" />
              <path d="M120 156 Q120 168 116 172 Q122 165 120 156 Z" />
            </g>

            {/* ================= ROSE PETALS UNVEILING ================= */}
            {/* Layer 1: Wide Outer Velvet Petals (Stage 2) */}
            <motion.g
              style={{ transformOrigin: '120px 125px' }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: bloomStage >= 2 ? 1 : bloomStage === 1 ? 0.6 : 0.3,
                opacity: bloomStage >= 1 ? 1 : 0,
              }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bottom Outer Petal */}
              <path
                d="M120 70 C50 80 40 160 120 168 C200 160 190 80 120 70 Z"
                fill="url(#deepPetalGrad)"
                stroke="#4a000c"
                strokeWidth="1"
              />
              {/* Left Flare Petal */}
              <path
                d="M120 135 C65 85 45 130 75 160 C95 168 115 150 120 135 Z"
                fill="#940018"
                opacity="0.9"
              />
              {/* Right Flare Petal */}
              <path
                d="M120 135 C175 85 195 130 165 160 C145 168 125 150 120 135 Z"
                fill="#940018"
                opacity="0.9"
              />
            </motion.g>

            {/* Layer 2: Mid-Curved Blooming Petals (Stage 1 & 2) */}
            <motion.g
              style={{ transformOrigin: '120px 120px' }}
              initial={{ scale: 0.45, rotate: -20 }}
              animate={{
                scale: bloomStage >= 2 ? 1 : bloomStage >= 1 ? 0.8 : 0.45,
                rotate: bloomStage >= 2 ? 0 : -10,
              }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M120 78 C78 90 70 142 120 152 C170 142 162 90 120 78 Z"
                fill="url(#midPetalGrad)"
                stroke="#690011"
                strokeWidth="0.8"
              />
              {/* Overlapping Curved Petal Left */}
              <path
                d="M120 85 C85 92 82 125 108 142 C120 146 126 130 120 85 Z"
                fill="#b8001f"
              />
              {/* Overlapping Curved Petal Right */}
              <path
                d="M120 85 C155 92 158 125 132 142 C120 146 114 130 120 85 Z"
                fill="#c70023"
              />
            </motion.g>

            {/* Layer 3: Central Cup Petals */}
            <motion.g
              style={{ transformOrigin: '120px 115px' }}
              initial={{ scale: 0.6 }}
              animate={{
                scale: bloomStage >= 1 ? 1 : 0.6,
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M120 90 C96 98 94 130 120 138 C146 130 144 98 120 90 Z"
                fill="url(#innerPetalGrad)"
              />
              {/* Swirling Center Buds */}
              <path
                d="M112 102 C106 110 114 122 120 125 C126 122 134 110 128 102 C122 96 118 96 112 102 Z"
                fill="#ff1a43"
              />
              {/* Rose Core Spiral Rim */}
              <path
                d="M117 107 C124 104 125 113 120 116 C115 113 118 108 121 108"
                stroke="#ffd700"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            </motion.g>

            {/* Fresh Dewdrops with Highlights */}
            <g filter="url(#dewGlow)">
              {/* Dewdrop 1 on bottom petal */}
              <circle cx="100" cy="150" r="2.4" fill="#ffffff" opacity="0.8" />
              <circle cx="99.3" cy="149.3" r="0.8" fill="#ffffff" />

              {/* Dewdrop 2 on right leaf */}
              <circle cx="145" cy="225" r="2.8" fill="#ffffff" opacity="0.75" />
              <circle cx="144" cy="224" r="0.9" fill="#ffffff" />

              {/* Dewdrop 3 on left petal */}
              <circle cx="78" cy="135" r="2" fill="#ffffff" opacity="0.7" />
            </g>
          </svg>
        </motion.div>

        {/* Text 1: A little surprise for someone... the special one ❤️ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs sm:text-sm font-tech text-amber-300 uppercase tracking-widest mb-3 font-semibold"
        >
          A little surprise for someone... the special one ❤️
        </motion.div>

        {/* Text 2: A beautiful surprise awaits you, Roshan ❤️ */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-2xl sm:text-4xl md:text-5xl font-sports tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] mb-8"
        >
          A beautiful surprise awaits you, Roshan ❤️
        </motion.h2>

        {/* GO BUTTON – GO 🌹 */}
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
              <span>GO 🌹</span>
              <ArrowRight className="w-6 h-6 text-amber-200 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
