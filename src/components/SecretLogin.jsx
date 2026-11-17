import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import { playSuccessChime, playWrongBuzz } from '../utils/audio';

// Import all 7 uploaded photos
import img1 from '../assets/roshan/roshan_1.jpg';
import img2 from '../assets/roshan/roshan_2.jpg';
import img3 from '../assets/roshan/roshan_3.jpg';
import img4 from '../assets/roshan/roshan_4.jpg';
import img5 from '../assets/roshan/roshan_5.jpg';
import img6 from '../assets/roshan/roshan_6.jpg';
import img7 from '../assets/cr7_siuu.jpg';

const ALL_PHOTOS = [img1, img2, img3, img4, img5, img6, img7];

export default function SecretLogin({ onUnlockSuccess, sfxEnabled }) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Column 1, 2, 3 photo lists for moving photo collage
  const col1 = [img1, img2, img3, img4, img1, img2];
  const col2 = [img5, img6, img7, img1, img5, img6];
  const col3 = [img3, img4, img5, img2, img3, img7];

  const handleUnlock = (e) => {
    if (e) e.preventDefault();

    if (passcode.trim() === '1811') {
      setIsUnlocked(true);
      setErrorMessage('');
      if (sfxEnabled) playSuccessChime();
      setTimeout(() => {
        onUnlockSuccess();
      }, 1100);
    } else {
      setErrorMessage("Oops! That's not the right code. Try again ❤️");
      if (sfxEnabled) playWrongBuzz();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07080c] text-white">
      
      {/* CONTINUOUSLY MOVING PHOTO WALL / MEMORY GRID BEHIND LOGIN - PROMINENT & VIBRANT */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-90 select-none pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full h-[220%] -translate-y-12">
          
          {/* Column 1 - Moving Up */}
          <motion.div
            animate={{ y: [0, -400] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {col1.map((photo, i) => (
              <div key={`c1-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-amber-400/25 shadow-2xl bg-neutral-900/60">
                <img 
                  src={photo} 
                  alt="" 
                  className="w-full h-full object-cover object-center filter brightness-[1.06] contrast-[1.08] saturate-[1.06]" 
                />
              </div>
            ))}
          </motion.div>

          {/* Column 2 - Moving Down */}
          <motion.div
            animate={{ y: [-400, 0] }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
            className="flex flex-col gap-3 md:gap-5"
          >
            {col2.map((photo, i) => (
              <div key={`c2-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-amber-400/25 shadow-2xl bg-neutral-900/60">
                <img 
                  src={photo} 
                  alt="" 
                  className="w-full h-full object-cover object-center filter brightness-[1.06] contrast-[1.08] saturate-[1.06]" 
                />
              </div>
            ))}
          </motion.div>

          {/* Column 3 - Moving Up */}
          <motion.div
            animate={{ y: [0, -450] }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
            className="hidden md:flex flex-col gap-5"
          >
            {col3.map((photo, i) => (
              <div key={`c3-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-amber-400/25 shadow-2xl bg-neutral-900/60">
                <img 
                  src={photo} 
                  alt="" 
                  className="w-full h-full object-cover object-center filter brightness-[1.06] contrast-[1.08] saturate-[1.06]" 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle Vignette Overlay - Significantly Reduced to make Photos the Main Attraction */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/25 pointer-events-none z-0" />

      {/* Soft Center Shadow to separate the Password Popup from the background photos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-black/65 blur-[85px] pointer-events-none z-0" />

      {/* Radial Champagne & Crimson Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-900/20 blur-[130px] pointer-events-none z-0" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none z-0" />

      {/* CENTERED GLASSMORPHIC LOGIN CARD - DARK, ELEGANT & HIGH CONTRAST */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md mx-4 p-7 sm:p-9 rounded-3xl bg-[#0c0d12]/95 backdrop-blur-2xl border-2 border-amber-400/60 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.35),0_25px_60px_rgba(0,0,0,0.9)] text-center"
      >
        {/* Lock Icon Badge */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 p-[2px] shadow-[0_0_20px_rgba(200,16,46,0.5)]">
          <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center">
            {isUnlocked ? (
              <Unlock className="w-7 h-7 text-amber-300 animate-bounce" />
            ) : (
              <Lock className="w-7 h-7 text-amber-300" />
            )}
          </div>
        </div>

        {/* Header Titles */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-[11px] font-tech uppercase tracking-widest mb-2">
          <Sparkles className="w-3 h-3 text-amber-400" />
          CONFIDENTIAL • ROSHAN'S VAULT
        </div>

        <h1 className="text-2xl sm:text-3xl font-sports text-white tracking-wide uppercase mb-2">
          ENTER THE PASSCODE
        </h1>

        <p className="text-xs sm:text-sm text-neutral-300 mb-6 font-medium">
          A special surprise awaits. Enter your secret passcode to begin! ❤️
        </p>

        {/* Password Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              maxLength={10}
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full py-3.5 px-4 pr-12 rounded-xl bg-black/70 border border-neutral-700 focus:border-amber-400 text-center text-lg font-tech tracking-widest text-white placeholder-neutral-500 outline-none transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-semibold text-red-400 bg-red-950/50 py-1.5 px-3 rounded-lg border border-red-800/60"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-sports text-sm sm:text-base uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_25px_rgba(200,16,46,0.6)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-amber-300 flex items-center justify-center gap-2"
          >
            <span>UNLOCK THE SURPRISE 🔐</span>
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-[10px] text-neutral-500 font-tech uppercase tracking-wider">
          ROSHAN'S BIRTHDAY EXPEDITION • PRIVATE ACCESS
        </div>
      </motion.div>
    </div>
  );
}
