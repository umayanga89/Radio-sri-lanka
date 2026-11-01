import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpDown,
  Bookmark,
  Clock,
  Globe,
  Heart,
  Moon,
  Pause,
  Play,
  Radio,
  Search,
  Sliders,
  Sun,
  Trash2,
  X
} from 'lucide-react';
import {
  RadioCategory,
  RadioLanguage,
  SRI_LANKAN_STATIONS,
  SriLankanStation
} from './data/sriLankanStations';
import {
  computeDirectoryStats,
  filterStations,
  StationSortMode
} from './utils/radioLogic';
import {
  AudioPlaybackStatus,
  EqualizerPresetId,
  SriLankanAudioController
} from './utils/audioEngine';
import { NavFilterTab, TopBar } from './components/TopBar';
import { AnalogFrequencyDial } from './components/AnalogFrequencyDial';
import { StationArtwork } from './components/StationArtwork';
import { CustomStationModal } from './components/CustomStationModal';

const CATEGORIES: (RadioCategory | 'All')[] = [
  'All',
  'Top Hits',
  'Youth & Urban',
  'Classic & Retro',
  'News & Current Affairs',
  'Acoustic & Lounge',
  'Spiritual & Dhamma',
  'Regional & Cultural'
];

export default function App() {
  // Theme state (synced with <html> .dark class)
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Stations state (with custom stations persisted in localStorage)
  const [stations, setStations] = useState<SriLankanStation[]>(() => {
    try {
      const savedCustom = localStorage.getItem('lankawave_custom_stations');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom) as SriLankanStation[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...SRI_LANKAN_STATIONS];
        }
      }
    } catch {
      // ignore
    }
    return SRI_LANKAN_STATIONS;
  });

  // Fetch enriched live station URLs from backend /api/stations/live
  useEffect(() => {
    let active = true;
    fetch('/api/stations/live')
      .then((res) => res.json())
      .then((data) => {
        if (active && data && Array.isArray(data.stations)) {
          setStations((prev) => {
            const customOnly = prev.filter((s) => s.isCustom);
            return [...customOnly, ...data.stations];
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Default to Siyatha FM (98.2 FM)
  const [activeStationId, setActiveStationId] = useState<string>('siyatha-fm');
  const [playbackStatus, setPlaybackStatus] = useState<AudioPlaybackStatus>('idle');
  const [statusDetail, setStatusDetail] = useState<string>(
    'Ready to stream · 98.2 FM Colombo / Island-Wide'
  );
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [eqPreset, setEqPreset] = useState<EqualizerPresetId>('warm-vinyl');
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepSecondsLeft, setSleepSecondsLeft] = useState<number | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Recently Tuned Stations
  const [recentStationIds, setRecentStationIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lankawave_recent_stations');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['siyatha-fm', 'e-fm', 'sirasa-fm', 'hiru-fm', 'sooriyan-fm'];
  });

  // Filtering & Sorting State
  const [selectedLanguage, setSelectedLanguage] = useState<RadioLanguage | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<RadioCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<StationSortMode>('popular');

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lankawave_favorites_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['siyatha-fm', 'e-fm', 'sirasa-fm', 'hiru-fm', 'fm-derana', 'sun-fm', 'sooriyan-fm'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('lankawave_favorites_v2', JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  // Audio Controller Ref
  const audioControllerRef = useRef<SriLankanAudioController | null>(null);
  if (!audioControllerRef.current && typeof window !== 'undefined') {
    audioControllerRef.current = new SriLankanAudioController((status, detail) => {
      setPlaybackStatus(status);
      setStatusDetail(detail);
    });
  }

  useEffect(() => {
    return () => {
      audioControllerRef.current?.stopAll();
    };
  }, []);

  // Real-time 1-second Sleep Timer Countdown that pauses audio when expired
  useEffect(() => {
    if (sleepSecondsLeft === null) return;
    if (sleepSecondsLeft <= 0) {
      audioControllerRef.current?.pause();
      setSleepTimerMinutes(null);
      setSleepSecondsLeft(null);
      setStatusDetail('Broadcast paused by Sleep Timer');
      return;
    }
    const timer = window.setInterval(() => {
      setSleepSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sleepSecondsLeft]);

  const handleSetSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    setSleepSecondsLeft(minutes ? minutes * 60 : null);
  };

  const activeStation = useMemo(() => {
    return (
      stations.find((s) => s.id === activeStationId) ||
      stations[0] ||
      SRI_LANKAN_STATIONS[0]
    );
  }, [stations, activeStationId]);

  const directoryStats = useMemo(() => {
    return computeDirectoryStats(stations);
  }, [stations]);

  const filteredStations = useMemo(() => {
    return filterStations(stations, {
      language: selectedLanguage,
      category: selectedCategory,
      searchQuery,
      onlyFavorites,
      favoriteIds,
      sortBy
    });
  }, [stations, selectedLanguage, selectedCategory, searchQuery, onlyFavorites, favoriteIds, sortBy]);

  const recentStations = useMemo(() => {
    return recentStationIds
      .map((id) => stations.find((s) => s.id === id))
      .filter((s): s is SriLankanStation => Boolean(s))
      .slice(0, 8);
  }, [recentStationIds, stations]);

  const activeNavTab: NavFilterTab = onlyFavorites ? 'Favorites' : selectedLanguage;

  const handleSelectNavTab = (tab: NavFilterTab) => {
    if (tab === 'Favorites') {
      setOnlyFavorites(true);
      setSelectedLanguage('All');
    } else {
      setOnlyFavorites(false);
      setSelectedLanguage(tab);
    }
  };

  const handleSelectStation = (station: SriLankanStation) => {
    setActiveStationId(station.id);
    audioControllerRef.current?.playStation(station);
    setRecentStationIds((prev) => {
      const next = [station.id, ...prev.filter((id) => id !== station.id)].slice(0, 8);
      try {
        localStorage.setItem('lankawave_recent_stations', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleTogglePlay = () => {
    const isPlaying =
      playbackStatus === 'streaming-live' || playbackStatus === 'studio-synth';
    if (isPlaying) {
      audioControllerRef.current?.pause();
    } else {
      audioControllerRef.current?.playStation(activeStation);
    }
  };

  const handleStepStation = (direction: 'prev' | 'next') => {
    const sorted = [...stations].sort((a, b) => a.frequencyMhz - b.frequencyMhz);
    const idx = sorted.findIndex((s) => s.id === activeStation.id);
    const nextIdx =
      direction === 'next'
        ? (idx + 1) % sorted.length
        : (idx - 1 + sorted.length) % sorted.length;
    handleSelectStation(sorted[nextIdx]);
  };

  const handleToggleFavorite = (stationId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  const handleChangeVolume = (val: number) => {
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    audioControllerRef.current?.setVolume(val);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioControllerRef.current?.setMuted(nextMuted);
  };

  const handleSelectEqPreset = (presetId: EqualizerPresetId) => {
    setEqPreset(presetId);
    audioControllerRef.current?.setEqualizerPreset(presetId);
  };

  const handleAddCustomStation = (newStation: SriLankanStation) => {
    setStations((prev) => {
      const updated = [newStation, ...prev];
      const customOnly = updated.filter((s) => s.isCustom);
      try {
        localStorage.setItem(
          'lankawave_custom_stations',
          JSON.stringify(customOnly)
        );
      } catch {
        // ignore
      }
      return updated;
    });
    handleSelectStation(newStation);
  };

  const handleDeleteCustomStation = (stationId: string) => {
    setStations((prev) => {
      const updated = prev.filter((s) => s.id !== stationId);
      const customOnly = updated.filter((s) => s.isCustom);
      try {
        localStorage.setItem('lankawave_custom_stations', JSON.stringify(customOnly));
      } catch {
        // ignore
      }
      return updated;
    });
    if (activeStationId === stationId) {
      setActiveStationId('siyatha-fm');
    }
  };

  const isPlaying =
    playbackStatus === 'streaming-live' || playbackStatus === 'studio-synth';

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-stone-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-20 md:pb-12"
    >
      {/* Strict 3-Zone Top Bar */}
      <TopBar
        activeTab={activeNavTab}
        onSelectTab={handleSelectNavTab}
        onOpenStudioSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Responsive Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 space-y-8">
        {/* Workspace Utility Toolbar below header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Sri Lanka All-Island Live Radio Directory
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {directoryStats.totalChannels} Active Channels
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              Sinhala ({directoryStats.sinhalaCount}) / Tamil ({directoryStats.tamilCount}) / English ({directoryStats.englishCount})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 hover:border-amber-500/50 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span>Equalizer & Sleep Timer</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to Daylight Mode' : 'Switch to Studio Dark Mode'}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daylight</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Studio Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Analog Frequency Dial */}
        <AnalogFrequencyDial
          stations={stations}
          activeStation={activeStation}
          isPlaying={isPlaying}
          playbackStatus={playbackStatus}
          statusDetail={statusDetail}
          isFavorite={favoriteIds.includes(activeStation.id)}
          isMuted={isMuted}
          volume={volume}
          activeEqPreset={eqPreset}
          sleepSecondsLeft={sleepSecondsLeft}
          onSelectStation={handleSelectStation}
          onTogglePlay={handleTogglePlay}
          onStepStation={handleStepStation}
          onToggleFavorite={handleToggleFavorite}
          onToggleMute={handleToggleMute}
          onChangeVolume={handleChangeVolume}
          onOpenAudioSettings={() => setIsSettingsModalOpen(true)}
        />

        {/* Complete Sri Lankan Radio Channel Directory */}
        <section aria-label="All Sri Lankan Radio Channels" className="space-y-5">
          {/* Recently Tuned Quick Strip */}
          {recentStations.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 whitespace-nowrap shrink-0 pr-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                <span>Recently Tuned:</span>
              </span>
              {recentStations.map((st) => {
                const isCurrent = st.id === activeStation.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStation(st)}
                    className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-600 dark:text-amber-400 font-semibold'
                        : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 tabular-nums">
                      {st.frequencyMhz.toFixed(1)}
                    </span>
                    <span>{st.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {onlyFavorites
                  ? `My Favorite Sri Lankan Channels (${filteredStations.length})`
                  : `All Sri Lankan Radio Channels (${filteredStations.length})`}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Featuring Siyatha FM, E FM 88.3, Sirasa FM, Hiru FM, FM Derana, Shaa FM, Sooriyan FM, Shakthi FM, Sun FM & SLBC
              </p>
            </div>

            {/* Language Segmented Filter */}
            <div
              role="group"
              aria-label="Filter stations by language"
              className="flex items-center gap-1 p-1 bg-stone-200/80 dark:bg-zinc-900 rounded-xl border border-stone-300/60 dark:border-zinc-800 self-start"
            >
              {(
                [
                  { id: 'All', label: `All (${directoryStats.totalChannels})` },
                  { id: 'Sinhala', label: `Sinhala (${directoryStats.sinhalaCount})` },
                  { id: 'Tamil', label: `Tamil (${directoryStats.tamilCount})` },
                  { id: 'English', label: `English (${directoryStats.englishCount})` }
                ] as const
              ).map((item) => {
                const active = selectedLanguage === item.id && !onlyFavorites;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOnlyFavorites(false);
                      setSelectedLanguage(item.id);
                    }}
                    className={`min-h-[36px] px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white dark:bg-amber-500 text-zinc-950 font-semibold shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search, Sort & Favorites Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="station-search-input" className="sr-only">
                Search Sri Lankan radio stations by name, frequency, or city
              </label>
              <input
                id="station-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Siyatha FM, E FM 88.3, Derana, Sirasa, Hiru, Sooriyan, SLBC, frequency..."
                className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <ArrowUpDown
                  className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none"
                  aria-hidden="true"
                />
                <label htmlFor="station-sort-select" className="sr-only">
                  Sort stations by
                </label>
                <select
                  id="station-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as StationSortMode)}
                  className="min-h-[44px] pl-8 pr-3 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="popular">Sort: Popular</option>
                  <option value="frequency">Sort: FM Dial (87.5–108)</option>
                  <option value="name">Sort: Name (A–Z)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setOnlyFavorites((prev) => !prev)}
                aria-pressed={onlyFavorites}
                className={`min-h-[44px] px-4 py-2 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                  onlyFavorites
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
                    : 'bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`}
                />
                <span>Favorites ({favoriteIds.length})</span>
              </button>
            </div>
          </div>

          {/* Category Filter Scroller */}
          <div
            role="group"
            aria-label="Filter stations by genre"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-stone-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3-Column Full-Width Station Cards Grid */}
          {filteredStations.length === 0 ? (
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 text-center space-y-3">
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                No Sri Lankan channels match your current filter
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Try clearing your search query or switching language/genre filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLanguage('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setOnlyFavorites(false);
                }}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStations.map((station) => {
                const isCurrent = station.id === activeStation.id;
                const isStationPlaying = isCurrent && isPlaying;
                const isFav = favoriteIds.includes(station.id);

                return (
                  <div
                    key={station.id}
                    className={`group rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-500/[0.08] dark:bg-amber-500/[0.09] border-amber-500/70'
                        : 'bg-white dark:bg-zinc-900 border-stone-200/90 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleSelectStation(station)}
                        className="flex items-start gap-3 text-left min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-amber-500 rounded-xl"
                      >
                        <StationArtwork
                          name={station.name}
                          frequencyLabel={station.frequencyLabel}
                          language={station.language}
                          category={station.category}
                          accentHex={station.accentHex}
                        />
                        <div className="min-w-0 flex-1">
                          {/* Unboxed metadata kicker */}
                          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono tabular-nums overflow-hidden">
                            <span className="text-amber-600 dark:text-amber-400 font-semibold whitespace-nowrap shrink-0">
                              {station.frequencyLabel}
                            </span>
                            <span aria-hidden="true" className="shrink-0">
                              ·
                            </span>
                            <span className="whitespace-nowrap shrink-0">
                              {station.language}
                            </span>
                            <span aria-hidden="true" className="shrink-0">
                              ·
                            </span>
                            <span className="truncate">{station.city}</span>
                          </div>

                          <div className="flex items-baseline gap-2 mt-0.5">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                              {station.name}
                            </h3>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                              {station.nativeName}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {station.currentShow}
                          </p>
                        </div>
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        {station.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomStation(station.id)}
                            aria-label={`Delete custom station ${station.name}`}
                            className="min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleToggleFavorite(station.id)}
                          aria-label={
                            isFav
                              ? `Remove ${station.name} from favorites`
                              : `Favorite ${station.name}`
                          }
                          className={`min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center transition-colors ${
                            isFav
                              ? 'text-rose-500 bg-rose-500/10'
                              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-stone-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        <span>{station.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono tabular-nums">
                          {(station.listenersCount / 1000).toFixed(1)}k tuned
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isCurrent) {
                            handleTogglePlay();
                          } else {
                            handleSelectStation(station);
                          }
                        }}
                        aria-label={
                          isStationPlaying
                            ? `Pause ${station.name}`
                            : `Tune to ${station.name}`
                        }
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                          isStationPlaying
                            ? 'bg-amber-500 text-zinc-950'
                            : 'bg-stone-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-amber-500 hover:text-zinc-950'
                        }`}
                      >
                        {isStationPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Tune In</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="mt-12 border-t border-stone-200 dark:border-zinc-800/80 py-6 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            LankaWave All-Island Sri Lankan Live Radio Directory ({directoryStats.totalChannels} Channels) · Colombo, Sri Lanka
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-4 hover:underline"
            >
              Audio Equalizer & Sleep Timer
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setSelectedLanguage('All');
                setSelectedCategory('All');
                setOnlyFavorites(false);
                setSearchQuery('');
              }}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 underline-offset-4 hover:underline"
            >
              All Island Frequencies (87.5 – 108.0 MHz)
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Ergonomic Bottom Tab Bar (Thumb Zone Anchor, <= 64px height) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-stone-200 dark:border-zinc-800 grid grid-cols-4 items-center px-2"
      >
        <button
          type="button"
          onClick={() => handleSelectNavTab('All')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeNavTab === 'All'
              ? 'text-amber-500 font-semibold'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">All ({directoryStats.totalChannels})</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectNavTab('Sinhala')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeNavTab === 'Sinhala'
              ? 'text-amber-500 font-semibold'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Sinhala FM</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectNavTab('Tamil')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeNavTab === 'Tamil'
              ? 'text-amber-500 font-semibold'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Tamil FM</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectNavTab('Favorites')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeNavTab === 'Favorites'
              ? 'text-amber-500 font-semibold'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Favorites</span>
        </button>
      </nav>

      {/* Studio Equalizer, Sleep Timer & Custom Station Modal */}
      <CustomStationModal
        isOpen={isSettingsModalOpen}
        activeEqPreset={eqPreset}
        sleepTimerMinutes={sleepTimerMinutes}
        onClose={() => setIsSettingsModalOpen(false)}
        onSelectEqPreset={handleSelectEqPreset}
        onSetSleepTimer={handleSetSleepTimer}
        onAddCustomStation={handleAddCustomStation}
      />
    </div>
  );
}
