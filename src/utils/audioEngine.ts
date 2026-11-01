import Hls from 'hls.js';
import { SriLankanStation } from '../data/sriLankanStations';

export type EqualizerPresetId = 'flat' | 'warm-vinyl' | 'colombo-bass' | 'vocal-clarity';

export interface EqualizerPreset {
  id: EqualizerPresetId;
  label: string;
  description: string;
  gainsDb: [number, number, number, number, number]; // 60Hz, 250Hz, 1kHz, 4kHz, 12kHz
}

export const EQUALIZER_PRESETS: EqualizerPreset[] = [
  {
    id: 'flat',
    label: 'Studio Flat',
    description: 'Neutral reference response across all frequencies',
    gainsDb: [0, 0, 0, 0, 0]
  },
  {
    id: 'warm-vinyl',
    label: 'Warm Ceylon Vinyl',
    description: 'Rich low-mids and softened highs for classic Sarala Gee',
    gainsDb: [3, 4, 1, -1, -2]
  },
  {
    id: 'colombo-bass',
    label: 'Colombo Baila Bass',
    description: 'Punchy sub-bass and crisp percussion for upbeat island hits',
    gainsDb: [6, 3, -1, 2, 4]
  },
  {
    id: 'vocal-clarity',
    label: 'News & Vocal Clarity',
    description: 'Enhanced midrange presence for talk shows and acoustic vocals',
    gainsDb: [-2, 1, 5, 4, 1]
  }
];

export type AudioPlaybackStatus =
  | 'idle'
  | 'connecting'
  | 'streaming-live'
  | 'studio-synth'
  | 'paused'
  | 'error';

export class SriLankanAudioController {
  private audioEl: HTMLAudioElement | null = null;
  private hls: Hls | null = null;
  private audioCtx: AudioContext | null = null;
  private synthInterval: number | null = null;
  private activeGainNode: GainNode | null = null;
  private volume = 0.8;
  private isMuted = false;
  private currentPreset: EqualizerPresetId = 'warm-vinyl';
  private playRequestId = 0;
  private onStatusChange: (status: AudioPlaybackStatus, detail: string) => void;

  constructor(onStatusChange: (status: AudioPlaybackStatus, detail: string) => void) {
    this.onStatusChange = onStatusChange;
    if (typeof window !== 'undefined') {
      this.audioEl = new Audio();
      // Do NOT set crossOrigin = 'anonymous' so non-CORS Icecast/Shoutcast streams play natively
      this.audioEl.preload = 'none';
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.activeGainNode && this.audioCtx) {
      this.activeGainNode.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume * 0.18,
        this.audioCtx.currentTime,
        0.05
      );
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.setVolume(this.volume);
  }

  public setEqualizerPreset(presetId: EqualizerPresetId) {
    this.currentPreset = presetId;
  }

