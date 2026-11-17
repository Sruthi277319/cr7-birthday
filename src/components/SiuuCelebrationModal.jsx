import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSiuuSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import cr7Photo from '../assets/cr7_siuu.jpg';

export default function SiuuCelebrationModal({ 
  isOpen, 
  onClose, 
  sfxEnabled, 
  title = "SIUUUUUUUUUU! 🐐", 
  subtitle = "PLAYER ROSHAN • THE GOAT CELEBRATION" 
}) {
  // Animation phases:
  // 'intro' (0 - 650ms): Dark stadium, spotlight sweeps, image rises into view
  // 'jump' (650 - 1350ms): Camera zooms back, slow motion leap effect
  // 'landed' (1350ms+): Impact slam, screen shake, SIUUUU audio roar, golden fireworks explosion!
  const [phase, setPhase] = useState('intro');
  const [impactShake, setImpactShake] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPhase('intro');
      setImpactShake(false);
      return;
    }

    setPhase('intro');
    setImpactShake(false);

    // 1. Intro -> Jump
    const jumpTimer = setTimeout(() => {
      setPhase('jump');
    }, 650);

    // 2. Landing Moment (Synchronized audio & impact)
    const landTimer = setTimeout(() => {
      setPhase('landed');
      setImpactShake(true);

      if (sfxEnabled) {
        playSiuuSound();
      }

      // Crimson & Champagne Gold Stadium Fireworks
      confetti({
        particleCount: 150,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#c8102e', '#ffd700', '#ffffff', '#e60000', '#f5d77f', '#b00b22']
      });
    }, 1350);

    // 3. Auto-close after celebration sequence
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 4200);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(landTimer);
      clearTimeout(closeTimer);
    };
  }, [isOpen, sfxEnabled, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-hidden">
        
        {/* Stadium Floodlight Flare & Ambient Beams */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            phase === 'landed' ? 'opacity-95' : 'opacity-40'
          }`}
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-red-700/25 rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-400/20 rounded-full blur-[130px]" />
          
          {/* Spotlight Beams */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        </div>

        {/* Screen Impact Container with camera shake on landing */}
        <div className={`relative flex flex-col items-center justify-center max-w-2xl w-full text-center ${impactShake ? 'animate-siuu-impact' : ''}`}>
          
          {/* Primary Visual: Uploaded Cristiano Ronaldo SIUU Photo with cinematic motion */}
          <div className="relative w-full max-w-lg aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center my-2 rounded-3xl overflow-hidden border-2 border-red-600/70 shadow-[0_0_50px_rgba(200,16,46,0.5)] bg-neutral-950">
            
            {/* The Actual Uploaded Image Asset */}
            <motion.img
              src={cr7Photo}
              alt="Cristiano Ronaldo SIUU Celebration"
              initial={{ scale: 1.15, filter: 'brightness(0.7) contrast(1.1)' }}
              animate={
                phase === 'intro'
                  ? { scale: 1.05, y: 10, filter: 'brightness(0.85) contrast(1.15)' }
                  : phase === 'jump'
                  ? { scale: 1.22, y: -15, filter: 'brightness(1.1) contrast(1.2)' }
                  : { scale: 1.0, y: 0, filter: 'brightness(1.25) contrast(1.25)' }
              }
              transition={
                phase === 'intro'
                  ? { duration: 0.65 }
                  : phase === 'jump'
                  ? { duration: 0.7, ease: 'easeInOut' }
                  : { type: 'spring', damping: 12, stiffness: 140 }
              }
              className="w-full h-full object-cover object-center select-none"
            />

            {/* Cinematic Red & Gold Vignette Frame */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/50" />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-amber-400/40 rounded-3xl" />

            {/* Stadium Floodlight Flash on Landing */}
            {phase === 'landed' && (
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white pointer-events-none"
              />
            )}

            {/* Floating Live Badge */}
            <div className="absolute top-3 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-amber-400/60 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-[11px] font-sports text-amber-300 uppercase tracking-wider">
                CR7 SIGNATURE SIUU
              </span>
            </div>

            {/* Player Roshan Ribbon */}
            <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/70 text-xs font-tech text-white">
              DEDICATED TO <span className="font-bold text-amber-400">ROSHAN</span>
            </div>
          </div>

          {/* Huge Glowing SIUUUU Banner on Landing */}
          {phase === 'landed' && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 30 }}
              animate={{ scale: 1.08, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 120 }}
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

          {/* Quick Skip button */}
          <button
            onClick={onClose}
            className="mt-6 text-xs text-neutral-400 hover:text-white uppercase font-sports tracking-wider px-5 py-2 rounded-full bg-neutral-900/90 border border-neutral-700 transition-colors"
          >
            TAP TO CONTINUE ➜
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
