import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gift, Sparkles, Shield, Award, Star } from 'lucide-react';
import { playGiftOpen, playFanfare, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Level4LockerRoom({ onUnlockSurprise, sfxEnabled, triggerSiuu }) {
  const [boxOpened, setBoxOpened] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const handleOpenGift = () => {
    if (boxOpened) return;
    setBoxOpened(true);

    if (sfxEnabled) {
      playGiftOpen();
      setTimeout(() => playFanfare(), 600);
    }

    // Explosion of champagne gold & crimson fireworks confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#c8102e', '#ffffff', '#f59e0b', '#e60000']
    });

    setTimeout(() => {
      setShowCelebrationModal(true);
      triggerSiuu('SIUUUUUU! 🐐', 'THE ULTIMATE SURPRISE UNLOCKED FOR ROSHAN!');
    }, 900);
  };

  const handleProceedToGrandFinale = () => {
    if (sfxEnabled) playSuccessChime();
    onUnlockSurprise();
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Level Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-sports uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(200,16,46,0.4)]"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        LEVEL 4 OF 4 • THE SECRET VIP LOCKER ROOM
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-sports text-center tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400 drop-shadow-[0_0_30px_rgba(200,16,46,0.7)] mb-2"
      >
        ONE LAST MISSION, PLAYER ROSHAN!
      </motion.h2>

      {/* Subtitle */}
      <p className="text-neutral-300 text-base sm:text-xl text-center font-medium max-w-xl mb-8 tracking-wide">
        YOUR ULTIMATE SURPRISE IS WAITING...
      </p>

      {/* Premium Football Locker Room Visual Chamber */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-neutral-900 via-[#0a0a0f] to-black border-2 border-amber-500/50 p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden">
        {/* Locker Background Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-red-900/10 to-transparent pointer-events-none" />

        {/* Locker Shelf Top Banner */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-tech font-bold text-neutral-400 uppercase tracking-widest">
              OFFICIAL LOCKER #07 • ROSHAN'S SUITE
            </span>
          </div>
          <div className="text-xs font-sports text-red-500 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-red-500" />
            GOAT EDITION
          </div>
        </div>

        {/* 3-Column Locker Interior (Jersey | Gift Box | Trophies & Ball) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Locker Item 1: Ronaldo-inspired "ROSHAN" Jersey */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-lg text-center relative group"
          >
            <div className="text-[10px] font-tech text-amber-400 font-bold mb-2">OFFICIAL KIT</div>
            {/* Custom SVG Football Jersey for ROSHAN */}
            <div className="relative w-36 h-44 drop-shadow-[0_10px_20px_rgba(200,16,46,0.4)]">
              <svg viewBox="0 0 200 240" className="w-full h-full">
                {/* Jersey Body (CR7 Red with Crimson Stripes) */}
                <path
                  d="M40 50 L10 100 L40 120 L50 90 L50 220 L150 220 L150 90 L160 120 L190 100 L160 50 L130 50 C120 70 80 70 70 50 Z"
                  fill="#c8102e"
                  stroke="#ffd700"
                  strokeWidth="3"
                />
                {/* Gold Shoulders Accent */}
                <path d="M40 50 L10 100 L25 110 L50 65 Z" fill="#9e0c22" />
                <path d="M160 50 L190 100 L175 110 L150 65 Z" fill="#9e0c22" />
                {/* Neck Collar */}
                <path d="M70 50 C80 65 120 65 130 50 C120 58 80 58 70 50 Z" fill="#ffd700" />
                {/* Gold Number 7 */}
                <text x="100" y="160" textAnchor="middle" fill="#ffd700" fontSize="72" fontWeight="900" fontFamily="Russo One">
                  7
                </text>
                {/* ROSHAN Name */}
                <text x="100" y="95" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="Orbitron">
                  ROSHAN
                </text>
              </svg>
            </div>
            <div className="text-xs font-sports text-white mt-2">PLAYER ROSHAN JERSEY</div>
            <div className="text-[10px] text-neutral-400">Match-Worn GOAT Edition</div>
          </motion.div>

          {/* Centerpiece: Mysterious Glowing Birthday Gift Box */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={boxOpened ? { scale: 1.15 } : { y: [0, -6, 0] }}
              transition={{ repeat: boxOpened ? 0 : Infinity, duration: 2.2, ease: 'easeInOut' }}
              onClick={handleOpenGift}
              className="relative cursor-pointer group p-4"
              title="Click to Unlock Surprise!"
            >
              {/* Outer Golden Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 to-red-600/30 blur-2xl animate-pulse" />

              {/* The Gift Box Graphic */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-700 border-2 border-yellow-200 shadow-[0_0_40px_rgba(212,175,55,0.7)] flex flex-col items-center justify-center overflow-hidden">
                {/* Crimson Ribbon Horizontal & Vertical */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-red-600 to-red-800 border-y border-red-400 shadow-md" />
                <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-red-600 to-red-800 border-x border-red-400 shadow-md" />

                {/* Ribbon Bow on top */}
                <div className="absolute top-2 w-12 h-6 flex justify-center gap-1 z-10">
                  <div className="w-5 h-5 rounded-full border-2 border-red-400 bg-red-700 -rotate-45" />
                  <div className="w-5 h-5 rounded-full border-2 border-red-400 bg-red-700 rotate-45" />
                </div>

                {/* Glowing Sparkles */}
                <Sparkles className="w-8 h-8 text-white z-10 animate-bounce" />

                {/* Box Lid Animation state */}
                {boxOpened && (
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -30, opacity: 1 }}
                    className="absolute inset-0 bg-white/40 flex items-center justify-center"
                  >
                    <span className="text-4xl">✨</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <span className="text-xs font-tech text-amber-400 font-bold uppercase tracking-wider mt-2">
              {boxOpened ? '🎁 SURPRISE UNLOCKED!' : '🎁 TAP GIFT TO UNLOCK'}
            </span>
          </div>

          {/* Locker Item 3: Golden Trophies & Match Ball */}
          <div className="flex flex-col items-center gap-3">
            {/* Ballon d'Or Golden Trophy Graphic */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-[0_0_15px_#ffd700]">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <div className="text-xs font-sports text-white">BALLON D'OR</div>
                <div className="text-[10px] text-amber-400">Awarded to Roshan 🐐</div>
              </div>
            </motion.div>

            {/* Golden Match Ball */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_15px_#ffd700] border border-white/40">
                <span className="text-xl">⚽</span>
              </div>
              <div className="text-left">
                <div className="text-xs font-sports text-white">THE CHAMPION BALL</div>
                <div className="text-[10px] text-amber-400">Hat-Trick Match Ball</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Button: UNLOCK YOUR SPECIAL SURPRISE 🎁 */}
        <div className="mt-8 text-center">
          <button
            onClick={handleOpenGift}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full font-sports text-lg sm:text-xl uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_35px_rgba(200,16,46,0.8)] hover:shadow-[0_0_55px_rgba(212,175,55,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300"
          >
            <Gift className="w-6 h-6 text-amber-200 animate-pulse" />
            <span>UNLOCK YOUR SPECIAL SURPRISE 🎁</span>
          </button>
        </div>
      </div>

      {/* Modal / Popup when gift is opened, displaying required text:
          "CONGRATULATIONS, PLAYER ROSHAN!"
          "YOU HAVE UNLOCKED YOUR ULTIMATE BIRTHDAY SURPRISE!" */}
      <AnimatePresence>
        {showCelebrationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-lg text-center p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-amber-400 shadow-[0_0_60px_rgba(212,175,55,0.7)]"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-red-600 flex items-center justify-center text-4xl shadow-[0_0_30px_#ffd700] mb-4">
                👑
              </div>

              <h3 className="text-2xl sm:text-4xl font-sports text-white mb-2 tracking-wide">
                CONGRATULATIONS, PLAYER ROSHAN!
              </h3>

              <div className="text-lg sm:text-2xl font-sports text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_20px_#ffd700] mb-6">
                YOU HAVE UNLOCKED YOUR ULTIMATE BIRTHDAY SURPRISE!
              </div>

              <p className="text-neutral-300 text-sm sm:text-base mb-8">
                All challenges and the football arena have been conquered. Now, step forward into your grand personal birthday celebration!
              </p>

              <button
                onClick={handleProceedToGrandFinale}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-sports text-lg uppercase bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white shadow-[0_0_30px_rgba(200,16,46,0.8)] hover:scale-105 active:scale-95 transition-transform border border-amber-300"
              >
                <span>ENTER GRAND CELEBRATION 🎉</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
