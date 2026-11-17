import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart, Sparkles, Flame, RotateCcw, Volume2 } from 'lucide-react';
import { playFanfare, playSuccessChime, playSiuuSound, playKickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function GrandFinale({ onRestartAdventure, sfxEnabled }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showFinalSiuu, setShowFinalSiuu] = useState(false);

  // Trigger continuous festive fireworks & confetti
  useEffect(() => {
    // Immediate opening blast
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#e60000', '#ffd700', '#ffffff', '#ff1a75', '#ff9900']
    });

    if (sfxEnabled) {
      playFanfare();
    }

    // Periodic celebratory fireworks bursts
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#e60000', '#ffffff']
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#e60000', '#ffffff']
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [sfxEnabled]);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    if (sfxEnabled) playSuccessChime();

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff3366', '#ffffff', '#ff9900', '#e60000']
    });
  };

  const handleTriggerSiuu = () => {
    setShowFinalSiuu(true);
    if (sfxEnabled) playSiuuSound();

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#ffd700', '#e60000', '#ffffff']
    });

    setTimeout(() => {
      setShowFinalSiuu(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full py-12 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center overflow-hidden">
      {/* Floating Animated Hearts & Sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-red-500/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 18 + 14}px`,
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

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`gold-sparkle-${i}`}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px #ffd700',
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.9, 0.1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
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

      {/* Big Birthday Heading:
          HAPPIESTTTT BIRTHDAYYYYY NANBAAAA! ❤️🫂🫶💎
          Show first in huge glowing red and golden letters, highlight NANBAAAA with glowing red effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl mb-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sports tracking-wide leading-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">
            HAPPIESTTTT BIRTHDAYYYYY
          </span>{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-crimson glow-red">
            NANBAAAA!
            {/* Glowing red accent underline */}
            <span className="absolute -bottom-2 inset-x-0 h-1 bg-red-600 rounded-full shadow-[0_0_15px_#e60000]" />
          </span>{' '}
          <span className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl align-middle">
            ❤️🫂🫶💎
          </span>
        </h1>
      </motion.div>

      {/* Birthday Cake with Interactive Glowing Candles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center mb-10"
      >
        <div 
          onClick={handleBlowCandles}
          className="relative cursor-pointer group p-4"
          title="Click to blow out candles and make a wish!"
        >
          {/* Cake Candles */}
          <div className="flex justify-center items-end gap-4 mb-1">
            {[...Array(5)].map((_, i) => (
              <div key={`candle-${i}`} className="flex flex-col items-center">
                {/* Flame */}
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 0.9, 1.15, 1],
                      opacity: [0.8, 1, 0.9, 1, 0.8],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i * 0.15),
                      ease: 'easeInOut',
                    }}
                    className="w-3 h-5 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#ffd700,0_0_25px_#ff4500]"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 1 }}
                    className="text-xs text-neutral-400"
                  >
                    💨
                  </motion.div>
                )}
                {/* Candle Stick */}
                <div className="w-2 h-7 bg-gradient-to-b from-white via-red-300 to-amber-200 rounded-sm border border-black/30" />
              </div>
            ))}
          </div>

          {/* Birthday Cake Tiers (Football & Luxury Theme) */}
          <div className="relative flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-40 sm:w-48 h-12 rounded-t-xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 border-2 border-amber-400 flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-xs font-tech font-bold text-amber-200 tracking-wider">CR7 #007</span>
              {/* Frosting drips */}
              <div className="absolute top-0 inset-x-0 h-2 bg-amber-300/60 rounded-b-md" />
            </div>

            {/* Bottom Tier */}
            <div className="w-56 sm:w-64 h-16 rounded-b-2xl bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border-2 border-t-0 border-amber-400 flex items-center justify-around px-4 shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative">
              <span className="text-xl">⚽</span>
              <span className="text-xs font-sports text-amber-400 tracking-wider">CHAMPION CAKE</span>
              <span className="text-xl">🏆</span>
            </div>

            {/* Cake Golden Tray */}
            <div className="w-68 sm:w-76 h-3 bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 rounded-full shadow-[0_0_20px_#ffd700]" />
          </div>
        </div>

        <button
          onClick={handleBlowCandles}
          className="text-xs font-tech text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider flex items-center gap-1.5 mt-1"
        >
          {candlesBlown ? '✨ CANDLES BLOWN! WISH SENT TO THE STARS ✨' : '🕯️ CLICK CAKE TO BLOW CANDLES & MAKE A WISH 🕯️'}
        </button>
      </motion.div>

      {/* Main Emotional Birthday Message Card
          Exact required text with paragraph-by-paragraph reveals & highlighted phrases */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 w-full max-w-3xl rounded-3xl bg-gradient-to-b from-neutral-900/95 via-black/95 to-neutral-950/95 border-2 border-red-600/70 p-6 sm:p-10 shadow-[0_0_60px_rgba(230,0,0,0.4)] backdrop-blur-md mb-12"
      >
        {/* Card Header Shield */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-sports uppercase tracking-wider text-amber-300">
              FROM THE HEART • TO MY DEAREST NANBA
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <span>♾️</span>
            <span>FOREVER BOND</span>
          </div>
        </div>

        {/* Message Content: Exact Text */}
        <div className="space-y-6 text-neutral-100 text-base sm:text-lg sm:leading-relaxed font-sans">
          {/* Paragraph 1: Salutation */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-lg sm:text-xl font-sports text-amber-400 tracking-wide"
          >
            To my dearest nanba,
          </motion.p>

          {/* Paragraph 2: Core friendship acknowledgment */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="leading-relaxed"
          >
            You're my one and only, my bestesttt male friend, and someone who will always have a special place in my heart. No matter how many people come into my life, you're the one for me,{' '}
            <span className="font-bold text-red-500 glow-red">
              nanba! ❤️
            </span>
          </motion.p>

          {/* Paragraph 3: Year wishes */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="leading-relaxed"
          >
            May this year bring you endless happiness, incredible success, beautiful opportunities and everything your heart wishes for. Keep shining, keep winning and keep chasing your dreams!
          </motion.p>

          {/* Paragraph 4: Always there through every high and low */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 2.2 }}
            className="leading-relaxed"
          >
            Never forget that I'll always be there for you through every high and low, till my very last breath. You deserve all the happiness in this world!
          </motion.p>

          {/* Paragraph 5: Highlighted Golden Line */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 2.6 }}
            className="text-lg sm:text-xl font-medium leading-relaxed pt-2 border-t border-white/10"
          >
            Stay blessed,{' '}
            <span className="font-sports font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 glow-gold">
              MY FOREVER FAVOURITE HUMAN
            </span>
            . Keep rocking like CR7! 🐐⚽❤️♾️
          </motion.p>
        </div>

        {/* Floating Heart Stamps inside card */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-red-900/30">
          <span className="text-xl animate-bounce" style={{ animationDelay: '0ms' }}>❤️</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '150ms' }}>🫂</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '300ms' }}>🫶</span>
          <span className="text-xl animate-bounce" style={{ animationDelay: '450ms' }}>💎</span>
        </div>
      </motion.div>

      {/* SECTION 8: FINAL LEGENDARY ENDING
          Display:
          "PLAYER 007 – FOREVER A CHAMPION 🐐"
          "ONE FRIENDSHIP. INFINITE MEMORIES. ♾️❤️"
          "Out of all the legends in the world, today YOU are the GOAT!"
          "The world is your stadium. Your dreams are your goals. Now go score them all!"
          Golden trophy animation, football rolling towards the screen, fireworks, SIUU celebration effect.
          Button: "REPLAY THE ADVENTURE 🔁" */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 2.9 }}
        className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center mb-8"
      >
        {/* Forever Champion Banner */}
        <div className="text-2xl sm:text-4xl font-sports font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-400 drop-shadow-[0_0_25px_#ffd700] mb-2">
          PLAYER 007 – FOREVER A CHAMPION 🐐
        </div>

        <div className="text-lg sm:text-2xl font-tech font-bold text-red-500 glow-red tracking-wider mb-6">
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
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-700 flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.8)] border-4 border-yellow-200"
          >
            <Trophy className="w-14 h-14 text-neutral-900" />
          </motion.div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-amber-400/40 rounded-full blur-md" />
        </div>

        {/* Final Cinematic Quote */}
        <div className="max-w-2xl px-4 my-6 space-y-2">
          <p className="text-xl sm:text-2xl font-sports text-white tracking-wide">
            "Out of all the legends in the world, today <span className="text-amber-400 underline decoration-amber-400 decoration-2">YOU are the GOAT!</span>"
          </p>
          <p className="text-base sm:text-lg text-neutral-300 font-medium italic">
            "The world is your stadium. Your dreams are your goals. Now go score them all!"
          </p>
        </div>

        {/* Interactive Final SIUU Celebration Effect Button */}
        <button
          onClick={handleTriggerSiuu}
          className="mb-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 border border-amber-500/60 text-amber-400 hover:text-white hover:bg-red-600 transition-all text-xs sm:text-sm font-sports uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.4)]"
        >
          <span>SHOUT THE FINAL SIUUUU! 🐐⚽</span>
        </button>

        {/* SIUU Fullscreen Banner Overlay */}
        {showFinalSiuu && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pointer-events-none"
          >
            <div className="text-6xl sm:text-8xl md:text-9xl font-black font-sports text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-300 to-yellow-400 drop-shadow-[0_0_50px_#e60000] animate-pulse">
              SIUUUUUU! 🐐💥
            </div>
          </motion.div>
        )}

        {/* Replay The Adventure Button */}
        <button
          onClick={() => {
            if (sfxEnabled) playKickSound();
            onRestartAdventure();
          }}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full font-sports text-base sm:text-lg uppercase tracking-wider text-white bg-gradient-to-r from-red-700 via-neutral-900 to-red-700 border-2 border-red-500/80 shadow-[0_0_25px_rgba(230,0,0,0.6)] hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <RotateCcw className="w-5 h-5 text-amber-400 group-hover:-rotate-180 transition-transform duration-500" />
          <span>REPLAY THE ADVENTURE 🔁</span>
        </button>
      </motion.div>

      {/* Footer Credits */}
      <footer className="relative z-10 text-center text-xs text-neutral-500 tracking-wider mt-8 border-t border-neutral-900 pt-6 w-full">
        DEDICATED TO PLAYER 007 • THE GOAT BIRTHDAY SURPRISE • MADE WITH ALL MY HEART ❤️⚽
      </footer>
    </div>
  );
}
