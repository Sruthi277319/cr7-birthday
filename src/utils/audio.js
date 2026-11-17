// High-fidelity Audio Synthesis & Ambient Music Engine
// 100% self-contained Web Audio API engine: zero external file 404s, zero CORS issues, instant playback on mobile & desktop!

let audioCtx = null;
let bgmGainNode = null;
let bgmInterval = null;
let isBgmPlaying = false;
let currentBgmMode = 'stadium'; // 'stadium' | 'emotional'
let masterVolume = 0.8;
let isSfxMuted = false;
let isSiuuPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(val) {
  masterVolume = Math.max(0, Math.min(1, val));
  if (bgmGainNode && audioCtx) {
    const targetGain = currentBgmMode === 'emotional' ? 0.16 * masterVolume : 0.2 * masterVolume;
    bgmGainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.1);
  }
}

export function getMasterVolume() {
  return masterVolume;
}

export function setSfxMuted(muted) {
  isSfxMuted = muted;
}

export function isAudioSfxMuted() {
  return isSfxMuted;
}

// 1. Kick Sound (Thud + leather snap)
export function playKickSound() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.14);

    gain.gain.setValueAtTime(0.7 * masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    console.warn('Audio kick error:', e);
  }
}

// 2. Goal Post Hit / Crossbar Clang
export function playPostHitSound() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);

    gain.gain.setValueAtTime(0.5 * masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch (e) {
    console.warn('Post hit error:', e);
  }
}

// 3. Referee Double Whistle
export function playWhistle() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [2300, 2550].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 28;
      lfoGain.gain.value = 45;
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.32);

      gain.gain.setValueAtTime(0.18 * masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.33);
    });
  } catch (e) {
    console.warn('Whistle error:', e);
  }
}

// 4. Stadium Crowd Roar
export function playGoalRoar() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 2.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.linearRampToValueAtTime(1100, now + 0.6);
    filter.frequency.exponentialRampToValueAtTime(280, now + 2.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.65 * masterVolume, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 2.2);
  } catch (e) {
    console.warn('Cheer error:', e);
  }
}

// 5. Authentic Synchronized Stadium SIUUUU! Sound
export function playSiuuSound() {
  if (isSfxMuted || isSiuuPlaying) return;
  isSiuuPlaying = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) {
      isSiuuPlaying = false;
      return;
    }
    const now = ctx.currentTime;

    // A. Sub-bass ground impact thump on landing
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
    subGain.gain.setValueAtTime(0.85 * masterVolume, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.42);

    // B. Iconic Resonant "SIUUUU!" Vocal Formant Roar
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    // Starting pitch with athletic leap, sustained roar, then resonant drop
    osc.frequency.setValueAtTime(230, now);
    osc.frequency.linearRampToValueAtTime(360, now + 0.16);
    osc.frequency.setValueAtTime(340, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(145, now + 1.4);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.linearRampToValueAtTime(1020, now + 0.22);
    filter.frequency.exponentialRampToValueAtTime(420, now + 1.4);
    filter.Q.value = 3.2;

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.8 * masterVolume, now + 0.12);
    gain.gain.setValueAtTime(0.75 * masterVolume, now + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.45);

    // C. Echoing Stadium Crowd Response
    playGoalRoar();

    setTimeout(() => {
      isSiuuPlaying = false;
    }, 1500);
  } catch (e) {
    isSiuuPlaying = false;
    console.warn('Siuu error:', e);
  }
}

// 6. Success Golden Chime
export function playSuccessChime() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.35 * masterVolume, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.48);
    });
  } catch (e) {
    console.warn('Chime error:', e);
  }
}

// 7. Wrong Answer Buzzer
export function playWrongBuzz() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(135, now);
    osc.frequency.setValueAtTime(115, now + 0.14);

    gain.gain.setValueAtTime(0.4 * masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  } catch (e) {
    console.warn('Buzz error:', e);
  }
}

