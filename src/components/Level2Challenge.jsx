import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CR7_CHALLENGES } from '../data/adventureData';
import { Trophy, CheckCircle2, XCircle, Sparkles, ArrowRight, RotateCcw, Flame } from 'lucide-react';
import { playSuccessChime, playWrongBuzz, playSiuuSound, playKickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Level2Challenge({ onCompleteLevel, isCompleted, onNextLevel, sfxEnabled }) {
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completedAll, setCompletedAll] = useState(false);

  const challenge = CR7_CHALLENGES[currentChallengeIdx];
  const progressPercent = ((currentChallengeIdx + (isAnswered ? 1 : 0)) / CR7_CHALLENGES.length) * 100;

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = challenge.options[index].isCorrect;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      if (sfxEnabled) playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#e60000', '#ffffff']
      });
    } else {
      if (sfxEnabled) playWrongBuzz();
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CR7_CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      if (sfxEnabled) playKickSound();
    } else {
      // Completed all 3!
      setCompletedAll(true);
      if (sfxEnabled) playSiuuSound();

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#e60000', '#ffffff', '#ff9900']
      });

      onCompleteLevel(2);
      setTimeout(() => {
        onNextLevel(3);
      }, 2500);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentChallengeIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompletedAll(false);
    if (sfxEnabled) playKickSound();
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
      {/* Level Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-sports uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(230,0,0,0.4)]"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        LEVEL 2 OF 4 • CR7 TRIVIA ARENA
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-sports text-center tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-yellow-400 drop-shadow-[0_0_25px_rgba(230,0,0,0.6)] mb-3"
      >
        ARE YOU A TRUE CR7 FAN?
      </motion.h2>

      <p className="text-neutral-400 text-sm sm:text-base text-center max-w-xl mb-6">
        Test your Ronaldo knowledge in these 3 iconic missions. Answer correctly to unlock the champion's next stage!
      </p>

      {/* Score & Progress HUD */}
      <div className="w-full max-w-xl flex items-center justify-between gap-4 mb-4 bg-neutral-900/80 px-4 py-2.5 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sports text-neutral-400">MISSION:</span>
          <span className="text-sm font-tech font-bold text-amber-400">
            {currentChallengeIdx + 1} / {CR7_CHALLENGES.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-sports text-neutral-400">SCORE:</span>
          <span className="text-sm font-tech font-bold text-red-500">
            {score} / {CR7_CHALLENGES.length} GOAT POINTS
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl h-2 bg-neutral-950 rounded-full mb-8 overflow-hidden border border-neutral-800">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-amber-400 shadow-[0_0_10px_#ffd700]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Challenge Card */}
      {!completedAll ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl rounded-2xl bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-red-900/50 p-6 sm:p-8 shadow-2xl relative"
          >
            {/* Challenge Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sports uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500" />
                {challenge.title}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                CR7 TRIVIA
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-sports text-white mb-6 leading-snug">
              {challenge.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {challenge.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-neutral-900/90 text-neutral-200 border-neutral-800 hover:border-red-500/60 hover:bg-neutral-800';

                if (isAnswered) {
                  if (option.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
                  } else if (isSelected && !option.isCorrect) {
                    btnStyle = 'bg-red-950/80 text-red-200 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]';
                  } else {
                    btnStyle = 'bg-neutral-950/40 text-neutral-600 border-neutral-900 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl text-sm sm:text-base font-medium transition-all border flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-xs font-tech font-bold text-amber-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option.text}</span>
                    </div>

                    {isAnswered && (
                      <div>
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Fun Fact Banner after answer */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border mb-6 text-xs sm:text-sm ${
                  challenge.options[selectedOption]?.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-red-950/40 border-red-600/50 text-red-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {challenge.options[selectedOption]?.hint}
                </div>
                <div className="text-neutral-300 text-xs mt-2 border-t border-white/10 pt-2 italic">
                  💡 {challenge.funFact}
                </div>
              </motion.div>
            )}

            {/* Action Button */}
            {isAnswered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <button
                  onClick={handleNextChallenge}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-sports text-sm sm:text-base uppercase bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-[0_0_20px_rgba(230,0,0,0.6)] hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>
                    {currentChallengeIdx < CR7_CHALLENGES.length - 1 ? 'NEXT CHALLENGE' : 'FINISH TRIVIA ARENA 🏆'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Completed Screen for Level 2 */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-xl text-center p-8 rounded-3xl bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-amber-500 shadow-[0_0_50px_rgba(255,215,0,0.5)]"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-red-600 to-amber-400 flex items-center justify-center text-4xl shadow-[0_0_30px_#e60000] mb-4">
            🐐
          </div>

          <h3 className="text-3xl sm:text-4xl font-sports text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_20px_#ffd700] mb-2">
            SIUUUU! CHALLENGE COMPLETED! 🐐
          </h3>

          <p className="text-neutral-300 text-base mb-4">
            You scored <strong className="text-amber-400">{score} of {CR7_CHALLENGES.length}</strong>! Certified CR7 GOAT Knowledge!
          </p>

          <div className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
            UNLOCKING LEVEL 3: THE ROAD TO GREATNESS...
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sports bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              REPLAY TRIVIA
            </button>
            <button
              onClick={() => onNextLevel(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-sports text-sm bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg hover:scale-105"
            >
              PROCEED TO LEVEL 3 →
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
