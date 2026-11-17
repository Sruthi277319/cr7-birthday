import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StadiumBackground from './components/StadiumBackground';
import AudioControls from './components/AudioControls';
import ProgressHUD from './components/ProgressHUD';
import OpeningScreen from './components/OpeningScreen';
import Level1Beginning from './components/Level1Beginning';
import Level2Challenge from './components/Level2Challenge';
import Level3RoadToGreatness from './components/Level3RoadToGreatness';
import Level4LockerRoom from './components/Level4LockerRoom';
import GrandFinale from './components/GrandFinale';

export default function App() {
  // Current active screen: 0 (Opening), 1 (Level 1), 2 (Level 2), 3 (Level 3), 4 (Level 4), 5 (Grand Finale)
  const [currentStage, setCurrentStage] = useState(0);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  // Level Completion Handlers
  const handleCompleteLevel = (levelNum) => {
    if (levelNum >= maxUnlockedLevel && levelNum < 4) {
      setMaxUnlockedLevel(levelNum + 1);
    }
  };

  const handleNextLevel = (nextLevelNum) => {
    setCurrentStage(nextLevelNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (levelNum) => {
    if (levelNum <= maxUnlockedLevel) {
      setCurrentStage(levelNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartAdventure = () => {
    setCurrentStage(0);
    setMaxUnlockedLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050508] text-white overflow-x-hidden">
      {/* Stadium Environment Background */}
      <StadiumBackground 
        lightsOn={currentStage > 0} 
        showPitch={currentStage < 4}
      />

      {/* Floating Audio Controls (Music & SFX) */}
      <AudioControls 
        sfxEnabled={sfxEnabled} 
        setSfxEnabled={setSfxEnabled} 
      />

      {/* Persistent Progress HUD Header (Shown once inside the adventure, levels 1 to 4) */}
      {currentStage >= 1 && currentStage <= 4 && (
        <ProgressHUD
          currentLevel={currentStage}
          maxUnlockedLevel={maxUnlockedLevel}
          onSelectLevel={handleSelectLevel}
        />
      )}

      {/* Active Screen Transition */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentStage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
            >
              <OpeningScreen
                onEnterAdventure={() => handleNextLevel(1)}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}

          {currentStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Level1Beginning
                onCompleteLevel={handleCompleteLevel}
                isCompleted={maxUnlockedLevel > 1}
                onNextLevel={handleNextLevel}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}

          {currentStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Level2Challenge
                onCompleteLevel={handleCompleteLevel}
                isCompleted={maxUnlockedLevel > 2}
                onNextLevel={handleNextLevel}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}

          {currentStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Level3RoadToGreatness
                onCompleteLevel={handleCompleteLevel}
                isCompleted={maxUnlockedLevel > 3}
                onNextLevel={handleNextLevel}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}

          {currentStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Level4LockerRoom
                onUnlockSurprise={() => handleNextLevel(5)}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}

          {currentStage === 5 && (
            <motion.div
              key="stage-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GrandFinale
                onRestartAdventure={handleRestartAdventure}
                sfxEnabled={sfxEnabled}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
