import React from 'react';
import { Shield, Trophy, CheckCircle, Lock } from 'lucide-react';

export default function ProgressHUD({ currentLevel, maxUnlockedLevel, onSelectLevel }) {
  const levels = [
    { num: 1, name: 'CR7 QUIZ', label: 'LEVEL 1' },
    { num: 2, name: 'ROAD TO GREATNESS', label: 'LEVEL 2' },
    { num: 3, name: 'FOOTBALL GAME', label: 'LEVEL 3' },
    { num: 4, name: 'SECRET GIFT', label: 'LEVEL 4' },
    { num: 5, name: 'BIRTHDAY CAKE', label: 'FINALE 🎂' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08090d]/85 border-b border-red-900/30 px-3 py-2.5 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Player Badge: PLAYER ROSHAN */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 border border-amber-400 shadow-[0_0_12px_rgba(200,16,46,0.5)]">
            <Shield className="w-5 h-5 text-white" />
            <span className="absolute text-[8px] font-black font-tech text-white">#7</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black font-tech tracking-wider text-red-500">PLAYER ROSHAN</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                GOAT STATUS 🐐
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 tracking-tight hidden sm:block">
              CR7 BIRTHDAY ADVENTURE MISSION
            </div>
          </div>
        </div>

        {/* Level Trackers: Level 1, 2, 3, 4 */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full py-1">
          {levels.map((lvl) => {
            const isCompleted = maxUnlockedLevel > lvl.num || currentLevel > lvl.num;
            const isCurrent = currentLevel === lvl.num;
            const isUnlocked = lvl.num <= maxUnlockedLevel || lvl.num === 5;

            return (
              <button
                key={lvl.num}
                disabled={!isUnlocked}
                onClick={() => onSelectLevel(lvl.num)}
                className={`group flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-md text-xs font-sports transition-all border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-[0_0_15px_rgba(200,16,46,0.6)] border-red-400'
                    : isCompleted
                    ? 'bg-neutral-900/90 text-amber-400 border border-amber-500/30 hover:bg-neutral-800'
                    : isUnlocked
                    ? 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-neutral-500'
                    : 'bg-neutral-950/60 text-neutral-600 border border-neutral-800/60 cursor-not-allowed opacity-50'
                }`}
                title={isUnlocked ? `Go to ${lvl.label}` : 'Locked level'}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                ) : isUnlocked ? (
                  <Trophy className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-300' : 'text-neutral-400'}`} />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                )}
                <span className="whitespace-nowrap">{lvl.label}</span>
                <span className="hidden md:inline text-[10px] opacity-75 font-normal font-sans">
                  • {lvl.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-neutral-900 mt-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 transition-all duration-700 shadow-[0_0_10px_#c8102e]"
          style={{ width: `${Math.min(100, (maxUnlockedLevel / 4) * 100)}%` }}
        />
      </div>
    </header>
  );
}