// 8. Magic Gift Box Celestial Harp
export function playGiftOpen() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.28 * masterVolume, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  } catch (e) {
    console.warn('Gift error:', e);
  }
}

// 9. Triumphal Fanfare
export function playFanfare() {
  if (isSfxMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chords = [
      { f: 523.25, t: 0, d: 0.18 },
      { f: 523.25, t: 0.18, d: 0.18 },
      { f: 523.25, t: 0.36, d: 0.18 },
      { f: 659.25, t: 0.54, d: 0.36 },
      { f: 783.99, t: 0.9, d: 0.55 },
      { f: 1046.50, t: 1.45, d: 0.95 },
    ];

    chords.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.35 * masterVolume, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });
  } catch (e) {
    console.warn('Fanfare error:', e);
  }
}

// 10. Background Music Switcher & Engine
export function setBgmMode(mode) {
  currentBgmMode = mode; // 'stadium' or 'emotional'
}

export function toggleBackgroundMusic(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isBgmPlaying) {
    stopBackgroundMusic();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startBackgroundMusic();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startBackgroundMusic() {
  if (isBgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmPlaying = true;
  bgmGainNode = ctx.createGain();
  const initGain = currentBgmMode === 'emotional' ? 0.15 * masterVolume : 0.2 * masterVolume;
  bgmGainNode.gain.setValueAtTime(initGain, ctx.currentTime);
  bgmGainNode.connect(ctx.destination);

  let step = 0;

  // Stadium Mode: Energetic 120 BPM driving beat
  // Emotional Mode: Warm, gentle 78 BPM celebratory chords
  const bpm = currentBgmMode === 'emotional' ? 80 : 120;
  const beatSec = 60 / bpm;

  const stadiumChords = [
    [146.83, 220.00, 293.66], // Dm
    [174.61, 220.00, 349.23], // F
    [130.81, 196.00, 261.63], // C
    [196.00, 246.94, 293.66], // G
  ];

  const emotionalChords = [
    [261.63, 329.63, 392.00, 523.25], // C major
    [220.00, 261.63, 329.63, 440.00], // Am
    [174.61, 220.00, 261.63, 349.23], // F major
    [196.00, 246.94, 293.66, 392.00], // G major
  ];

  bgmInterval = setInterval(() => {
    if (!isBgmPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    const chordSet = currentBgmMode === 'emotional' ? emotionalChords : stadiumChords;
    const bar = Math.floor(step / 4) % chordSet.length;
    const beatInBar = step % 4;
    const chord = chordSet[bar];

    if (currentBgmMode === 'emotional') {
      // Gentle warm piano-style chords
      if (beatInBar === 0) {
        chord.forEach((freq) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          g.gain.setValueAtTime(0.06 * masterVolume, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + beatSec * 3.6);
          osc.connect(g);
          g.connect(bgmGainNode);
          osc.start(now);
          osc.stop(now + beatSec * 3.8);
        });
      }
    } else {
      // Stadium Football Anthem Beat
      if (beatInBar === 0 || beatInBar === 2) {
        chord.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.type = i === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq * (i === 0 ? 0.5 : 1), now);
          g.gain.setValueAtTime(0.07 * masterVolume, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + beatSec * 1.8);
          osc.connect(g);
          g.connect(bgmGainNode);
          osc.start(now);
          osc.stop(now + beatSec * 2);
        });
      }

      // Stadium kick pulse
      const kickOsc = audioCtx.createOscillator();
      const kickGain = audioCtx.createGain();
      kickOsc.frequency.setValueAtTime(110, now);
      kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.12);
      kickGain.gain.setValueAtTime(0.22 * masterVolume, now);
      kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      kickOsc.connect(kickGain);
      kickGain.connect(bgmGainNode);
      kickOsc.start(now);
      kickOsc.stop(now + 0.16);
    }

    step++;
  }, beatSec * 1000);
}

export function stopBackgroundMusic() {
  isBgmPlaying = false;
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.08);
  }
}

export function isMusicPlaying() {
  return isBgmPlaying;
}
