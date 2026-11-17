import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { toggleBackgroundMusic, isMusicPlaying } from '../utils/audio';

export default function AudioControls({ sfxEnabled, setSfxEnabled }) {
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);

  const handleToggleBgm = () => {
    const newState = toggleBackgroundMusic((active) => {
      setIsPlayingBgm(active);
    });
    setIsPlayingBgm(newState);
  };

  return (
    <div className="fixed top-3 right-3 md:top-5 md:right-6 z-50 flex items-center gap-2">
      {/* Background Stadium Music Button */}
      <button
        onClick={handleToggleBgm}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all backdrop-blur-md border ${
          isPlayingBgm
            ? 'bg-red-600/80 border-red-500 text-white shadow-[0_0_15px_rgba(230,0,0,0.6)] animate-pulse'
            : 'bg-black/60 border-neutral-700/80 text-neutral-300 hover:border-red-500/50 hover:text-white'
        }`}
        title={isPlayingBgm ? 'Pause Stadium Music' : 'Play Stadium Music'}
      >
        <Music className={`w-3.5 h-3.5 ${isPlayingBgm ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline">
          {isPlayingBgm ? 'STADIUM ANTHEM: ON' : 'STADIUM ANTHEM: OFF'}
        </span>
        {isPlayingBgm && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2/3 bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </button>

      {/* SFX Toggle Button */}
      <button
        onClick={() => setSfxEnabled(!sfxEnabled)}
        className={`p-2 rounded-full text-xs font-bold transition-all backdrop-blur-md border ${
          sfxEnabled
            ? 'bg-neutral-900/80 border-amber-500/60 text-amber-400 hover:bg-neutral-800'
            : 'bg-neutral-950/80 border-neutral-800 text-neutral-500'
        }`}
        title={sfxEnabled ? 'SFX Audio On' : 'SFX Audio Muted'}
      >
        {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
}
