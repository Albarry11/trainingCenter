import React from 'react';

interface TikTokIconProps {
  className?: string;
}

export function TikTokIcon({ className = "w-5 h-5" }: TikTokIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-6.364 6.364 6.364 6.364 0 0012.728 0V9.58a8.236 8.236 0 004.6 1.396V7.548a4.834 4.834 0 01-1.731-.862z"/>
    </svg>
  );
}