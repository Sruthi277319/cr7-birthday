import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTIVATIONAL_WORDS } from '../data/adventureData';
import { Trophy, Target, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { playKickSound, playGoalRoar, playFanfare, playSuccessChime, playSiuuSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Level3RoadToGreatness({ onCompleteLevel, isCompleted, onNextLevel, sfxEnabled }) {
  const [shotState, setShotState] = useState('idle'); // 'idle' | 'shooting' | 'scored'
  const [targetCorner, setTargetCorner] = useState('top-right'); // 'top-left' | 'top-right' | 'bottom-left'
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [claimedVictory, setClaimedVictory] = useState(false);

  // Shoot the ball towards the goal
  const handleShoot = (corner) => {
    if (shotState === 'shooting') return;
    setTargetCorner(corner);
    setShotState('shooting');

    if (sfxEnabled) playKickSound();

    setTimeout(() => {
      setShotState('scored');
      if (sfxEnabled) {
        playGoalRoar();
        playSiuuSound();
      }

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#e60000', '#ffd700', '#ffffff']
      });
    }, 700);
  };

  // Animate motivational words sequentially once scored
  useEffect(() => {
    if (shotState === 'scored') {
      const interval = setInterval(() => {
        setActiveWordIdx((prev) => (prev < MOTIVATIONAL_WORDS.length - 1 ? prev + 1 : prev));
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [shotState]);

  const handleClaimVictory = () => {
    if (sfxEnabled) {
      playSuccessChime();
      playFanfare();
    }

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#e60000', '#ffffff', '#ffaa00']
    });

    setClaimedVictory(true);
    onCompleteLevel(3);

    setTimeout(() => {
      onNextLevel(4);
    }, 2000);
  };

  // Ball trajectory coordinates based on target
  const getBallTargetCoords = () => {
    if (targetCorner === 'top-left') return { x: -140, y: -130, scale: 0.4, rotate: 720 };
    if (targetCorner === 'bottom-left') return { x: -120, y: -30, scale: 0.5, rotate: 540 };
    return { x: 140, y: -130, scale: 0.4, rotate: 720 }; // top-right default
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Level Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-sports uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(230,0,0,0.4)]"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        LEVEL 3 OF 4 • STADIUM SHOOTOUT
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-sports text-center tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-red-500 drop-shadow-[0_0_30px_rgba(230,0,0,0.7)] mb-2"
      >
        NOTHING IS IMPOSSIBLE
      </motion.h2>

      <p className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-6">
        Step up to the penalty spot, Player 007. Pick your corner and blast the ball into the top corner like CR7!
      </p>

      {/* Interactive Stadium Goal Experience */}
      <div className="relative w-full max-w-2xl h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-2 border-red-900/60 overflow-hidden shadow-[0_0_40px_rgba(230,0,0,0.3)] flex flex-col items-center justify-between p-4 mb-8">
        {/* Stadium Floodlight Pulses */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-red-600/10 via-amber-400/5 to-transparent pointer-events-none" />

        {/* Goal Post Frame SVG */}
        <div className="relative w-full max-w-lg h-44 sm:h-52 mt-2">
          {/* Goal Netting Pattern */}
          <div 
            className="absolute inset-0 border-4 border-white/80 rounded-t-lg"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          />

          {/* Goal Crossbar & Posts Glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-white shadow-[0_0_15px_#fff]" />
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-white shadow-[0_0_15px_#fff]" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-white shadow-[0_0_15px_#fff]" />

          {/* Target Hotspots */}
          {shotState === 'idle' && (
            <>
              {/* Top Left Target */}
              <button
                onClick={() => handleShoot('top-left')}
                className="absolute top-4 left-6 group p-2 rounded-full bg-red-600/40 hover:bg-red-600 border border-amber-300 text-white animate-pulse"
                title="Shoot Top-Left Bins"
              >
                <Target className="w-6 h-6 text-amber-300 group-hover:scale-125 transition-transform" />
                <span className="sr-only">Top Left</span>
              </button>

              {/* Top Right Target */}
              <button
                onClick={() => handleShoot('top-right')}
                className="absolute top-4 right-6 group p-2 rounded-full bg-red-600/40 hover:bg-red-600 border border-amber-300 text-white animate-pulse"
                title="Shoot Top-Right Bins"
              >
                <Target className="w-6 h-6 text-amber-300 group-hover:scale-125 transition-transform" />
                <span className="sr-only">Top Right</span>
              </button>

              {/* Bottom Left Target */}
              <button
                onClick={() => handleShoot('bottom-left')}
                className="absolute bottom-4 left-8 group p-2 rounded-full bg-red-600/40 hover:bg-red-600 border border-amber-300 text-white animate-pulse"
                title="Low Driven Rocket"
              >
                <Target className="w-5 h-5 text-amber-300 group-hover:scale-125 transition-transform" />
                <span className="sr-only">Bottom Left</span>
              </button>
            </>
          )}

          {/* Scored Goal Fireworks & Banner */}
          {shotState === 'scored' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs"
            >
              <div className="text-3xl sm:text-5xl font-sports font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400 drop-shadow-[0_0_25px_#e60000] animate-bounce">
                GOAAALLL! ⚽💥
              </div>
              <div className="text-sm font-sports text-amber-400 tracking-wider">
                SIUUUUUU! TOP BINS BY PLAYER 007!
              </div>
            </motion.div>
          )}
        </div>

        {/* Penalty Spot & Interactive Ball */}
        <div className="relative w-full flex items-center justify-center pb-2">
          {/* White Penalty Spot */}
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#fff]" />

          {/* The Football */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={
              shotState === 'idle'
                ? { y: [0, -3, 0] }
                : shotState === 'shooting' || shotState === 'scored'
                ? getBallTargetCoords()
                : {}
            }
            transition={
              shotState === 'idle'
                ? { repeat: Infinity, duration: 1.5 }
                : { duration: 0.65, ease: 'easeOut' }
            }
            onClick={() => shotState === 'idle' && handleShoot('top-right')}
            className={`absolute bottom-3 cursor-pointer group ${shotState === 'idle' ? 'hover:scale-110' : ''}`}
            title="Click to Shoot!"
          >
            <div className="w-12 h-12 rounded-full bg-white border-2 border-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_35px_#e60000] flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,28 69,42 62,65 38,65 31,42" fill="#111" />
                <line x1="50" y1="28" x2="50" y2="10" stroke="#111" strokeWidth="4" />
                <line x1="69" y1="42" x2="88" y2="35" stroke="#111" strokeWidth="4" />
                <line x1="62" y1="65" x2="75" y2="85" stroke="#111" strokeWidth="4" />
                <line x1="38" y1="65" x2="25" y2="85" stroke="#111" strokeWidth="4" />
                <line x1="31" y1="42" x2="12" y2="35" stroke="#111" strokeWidth="4" />
              </svg>
            </div>
            {shotState === 'idle' && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-sports text-amber-300 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-amber-400">
                TAP TO STRIKE! ⚽
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sequential Animated Motivational Words */}
      <div className="w-full max-w-xl my-4 text-center">
        <div className="text-xs font-tech text-red-500 font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          CR7 MINDSET PROTOCOL
        </div>

        {/* Word Display Stream */}
        <div className="min-h-[110px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWordIdx}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-4xl sm:text-6xl font-black font-sports tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-red-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">
                {MOTIVATIONAL_WORDS[activeWordIdx].word}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base font-medium mt-2">
                {MOTIVATIONAL_WORDS[activeWordIdx].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators for the 5 words */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {MOTIVATIONAL_WORDS.map((item, idx) => (
            <button
              key={item.word}
              onClick={() => setActiveWordIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeWordIdx
                  ? 'w-8 bg-amber-400 shadow-[0_0_10px_#ffd700]'
                  : 'w-2 bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Claim Victory Button & Level 3 Completed */}
      <div className="mt-6 text-center">
        {claimedVictory ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-sports text-xl tracking-wider shadow-[0_0_40px_rgba(255,215,0,0.9)] border-2 border-white"
          >
            <Trophy className="w-6 h-6 text-black animate-bounce" />
            LEVEL 3 COMPLETED! CHAMPION! 🏆
          </motion.div>
        ) : (
          <button
            onClick={handleClaimVictory}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full font-sports text-lg sm:text-xl uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_30px_rgba(230,0,0,0.7)] hover:shadow-[0_0_45px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300"
          >
            <span>CLAIM YOUR VICTORY</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-180 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
