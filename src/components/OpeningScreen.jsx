import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playKickSound, playWhistle, playGoalRoar } from '../utils/audio';

export default function OpeningScreen({ onEnterAdventure, sfxEnabled }) {
  const [lightsOn, setLightsOn] = useState(false);
  const [ballRolled, setBallRolled] = useState(false);

  useEffect(() => {
    // Stadium lights turn on sequentially
    const lightTimer = setTimeout(() => {
      setLightsOn(true);
      if (sfxEnabled) {
        playWhistle();
      }
    }, 900);

    const ballTimer = setTimeout(() => {
      setBallRolled(true);
      if (sfxEnabled) {
        playKickSound();
      }
    }, 1800);

    return () => {
      clearTimeout(lightTimer);
      clearTimeout(ballTimer);
    };
  }, [sfxEnabled]);

  const handleStart = () => {
    if (sfxEnabled) {
      playKickSound();
      playGoalRoar();
    }
    onEnterAdventure();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-black text-white selection:bg-red-600">
      {/* Stadium Floodlights (Simulated Switch On) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          lightsOn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Floodlight Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute -top-20 left-10 w-[350px] h-[350px] bg-amber-400/20 rounded-full blur-[90px]" />
        <div className="absolute -top-20 right-10 w-[350px] h-[350px] bg-red-600/30 rounded-full blur-[90px]" />

        {/* Diagonal Floodlight Beams */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black" />
      </div>

      {/* Floating Stadium Dust & Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full bg-amber-400/60"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -40, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.3),
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">
        {/* CR7 Badge / GOAT Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-600/50 text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(230,0,0,0.5)] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          CR7 THEMED BIRTHDAY EXPEDITION
          <span className="text-amber-400 font-black">🐐 007</span>
        </motion.div>

        {/* Title: PLAYER 007 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative"
        >
          <div className="text-6xl sm:text-8xl md:text-9xl font-black font-tech tracking-tighter text-white drop-shadow-[0_0_40px_rgba(230,0,0,0.8)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400">
              PLAYER
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 glow-red">
              007
            </span>
          </div>

          {/* Golden Subline */}
          <div className="mt-2 text-2xl sm:text-4xl md:text-5xl font-sports tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
            YOUR LEGENDARY DAY HAS ARRIVED!
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-base sm:text-xl text-neutral-300 max-w-xl font-medium tracking-wide leading-relaxed px-4"
        >
          Every legend has a story. Today, the story is about{' '}
          <span className="text-red-500 font-black uppercase underline decoration-red-500 decoration-2 underline-offset-4">
            YOU!
          </span>
        </motion.p>

        {/* Rolling Football Animation across the pitch */}
        <div className="relative w-full max-w-md h-28 my-6 flex items-center justify-center">
          {/* Pitch Yard Markings */}
          <div className="absolute w-full h-[2px] bg-white/20 bottom-4" />
          <div className="absolute left-1/2 -translate-x-1/2 w-20 h-20 border border-white/20 rounded-full bottom-[-28px]" />

          {/* Rolling Football Element */}
          <motion.div
            initial={{ x: -280, rotate: -720, opacity: 0 }}
            animate={{ 
              x: ballRolled ? 0 : -280, 
              rotate: ballRolled ? 0 : -720, 
              opacity: ballRolled ? 1 : 0 
            }}
            transition={{ type: 'spring', damping: 14, stiffness: 60, duration: 1.4 }}
            className="relative cursor-pointer group"
            onClick={() => {
              if (sfxEnabled) playKickSound();
            }}
          >
            {/* Football Ball Graphic (High Quality SVG) */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.8),0_0_50px_rgba(230,0,0,0.5)] flex items-center justify-center relative overflow-hidden border-2 border-neutral-300">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Central Pentagon */}
                <polygon points="50,28 69,42 62,65 38,65 31,42" fill="#111111" />
                {/* Connecting lines & outer pentagons */}
                <line x1="50" y1="28" x2="50" y2="10" stroke="#111" strokeWidth="3" />
                <line x1="69" y1="42" x2="88" y2="35" stroke="#111" strokeWidth="3" />
                <line x1="62" y1="65" x2="75" y2="85" stroke="#111" strokeWidth="3" />
                <line x1="38" y1="65" x2="25" y2="85" stroke="#111" strokeWidth="3" />
                <line x1="31" y1="42" x2="12" y2="35" stroke="#111" strokeWidth="3" />
                {/* Edge Patches */}
                <polygon points="50,10 38,0 62,0" fill="#222" />
                <polygon points="88,35 100,25 100,45" fill="#222" />
                <polygon points="75,85 85,100 65,100" fill="#222" />
                <polygon points="25,85 15,100 35,100" fill="#222" />
                <polygon points="12,35 0,25 0,45" fill="#222" />
              </svg>
              {/* Ball Shine */}
              <div className="absolute top-1 left-2 w-6 h-6 rounded-full bg-white/60 blur-[2px]" />
            </div>

            {/* Red Energy Ring under the ball */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-red-600/70 rounded-full blur-[4px] animate-pulse" />
          </motion.div>
        </div>

        {/* Enter Adventure Glowing Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-2"
        >
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-sports text-lg sm:text-2xl uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_35px_rgba(230,0,0,0.8)] hover:shadow-[0_0_60px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300"
          >
            {/* Ambient Button Flare */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600 opacity-0 group-hover:opacity-40 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center gap-3">
              ENTER THE LEGEND'S WORLD ⚽
            </span>
          </button>
        </motion.div>

        {/* Footnote */}
        <div className="mt-8 text-xs text-neutral-500 tracking-wider">
          HEADPHONES RECOMMENDED • TAP ANYWHERE TO UNLEASH THE SIUUU
        </div>
      </div>
    </div>
  );
}
