import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StadiumBackground from './components/StadiumBackground';
import AudioControls from './components/AudioControls';
import ProgressHUD from './components/ProgressHUD';
import SecretLogin from './components/SecretLogin';
import RoseBloom from './components/RoseBloom';
import OpeningScreen from './components/OpeningScreen';
import Level1Quiz from './components/Level1Quiz';
import Level2RoadToGreatness from './components/Level2RoadToGreatness';
import Level3FootballArena from './components/Level3FootballArena';
import Level4LockerRoom from './components/Level4LockerRoom';
import GrandFinale from './components/GrandFinale';
import SiuuCelebrationModal from './components/SiuuCelebrationModal';
import { setBgmMode } from './utils/audio';

export default function App() {
  // App Overall Phase: 'login' -> 'rose' -> 'adventure'
  const [appPhase, setAppPhase] = useState(() => {
    return sessionStorage.getItem('roshan_auth_unlocked') === 'true' ? 'adventure' : 'login';
  });

  // Current active screen in adventure:
  // 0: Opening Screen (PLAYER ROSHAN)
  // 1: Level 1 (CR7 Fan Challenge)
  // 2: Level 2 (Road to Greatness)
  // 3: Level 3 (Champion's Football Arena)
  // 4: Level 4 (Secret VIP Locker Room)
  // 5: Grand Finale (Happiest Birthday Roshan)
  const [currentStage, setCurrentStage] = useState(0);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  // Global SIUU Celebration Modal State
  const [siuuModal, setSiuuModal] = useState({
    isOpen: false,
    title: 'SIUUUUUUUU! 🐐',
    subtitle: 'PLAYER ROSHAN • THE GOAT CELEBRATION'
  });

  const triggerSiuu = (title, subtitle) => {
    setSiuuModal({
      isOpen: true,
      title: title || 'SIUUUUUUUU! 🐐',
      subtitle: subtitle || 'PLAYER ROSHAN • THE GOAT CELEBRATION'
    });
  };

  const closeSiuu = () => {
    setSiuuModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Auth unlock callback
  const handleLoginSuccess = () => {
    sessionStorage.setItem('roshan_auth_unlocked', 'true');
    setAppPhase('rose');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Rose finish callback
  const handleProceedToAdventure = () => {
    setAppPhase('adventure');
    setCurrentStage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level Completion Handlers
  const handleCompleteLevel = (levelNum) => {
    if (levelNum >= maxUnlockedLevel && levelNum < 4) {
      setMaxUnlockedLevel(levelNum + 1);
    }
  };

  const handleNextLevel = (nextLevelNum) => {
    setCurrentStage(nextLevelNum);
    if (nextLevelNum === 5) {
      setBgmMode('emotional');
    } else {
      setBgmMode('stadium');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (levelNum) => {
    if (levelNum <= maxUnlockedLevel) {
      setCurrentStage(levelNum);
      if (levelNum === 5) {
        setBgmMode('emotional');
      } else {
        setBgmMode('stadium');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartAdventure = () => {
    setCurrentStage(0);
    setMaxUnlockedLevel(1);
    setBgmMode('stadium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06070a] text-white overflow-x-hidden selection:bg-red-700 selection:text-white">
      
      {/* 1. SECRET LOGIN SCREEN */}
      {appPhase === 'login' && (
        <SecretLogin 
          onUnlockSuccess={handleLoginSuccess}
          sfxEnabled={sfxEnabled}
        />
      )}

      {/* 2. ROSE BLOOMING SCREEN */}
      {appPhase === 'rose' && (
        <RoseBloom 
          onProceedToAdventure={handleProceedToAdventure}
          sfxEnabled={sfxEnabled}
        />
      )}

      {/* 3. CR7 FOOTBALL ADVENTURE (PLAYER ROSHAN) */}
      {appPhase === 'adventure' && (
        <>
          {/* Stadium Environment Background */}
          <StadiumBackground 
            lightsOn={currentStage > 0} 
            showPitch={currentStage < 4}
          />

          {/* Floating Audio Controls (Music, Volume & SFX) */}
          <AudioControls 
            sfxEnabled={sfxEnabled} 
            setSfxEnabled={setSfxEnabled} 
          />

          {/* Persistent Progress HUD Header (Levels 1 to 4) */}
          {currentStage >= 1 && currentStage <= 4 && (
            <ProgressHUD
              currentLevel={currentStage}
              maxUnlockedLevel={maxUnlockedLevel}
              onSelectLevel={handleSelectLevel}
            />
          )}

          {/* Global SIUU Celebration Modal */}
          <SiuuCelebrationModal
            isOpen={siuuModal.isOpen}
            onClose={closeSiuu}
            sfxEnabled={sfxEnabled}
            title={siuuModal.title}
            subtitle={siuuModal.subtitle}
          />

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
                  <Level1Quiz
                    onCompleteLevel={handleCompleteLevel}
                    isCompleted={maxUnlockedLevel > 1}
                    onNextLevel={handleNextLevel}
                    sfxEnabled={sfxEnabled}
                    triggerSiuu={triggerSiuu}
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
                  <Level2RoadToGreatness
                    onCompleteLevel={handleCompleteLevel}
                    isCompleted={maxUnlockedLevel > 2}
                    onNextLevel={handleNextLevel}
                    sfxEnabled={sfxEnabled}
                    triggerSiuu={triggerSiuu}
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
                  <Level3FootballArena
                    onCompleteLevel={handleCompleteLevel}
                    isCompleted={maxUnlockedLevel > 3}
                    onNextLevel={handleNextLevel}
                    sfxEnabled={sfxEnabled}
                    triggerSiuu={triggerSiuu}
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
                    triggerSiuu={triggerSiuu}
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
                    triggerSiuu={triggerSiuu}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
