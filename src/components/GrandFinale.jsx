import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Heart, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';
import { playFanfare, playSuccessChime, playSiuuSound, playKickSound, setBgmMode } from '../utils/audio';
import confetti from 'canvas-confetti';
import cr7Photo from '../assets/cr7_siuu.jpg';

export default function GrandFinale({ onRestartAdventure, sfxEnabled, triggerSiuu }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [cinematicIntroPhase, setCinematicIntroPhase] = useState('blackout'); // 'blackout' -> 'siuuJump' -> 'revealed'

  // Cinematic Entrance Sequence:
  // "Have the stadium go dark for a second, then show the Ronaldo-inspired SIUUUU jump with the sound perfectly synchronized.
  // Immediately after the landing, reveal your birthday message in glowing gold!"
  useEffect(() => {
    setBgmMode('emotional');

    // 1. Blackout for 900ms
    const jumpTimer = setTimeout(() => {
      setCinematicIntroPhase('siuuJump');
      if (sfxEnabled) {
        setTimeout(() => playSiuuSound(), 600);
      }
    }, 900);

    // 2. Landing & Reveal Message in glowing gold
    const revealTimer = setTimeout(() => {
      setCinematicIntroPhase('revealed');
      if (sfxEnabled) playFanfare();

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#c8102e', '#ffd700', '#ffffff', '#f59e0b', '#e60000']
      });
    }, 2500);

    // Periodic celebratory fireworks in background
    const interval = setInterval(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#c8102e', '#ffffff']
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#c8102e', '#ffffff']
      });
    }, 3800);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(revealTimer);
      clearInterval(interval);
    };
  }, [sfxEnabled]);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    if (sfxEnabled) playSuccessChime();

    confetti({
      particleCount: 160,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#c8102e', '#ffffff', '#f59e0b', '#ff3366']
    });
  };

  const handleTriggerFinalSiuu = () => {
    triggerSiuu('SIUUUUUUUUUU! 🐐', 'PLAYER ROSHAN • FOREVER THE GOAT! ⚽❤️');
  };

  return (
    <div className="relative min-h-screen w-full py-12 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center overflow-hidden">
      
      {/* CINEMATIC INTRO BLACKOUT & SIUU LANDING SEQUENCE WITH UPLOADED CR7 PHOTO */}
      {cinematicIntroPhase === 'blackout' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          <div className="text-xs font-tech text-neutral-500 uppercase tracking-widest animate-pulse">
            PREPARING ROSHAN'S GRAND FINALE...
          </div>
        </motion.div>
      )}

      {cinematicIntroPhase === 'siuuJump' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-4 overflow-hidden"
        >
          {/* Uploaded CR7 Image with Dynamic Camera Zoom and Impact */}
          <motion.div
            initial={{ scale: 0.6, y: -40, opacity: 0 }}
            animate={{ scale: 1.05, y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative w-full max-w-md aspect-[16/10] rounded-3xl overflow-hidden border-2 border-red-600 shadow-[0_0_50px_#c8102e]"
          >
            <img 
              src={cr7Photo} 
              alt="Cristiano Ronaldo SIUUU Celebration" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 inset-x-0 text-center text-xs font-tech text-amber-300 font-bold uppercase tracking-wider">
              PORTUGAL #7 • CR7 SIGNATURE ROAR
            </div>
          </motion.div>

          <div className="text-5xl sm:text-7xl md:text-8xl font-black font-sports text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-300 to-yellow-400 drop-shadow-[0_0_35px_#c8102e] mt-5 animate-bounce">
            SIUUUUUUUUUU! 🐐
          </div>
        </motion.div>
      )}

      {/* Floating Animated Hearts & Sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-red-500/35"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 14}px`,
            }}
            animate={{
              y: [-10, -50, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Celebration Header Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border-2 border-amber-400/80 text-amber-300 text-xs sm:text-sm font-sports uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.6)] mb-4"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        GRAND FINALE • THE GOAT BIRTHDAY SURPRISE
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
      </motion.div>

      {/* 1. RESTORED INITIAL BIRTHDAY GREETING: "Happy Birthday Nanba Roshan ❤️" */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl mb-6"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sports tracking-wide leading-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">
            HAPPIESTTTT BIRTHDAYYYYY
          </span>{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-crimson glow-crimson">
            NANBA ROSHAN! ❤️
            <span className="absolute -bottom-2 inset-x-0 h-1 bg-red-600 rounded-full shadow-[0_0_15px_#c8102e]" />
          </span>{' '}
          <span className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl align-middle">
            🫂🫶💎
          </span>
        </h1>
      </motion.div>

      {/* 2. RESTORED BIRTHDAY CAKE SECTION (Centerpiece with Candles & Candle-Blowing Interaction) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-full max-w-xl flex flex-col items-center mb-12"
      >
        <div 
          onClick={handleBlowCandles}
          className="relative cursor-pointer group p-4 flex flex-col items-center w-full"
          title="Click to blow out candles and make a wish!"
        >
          {/* 5 Animated Glowing Candles */}
          <div className="flex justify-center items-end gap-3.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={`candle-${i}`} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 0.9, 1.15, 1],
                      y: [0, -2, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 0.8 + i * 0.15 }}
                    className="w-3 h-5 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#ffd700]"
                  />
                ) : (
                  <div className="text-xs">💨</div>
                )}
                <div className="w-2 h-7 bg-gradient-to-b from-white via-red-300 to-amber-200 rounded-xs shadow-sm border border-black/20" />
              </div>
            ))}
          </div>

          {/* Birthday Cake Tiers (Luxury Burgundy, Crimson & Gold) */}
          <div className="relative flex flex-col items-center w-full">
            {/* Top Tier with Exact Single Greeting on Front */}
            <div className="w-64 sm:w-80 py-3.5 px-4 rounded-t-2xl bg-gradient-to-r from-red-900 via-red-700 to-red-900 border-2 border-amber-400 shadow-[0_0_20px_rgba(200,16,46,0.6)] flex items-center justify-center text-center">
              <span className="text-sm sm:text-base font-sports text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-400 drop-shadow-[0_0_12px_#ffd700] tracking-wide font-bold leading-relaxed">
                Happiestttt birthdayyyyy nanba roshan ❤️🫂
              </span>
            </div>

            {/* Bottom Tier (Midnight Black with Golden Embellishments) */}
            <div className="w-72 sm:w-92 h-14 rounded-b-2xl bg-neutral-900 border-2 border-t-0 border-amber-400 flex items-center justify-around px-5 text-xs text-amber-400 font-sports shadow-xl">
              <span>⚽</span>
              <span className="text-xs tracking-wider text-amber-300 font-bold">ROSHAN #7 • GOAT EDITION</span>
              <span>🏆</span>
            </div>

            {/* Cake Golden Tray */}
            <div className="w-80 sm:w-96 h-3 bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 rounded-full shadow-[0_0_20px_#ffd700] mt-0.5" />
          </div>
        </div>

        <button
          onClick={handleBlowCandles}
          className="text-xs font-tech text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1.5 mt-2"
        >
          {candlesBlown ? '✨ CANDLES BLOWN! WISH SENT TO THE STARS ✨' : '🕯️ CLICK CAKE TO BLOW CANDLES & MAKE A WISH 🕯️'}
        </button>
      </motion.div>

      {/* 2-COLUMN LAYOUT (Left: Dedicated CR7 SIUU Visual | Right: Emotional Birthday Letter) */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* LEFT COLUMN: DEDICATED CR7 SIUU CELEBRATION VISUAL */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          
          {/* DEDICATED CR7 SIUU CELEBRATION CARD */}
          <div className="w-full rounded-3xl bg-gradient-to-b from-neutral-900 via-[#0a0a0f] to-black border border-red-900/60 p-5 shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            {/* Top Bar with Controls */}
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-xs font-tech text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                CR7 SIGNATURE SIUUUU 🐐
              </span>
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="flex items-center gap-1 text-[11px] font-sports text-neutral-300 hover:text-white bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
              >
                {isVideoPlaying ? <Pause className="w-3 h-3 text-red-500" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isVideoPlaying ? 'PAUSE EFFECTS' : 'PLAY EFFECTS'}</span>
              </button>
            </div>

            {/* Visual Stage displaying Uploaded CR7 SIUU Image */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_30px_rgba(200,16,46,0.35)] bg-neutral-950 flex items-center justify-center">
              <motion.img
                src={cr7Photo}
                alt="Cristiano Ronaldo SIUU Celebration"
                animate={
                  isVideoPlaying
                    ? {
                        scale: [1, 1.05, 1],
                        filter: ['brightness(1) contrast(1.1)', 'brightness(1.15) contrast(1.2)', 'brightness(1) contrast(1.1)'],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Red & Gold Lighting Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Golden Trophy Badge */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 border border-amber-400/60 backdrop-blur-md flex items-center gap-1.5"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-sports text-amber-300">GOAT #7</span>
              </motion.div>

              {/* Caption Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/60 text-[10px] font-tech text-white">
                PORTUGAL #7 • SIUUUU
              </div>
            </div>

            {/* Trigger SIUU Button */}
            <button
              onClick={handleTriggerFinalSiuu}
              className="mt-4 w-full py-2.5 rounded-xl font-sports text-xs uppercase tracking-wider text-amber-300 bg-red-950/60 border border-red-700/60 hover:bg-red-900/60 transition-colors flex items-center justify-center gap-2"
            >
              <span>SHOUT SIUUUU! 🐐⚽</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE EXACT EMOTIONAL BIRTHDAY MESSAGE */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-3xl bg-gradient-to-b from-neutral-900/95 via-[#0c0d12]/95 to-black/95 border-2 border-red-700/60 p-6 sm:p-9 shadow-[0_0_50px_rgba(200,16,46,0.35)] backdrop-blur-md"
          >
            {/* Card Header Shield */}
            <div className="flex items-center justify-between border-b border-red-900/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-sports uppercase tracking-wider text-amber-300">
                  FROM THE HEART • TO MY DEAREST NANBA
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-400 font-tech">
                <span>ROSHAN</span>
                <span>♾️❤️</span>
              </div>
            </div>

            {/* Message Content: EXACT UNALTERED REQUIRED TEXT */}
            <div className="space-y-6 text-neutral-100 text-base sm:text-lg sm:leading-relaxed font-sans">
              
              {/* Paragraph 1: Salutation with 💎🫂 */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg sm:text-xl font-sports text-amber-400 tracking-wide"
              >
                To my dearest nanba 💎🫂
              </motion.p>

              {/* Paragraph 2: Core friendship acknowledgment - with 'the one' */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="leading-relaxed"
              >
                You're my one and only, my bestesttt male friend, and the one who will always have a special place in my heart. No matter how many people come into my life, you're the one for me,{' '}
                <span className="font-bold text-red-500 glow-crimson">
                  nanba! ❤️
                </span>
              </motion.p>

              {/* Paragraph 3: Year wishes */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="leading-relaxed"
              >
                May this year bring you endless happiness, incredible success, beautiful opportunities and everything your heart wishes for. Keep shining, keep winning and keep chasing your dreams!
              </motion.p>

              {/* Paragraph 4: High and low breath */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="leading-relaxed"
              >
                Never forget that I'll always be there for you through every high and low, till my very last breath. You deserve all the happiness in this world!
              </motion.p>

              {/* Paragraph 5: Golden Line */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="text-lg sm:text-xl font-medium leading-relaxed pt-2 border-t border-white/10"
              >
                Stay blessed,{' '}
                <span className="font-sports font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 glow-gold">
                  MY FOREVER FAVOURITE HUMAN
                </span>
                . Keep rocking like CR7! 🐐⚽❤️♾️
              </motion.p>
            </div>

            {/* Stamp Row */}
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-red-900/30">
              <span className="text-xl animate-bounce" style={{ animationDelay: '0ms' }}>❤️</span>
              <span className="text-xl animate-bounce" style={{ animationDelay: '150ms' }}>🫂</span>
              <span className="text-xl animate-bounce" style={{ animationDelay: '300ms' }}>🫶</span>
              <span className="text-xl animate-bounce" style={{ animationDelay: '450ms' }}>💎</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 8: FINAL LEGENDARY ENDING */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8 }}
        className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center mb-8"
      >
        {/* Banner */}
        <div className="text-2xl sm:text-4xl font-sports font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-400 drop-shadow-[0_0_25px_#ffd700] mb-2">
          PLAYER ROSHAN – FOREVER A CHAMPION 🐐
        </div>

        <div className="text-lg sm:text-2xl font-tech font-bold text-red-500 glow-crimson tracking-wider mb-6">
          ONE FRIENDSHIP. INFINITE MEMORIES. ♾️❤️
        </div>

        {/* Golden Trophy Animation */}
        <div className="relative my-4">
          <motion.div
            animate={{
              rotateY: [0, 180, 360],
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-700 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.7)] border-4 border-yellow-200"
          >
            <Trophy className="w-14 h-14 text-neutral-900" />
          </motion.div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-amber-400/30 rounded-full blur-md" />
        </div>

        {/* Final Cinematic Quote */}
        <div className="max-w-2xl px-4 my-6 space-y-2">
          <p className="text-xl sm:text-2xl font-sports text-white tracking-wide">
            "OUT OF ALL THE LEGENDS IN THE WORLD, TODAY <span className="text-amber-400 underline decoration-amber-400 decoration-2">YOU ARE THE GOAT!</span>"
          </p>
          <p className="text-base sm:text-lg text-neutral-300 font-medium italic">
            "THE WORLD IS YOUR STADIUM. YOUR DREAMS ARE YOUR GOALS. NOW GO SCORE THEM ALL!"
          </p>
        </div>

        {/* Interactive Final SIUU Celebration Effect Button */}
        <button
          onClick={handleTriggerFinalSiuu}
          className="mb-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 border border-amber-500/50 text-amber-400 hover:text-white hover:bg-red-600 transition-all text-xs sm:text-sm font-sports uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)]"
        >
          <span>SHOUT THE FINAL SIUUUU! 🐐⚽</span>
        </button>

        {/* Replay The Adventure Button */}
        <button
          onClick={() => {
            if (sfxEnabled) playKickSound();
            onRestartAdventure();
          }}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full font-sports text-base sm:text-lg uppercase tracking-wider text-white bg-gradient-to-r from-red-700 via-neutral-900 to-red-700 border-2 border-red-500/80 shadow-[0_0_25px_rgba(200,16,46,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <RotateCcw className="w-5 h-5 text-amber-400 group-hover:-rotate-180 transition-transform duration-500" />
          <span>REPLAY THE ADVENTURE 🔁</span>
        </button>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-neutral-500 tracking-wider mt-8 border-t border-neutral-900 pt-6 w-full">
        DEDICATED TO PLAYER ROSHAN • THE GOAT BIRTHDAY SURPRISE • MADE WITH ALL MY HEART ❤️⚽
      </footer>
    </div>
  );
}
