import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sliders } from 'lucide-react';
import { 
  toggleBackgroundMusic, 
  isMusicPlaying, 
  setMasterVolume, 
  getMasterVolume, 
  setSfxMuted, 
  isAudioSfxMuted 
} from '../utils/audio';

export default function AudioControls({ sfxEnabled, setSfxEnabled }) {
  const [isPlayingBgm, setIsPlayingBgm] = useState(isMusicPlaying());
  const [volume, setVolumeState] = useState(getMasterVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleToggleBgm = () => {
    const newState = toggleBackgroundMusic((active) => {
      setIsPlayingBgm(active);
    });
    setIsPlayingBgm(newState);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolumeState(newVol);
    setMasterVolume(newVol);
  };

  const handleToggleSfx = () => {
    const nextState = !sfxEnabled;
    setSfxEnabled(nextState);
    setSfxMuted(!nextState);
  };

  return (
    <div className="fixed top-3 right-3 md:top-5 md:right-6 z-50 flex items-center gap-2">
      {/* Volume Slider Dropdown / Pill */}
      {showVolumeSlider && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/90 border border-neutral-700/80 backdrop-blur-md shadow-lg animate-in fade-in zoom-in-95 duration-200">
          <span className="text-[10px] font-tech text-neutral-400">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <span className="text-[10px] font-tech text-amber-400 font-bold w-6 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}

      {/* Volume Slider Toggle Button */}
      <button
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        className="p-2 rounded-full text-xs font-bold transition-all backdrop-blur-md border bg-black/60 border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500"
        title="Volume Adjust"
      >
        <Sliders className="w-3.5 h-3.5" />
      </button>

      {/* Background Stadium Music Button */}
      <button
        onClick={handleToggleBgm}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all backdrop-blur-md border ${
          isPlayingBgm
            ? 'bg-red-700/80 border-red-500 text-white shadow-[0_0_15px_rgba(200,16,46,0.6)] animate-pulse'
            : 'bg-black/70 border-neutral-700/80 text-neutral-300 hover:border-red-500/50 hover:text-white'
        }`}
        title={isPlayingBgm ? 'Pause Stadium Music' : 'Start Stadium Music'}
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
        onClick={handleToggleSfx}
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
