import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, Pause, RotateCcw, Target, Shield, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { playKickSound, playGoalRoar, playPostHitSound, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Level3FootballArena({ onCompleteLevel, isCompleted, onNextLevel, sfxEnabled, triggerSiuu }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'paused' | 'goal' | 'won'
  const [goalsScored, setGoalsScored] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(75); // 75 seconds countdown
  const [shotFeedback, setShotFeedback] = useState('');

  // Game internal physics refs
  const gameRef = useRef({
    player: { x: 300, y: 350, r: 16, vx: 0, vy: 0, speed: 4.5 },
    ball: { x: 300, y: 310, r: 10, vx: 0, vy: 0, isMoving: false },
    goal: { x: 200, y: 35, width: 200, depth: 30 },
    goalkeeper: { x: 300, y: 65, r: 15, vx: 2.8, minX: 215, maxX: 385 },
    defenders: [
      { x: 220, y: 170, r: 15, vx: 2.2, minX: 160, maxX: 440 },
      { x: 380, y: 240, r: 15, vx: -2.6, minX: 160, maxX: 440 },
    ],
    keys: { up: false, down: false, left: false, right: false },
    animationFrameId: null,
  });

  // Handle Keyboard Inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) gameRef.current.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) gameRef.current.keys.down = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) gameRef.current.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) gameRef.current.keys.right = true;
      if (['Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        shootBall();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) gameRef.current.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) gameRef.current.keys.down = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) gameRef.current.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) gameRef.current.keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Game Timer Countdown
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // If time runs out, reset timer but keep scored goals to be friendly
          return 75;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Main Canvas Rendering & Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateAndDraw = () => {
      const g = gameRef.current;
      const { player, ball, goal, goalkeeper, defenders, keys } = g;

      // 1. UPDATE PHYSICS (only if playing)
      if (gameState === 'playing' || gameState === 'goal') {
        // Player Movement
        if (keys.up && player.y > 100) player.y -= player.speed;
        if (keys.down && player.y < canvas.height - 25) player.y += player.speed;
        if (keys.left && player.x > 35) player.x -= player.speed;
        if (keys.right && player.x < canvas.width - 35) player.x += player.speed;

        // Ball dribble when close to player and not shot
        if (!ball.isMoving) {
          const dx = ball.x - player.x;
          const dy = ball.y - player.y;
          const dist = Math.hypot(dx, dy);

          if (dist < player.r + ball.r + 14) {
            // Keep ball just ahead of player
            ball.x = player.x;
            ball.y = player.y - 24;
          }
        } else {
          // Ball flying towards goal
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.vx *= 0.985;
          ball.vy *= 0.985;

          // Check Goalkeeper Collision
          const gDist = Math.hypot(ball.x - goalkeeper.x, ball.y - goalkeeper.y);
          if (gDist < ball.r + goalkeeper.r) {
            ball.isMoving = false;
            ball.vx = 0;
            ball.vy = 0;
            setShotFeedback('BLOCKED BY GOALKEEPER! Try aiming for the corners!');
            if (sfxEnabled) playPostHitSound();
            resetPositions();
          }

          // Check Defenders Collision
          defenders.forEach((def) => {
            const dDist = Math.hypot(ball.x - def.x, ball.y - def.y);
            if (dDist < ball.r + def.r) {
              ball.isMoving = false;
              ball.vx = 0;
              ball.vy = 0;
              setShotFeedback('INTERCEPTED BY DEFENDER! Dribble past them!');
              if (sfxEnabled) playPostHitSound();
              resetPositions();
            }
          });

          // Check Goalpost Collision (Posts or Crossbar)
          if (ball.y <= goal.y + 15) {
            if (ball.x >= goal.x && ball.x <= goal.x + goal.width) {
              // GOAL SCORED!
              ball.isMoving = false;
              handleGoalScored();
            } else if (
              Math.hypot(ball.x - goal.x, ball.y - goal.y) < 14 ||
              Math.hypot(ball.x - (goal.x + goal.width), ball.y - goal.y) < 14
            ) {
              // Post hit!
              ball.isMoving = false;
              setShotFeedback('CLANG! HIT THE WOODWORK!');
              if (sfxEnabled) playPostHitSound();
              resetPositions();
            } else {
              // Shot missed wide
              ball.isMoving = false;
              setShotFeedback('SHOT WIDE! Keep shooting, Roshan!');
              resetPositions();
            }
          }

          // Boundary out of bounds
          if (ball.x < 10 || ball.x > canvas.width - 10 || ball.y < 10 || ball.y > canvas.height - 10) {
            ball.isMoving = false;
            resetPositions();
          }
        }

        // Goalkeeper AI movement (side to side)
        goalkeeper.x += goalkeeper.vx;
        if (goalkeeper.x <= goalkeeper.minX || goalkeeper.x >= goalkeeper.maxX) {
          goalkeeper.vx *= -1;
        }

        // Defenders AI movement
        defenders.forEach((def) => {
          def.x += def.vx;
          if (def.x <= def.minX || def.x >= def.maxX) {
            def.vx *= -1;
          }
        });
      }

      // 2. DRAWING STADIUM & PITCH
      // Grass background with stripes
      ctx.fillStyle = '#0f381c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < canvas.height; i += 40) {
        if ((i / 40) % 2 === 0) {
          ctx.fillStyle = '#0c2e17';
          ctx.fillRect(0, i, canvas.width, 40);
        }
      }

      // White Pitch Markings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2.5;

      // Outer boundary lines
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Penalty Box at Top
      ctx.strokeRect(140, 20, 320, 110);
      // Goal Area (6-yard box)
      ctx.strokeRect(210, 20, 180, 45);
      // Penalty Spot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(300, 85, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Penalty Arc
      ctx.beginPath();
      ctx.arc(300, 85, 45, 0.3 * Math.PI, 0.7 * Math.PI, false);
      ctx.stroke();

      // Center Line & Center Circle (towards bottom)
      ctx.beginPath();
      ctx.moveTo(20, canvas.height - 30);
      ctx.lineTo(canvas.width - 20, canvas.height - 30);
      ctx.stroke();

      // Goal Net Structure
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(goal.x, goal.y - goal.depth, goal.width, goal.depth);
      // Net criss-cross
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let x = goal.x; x <= goal.x + goal.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, goal.y);
        ctx.lineTo(x, goal.y - goal.depth);
        ctx.stroke();
      }
      // Goal Posts (White / Glowing)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.strokeRect(goal.x, goal.y - goal.depth, goal.width, goal.depth);
      ctx.beginPath();
      ctx.moveTo(goal.x, goal.y);
      ctx.lineTo(goal.x + goal.width, goal.y);
      ctx.stroke();

      // 3. DRAW GOALKEEPER (Golden / Neon Jersey)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(goalkeeper.x, goalkeeper.y, goalkeeper.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // GK Label
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 9px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('GK', goalkeeper.x, goalkeeper.y + 3);

      // 4. DRAW DEFENDERS (Charcoal / Silver kits)
      defenders.forEach((def, idx) => {
        ctx.fillStyle = '#374151';
        ctx.beginPath();
        ctx.arc(def.x, def.y, def.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(`DEF ${idx + 1}`, def.x, def.y + 3);
      });

      // 5. DRAW PLAYER ROSHAN (CR7 Red & Gold Kit)
      // Aura under player
      ctx.fillStyle = 'rgba(200, 16, 46, 0.35)';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r + 5, 0, Math.PI * 2);
      ctx.fill();

      // Body (CR7 Red)
      ctx.fillStyle = '#c8102e';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Number 7 on Player
      ctx.fillStyle = '#ffd700';
      ctx.font = '900 13px Russo One';
      ctx.textAlign = 'center';
      ctx.fillText('7', player.x, player.y + 4);

      // ROSHAN Name Tag Floating Above Player
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Orbitron';
      ctx.fillText('ROSHAN', player.x, player.y - 20);

      // 6. DRAW THE FOOTBALL (Classic Pentagonal Soccer Ball)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ball Pentagons
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 3, 0, Math.PI * 2);
      ctx.fill();

      g.animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    gameRef.current.animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      if (gameRef.current.animationFrameId) {
        cancelAnimationFrame(gameRef.current.animationFrameId);
      }
    };
  }, [gameState, sfxEnabled]);

  const shootBall = () => {
    const g = gameRef.current;
    if (g.ball.isMoving || gameState !== 'playing') return;

    if (sfxEnabled) playKickSound();

    g.ball.isMoving = true;
    // Calculate trajectory towards target corner of goal with player aim
    const targetX = 230 + Math.random() * 140; // Aiming towards the goal area
    const targetY = 35;
    const angle = Math.atan2(targetY - g.ball.y, targetX - g.ball.x);
    const speed = 12.5;

    g.ball.vx = Math.cos(angle) * speed;
    g.ball.vy = Math.sin(angle) * speed;
  };

  const handleGoalScored = () => {
    const nextGoals = goalsScored + 1;
    setGoalsScored(nextGoals);
    setGameState('goal');

    if (sfxEnabled) {
      playGoalRoar();
      playSuccessChime();
    }

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#c8102e', '#ffd700', '#ffffff']
    });

    if (nextGoals >= 3) {
      // VICTORY! Completed the 3-goal challenge
      setTimeout(() => {
        setGameState('won');
        onCompleteLevel(3);
        triggerSiuu('ROSHAN, YOU ARE A CHAMPION! 🏆', 'FOOTBALL MISSION COMPLETED! ⚽🔥');
      }, 900);
    } else {
      setShotFeedback(`GOAAAL #${nextGoals}! SENSATIONAL FINISH BY ROSHAN! ⚽💥`);
      setTimeout(() => {
        resetPositions();
        setGameState('playing');
      }, 1500);
    }
  };

  const resetPositions = () => {
    const g = gameRef.current;
    g.player.x = 300;
    g.player.y = 350;
    g.ball.x = 300;
    g.ball.y = 310;
    g.ball.vx = 0;
    g.ball.vy = 0;
    g.ball.isMoving = false;
  };

  const handleStartGame = () => {
    resetPositions();
    setGoalsScored(0);
    setTimeRemaining(75);
    setGameState('playing');
    setShotFeedback('Match underway! Dribble past defenders and score 3 goals!');
    if (sfxEnabled) playKickSound();
  };

  const handleTogglePause = () => {
    if (gameState === 'playing') setGameState('paused');
    else if (gameState === 'paused') setGameState('playing');
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Level Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-sports uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(200,16,46,0.4)]"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        LEVEL 3 OF 4 • PLAYABLE FOOTBALL ARENA
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-sports text-center tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-red-500 drop-shadow-[0_0_25px_rgba(200,16,46,0.7)] mb-2"
      >
        THE CHAMPION'S FOOTBALL ARENA ⚽
      </motion.h2>

      <p className="text-neutral-300 text-sm sm:text-base text-center max-w-xl mb-4">
        Inspired by KONAMI's eFootball™. Take the pitch as <strong className="text-amber-400">PLAYER ROSHAN</strong>. Score 3 goals past the keeper & defenders to conquer Level 3!
      </p>

      {/* HUD Scoreboard: Goals, Timer, Level Progress */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-3 mb-3 px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-tech">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">PLAYER:</span>
          <span className="text-amber-400 font-bold">ROSHAN #7</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">GOALS:</span>
          <span className="text-base font-sports text-red-500 font-bold">{goalsScored} / 3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">TIME:</span>
          <span className="text-white font-bold">{timeRemaining}s</span>
        </div>
      </div>

      {/* Live Match Commentary / Feedback Banner */}
      {shotFeedback && (
        <div className="w-full max-w-2xl text-center py-1.5 px-3 mb-2 rounded-lg bg-black/60 border border-amber-500/30 text-amber-300 text-xs font-medium animate-pulse">
          {shotFeedback}
        </div>
      )}

      {/* The Playable Football Canvas Container */}
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-red-900/60 shadow-[0_0_35px_rgba(200,16,46,0.3)] bg-black">
        <canvas
          ref={canvasRef}
          width={600}
          height={420}
          className="w-full h-auto block touch-none"
        />

        {/* Start Game Overlay */}
        {gameState === 'ready' && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-amber-400 flex items-center justify-center text-3xl shadow-lg mb-3">
              ⚽
            </div>
            <h3 className="text-2xl sm:text-3xl font-sports text-white mb-2">
              READY FOR KICK-OFF, ROSHAN?
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
              Use <strong className="text-amber-400">WASD / Arrow Keys</strong> on desktop or the <strong className="text-amber-400">Touch Controls</strong> below on mobile. Press <strong className="text-red-500">SHOOT / Spacebar</strong> to blast the ball into the net!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-full font-sports text-base uppercase bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-[0_0_25px_rgba(200,16,46,0.8)] hover:scale-105 active:scale-95 transition-transform"
            >
              KICK OFF MATCH ⚽
            </button>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-4">
            <h3 className="text-2xl font-sports text-white mb-4">MATCH PAUSED</h3>
            <button
              onClick={handleTogglePause}
              className="px-6 py-2.5 rounded-full font-sports text-sm bg-red-600 text-white shadow-lg"
            >
              RESUME PLAY
            </button>
          </div>
        )}

        {/* Victory Screen inside Game Canvas */}
        {gameState === 'won' && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 flex items-center justify-center text-4xl shadow-[0_0_30px_#ffd700] mb-3 animate-bounce">
              🏆
            </div>
            <h3 className="text-2xl sm:text-4xl font-sports text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-500 drop-shadow-[0_0_25px_#ffd700] mb-1">
              ROSHAN, YOU ARE A CHAMPION! 🏆
            </h3>
            <div className="text-sm sm:text-base font-sports text-red-500 tracking-wider mb-2">
              FOOTBALL MISSION COMPLETED! • LEVEL 3 COMPLETED!
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-md mb-6">
              You scored all 3 goals with pure CR7 greatness! The secret VIP locker room and your ultimate birthday surprise are now unlocked!
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNextLevel(4)}
                className="px-8 py-3.5 rounded-full font-sports text-base uppercase bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-[0_0_30px_rgba(200,16,46,0.9)] hover:scale-105 active:scale-95 transition-transform"
              >
                PROCEED TO LEVEL 4 ➜
              </button>
              <button
                onClick={handleStartGame}
                className="px-4 py-2.5 rounded-full font-sports text-xs bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white"
              >
                PLAY AGAIN 🔁
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Game Control Bar (Pause, Restart, Mobile Controls) */}
      <div className="w-full max-w-2xl flex items-center justify-between mt-3 px-2">
        <div className="flex items-center gap-2">
          {gameState === 'playing' && (
            <button
              onClick={handleTogglePause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-sports text-neutral-300 hover:text-white"
            >
              <Pause className="w-3.5 h-3.5" /> PAUSE
            </button>
          )}
          <button
            onClick={handleStartGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-sports text-neutral-300 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" /> RESTART MATCH
          </button>
        </div>

        {/* Optional Play Store Link for eFootball */}
        <a
          href="https://play.google.com/store/apps/details?id=jp.konami.pesam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-sports text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <span>PLAY eFOOTBALL ON PLAY STORE</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* MOBILE TOUCH CONTROLS (D-Pad + Shoot Button) */}
      <div className="w-full max-w-md mt-4 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 md:hidden flex items-center justify-between">
        {/* Virtual Directional D-Pad */}
        <div className="grid grid-cols-3 gap-1 w-32 h-32">
          <div />
          <button
            onTouchStart={() => (gameRef.current.keys.up = true)}
            onTouchEnd={() => (gameRef.current.keys.up = false)}
            className="p-3 bg-neutral-900 rounded-lg border border-neutral-700 text-white flex items-center justify-center active:bg-red-600"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div />

          <button
            onTouchStart={() => (gameRef.current.keys.left = true)}
            onTouchEnd={() => (gameRef.current.keys.left = false)}
            className="p-3 bg-neutral-900 rounded-lg border border-neutral-700 text-white flex items-center justify-center active:bg-red-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-neutral-950 flex items-center justify-center text-[9px] font-tech text-neutral-500">
            MOVE
          </div>
          <button
            onTouchStart={() => (gameRef.current.keys.right = true)}
            onTouchEnd={() => (gameRef.current.keys.right = false)}
            className="p-3 bg-neutral-900 rounded-lg border border-neutral-700 text-white flex items-center justify-center active:bg-red-600"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <div />
          <button
            onTouchStart={() => (gameRef.current.keys.down = true)}
            onTouchEnd={() => (gameRef.current.keys.down = false)}
            className="p-3 bg-neutral-900 rounded-lg border border-neutral-700 text-white flex items-center justify-center active:bg-red-600"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <div />
        </div>

        {/* Big Touch Shoot Button */}
        <button
          onTouchStart={shootBall}
          onClick={shootBall}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 border-2 border-amber-300 text-white font-sports text-sm uppercase flex flex-col items-center justify-center shadow-[0_0_20px_rgba(200,16,46,0.8)] active:scale-90 transition-transform"
        >
          <Zap className="w-6 h-6 text-white mb-0.5" />
          <span>SHOOT!</span>
        </button>
      </div>
    </div>
  );
}