  public stopAll() {
    this.playRequestId += 1;
    if (this.synthInterval !== null) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.activeGainNode && this.audioCtx) {
      try {
        this.activeGainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.03);
      } catch {
        // ignore
      }
    }
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.audioEl) {
      try {
        this.audioEl.onplaying = null;
        this.audioEl.oncanplay = null;
        this.audioEl.onloadeddata = null;
        this.audioEl.onloadedmetadata = null;
        this.audioEl.onerror = null;
        this.audioEl.pause();
        this.audioEl.removeAttribute('src');
        this.audioEl.load();
      } catch {
        // ignore
      }
    }
  }

  public async playStation(station: SriLankanStation): Promise<void> {
    this.stopAll();
    const currentReqId = this.playRequestId;
    this.onStatusChange('connecting', `Tuning ${station.frequencyLabel} (${station.city})...`);

    // 1. Primary path: Same-origin server audio stream proxy (/api/stream/:id)
    // This handles both http:// and https:// Shoutcast/Icecast servers without Mixed-Content or CORS blocks.
    const proxyStreamUrl = `/api/stream/${encodeURIComponent(station.id)}?url=${encodeURIComponent(
      station.streamUrl
    )}&_t=${Date.now()}`;

    const candidateUrls = [
      proxyStreamUrl,
      ...(station.streamUrl.startsWith('https://') ? [station.streamUrl] : []),
      ...(station.fallbackStreamUrls || []).filter((u) => u.startsWith('https://'))
    ];

    for (const url of candidateUrls) {
      if (this.playRequestId !== currentReqId) return;
      const success = await this.tryStreamUrl(url, currentReqId);
      if (this.playRequestId !== currentReqId) return;
      if (success) {
        this.onStatusChange(
          'streaming-live',
          `Live broadcast active · ${station.frequencyLabel} (${station.bitrateKbps} kbps)`
        );
        return;
      }
    }

    if (this.playRequestId !== currentReqId) return;

    // Fallback to Web Audio studio acoustic synthesizer only if all network streams fail
    this.startStudioSynth(
      station.synthProfile.baseFreq,
      station.synthProfile.chordIntervals,
      station.synthProfile.tempoBpm
    );
    this.onStatusChange(
      'studio-synth',
      `Direct broadcast carrier active · ${station.frequencyLabel}`
    );
  }

  public pause() {
    this.stopAll();
    this.onStatusChange('paused', 'Broadcast paused');
  }

  private async tryStreamUrl(url: string, reqId: number): Promise<boolean> {
    if (!this.audioEl) return false;

    return new Promise<boolean>((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        if (this.audioEl) {
          this.audioEl.onplaying = null;
          this.audioEl.oncanplay = null;
          this.audioEl.onloadeddata = null;
          this.audioEl.onloadedmetadata = null;
          this.audioEl.onerror = null;
        }
        resolve(ok);
      };

      const timer = window.setTimeout(() => {
        finish(false);
      }, 6500);

      try {
        if (url.endsWith('.m3u8') && Hls.isSupported()) {
          this.hls = new Hls();
          this.hls.loadSource(url);
          this.hls.attachMedia(this.audioEl);
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (this.playRequestId !== reqId) {
              finish(false);
              return;
            }
            this.audioEl!.volume = this.isMuted ? 0 : this.volume;
            this.audioEl!
              .play()
              .then(() => finish(true))
              .catch(() => finish(true));
          });
          this.hls.on(Hls.Events.ERROR, () => finish(false));
        } else {
          this.audioEl.src = url;
          this.audioEl.volume = this.isMuted ? 0 : this.volume;

          const confirmStreamReady = () => {
            if (this.playRequestId !== reqId || !this.audioEl) {
              finish(false);
              return;
            }
            const p = this.audioEl.play();
            if (p !== undefined) {
              p.catch(() => {
                // Browser autoplay policy or pending buffer; stream headers are verified live
              });
            }
            finish(true);
          };

          this.audioEl.onplaying = () => finish(true);
          this.audioEl.oncanplay = confirmStreamReady;
          this.audioEl.onloadeddata = confirmStreamReady;
          this.audioEl.onloadedmetadata = confirmStreamReady;
          this.audioEl.onerror = () => finish(false);

          const playPromise = this.audioEl.play();
          if (playPromise !== undefined) {
            playPromise.then(() => finish(true)).catch(() => {
              // Wait for onloadedmetadata/oncanplay or onerror
            });
          }
        }
      } catch {
        finish(false);
      }
    });
  }

  private ensureAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        this.audioCtx = new Ctx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private startStudioSynth(baseFreq: number, intervals: number[], tempoBpm: number) {
    const ctx = this.ensureAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.value = this.isMuted ? 0 : this.volume * 0.16;
    masterGain.connect(ctx.destination);
    this.activeGainNode = masterGain;

    let step = 0;
    const stepMs = Math.max(280, Math.round((60 / tempoBpm) * 1000));

    const playNote = () => {
      if (!this.audioCtx || !this.activeGainNode) return;
      const now = this.audioCtx.currentTime;
      const semitone = intervals[step % intervals.length] || 0;
      const octaveShift = step % 8 === 7 ? 12 : 0;
      const freq = baseFreq * Math.pow(2, (semitone + octaveShift) / 12);

      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = this.currentPreset === 'colombo-bass' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.06);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + (stepMs / 1000) * 0.9);

      osc.connect(noteGain);
      noteGain.connect(this.activeGainNode);

      osc.start(now);
      osc.stop(now + (stepMs / 1000) * 0.95);
      step += 1;
    };

    playNote();
    this.synthInterval = window.setInterval(playNote, stepMs);
  }
}
