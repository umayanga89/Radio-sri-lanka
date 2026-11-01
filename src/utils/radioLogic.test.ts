import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeDirectoryStats,
  filterStations,
  formatSleepCountdown,
  validateCustomStationInput
} from './radioLogic';
import { SRI_LANKAN_STATIONS } from '../data/sriLankanStations';

test('directory includes Siyatha FM, E FM, and 52 unique FM frequencies across all 3 languages', () => {
  const stats = computeDirectoryStats(SRI_LANKAN_STATIONS);
  assert.equal(stats.totalChannels, 52);
  assert.ok(stats.sinhalaCount >= 25);
  assert.ok(stats.tamilCount >= 8);
  assert.ok(stats.englishCount >= 14);

  const uniqueFreqs = new Set(SRI_LANKAN_STATIONS.map((s) => s.frequencyMhz));
  assert.equal(
    uniqueFreqs.size,
    SRI_LANKAN_STATIONS.length,
    'Every Sri Lankan radio station must have a distinct FM dial position'
  );

  const siyatha = SRI_LANKAN_STATIONS.find((s) => s.id === 'siyatha-fm');
  assert.ok(siyatha, 'Siyatha FM must exist in the station catalog');
  assert.equal(siyatha.name, 'Siyatha FM');
  assert.equal(siyatha.frequencyMhz, 98.2);

  const efm = SRI_LANKAN_STATIONS.find((s) => s.id === 'e-fm');
  assert.ok(efm, 'E FM must exist in the station catalog');
  assert.equal(efm.name, 'E FM 88.3');
  assert.equal(efm.frequencyMhz, 88.3);
});

test('filterStations finds Siyatha FM and E FM by name and frequency', () => {
  const byName = filterStations(SRI_LANKAN_STATIONS, {
    searchQuery: 'Siyatha'
  });
  assert.equal(byName.length, 1);
  assert.equal(byName[0].id, 'siyatha-fm');

  const efmSearch = filterStations(SRI_LANKAN_STATIONS, {
    searchQuery: 'E FM'
  });
  assert.ok(efmSearch.some((s) => s.id === 'e-fm'));

  const byFreq = filterStations(SRI_LANKAN_STATIONS, {
    searchQuery: '98.2'
  });
  assert.equal(byFreq.length, 1);
  assert.equal(byFreq[0].id, 'siyatha-fm');
});

test('filterStations filters by language, category, favorites, and sortBy modes', () => {
  const tamilStations = filterStations(SRI_LANKAN_STATIONS, {
    language: 'Tamil'
  });
  assert.ok(tamilStations.length >= 8);
  assert.ok(tamilStations.every((s) => s.language === 'Tamil'));

  const sortedByFreq = filterStations(SRI_LANKAN_STATIONS, {
    sortBy: 'frequency'
  });
  assert.ok(sortedByFreq[0].frequencyMhz < sortedByFreq[sortedByFreq.length - 1].frequencyMhz);

  const sortedByName = filterStations(SRI_LANKAN_STATIONS, {
    sortBy: 'name'
  });
  assert.ok(sortedByName[0].name.localeCompare(sortedByName[1].name) <= 0);

  const favOnly = filterStations(SRI_LANKAN_STATIONS, {
    onlyFavorites: true,
    favoriteIds: ['siyatha-fm', 'fm-derana', 'sooriyan-fm']
  });
  assert.equal(favOnly.length, 3);
});

test('validateCustomStationInput and formatSleepCountdown work accurately', () => {
  const invalidFreq = validateCustomStationInput({
    name: 'Rajarata FM',
    frequencyMhz: '115.2',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Anuradhapura',
    streamUrl: 'https://example.com/stream.mp3'
  });
  assert.equal(invalidFreq.valid, false);

  const valid = validateCustomStationInput({
    name: 'Rajarata FM',
    frequencyMhz: '107.3',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Anuradhapura',
    streamUrl: 'https://example.com/rajarata.mp3'
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.parsedFrequency, 107.3);

  assert.equal(formatSleepCountdown(null), null);
  assert.equal(formatSleepCountdown(905), '15:05');
});

