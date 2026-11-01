export type RadioLanguage = 'Sinhala' | 'Tamil' | 'English';

export type RadioCategory =
  | 'Top Hits'
  | 'Classic & Retro'
  | 'News & Current Affairs'
  | 'Youth & Urban'
  | 'Acoustic & Lounge'
  | 'Spiritual & Dhamma'
  | 'Regional & Cultural';

export interface SriLankanStation {
  id: string;
  name: string;
  nativeName: string;
  frequencyMhz: number;
  frequencyLabel: string;
  language: RadioLanguage;
  category: RadioCategory;
  city: string;
  network: string;
  tagline: string;
  currentShow: string;
  currentHost: string;
  streamUrl: string;
  fallbackStreamUrls: string[];
  bitrateKbps: number;
  listenersCount: number;
  accentHex: string;
  synthProfile: {
    baseFreq: number;
    chordIntervals: number[];
    tempoBpm: number;
    timbre: 'warm-pad' | 'baila-rhythm' | 'lounge-keys' | 'classic-strings' | 'talk-chime';
  };
  isCustom?: boolean;
}

export const SRI_LANKAN_STATIONS: SriLankanStation[] = [
  // ==================== SINHALA CHANNELS ====================
  {
    id: 'siyatha-fm',
    name: 'Siyatha FM',
    nativeName: 'සියත FM',
    frequencyMhz: 98.2,
    frequencyLabel: '98.2 FM',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Colombo / Island-Wide',
    network: 'Voice of Asia Network',
    tagline: 'Rasama Rasa Sindu — Non-Stop Sinhala Super Hits & Morning Show',
    currentShow: 'Siyatha Morning Show & Super Hits',
    currentHost: 'Aravinda & DJ Rashmi',
    streamUrl: 'https://srv01.onlineradio.voaplus.com/siyathafm',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden',
      'http://live.trusl.com:1170/;'
    ],
    bitrateKbps: 128,
    listenersCount: 22450,
    accentHex: '#f59e0b',
    synthProfile: {
      baseFreq: 233.08,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 112,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'sirasa-fm',
    name: 'Sirasa FM',
    nativeName: 'සිරස FM',
    frequencyMhz: 106.5,
    frequencyLabel: '106.5 FM',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Colombo',
    network: 'MBC Networks',
    tagline: 'Hadaena Thana — The Pulse of Sri Lanka',
    currentShow: 'Sooriyaena Sirasa Morning Drive',
    currentHost: 'Kasun & Tharushi',
    streamUrl: 'http://live.trusl.com:1170/;',
    fallbackStreamUrls: [
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 21800,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 220,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 108,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'hiru-fm',
    name: 'Hiru FM',
    nativeName: 'හිරු FM',
    frequencyMhz: 96.1,
    frequencyLabel: '96.1 FM',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Colombo',
    network: 'Asia Broadcasting Corporation',
    tagline: 'Sri Lanka’s Number One Hit Station',
    currentShow: 'Hiru Chart Show & Requests',
    currentHost: 'DJ Ara & Pasbara',
    streamUrl: 'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden',
    fallbackStreamUrls: [
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'http://live.trusl.com:1170/;'
    ],
    bitrateKbps: 128,
    listenersCount: 23100,
    accentHex: '#ea580c',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 114,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'fm-derana',
    name: 'FM Derana',
    nativeName: 'FM දෙරණ',
    frequencyMhz: 92.2,
    frequencyLabel: '92.2 FM',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Colombo / Island-Wide',
    network: 'Power House Ltd (Derana Network)',
    tagline: 'Little Star & Sri Lankan Contemporary Hit Radio',
    currentShow: 'Derana Aruna & Top 20 Countdown',
    currentHost: 'Chathura & Peshala',
    streamUrl: 'https://a3.asurahosting.com/listen/ranfm/radio.mp3',
    fallbackStreamUrls: [
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 19650,
    accentHex: '#dc2626',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 110,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'shaa-fm',
    name: 'Shaa FM',
    nativeName: 'ෂා FM',
    frequencyMhz: 90.9,
    frequencyLabel: '90.9 FM',
    language: 'Sinhala',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'Asia Broadcasting Corporation',
    tagline: 'Sindu Kiyana Radio — Non-Stop Sinhala Melodies',
    currentShow: 'Shaa Unplugged Acoustic Hour',
    currentHost: 'Nimesh Perera',
    streamUrl: 'https://radio.lotustechnologieslk.net:2020/stream/shaafmgarden',
    fallbackStreamUrls: [
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'https://radio.lotustechnologieslk.net:2020/stream/hirufmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 17420,
    accentHex: '#e11d48',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 9],
      tempoBpm: 96,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'y-fm',
    name: 'Y FM',
    nativeName: 'Y FM ශ්‍රී ලංකා',
    frequencyMhz: 92.7,
    frequencyLabel: '92.7 FM',
    language: 'Sinhala',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'MBC Networks',
    tagline: 'Youth Beats & Contemporary Sinhala Pop',
    currentShow: 'Colombo Rush Mix',
    currentHost: 'Shenal & Kavindi',
    streamUrl: 'https://mbc.thestreamtech.com:7032/',
    fallbackStreamUrls: [
      'http://live.trusl.com:1180/;',
      'https://radio.lotustechnologieslk.net:2020/stream/shaafmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 13840,
    accentHex: '#f59e0b',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 120,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'neth-fm',
    name: 'Neth FM',
    nativeName: 'නෙත් FM',
    frequencyMhz: 95.0,
    frequencyLabel: '95.0 FM',
    language: 'Sinhala',
    category: 'News & Current Affairs',
    city: 'Colombo',
    network: 'Asset Radio Broadcasting',
    tagline: 'Subhawitha — Responsible Journalism & Classic Sinhala Geetha',
    currentShow: 'Badaemilla & Classic Sarala Gee',
    currentHost: 'Nuwan Liyanage',
    streamUrl: 'https://cp11.serverse.com/proxy/nethfm/stream',
    fallbackStreamUrls: [
      'https://cp12.serverse.com/proxy/itnfm?mp=/stream',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 15200,
    accentHex: '#059669',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 84,
      timbre: 'talk-chime'
    }
  },
  {
    id: 'lakhanda-radio',
    name: 'ITN FM (Lakhanda)',
    nativeName: 'ලක්හඬ 93.5',
    frequencyMhz: 93.5,
    frequencyLabel: '93.5 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Sri Jayawardenepura Kotte',
    network: 'Independent Television Network',
    tagline: 'Heritage Sinhala Music & Cultural Broadcast',
    currentShow: 'Gee Muthu Classic Archive',
    currentHost: 'Saman Athaudahetti',
    streamUrl: 'https://cp12.serverse.com/proxy/itnfm?mp=/stream',
    fallbackStreamUrls: [
      'https://cp11.serverse.com/proxy/nethfm/stream',
      'http://220.247.227.6:8000/Scomstream'
    ],
    bitrateKbps: 128,
    listenersCount: 11920,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 185.0,
      chordIntervals: [0, 4, 7, 9],
      tempoBpm: 80,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'ran-fm',
    name: 'Ran FM 100.5',
    nativeName: 'රන් FM 100.5',
    frequencyMhz: 100.5,
    frequencyLabel: '100.5 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Colombo / Island-Wide',
    network: 'EAP / Asura Broadcast Network',
    tagline: 'Ranwan Sinhala Geetha — 24/7 High-Fidelity Sinhala Classics',
    currentShow: 'Ran Sanda Eliya',
    currentHost: 'Chaminda Jayasinghe',
    streamUrl: 'https://a3.asurahosting.com/listen/ranfm/radio.mp3',
    fallbackStreamUrls: [
      'https://cp12.serverse.com/proxy/itnfm?mp=/stream',
      'http://151.80.42.191:8288/stream'
    ],
    bitrateKbps: 320,
    listenersCount: 14120,
    accentHex: '#eab308',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 86,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'shree-fm',
    name: 'Shree FM',
    nativeName: 'ශ්‍රී FM',
    frequencyMhz: 100.0,
    frequencyLabel: '100.0 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Colombo / Kandy',
    network: 'EAP Broadcasting',
    tagline: 'Harima Lassanai — Evergreen Sinhala Classics',
    currentShow: 'Sandaekirana Acoustic Memories',
    currentHost: 'Nalin Perera',
    streamUrl: 'https://radio-station.hadawatha.lk/listen/hadawatha-fm/radio.mp3',
    fallbackStreamUrls: [
      'https://a3.asurahosting.com/listen/ranfm/radio.mp3',
      'https://srv01.onlineradio.voaplus.com/siyathafm'
    ],
    bitrateKbps: 128,
    listenersCount: 12840,
    accentHex: '#7c3aed',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 82,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'rhythm-world',
    name: 'Rhythm World',
    nativeName: 'රිදම් වර්ල්ඩ්',
    frequencyMhz: 95.6,
    frequencyLabel: '95.6 FM',
    language: 'Sinhala',
    category: 'Acoustic & Lounge',
    city: 'Colombo',
    network: 'TNL Radio Network',
    tagline: 'Soulful Sinhala Melodies & Evening Breeze',
    currentShow: 'Colombo Twilight Acoustic',
    currentHost: 'Dilshan Fernando',
    streamUrl: 'https://radio-station.hadawatha.lk/listen/jothi-fm/radio.mp3',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/shaafmgarden',
      'https://a3.asurahosting.com/listen/ranfm/radio.mp3'
    ],
    bitrateKbps: 128,
    listenersCount: 11420,
    accentHex: '#0d9488',
    synthProfile: {
      baseFreq: 164.81,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 78,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'slbc-swadeshiya',
    name: 'SLBC Swadeshiya Sevaya',
    nativeName: 'ස්වදේශීය සේවය',
    frequencyMhz: 91.7,
    frequencyLabel: '91.7 FM',
    language: 'Sinhala',
    category: 'News & Current Affairs',
    city: 'Colombo / Island-Wide',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'National Sinhala Service of Radio Ceylon',
    currentShow: 'Subharathi & National News Bulletin',
    currentHost: 'SLBC National Desk',
    streamUrl: 'http://220.247.227.6:8000/Snsstream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Scomstream',
      'https://cp12.serverse.com/proxy/itnfm?mp=/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 14300,
    accentHex: '#b45309',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 76,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'slbc-welanda',
    name: 'SLBC Welanda Sevaya',
    nativeName: 'වෙළඳ සේවය',
    frequencyMhz: 94.3,
    frequencyLabel: '94.3 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Colombo / Island-Wide',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'The Legendary Commercial Service — Golden Sinhala Geetha',
    currentShow: 'Muwan Pelessa & Evergreen Classics',
    currentHost: 'Rathna Lanka',
    streamUrl: 'http://220.247.227.6:8000/Scomstream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Snsstream',
      'http://151.80.42.191:8288/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 13650,
    accentHex: '#ca8a04',
    synthProfile: {
      baseFreq: 174.61,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 80,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'slbc-city-fm',
    name: 'SLBC City FM',
    nativeName: 'සිටි FM 89.6',
    frequencyMhz: 89.6,
    frequencyLabel: '89.6 FM',
    language: 'Sinhala',
    category: 'Youth & Urban',
    city: 'Colombo / Kandy',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'The Historic Voice of Radio Ceylon Since 1925',
    currentShow: 'City Beats & Morning Requests',
    currentHost: 'SLBC Broadcast Desk',
    streamUrl: 'http://220.247.227.20:8000/citystream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Scomstream',
      'https://srv01.onlineradio.voaplus.com/siyathafm'
    ],
    bitrateKbps: 128,
    listenersCount: 11400,
    accentHex: '#b45309',
    synthProfile: {
      baseFreq: 207.65,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 85,
      timbre: 'talk-chime'
    }
  },
  {
    id: 'slbc-rajarata',
    name: 'Rajarata Sevaya',
    nativeName: 'රජරට සේවය',
    frequencyMhz: 107.3,
    frequencyLabel: '107.3 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Anuradhapura / North Central',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'The Voice of Nuwarakalaviya & Heritage Folk Songs',
    currentShow: 'Wew Bendi Rajje Gee',
    currentHost: 'Anuradhapura Studio',
    streamUrl: 'http://220.247.227.20:8000/rajaratastream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Snsstream',
      'https://rangiri.radioca.st/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 8900,
    accentHex: '#15803d',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 9],
      tempoBpm: 78,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'slbc-kandurata',
    name: 'Kandurata Sevaya',
    nativeName: 'කඳුරට සේවය',
    frequencyMhz: 107.5,
    frequencyLabel: '107.5 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Kandy / Central Highlands',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'Broadcasting from the Hill Capital of Kandy',
    currentShow: 'Senkadagala Sandhya',
    currentHost: 'Kandy Broadcast House',
    streamUrl: 'http://220.247.227.20:8000/kandystream',
    fallbackStreamUrls: [
      'https://s11.myradiostream.com:25116/listen.mp3',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 9420,
    accentHex: '#047857',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 82,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'kothmale-fm',
    name: 'Kothmale FM 98.4',
    nativeName: 'කොත්මලේ FM',
    frequencyMhz: 98.4,
    frequencyLabel: '98.4 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Kothmale / Nuwara Eliya',
    network: 'SLBC Community Broadcasting',
    tagline: 'Sri Lanka’s Pioneer Highland Community Radio Station',
    currentShow: 'Kanda Udarata Gee',
    currentHost: 'Kothmale Studio',
    streamUrl: 'https://s11.myradiostream.com:25116/listen.mp3',
    fallbackStreamUrls: [
      'http://220.247.227.20:8000/kandystream',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 7850,
    accentHex: '#059669',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 84,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'slbc-ruhunu',
    name: 'Ruhunu Sevaya',
    nativeName: 'රුහුණු සේවය',
    frequencyMhz: 107.1,
    frequencyLabel: '107.1 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Matara / Galle / Southern',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'Southern Coastal Broadcast from Matara',
    currentShow: 'Nilwala Theeraye Geetha',
    currentHost: 'Matara Studio',
    streamUrl: 'http://220.247.227.6:8000/Scomstream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Snsstream',
      'https://cp12.serverse.com/proxy/itnfm?mp=/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 8740,
    accentHex: '#0369a1',
    synthProfile: {
      baseFreq: 207.65,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 88,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'slbc-wayamba',
    name: 'Wayamba Handa',
    nativeName: 'වයඹ හඬ',
    frequencyMhz: 90.1,
    frequencyLabel: '90.1 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Kurunegala / Puttalam',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'North Western Provincial Community & Music Radio',
    currentShow: 'Athugalpura Gee Sara',
    currentHost: 'Kurunegala Studio',
    streamUrl: 'http://220.247.227.20:8000/rajaratastream',
    fallbackStreamUrls: [
      'http://220.247.227.6:8000/Snsstream',
      'https://s11.myradiostream.com:25116/listen.mp3'
    ],
    bitrateKbps: 128,
    listenersCount: 6410,
    accentHex: '#0d9488',
    synthProfile: {
      baseFreq: 185.0,
      chordIntervals: [0, 4, 7, 9],
      tempoBpm: 84,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'slbc-uva',
    name: 'Uva Radio',
    nativeName: 'ඌව ගුවන්විදුලිය',
    frequencyMhz: 97.6,
    frequencyLabel: '97.6 FM',
    language: 'Sinhala',
    category: 'Regional & Cultural',
    city: 'Badulla / Bandarawela',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'Highland Broadcast of Uva Province',
    currentShow: 'Namunukula Aruna',
    currentHost: 'Badulla Studio',
    streamUrl: 'http://220.247.227.20:8000/kandystream',
    fallbackStreamUrls: [
      'https://s11.myradiostream.com:25116/listen.mp3',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 5980,
    accentHex: '#16a34a',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 76,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'rangiri-sri-lanka',
    name: 'Rangiri Sri Lanka',
    nativeName: 'රංගිරි ශ්‍රී ලංකා',
    frequencyMhz: 104.4,
    frequencyLabel: '104.4 FM',
    language: 'Sinhala',
    category: 'Spiritual & Dhamma',
    city: 'Dambulla / Island-Wide',
    network: 'Rangiri Dambulla Media Network',
    tagline: 'Buddhist Cultural Heritage, Dhamma & Classical Sinhala Music',
    currentShow: 'Rangiri Sadaham Mandapaya',
    currentHost: 'Dambulla Vihara Studio',
    streamUrl: 'https://rangiri.radioca.st/stream',
    fallbackStreamUrls: [
      'http://cp11.serverse.com:7643/stream',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 11200,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 146.83,
      chordIntervals: [0, 4, 7, 12],
      tempoBpm: 68,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'lakviru-radio',
    name: 'Lakviru Radio',
    nativeName: 'ලක්විරු ගුවන්විදුලිය',
    frequencyMhz: 105.2,
    frequencyLabel: '105.2 FM',
    language: 'Sinhala',
    category: 'Spiritual & Dhamma',
    city: 'Colombo',
    network: 'Lakviru Buddhist Network',
    tagline: 'Mindful Sinhala Geetha & Evening Pirith Chanting',
    currentShow: 'Seth Pirith & Classical Melodies',
    currentHost: 'Lakviru Desk',
    streamUrl: 'http://cp11.serverse.com:7643/stream',
    fallbackStreamUrls: [
      'https://rangiri.radioca.st/stream',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 192,
    listenersCount: 9320,
    accentHex: '#b45309',
    synthProfile: {
      baseFreq: 146.83,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 66,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'shraddha-radio',
    name: 'Shraddha FM',
    nativeName: 'ශ්‍රද්ධා ගුවන්විදුලිය',
    frequencyMhz: 105.4,
    frequencyLabel: '105.4 FM',
    language: 'Sinhala',
    category: 'Spiritual & Dhamma',
    city: 'Kaduwela / Anuradhapura',
    network: 'Mahamevnawa Broadcast Network',
    tagline: 'Serene Dhamma Deshana, Pirith & Mindful Chants',
    currentShow: 'Sathbudu Vandana & Meditation',
    currentHost: 'Dhamma Studio',
    streamUrl: 'https://rangiri.radioca.st/stream',
    fallbackStreamUrls: [
      'http://cp11.serverse.com:7643/stream',
      'http://220.247.227.6:8000/Snsstream'
    ],
    bitrateKbps: 128,
    listenersCount: 13890,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 130.81,
      chordIntervals: [0, 4, 7, 12],
      tempoBpm: 62,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'parani-gee',
    name: 'Parani Gee Radio',
    nativeName: 'පැරණි ගී 88.4',
    frequencyMhz: 88.4,
    frequencyLabel: '88.4 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Colombo',
    network: 'Ceylon Heritage Digital',
    tagline: '50s, 60s & 70s Gramophone & Golden Sinhala Classics',
    currentShow: 'Amaradeva, Jothipala & Milton Golden Hour',
    currentHost: 'Archive Curator',
    streamUrl: 'http://151.80.42.191:8288/stream',
    fallbackStreamUrls: [
      'https://radio-station.hadawatha.lk/listen/jothi-fm/radio.mp3',
      'http://220.247.227.6:8000/Scomstream'
    ],
    bitrateKbps: 128,
    listenersCount: 10340,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 174.61,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 74,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'hadawatha-fm',
    name: 'Hadawatha FM',
    nativeName: 'හදවත FM 97.8',
    frequencyMhz: 97.8,
    frequencyLabel: '97.8 FM',
    language: 'Sinhala',
    category: 'Acoustic & Lounge',
    city: 'Colombo / Digital',
    network: 'Hadawatha Media Network',
    tagline: 'Heartfelt Sinhala Melodies & Request Broadcast',
    currentShow: 'Hadawatha Gee Pelahara',
    currentHost: 'Sahan & Kavindi',
    streamUrl: 'https://radio-station.hadawatha.lk/listen/hadawatha-fm/radio.mp3',
    fallbackStreamUrls: [
      'https://a3.asurahosting.com/listen/ranfm/radio.mp3',
      'https://srv01.onlineradio.voaplus.com/siyathafm'
    ],
    bitrateKbps: 192,
    listenersCount: 8920,
    accentHex: '#e11d48',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 88,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'jothi-fm',
    name: 'Jothi FM (Retro Sinhala)',
    nativeName: 'ජෝති FM 89.2',
    frequencyMhz: 89.2,
    frequencyLabel: '89.2 FM',
    language: 'Sinhala',
    category: 'Classic & Retro',
    city: 'Colombo',
    network: 'Hadawatha Retro Network',
    tagline: 'Non-Stop H.R. Jothipala & Cinema Golden Era Hits',
    currentShow: 'Jothi Rathriya & Silver Screen Classics',
    currentHost: 'Retro Studio',
    streamUrl: 'https://radio-station.hadawatha.lk/listen/jothi-fm/radio.mp3',
    fallbackStreamUrls: [
      'http://151.80.42.191:8288/stream',
      'http://220.247.227.6:8000/Scomstream'
    ],
    bitrateKbps: 192,
    listenersCount: 9640,
    accentHex: '#f59e0b',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 92,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'dreamzlanka-fm',
    name: 'DreamzLanka FM',
    nativeName: 'ඩ්‍රීම්ස් ලංකා 99.5',
    frequencyMhz: 99.5,
    frequencyLabel: '99.5 FM',
    language: 'Sinhala',
    category: 'Youth & Urban',
    city: 'Colombo / Global',
    network: 'DreamzLanka Broadcast',
    tagline: 'Contemporary Sinhala Fusion, Baila & Request Line',
    currentShow: 'Colombo Night Pulse',
    currentHost: 'DJ Dinesh',
    streamUrl: 'https://radio-station.hadawatha.lk/listen/dreamzlanka-fm/radio.mp3',
    fallbackStreamUrls: [
      'https://srv01.onlineradio.voaplus.com/siyathafm',
      'https://a3.asurahosting.com/listen/ranfm/radio.mp3'
    ],
    bitrateKbps: 192,
    listenersCount: 7540,
    accentHex: '#0ea5e9',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 110,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'radio-plus-lk',
    name: 'Radio Plus Sri Lanka',
    nativeName: 'රේඩියෝ ප්ලස් 103.1',
    frequencyMhz: 103.1,
    frequencyLabel: '103.1 FM',
    language: 'Sinhala',
    category: 'Top Hits',
    city: 'Colombo / Negombo',
    network: 'Radio Plus Digital Network',
    tagline: '320kbps Studio Quality Sinhala & Island Hit Radio',
    currentShow: 'Plus Drive Time',
    currentHost: 'Ruwan & Nishani',
    streamUrl: 'https://altair.streamerr.co/stream/8036',
    fallbackStreamUrls: [
      'https://altair.streamerr.co/stream/8054',
      'https://srv01.onlineradio.voaplus.com/siyathafm'
    ],
    bitrateKbps: 320,
    listenersCount: 8420,
    accentHex: '#10b981',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 106,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'classic-radio-lk',
    name: 'Classic Radio 90.4',
    nativeName: 'ක්ලැසික් රේඩියෝ',
    frequencyMhz: 90.4,
    frequencyLabel: '90.4 FM',
    language: 'Sinhala',
    category: 'Acoustic & Lounge',
    city: 'Colombo',
    network: 'Asset Radio Network',
    tagline: 'Unplugged Sinhala Sarala Gee & Instrumental Classics',
    currentShow: 'Sanda Kirana Unplugged',
    currentHost: 'Thilina Perera',
    streamUrl: 'https://cp11.serverse.com/proxy/classic/stream',
    fallbackStreamUrls: [
      'https://cp11.serverse.com/proxy/nethfm/stream',
      'http://151.80.42.191:8288/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 7190,
    accentHex: '#0284c7',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 80,
      timbre: 'warm-pad'
    }
  },

  // ==================== TAMIL CHANNELS ====================
  {
    id: 'sooriyan-fm',
    name: 'Sooriyan FM',
    nativeName: 'சூரியன் FM',
    frequencyMhz: 103.4,
    frequencyLabel: '103.4 FM',
    language: 'Tamil',
    category: 'Top Hits',
    city: 'Colombo / Jaffna',
    network: 'Asia Broadcasting Corporation',
    tagline: 'Always Number One Tamil Radio in Sri Lanka',
    currentShow: 'Isai Thendral Super Hits',
    currentHost: 'RJ Vignesh & Priya',
    streamUrl: 'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden',
    fallbackStreamUrls: [
      'https://mbc.thestreamtech.com:8086/stream',
      'https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 18400,
    accentHex: '#dc2626',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 106,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'shakthi-fm',
    name: 'Shakthi FM',
    nativeName: 'சக்தி FM',
    frequencyMhz: 105.1,
    frequencyLabel: '105.1 FM',
    language: 'Tamil',
    category: 'Top Hits',
    city: 'Colombo / Batticaloa',
    network: 'MBC Networks',
    tagline: 'Voice of the Tamil Community Across the Island',
    currentShow: 'Shakthi Ragangal Live',
    currentHost: 'Karthik & Meera',
    streamUrl: 'https://mbc.thestreamtech.com:8086/stream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden',
      'https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 16120,
    accentHex: '#b91c1c',
    synthProfile: {
      baseFreq: 293.66,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 102,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'vasantham-fm',
    name: 'Vasantham FM',
    nativeName: 'வசந்தம் FM',
    frequencyMhz: 102.6,
    frequencyLabel: '102.6 FM',
    language: 'Tamil',
    category: 'Youth & Urban',
    city: 'Colombo / Trincomalee',
    network: 'Independent Television Network',
    tagline: 'Fresh Tamil Melodies & Eastern Coastal Vibes',
    currentShow: 'Thendral Isai Express',
    currentHost: 'RJ Aadhavan',
    streamUrl: 'https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden',
      'https://mbc.thestreamtech.com:8086/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 11340,
    accentHex: '#e11d48',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 104,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'star-tamil',
    name: 'Star Tamil Radio',
    nativeName: 'ஸ்டார் தமிழ் 90.6',
    frequencyMhz: 90.6,
    frequencyLabel: '90.6 FM',
    language: 'Tamil',
    category: 'Top Hits',
    city: 'Colombo / Vavuniya',
    network: 'Star Media Network',
    tagline: '320kbps Kollywood & Sri Lankan Tamil Chartbusters',
    currentShow: 'Star Super Singer Hour',
    currentHost: 'RJ Harish',
    streamUrl: 'https://stream.starfm.lk:12025/stream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden',
      'https://mbc.thestreamtech.com:8086/stream'
    ],
    bitrateKbps: 320,
    listenersCount: 12920,
    accentHex: '#f59e0b',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 114,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'slbc-thendral',
    name: 'SLBC Thendral FM',
    nativeName: 'தென்றல் FM 104.7',
    frequencyMhz: 104.7,
    frequencyLabel: '104.7 FM',
    language: 'Tamil',
    category: 'Classic & Retro',
    city: 'Colombo / Island-Wide',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'Historic Tamil Commercial Service of Radio Ceylon',
    currentShow: 'Pongum Poompuhar & Golden Tamil Classics',
    currentHost: 'SLBC Tamil Desk',
    streamUrl: 'http://220.247.227.20:8000/Threndralstream',
    fallbackStreamUrls: [
      'https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream',
      'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 12700,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 84,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'lankasri-fm',
    name: 'Lankasri FM',
    nativeName: 'லங்காஸ்ரீ FM 90.2',
    frequencyMhz: 90.2,
    frequencyLabel: '90.2 FM',
    language: 'Tamil',
    category: 'News & Current Affairs',
    city: 'Jaffna / Colombo / Diaspora',
    network: 'Lankasri Media Network',
    tagline: '24-Hour Sri Lankan Tamil News, Talk & Evergreen Melodies',
    currentShow: 'Yarl Isai & News Roundup',
    currentHost: 'Jaffna Desk',
    streamUrl: 'http://media2.lankasri.fm/;stream.mp3',
    fallbackStreamUrls: [
      'http://220.247.227.20:8000/Threndralstream',
      'https://stream.tamilocean.com/isailive/'
    ],
    bitrateKbps: 128,
    listenersCount: 11430,
    accentHex: '#e11d48',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 88,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'isai-fm-tamil',
    name: 'Isai FM Tamil',
    nativeName: 'இசை FM 94.0',
    frequencyMhz: 94.0,
    frequencyLabel: '94.0 FM',
    language: 'Tamil',
    category: 'Acoustic & Lounge',
    city: 'Colombo / Hatton',
    network: 'Tamil Ocean Broadcast',
    tagline: 'Non-Stop Melodious Tamil Acoustic & Ilaiyaraaja Classics',
    currentShow: 'Thendral Raagam',
    currentHost: 'RJ Nithya',
    streamUrl: 'https://stream.tamilocean.com/isailive/',
    fallbackStreamUrls: [
      'https://stream.starfm.lk:12025/stream',
      'https://radio.lotustechnologieslk.net:2020/stream/sooriyanfmgarden'
    ],
    bitrateKbps: 128,
    listenersCount: 9850,
    accentHex: '#9333ea',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 100,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'tube-tamil-fm',
    name: 'Tube Tamil FM',
    nativeName: 'டியூப் தமிழ் FM 88.1',
    frequencyMhz: 88.1,
    frequencyLabel: '88.1 FM',
    language: 'Tamil',
    category: 'Youth & Urban',
    city: 'Colombo / Batticaloa / Trinco',
    network: 'Tube Tamil Network',
    tagline: 'Youth Tamil Beats, Indie Tamil & Request Shows',
    currentShow: 'Morning Kondattam',
    currentHost: 'RJ Aadhavan',
    streamUrl: 'http://s2.voscast.com:12084/;stream1619441439791/1',
    fallbackStreamUrls: [
      'https://stream.tamilocean.com/isailive/',
      'https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 7910,
    accentHex: '#059669',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 96,
      timbre: 'baila-rhythm'
    }
  },

  // ==================== ENGLISH CHANNELS ====================
  {
    id: 'e-fm',
    name: 'E FM 88.3',
    nativeName: 'E FM Sri Lanka',
    frequencyMhz: 88.3,
    frequencyLabel: '88.3 FM',
    language: 'English',
    category: 'Top Hits',
    city: 'Colombo / Island-Wide',
    network: 'EAP Broadcasting Company',
    tagline: 'Your Lifestyle Station — 80s, 90s & Today’s Best Hits',
    currentShow: 'Morning Show with Mark Kross & E Drive',
    currentHost: 'Mark Kross & Germain',
    streamUrl: 'https://srv02.onlineradio.voaplus.com/realfm',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden',
      'https://srv02.onlineradio.voaplus.com/kissfm'
    ],
    bitrateKbps: 192,
    listenersCount: 17450,
    accentHex: '#2563eb',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 112,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'sun-fm',
    name: 'Sun FM',
    nativeName: 'Sun FM 98.9',
    frequencyMhz: 98.9,
    frequencyLabel: '98.9 FM',
    language: 'English',
    category: 'Top Hits',
    city: 'Colombo',
    network: 'Asia Broadcasting Corporation',
    tagline: 'Feel The Hottest International & Island Hits',
    currentShow: 'Sunset Drive Colombo',
    currentHost: 'Mark & Jay',
    streamUrl: 'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/kissfm',
      'https://srv02.onlineradio.voaplus.com/realfm'
    ],
    bitrateKbps: 192,
    listenersCount: 16900,
    accentHex: '#f97316',
    synthProfile: {
      baseFreq: 293.66,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 118,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'yes-fm',
    name: 'Yes FM',
    nativeName: 'Yes FM 101.0',
    frequencyMhz: 101.0,
    frequencyLabel: '101.0 FM',
    language: 'English',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'MBC Networks',
    tagline: 'Home Grown Music & Global Charts',
    currentShow: 'Yes Home Grown Sessions',
    currentHost: 'Shaq & Tehani',
    streamUrl: 'http://live.trusl.com:1150/;',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden',
      'https://srv02.onlineradio.voaplus.com/kissfm'
    ],
    bitrateKbps: 192,
    listenersCount: 14300,
    accentHex: '#0284c7',
    synthProfile: {
      baseFreq: 220,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 110,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'gold-fm',
    name: 'Gold FM',
    nativeName: 'Gold FM 93.0',
    frequencyMhz: 93.0,
    frequencyLabel: '93.0 FM',
    language: 'English',
    category: 'Classic & Retro',
    city: 'Colombo',
    network: 'Asia Broadcasting Corporation',
    tagline: 'Sri Lanka’s Number One Retro & Classic Hits Station',
    currentShow: '70s & 80s Golden Vinyl',
    currentHost: 'Brian Thomas',
    streamUrl: 'https://radio.lotustechnologieslk.net:2020/stream/goldfmgarden',
    fallbackStreamUrls: [
      'https://mbc.thestreamtech.com:8585/stream',
      'https://srv02.onlineradio.voaplus.com/lite878'
    ],
    bitrateKbps: 160,
    listenersCount: 15780,
    accentHex: '#ca8a04',
    synthProfile: {
      baseFreq: 174.61,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 88,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'legends-fm',
    name: 'Legends 96.6 FM',
    nativeName: 'Legends 96.6 Colombo',
    frequencyMhz: 96.6,
    frequencyLabel: '96.6 FM',
    language: 'English',
    category: 'Classic & Retro',
    city: 'Colombo',
    network: 'MBC Networks',
    tagline: 'Timeless 70s, 80s & 90s Legends All Day Long',
    currentShow: 'Classic Vinyl Countdown',
    currentHost: 'Greg & Dominic',
    streamUrl: 'https://mbc.thestreamtech.com:8585/stream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/goldfmgarden',
      'https://srv02.onlineradio.voaplus.com/lite878'
    ],
    bitrateKbps: 160,
    listenersCount: 12450,
    accentHex: '#d97706',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 92,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'kiss-fm',
    name: 'Kiss FM 96.9',
    nativeName: 'Kiss FM Sri Lanka',
    frequencyMhz: 96.9,
    frequencyLabel: '96.9 FM',
    language: 'English',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'Voice of Asia Network',
    tagline: 'Colombo’s Premier Dance, Electronic & R&B Station',
    currentShow: 'Kiss Nightlife Club Mix',
    currentHost: 'DJ Tim & Mino',
    streamUrl: 'https://srv02.onlineradio.voaplus.com/kissfm',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden',
      'https://srv02.onlineradio.voaplus.com/realfm'
    ],
    bitrateKbps: 192,
    listenersCount: 11410,
    accentHex: '#ec4899',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 124,
      timbre: 'baila-rhythm'
    }
  },
  {
    id: 'real-radio',
    name: 'Real Radio 97.1',
    nativeName: 'Real Radio 97.1',
    frequencyMhz: 97.1,
    frequencyLabel: '97.1 FM',
    language: 'English',
    category: 'Top Hits',
    city: 'Colombo',
    network: 'Voice of Asia Network',
    tagline: 'Playing What We Want — 90s, 2000s & Current Pop Rock',
    currentShow: 'Real Drive Home',
    currentHost: 'Colombo Studio',
    streamUrl: 'https://srv02.onlineradio.voaplus.com/realfm',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/kissfm',
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden'
    ],
    bitrateKbps: 160,
    listenersCount: 10410,
    accentHex: '#0284c7',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 106,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'lite-87',
    name: 'Lite 87.8 FM',
    nativeName: 'Lite 87.8 Sri Lanka',
    frequencyMhz: 87.8,
    frequencyLabel: '87.8 FM',
    language: 'English',
    category: 'Acoustic & Lounge',
    city: 'Colombo',
    network: 'TNL / VOA Radio Network',
    tagline: 'Easy Listening, Soft Rock & Smooth Jazz',
    currentShow: 'Smooth Island Lounge',
    currentHost: 'Natasha De Silva',
    streamUrl: 'https://srv02.onlineradio.voaplus.com/lite878',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/goldfmgarden',
      'http://142.132.250.174:7673/stream'
    ],
    bitrateKbps: 160,
    listenersCount: 9490,
    accentHex: '#0891b2',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 76,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'tnl-radio',
    name: 'TNL Rocks 99.2',
    nativeName: 'TNL 99.2 FM',
    frequencyMhz: 99.2,
    frequencyLabel: '99.2 FM',
    language: 'English',
    category: 'Classic & Retro',
    city: 'Colombo',
    network: 'TNL Radio Network',
    tagline: 'Classic Rock, Alternative & Live Studio Sessions',
    currentShow: 'Criminal Record Rock Block',
    currentHost: 'Harith & Shehan',
    streamUrl: 'https://mbc.thestreamtech.com:8585/stream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/goldfmgarden',
      'https://srv02.onlineradio.voaplus.com/realfm'
    ],
    bitrateKbps: 160,
    listenersCount: 8830,
    accentHex: '#4f46e5',
    synthProfile: {
      baseFreq: 146.83,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 112,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'red-fm',
    name: 'Red FM 107.8',
    nativeName: 'Red FM Colombo',
    frequencyMhz: 107.8,
    frequencyLabel: '107.8 FM',
    language: 'English',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'Asset Radio Broadcasting',
    tagline: 'Today’s Best Hit Music & Colombo Urban Culture',
    currentShow: 'Red Morning Rush',
    currentHost: 'RJ Brandon & Nish',
    streamUrl: 'https://altair.streamerr.co/stream/8054',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/kissfm',
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden'
    ],
    bitrateKbps: 320,
    listenersCount: 9520,
    accentHex: '#ef4444',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 116,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'fox-914',
    name: 'Fox 91.4 FM',
    nativeName: 'Fox 91.4 Colombo',
    frequencyMhz: 91.4,
    frequencyLabel: '91.4 FM',
    language: 'English',
    category: 'Acoustic & Lounge',
    city: 'Colombo',
    network: 'Asset Radio Network',
    tagline: 'Smooth Adult Contemporary & Acoustic Hits',
    currentShow: 'Fox Unwind Session',
    currentHost: 'Ryan & Mel',
    streamUrl: 'http://142.132.250.174:7673/stream',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/lite878',
      'https://srv02.onlineradio.voaplus.com/realfm'
    ],
    bitrateKbps: 160,
    listenersCount: 8280,
    accentHex: '#f97316',
    synthProfile: {
      baseFreq: 196.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 84,
      timbre: 'warm-pad'
    }
  },
  {
    id: 'radio-plus-hitz',
    name: 'Radio Plus Hitz',
    nativeName: 'Plus Hitz 106.0',
    frequencyMhz: 106.0,
    frequencyLabel: '106.0 FM',
    language: 'English',
    category: 'Youth & Urban',
    city: 'Colombo',
    network: 'Radio Plus Network',
    tagline: '320kbps High-Definition International & Colombo Club Hits',
    currentShow: 'Colombo Hitz Countdown',
    currentHost: 'DJ Brandon',
    streamUrl: 'https://altair.streamerr.co/stream/8054',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/kissfm',
      'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden'
    ],
    bitrateKbps: 320,
    listenersCount: 9120,
    accentHex: '#ef4444',
    synthProfile: {
      baseFreq: 261.63,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 116,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'slbc-radio-ceylon-eng',
    name: 'SLBC Radio Sri Lanka',
    nativeName: 'Radio Ceylon 97.4',
    frequencyMhz: 97.4,
    frequencyLabel: '97.4 FM',
    language: 'English',
    category: 'Classic & Retro',
    city: 'Colombo / Shortwave & FM',
    network: 'Sri Lanka Broadcasting Corporation',
    tagline: 'The Oldest Radio Station in South Asia — Established 1925',
    currentShow: 'Golden Oldies & All-Asia English Service',
    currentHost: 'SLBC English Service',
    streamUrl: 'http://220.247.227.20:8000/RSLstream',
    fallbackStreamUrls: [
      'https://radio.lotustechnologieslk.net:2020/stream/goldfmgarden',
      'https://mbc.thestreamtech.com:8585/stream'
    ],
    bitrateKbps: 128,
    listenersCount: 11600,
    accentHex: '#b45309',
    synthProfile: {
      baseFreq: 174.61,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 80,
      timbre: 'classic-strings'
    }
  },
  {
    id: 'wellon-radio-cafe',
    name: 'Wellon Radio Cafe',
    nativeName: 'Wellon Lounge 88.6',
    frequencyMhz: 88.6,
    frequencyLabel: '88.6 FM',
    language: 'English',
    category: 'Acoustic & Lounge',
    city: 'Colombo / Galle Fort',
    network: 'Wellon Digital Sri Lanka',
    tagline: 'Coffeehouse Acoustic, Indie & Coastal Chill',
    currentShow: 'Galle Fort Sunset Lounge',
    currentHost: 'Wellon Curators',
    streamUrl: 'https://wellonradio.out.airtime.pro/wellonradio_a',
    fallbackStreamUrls: [
      'https://srv02.onlineradio.voaplus.com/lite878',
      'https://srv02.onlineradio.voaplus.com/realfm'
    ],
    bitrateKbps: 128,
    listenersCount: 7350,
    accentHex: '#2563eb',
    synthProfile: {
      baseFreq: 220.0,
      chordIntervals: [0, 4, 7, 11],
      tempoBpm: 94,
      timbre: 'lounge-keys'
    }
  },
  {
    id: 'bestcoast-fm',
    name: 'BestCoast FM',
    nativeName: 'BestCoast 99.8',
    frequencyMhz: 99.8,
    frequencyLabel: '99.8 FM',
    language: 'English',
    category: 'Youth & Urban',
    city: 'Weligama / Mirissa / Colombo',
    network: 'Southern Coast Broadcast',
    tagline: 'Surf Coast Beats, Funk, Soul & Island Electronica',
    currentShow: 'Mirissa Beach Sessions',
    currentHost: 'Coast Collective',
    streamUrl: 'http://streams.radio.co/sea5dddd6b/listen',
    fallbackStreamUrls: [
      'https://wellonradio.out.airtime.pro/wellonradio_a',
      'https://srv02.onlineradio.voaplus.com/kissfm'
    ],
    bitrateKbps: 128,
    listenersCount: 8190,
    accentHex: '#06b6d4',
    synthProfile: {
      baseFreq: 246.94,
      chordIntervals: [0, 3, 7, 10],
      tempoBpm: 112,
      timbre: 'lounge-keys'
    }
  }
];
