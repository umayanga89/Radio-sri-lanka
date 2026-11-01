import React from 'react';
import { RadioCategory, RadioLanguage } from '../data/sriLankanStations';

interface StationArtworkProps {
  name: string;
  frequencyLabel: string;
  language: RadioLanguage;
  category: RadioCategory;
  accentHex?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StationArtwork: React.FC<StationArtworkProps> = ({
  name,
  frequencyLabel,
  language,
  accentHex = '#f59e0b',
  size = 'md'
}) => {
  const dimensions =
    size === 'sm'
      ? 'w-11 h-11 rounded-xl'
      : size === 'lg'
        ? 'w-20 h-20 rounded-2xl'
        : 'w-14 h-14 rounded-2xl';

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`${dimensions} relative overflow-hidden shrink-0 flex flex-col items-center justify-center border border-stone-200/60 dark:border-zinc-800 select-none bg-zinc-900 text-white`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-90"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`grad-${frequencyLabel}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.85" />
            <stop offset="100%" stopColor="#18181b" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#grad-${frequencyLabel})`} />
        {/* Concentric vinyl & radio wave rings */}
        <circle
          cx="82"
          cy="20"
          r="34"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <circle
          cx="82"
          cy="20"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
        />
        <path
          d="M 0 78 Q 25 65, 50 78 T 100 74"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="2"
        />
      </svg>

      <span className="relative z-10 font-display font-bold text-xs tracking-tight leading-none text-white">
        {initials}
      </span>
      <span className="relative z-10 font-mono text-[10px] text-white/85 mt-0.5 leading-none">
        {frequencyLabel.replace(' FM', '')}
      </span>
      <span className="sr-only">{language}</span>
    </div>
  );
};
