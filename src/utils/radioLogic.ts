import {
  RadioCategory,
  RadioLanguage,
  SriLankanStation
} from '../data/sriLankanStations';

export interface ListeningSessionRecord {
  stationId: string;
  stationName: string;
  language: RadioLanguage;
  category: RadioCategory;
  minutesListened: number;
  timestampIso: string;
  hourOfDay: number;
}

export interface DirectorySummaryStats {
  totalChannels: number;
  sinhalaCount: number;
  tamilCount: number;
  englishCount: number;
  totalListeners: number;
}

export type StationSortMode = 'popular' | 'frequency' | 'name';

export interface StationFilterOptions {
  language?: RadioLanguage | 'All';
  category?: RadioCategory | 'All';
  searchQuery?: string;
  onlyFavorites?: boolean;
  favoriteIds?: string[];
  sortBy?: StationSortMode;
}

export function formatSleepCountdown(secondsLeft: number | null): string | null {
  if (secondsLeft === null || secondsLeft <= 0) return null;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function computeDirectoryStats(
  stations: SriLankanStation[]
): DirectorySummaryStats {
  let sinhalaCount = 0;
  let tamilCount = 0;
  let englishCount = 0;
  let totalListeners = 0;

  for (const st of stations) {
    if (st.language === 'Sinhala') sinhalaCount += 1;
    else if (st.language === 'Tamil') tamilCount += 1;
    else if (st.language === 'English') englishCount += 1;
    totalListeners += st.listenersCount || 0;
  }

  return {
    totalChannels: stations.length,
    sinhalaCount,
    tamilCount,
    englishCount,
    totalListeners
  };
}

export function filterStations(
  stations: SriLankanStation[],
  options: StationFilterOptions
): SriLankanStation[] {
  const {
    language = 'All',
    category = 'All',
    searchQuery = '',
    onlyFavorites = false,
    favoriteIds = [],
    sortBy = 'popular'
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  return stations
    .filter((station) => {
      if (language !== 'All' && station.language !== language) {
        return false;
      }
      if (category !== 'All' && station.category !== category) {
        return false;
      }
      if (onlyFavorites && !favoriteIds.includes(station.id)) {
        return false;
      }
      if (normalizedQuery.length > 0) {
        const matchesName = station.name.toLowerCase().includes(normalizedQuery);
        const matchesNative = station.nativeName.toLowerCase().includes(normalizedQuery);
        const matchesFreq =
          station.frequencyLabel.toLowerCase().includes(normalizedQuery) ||
          station.frequencyMhz.toFixed(1).includes(normalizedQuery);
        const matchesCity = station.city.toLowerCase().includes(normalizedQuery);
        const matchesNetwork = station.network.toLowerCase().includes(normalizedQuery);
        const matchesShow = station.currentShow.toLowerCase().includes(normalizedQuery);
        const matchesCategory = station.category.toLowerCase().includes(normalizedQuery);
        return (
          matchesName ||
          matchesNative ||
          matchesFreq ||
          matchesCity ||
          matchesNetwork ||
          matchesShow ||
          matchesCategory
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'frequency') {
        return a.frequencyMhz - b.frequencyMhz;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      const aFav = favoriteIds.includes(a.id) ? 1 : 0;
      const bFav = favoriteIds.includes(b.id) ? 1 : 0;
      if (aFav !== bFav) return bFav - aFav;
      return b.listenersCount - a.listenersCount;
    });
}

export interface CustomStationInput {
  name: string;
  frequencyMhz: string;
  language: RadioLanguage;
  category: RadioCategory;
  city: string;
  streamUrl: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  parsedFrequency?: number;
}

export function validateCustomStationInput(input: CustomStationInput): ValidationResult {
  const trimmedName = input.name.trim();
  if (trimmedName.length < 2) {
    return { valid: false, error: 'Station name must be at least 2 characters.' };
  }

  const freq = Number(input.frequencyMhz);
  if (Number.isNaN(freq) || freq < 87.5 || freq > 108.0) {
    return {
      valid: false,
      error: 'FM frequency must be between 87.5 and 108.0 MHz.'
    };
  }

  const trimmedUrl = input.streamUrl.trim();
  if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
    return {
      valid: false,
      error: 'Stream URL must start with http:// or https://.'
    };
  }

  return {
    valid: true,
    parsedFrequency: Number(freq.toFixed(1))
  };
}
