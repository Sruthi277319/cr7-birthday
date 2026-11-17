// Audio synthesis engine using Web Audio API
// 100% self-contained, no external mp3 dependencies to ensure 0% broken links and instant playback!

let audioCtx = null;
let bgmGainNode = null;
let bgmInterval = null;
let isBgmPlaying = false;

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

// 1. Kick Sound
export function playKickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {
    console.warn('Audio error:', e);
  }
}

// 2. Referee Whistle
export function playWhistle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [2400, 2600].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 25;
      lfoGain.gain.value = 40;
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    });
  } catch (e) {
    console.warn('Whistle error:', e);
  }
}

// 3. Goal Cheer & Stadium Roar
export function playGoalRoar() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Pink noise crowd roar simulation
    const bufferSize = ctx.sampleRate * 1.8;
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
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.linearRampToValueAtTime(900, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.8);
  } catch (e) {
    console.warn('Cheer error:', e);
  }
}

// 4. SIUUUU Signature Shout Sound
export function playSiuuSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Resonant vowel sweep representing "SIUUUU!"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    // Formant pitch starts high and holds with power
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(340, now + 0.15);
    osc.frequency.setValueAtTime(320, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(140, now + 1.2);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(950, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.2);
    filter.Q.value = 3;

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.12);
    gain.gain.setValueAtTime(0.65, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);

    // Complementary crowd burst
    playGoalRoar();
  } catch (e) {
    console.warn('Siuu error:', e);
  }
}

// 5. Success Chime
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.3, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  } catch (e) {
    console.warn('Chime error:', e);
  }
}

// 6. Wrong Answer Buzzer
export function playWrongBuzz() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.setValueAtTime(110, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  } catch (e) {
    console.warn('Buzz error:', e);
  }
}

// 7. Magic Gift Box Open
export function playGiftOpen() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.25, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.6);
    });
  } catch (e) {
    console.warn('Gift error:', e);
  }
}

// 8. Triumphal Fanfare
export function playFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chords = [
      { f: 523.25, t: 0, d: 0.2 },
      { f: 523.25, t: 0.2, d: 0.2 },
      { f: 523.25, t: 0.4, d: 0.2 },
      { f: 659.25, t: 0.6, d: 0.4 },
      { f: 783.99, t: 1.0, d: 0.6 },
      { f: 1046.50, t: 1.6, d: 1.0 },
    ];

    chords.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.35, now + t);
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

// 9. Procedural Background Stadium Theme
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

function startBackgroundMusic() {
  if (isBgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmPlaying = true;
  bgmGainNode = ctx.createGain();
  bgmGainNode.gain.setValueAtTime(0.18, ctx.currentTime);
  bgmGainNode.connect(ctx.destination);

  // Uplifting champion chord progression: Dm -> F -> C -> G
  // With pulsating football beat
  const bpm = 118;
  const beatSec = 60 / bpm;
  let step = 0;

  const notesProgression = [
    [146.83, 220.00, 293.66], // Dm
    [174.61, 220.00, 349.23], // F
    [130.81, 196.00, 261.63], // C
    [196.00, 246.94, 293.66], // G
  ];

  bgmInterval = setInterval(() => {
    if (!isBgmPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    const bar = Math.floor(step / 4) % 4;
    const beatInBar = step % 4;
    const chord = notesProgression[bar];

    // Bass / Chord synth
    if (beatInBar === 0 || beatInBar === 2) {
      chord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = i === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq * (i === 0 ? 0.5 : 1), now);
        g.gain.setValueAtTime(0.08, now);
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
    kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    kickGain.gain.setValueAtTime(0.2, now);
    kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    kickOsc.connect(kickGain);
    kickGain.connect(bgmGainNode);
    kickOsc.start(now);
    kickOsc.stop(now + 0.16);

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
    bgmGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
  }
}

export function isMusicPlaying() {
  return isBgmPlaying;
}
