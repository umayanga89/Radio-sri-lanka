import React from 'react';
import {
  Heart,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  Sliders,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SriLankanStation } from '../data/sriLankanStations';
import {
  AudioPlaybackStatus,
  EQUALIZER_PRESETS,
  EqualizerPresetId
} from '../utils/audioEngine';
import { formatSleepCountdown } from '../utils/radioLogic';

interface AnalogFrequencyDialProps {
  stations: SriLankanStation[];
  activeStation: SriLankanStation;
  isPlaying: boolean;
  playbackStatus: AudioPlaybackStatus;
  statusDetail: string;
  isFavorite: boolean;
  isMuted: boolean;
  volume: number;
  activeEqPreset: EqualizerPresetId;
  sleepSecondsLeft: number | null;
  onSelectStation: (station: SriLankanStation) => void;
  onTogglePlay: () => void;
  onStepStation: (direction: 'prev' | 'next') => void;
  onToggleFavorite: (stationId: string) => void;
  onToggleMute: () => void;
  onChangeVolume: (val: number) => void;
  onOpenAudioSettings: () => void;
}

export const AnalogFrequencyDial: React.FC<AnalogFrequencyDialProps> = ({
  stations,
  activeStation,
  isPlaying,
  playbackStatus,
  statusDetail,
  isFavorite,
  isMuted,
  volume,
  activeEqPreset,
  sleepSecondsLeft,
  onSelectStation,
  onTogglePlay,
  onStepStation,
  onToggleFavorite,
  onToggleMute,
  onChangeVolume,
  onOpenAudioSettings
}) => {
  const minFreq = 87.5;
  const maxFreq = 108.0;
  const percentage = Math.max(
    2,
    Math.min(98, ((activeStation.frequencyMhz - minFreq) / (maxFreq - minFreq)) * 100)
  );

  const sortedByFreq = [...stations].sort((a, b) => a.frequencyMhz - b.frequencyMhz);
  const currentEqLabel =
    EQUALIZER_PRESETS.find((p) => p.id === activeEqPreset)?.label || 'Warm Ceylon Vinyl';
  const sleepCountdown = formatSleepCountdown(sleepSecondsLeft);

  const ticks: number[] = [];
  for (let f = 88; f <= 108; f += 1) {
    ticks.push(f);
  }

  return (
    <section
      aria-label="Sri Lankan FM Frequency Tuner"
      className="rounded-3xl bg-zinc-900 dark:bg-zinc-900/95 text-zinc-100 p-5 sm:p-7 border border-zinc-800 shadow-xl"
    >
      {/* Top Row: Station Kicker & Tuner Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-800/90">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
            <Radio className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{activeStation.network}</span>
            <span aria-hidden="true">·</span>
            <span>{activeStation.city}</span>
            <span aria-hidden="true">·</span>
            <span>{activeStation.language}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {activeStation.name}
            </h1>
            <span className="text-base sm:text-lg text-zinc-400 font-medium">
              {activeStation.nativeName}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            On Air: <span className="text-zinc-200 font-medium">{activeStation.currentShow}</span>{' '}
            <span aria-hidden="true">·</span> Hosted by {activeStation.currentHost}
          </p>
        </div>

        {/* Big Tabular MHz Readout */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-3xl sm:text-5xl font-semibold tracking-tight text-amber-400 tabular-nums">
              {activeStation.frequencyMhz.toFixed(1)}
              <span className="text-sm sm:text-base font-normal text-zinc-400 ml-1.5">
                MHz
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono tabular-nums">
              {statusDetail}
              {' · '}
              {currentEqLabel}
              {sleepCountdown ? ` · Sleep ${sleepCountdown}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row: Interactive Horizontal Rotary FM Scale */}
      <div className="my-6">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
          <span className="whitespace-nowrap">
            87.5 MHz <span className="hidden sm:inline">(All-Island FM Band)</span>
          </span>
          <span className="whitespace-nowrap">98.0 MHz</span>
          <span className="whitespace-nowrap">108.0 MHz</span>
        </div>

        <div className="relative h-20 rounded-2xl bg-zinc-950 border border-zinc-800/90 px-4 flex flex-col justify-center overflow-hidden">
          {/* Scale Ticks */}
          <div className="relative w-full h-10 flex items-end justify-between pointer-events-none">
            {ticks.map((freq) => (
              <div key={freq} className="flex flex-col items-center">
                <div
                  className={`w-px ${
                    freq % 2 === 0 ? 'h-4 bg-zinc-500' : 'h-2.5 bg-zinc-700'
                  }`}
                />
                {freq % 2 === 0 && (
                  <span className="font-mono text-[10px] text-zinc-500 mt-1">
                    {freq}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Clickable Station Pips & Warm Tungsten Needle in Shared Coordinate Track */}
          <div className="absolute inset-x-4 inset-y-0 pointer-events-none">
            <div className="relative w-full h-full">
              {sortedByFreq.map((st) => {
                const stPos = Math.max(
                  1,
                  Math.min(99, ((st.frequencyMhz - minFreq) / (maxFreq - minFreq)) * 100)
                );
                const isCurrent = st.id === activeStation.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => onSelectStation(st)}
                    style={{ left: `${stPos}%` }}
                    aria-label={`Tune to ${st.name} ${st.frequencyLabel}`}
                    title={`${st.name} (${st.frequencyLabel})`}
                    className="pointer-events-auto absolute -translate-x-1/2 top-2 w-5 h-6 flex items-center justify-center group focus-visible:outline-2 focus-visible:outline-amber-400 rounded"
                  >
                    <span
                      className={`block rounded-full transition-transform ${
                        isCurrent
                          ? 'w-2.5 h-2.5 bg-amber-400 scale-125'
                          : 'w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Warm Tungsten Tuning Needle */}
              <div
                style={{ left: `${ Math.max(1, Math.min(99, percentage)) }%` }}
                className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-amber-400 pointer-events-none transition-all duration-200"
              >
                <div className="w-3 h-3 -ml-[5px] mt-1 rounded-full bg-amber-400 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Frequency Scrubber Pills */}
        <div
          role="region"
          aria-label="Quick Station Frequency Scrubber"
          className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
        >
          {sortedByFreq.map((st) => {
            const active = st.id === activeStation.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStation(st)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap shrink-0 transition-colors border ${
                  active
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 font-semibold'
                    : 'bg-zinc-950/90 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {st.frequencyMhz.toFixed(1)} · {st.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Transport Controls, Volume & Equalizer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onStepStation('prev')}
            aria-label="Previous station on dial"
            className="min-h-[44px] min-w-[44px] rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={
              isPlaying
                ? `Pause ${activeStation.name}`
                : `Play ${activeStation.name} live stream`
            }
            className="min-h-[48px] px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm flex items-center gap-2.5 shadow-md active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Broadcast</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {playbackStatus === 'connecting' ? 'Tuning...' : 'Listen Live'}
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onStepStation('next')}
            aria-label="Next station on dial"
            className="min-h-[44px] min-w-[44px] rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(activeStation.id)}
            aria-label={
              isFavorite
                ? `Remove ${activeStation.name} from favorites`
                : `Save ${activeStation.name} to favorites`
            }
            className={`min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition-colors ${
              isFavorite
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                : 'bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Controls: Volume & Studio Equalizer */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-950/90 border border-zinc-800 rounded-xl px-3 min-h-[44px]">
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              className="text-zinc-400 hover:text-white p-1"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <label htmlFor="tuner-volume-slider" className="sr-only">
              Broadcast Volume
            </label>
            <input
              id="tuner-volume-slider"
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : Math.round(volume * 100)}
              onChange={(e) => onChangeVolume(Number(e.target.value) / 100)}
              className="w-20 sm:w-24 accent-amber-500 cursor-pointer"
            />
            <span className="font-mono text-xs text-zinc-400 w-8 text-right tabular-nums">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenAudioSettings}
            aria-label="Open Studio Equalizer and Custom Stream Settings"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Studio EQ & Sleep Timer</span>
          </button>
        </div>
      </div>
    </section>
  );
};
