// Romantic Audio System with Automatic Autoplay & Web Audio API Synth Fallback

class RomanticAudioController {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.audioContext = null;
    this.synthInterval = null;
    this.isSynthActive = false;
    this.hasUserInteracted = false;
    this.audioPath = "/music/love-instrumental.mp3";
    this.volume = 0.25;
    this.useSynthFallback = false;
  }

  init() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.src = this.audioPath;
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;

    // Listen for file load errors to automatically activate Web Audio API synth
    this.audioElement.addEventListener("error", () => {
      console.warn("Local audio file /music/love-instrumental.mp3 not found. Activating Web Audio API procedural piano synth!");
      this.useSynthFallback = true;
    });

    // Auto-unlock audio playback on first interaction anywhere on window
    const unlockAudio = () => {
      if (!this.isPlaying) {
        this.play();
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // Attempt instant autoplay immediately on init
    setTimeout(() => {
      this.play();
    }, 300);
  }

  play() {
    this.hasUserInteracted = true;
    this.isPlaying = true;

    if (this.useSynthFallback || !this.audioElement) {
      this.startSynth();
      return;
    }

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("HTML5 Audio play failed/blocked by browser. Falling back to Web Audio API synth.", err);
        this.useSynthFallback = true;
        this.startSynth();
      });
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.masterGainNode) {
      this.masterGainNode.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.audioContext.currentTime,
        0.05
      );
    }
    return this.isMuted;
  }

  // --- Procedural Romantic Piano Synth using Web Audio API ---
  startSynth() {
    if (this.isSynthActive) return;
    this.isSynthActive = true;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioContext.currentTime);
      this.masterGainNode.connect(this.audioContext.destination);

      // Dreamy C Major 7th / F Major 7th romantic progression notes in Hz
      const notes = [
        261.63, 329.63, 392.00, 493.88, 523.25, 392.00, // C4, E4, G4, B4, C5, G4
        349.23, 440.00, 523.25, 659.25, 523.25, 440.00, // F4, A4, C5, E5, C5, A4
        293.66, 349.23, 440.00, 523.25, 440.00, 349.23, // D4, F4, A4, C5, A4, F4
        392.00, 493.88, 587.33, 698.46, 587.33, 493.88, // G4, B4, D5, F5, D5, B4
      ];

      let noteIndex = 0;
      const playNextNote = () => {
        if (!this.isSynthActive || !this.isPlaying) return;

        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        this.playPianoNote(freq);
      };

      playNextNote();
      this.synthInterval = setInterval(playNextNote, 600);
    } catch (e) {
      console.error("Web Audio API synth error:", e);
    }
  }

  playPianoNote(freq) {
    if (!this.audioContext || this.audioContext.state !== "running") return;

    const osc = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, this.audioContext.currentTime);

    const now = this.audioContext.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  stopSynth() {
    this.isSynthActive = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioSystem = new RomanticAudioController();
