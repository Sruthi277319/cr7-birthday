import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREER_TIMELINE } from '../data/adventureData';
import { Trophy, Star, ArrowRight, ShieldCheck, Award, Flame, Quote } from 'lucide-react';
import { playSuccessChime, playFanfare, playKickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Level1Beginning({ onCompleteLevel, isCompleted, onNextLevel, sfxEnabled }) {
  const [activeClubIndex, setActiveClubIndex] = useState(0);
  const [completedNotification, setCompletedNotification] = useState(false);

  const activeClub = CAREER_TIMELINE[activeClubIndex];

  const handleComplete = () => {
    if (sfxEnabled) {
      playSuccessChime();
      playFanfare();
    }
    // Launch celebratory golden & red confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e60000', '#ffd700', '#ffffff', '#ff6b6b']
    });

    setCompletedNotification(true);
    onCompleteLevel(1);

    setTimeout(() => {
      onNextLevel(2);
    }, 1800);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full py-8 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Level Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-sports uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(230,0,0,0.4)]"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        LEVEL 1 OF 4 • CAREER MILESTONES
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-sports text-center tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-500 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] mb-3"
      >
        FROM DREAMS TO GREATNESS
      </motion.h2>

      <p className="text-neutral-400 text-sm sm:text-base text-center max-w-2xl mb-8">
        Follow the legendary steps of Cristiano Ronaldo. From a humble kid in Madeira to the greatest goalscorer in football history.
      </p>

      {/* Interactive Timeline Tabs */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {CAREER_TIMELINE.map((item, idx) => {
          const isActive = idx === activeClubIndex;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (sfxEnabled) playKickSound();
                setActiveClubIndex(idx);
              }}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sports transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white border-amber-300 shadow-[0_0_20px_rgba(230,0,0,0.6)] scale-105'
                  : 'bg-neutral-900/90 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black bg-black/40 border border-white/20">
                {idx + 1}
              </span>
              <span>{item.club}</span>
            </button>
          );
        })}
      </div>

      {/* Active Club Card (High Polish Sports Magazine / FUT Card Style) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeClub.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-4xl rounded-2xl bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Club Glow behind card */}
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none"
            style={{ backgroundColor: activeClub.accentColor }}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Club Crest & Role Visual Column */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 relative">
              {/* Badge Visual Box */}
              <div 
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${activeClub.badgeColor} border-2 border-amber-400/80 flex flex-col items-center justify-center shadow-lg relative my-2 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-30" />
                <span className="text-xs font-tech font-bold text-amber-300 tracking-wider">CR7</span>
                <span className="text-xl font-sports font-black text-white tracking-widest">{activeClub.badgeText}</span>
                <span className="text-[10px] text-amber-200 uppercase font-semibold">CLUB LEGEND</span>
              </div>

              <div className="text-xs font-tech tracking-wider text-amber-400 mt-2 font-bold">
                {activeClub.period}
              </div>
              <h3 className="text-xl font-sports text-white mt-1">
                {activeClub.club}
              </h3>
              <div className="text-xs text-neutral-400 font-medium italic mt-1">
                "{activeClub.role}"
              </div>
            </div>

            {/* Description & Stats Column */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  CHAPTER {activeClubIndex + 1} OF 7
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-4">
                  {activeClub.description}
                </p>

                {/* Key Honors & Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Matches</div>
                    <div className="text-base sm:text-lg font-tech font-bold text-white">{activeClub.stats.matches}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Goals Scored</div>
                    <div className="text-base sm:text-lg font-tech font-bold text-red-500">{activeClub.stats.goals}</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Honors</div>
                    <div className="text-xs font-bold text-amber-400 truncate">{activeClub.stats.honors}</div>
                  </div>
                </div>

                {/* Iconic Quote */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-neutral-300 text-xs sm:text-sm italic">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{activeClub.quote}</span>
                </div>
              </div>

              {/* Next Chapter Quick Button */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-neutral-800">
                <button
                  disabled={activeClubIndex === 0}
                  onClick={() => {
                    if (sfxEnabled) playKickSound();
                    setActiveClubIndex(activeClubIndex - 1);
                  }}
                  className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous Era
                </button>
                <button
                  disabled={activeClubIndex === CAREER_TIMELINE.length - 1}
                  onClick={() => {
                    if (sfxEnabled) playKickSound();
                    setActiveClubIndex(activeClubIndex + 1);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next Era →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Required Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="my-8 max-w-2xl w-full p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-black to-neutral-950 border-2 border-red-600/50 text-center shadow-[0_0_30px_rgba(230,0,0,0.3)]"
      >
        <div className="text-amber-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
          <Award className="w-4 h-4" />
          THE CHAMPION'S CODE
        </div>
        <p className="text-base sm:text-xl font-sports text-white leading-relaxed tracking-wide">
          "Greatness is not achieved overnight. It takes passion, discipline, confidence, and the courage to never give up."
        </p>
      </motion.div>

      {/* Required Level Complete Button or Status */}
      <div className="mt-2 text-center">
        {completedNotification ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-sports text-xl tracking-wider shadow-[0_0_35px_rgba(255,215,0,0.8)] border-2 border-white"
          >
            <Trophy className="w-6 h-6 text-black animate-bounce" />
            LEVEL 1 COMPLETED! 🏆
          </motion.div>
        ) : (
          <button
            onClick={handleComplete}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-sports text-base sm:text-lg uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-500 to-amber-500 shadow-[0_0_25px_rgba(230,0,0,0.6)] hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300"
          >
            <span>COMPLETE LEVEL 1</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
