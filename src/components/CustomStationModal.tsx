import React, { useState } from 'react';
import { PlusCircle, Sliders, Timer, X } from 'lucide-react';
import {
  EQUALIZER_PRESETS,
  EqualizerPresetId
} from '../utils/audioEngine';
import {
  RadioCategory,
  RadioLanguage,
  SriLankanStation
} from '../data/sriLankanStations';
import { validateCustomStationInput } from '../utils/radioLogic';

interface CustomStationModalProps {
  isOpen: boolean;
  activeEqPreset: EqualizerPresetId;
  sleepTimerMinutes: number | null;
  onClose: () => void;
  onSelectEqPreset: (presetId: EqualizerPresetId) => void;
  onSetSleepTimer: (minutes: number | null) => void;
  onAddCustomStation: (station: SriLankanStation) => void;
}

export const CustomStationModal: React.FC<CustomStationModalProps> = ({
  isOpen,
  activeEqPreset,
  sleepTimerMinutes,
  onClose,
  onSelectEqPreset,
  onSetSleepTimer,
  onAddCustomStation
}) => {
  const [name, setName] = useState('');
  const [frequencyMhz, setFrequencyMhz] = useState('104.2');
  const [language, setLanguage] = useState<RadioLanguage>('Sinhala');
  const [category, setCategory] = useState<RadioCategory>('Top Hits');
  const [city, setCity] = useState('Kandy');
  const [streamUrl, setStreamUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validation = validateCustomStationInput({
      name,
      frequencyMhz,
      language,
      category,
      city,
      streamUrl
    });

    if (!validation.valid || !validation.parsedFrequency) {
      setErrorMsg(validation.error || 'Please check station details.');
      return;
    }

    const newStation: SriLankanStation = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      nativeName: `${name.trim()} (${city.trim() || 'Sri Lanka'})`,
      frequencyMhz: validation.parsedFrequency,
      frequencyLabel: `${validation.parsedFrequency.toFixed(1)} FM`,
      language,
      category,
      city: city.trim() || 'Colombo',
      network: 'Custom User Stream',
      tagline: 'User-Added Sri Lankan Online Broadcast',
      currentShow: 'Live Online Stream',
      currentHost: 'Station Broadcast',
      streamUrl: streamUrl.trim(),
      fallbackStreamUrls: [],
      bitrateKbps: 128,
      listenersCount: 1200,
      accentHex: '#f59e0b',
      synthProfile: {
        baseFreq: 220,
        chordIntervals: [0, 4, 7, 11],
        tempoBpm: 96,
        timbre: 'warm-pad'
      },
      isCustom: true
    };

    onAddCustomStation(newStation);
    setSuccessMsg(`Added ${newStation.name} (${newStation.frequencyLabel}) to tuner.`);
    setName('');
    setStreamUrl('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-settings-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
    >
      <div className="w-full max-w-2xl rounded-t-3xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-5 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-amber-500" />
            <h2
              id="studio-settings-modal-title"
              className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
            >
              Studio Equalizer, Sleep Timer & Custom Stream
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Studio Settings"
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 mt-5">
          {/* 1. 5-Band Equalizer Presets */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">
              Acoustic Equalizer Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EQUALIZER_PRESETS.map((preset) => {
                const active = activeEqPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectEqPreset(preset.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      active
                        ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white'
                        : 'bg-stone-50 dark:bg-zinc-950 border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{preset.label}</span>
                      <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                        {preset.gainsDb.map((g) => (g >= 0 ? `+${g}` : g)).join(' / ')} dB
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sleep Timer */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">
              <Timer className="w-4 h-4 text-amber-500" />
              <span>Auto-Off Sleep Timer</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[null, 15, 30, 45, 60].map((mins) => {
                const isSelected = sleepTimerMinutes === mins;
                return (
                  <button
                    key={String(mins)}
                    type="button"
                    onClick={() => onSetSleepTimer(mins)}
                    className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 font-semibold'
                        : 'bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {mins === null ? 'Off' : `${mins} Minutes`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Add Custom Sri Lankan Station Stream */}
          <form
            onSubmit={handleSubmit}
            className="pt-4 border-t border-stone-200 dark:border-zinc-800 space-y-4"
            noValidate
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PlusCircle className="w-4 h-4 text-amber-500" />
              <span>Add Custom Radio Stream URL</span>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 font-medium"
              >
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
              >
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="custom-station-name"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
                >
                  Station Name
                </label>
                <input
                  id="custom-station-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajarata Sevaya FM"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-station-freq"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
                >
                  Frequency (87.5 – 108.0 MHz)
                </label>
                <input
                  id="custom-station-freq"
                  type="number"
                  step="0.1"
                  min="87.5"
                  max="108.0"
                  value={frequencyMhz}
                  onChange={(e) => setFrequencyMhz(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-station-lang"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
                >
                  Broadcast Language
                </label>
                <select
                  id="custom-station-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as RadioLanguage)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  <option value="Sinhala">Sinhala</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-station-city"
                  className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
                >
                  Broadcast City
                </label>
                <input
                  id="custom-station-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Colombo / Kandy / Jaffna"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="custom-station-url"
                className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
              >
                Direct Stream URL (MP3 / AAC / HLS .m3u8)
              </label>
              <input
                id="custom-station-url"
                type="url"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="https://stream.example.lk:8000/live.mp3"
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-zinc-950 border border-stone-300 dark:border-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[42px] px-4 py-2 rounded-xl border border-stone-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                Done
              </button>
              <button
                type="submit"
                className="min-h-[42px] px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-colors"
              >
                Add Station to Directory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
