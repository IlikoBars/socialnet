'use client';

import { useState } from 'react';

export function CityMap({ onClick }: { onClick: (name: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 800 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Сторонка A */}
      <path
        d="M314 154L292.5 127.5L431.5 51.5L448 97L457 143.5L448 225L308 217L286.5 195.5L314 154Z"
        fill="#1e40af"
        className="opacity-80 hover:opacity-100 cursor-pointer transition-all"
        onClick={() => onClick('A')}
        onMouseEnter={() => setHovered('A')}
        onMouseLeave={() => setHovered(null)}
      />

      {/* Сторонка B */}
      <path
        d="M520 1.5L463.5 31.5L460.5 91.5L463.5 104.5L468 119.5L470 139L471 158.5L462 173.5V179L465 204.5L468 211.5L473.5 228.5L475 267.5H518.5L520 283.5H569.5V376.5L574.5 390L654 367.5V237L647 235.5H654V230.5V211.5V193V182L652 171L650.5 163.5V154.5L647 143.5L641.5 132L636.5 122L632 114.5L626 105L620 97L615.5 91.5L609.5 85L604 79.5L520 1.5Z"
        fill="#059669"
        className="opacity-80 hover:opacity-100 cursor-pointer transition-all"
        onClick={() => onClick('B')}
        onMouseEnter={() => setHovered('B')}
        onMouseLeave={() => setHovered(null)}
      />

      {/* Сторонка C */}
      <path
        d="M68 353L1 276.5L56.5 223.5L65.5 233L92.5 262.5L129 301L68 353Z"
        fill="#e11d48"
        className="opacity-80 hover:opacity-100 cursor-pointer transition-all"
        onClick={() => onClick('C')}
        onMouseEnter={() => setHovered('C')}
        onMouseLeave={() => setHovered(null)}
      />

      {/* Сторонка D (дубликат A — пока оставим для тестов) */}
      <path
        d="M314 154L292.5 127.5L431.5 51.5L448 97L457 143.5L448 225L308 217L286.5 195.5L314 154Z"
        fill="#facc15"
        className="opacity-70 hover:opacity-100 cursor-pointer transition-all"
        onClick={() => onClick('D')}
        onMouseEnter={() => setHovered('D')}
        onMouseLeave={() => setHovered(null)}
      />

      {/* Отображение названия при наведении */}
      {hovered && (
        <text
          x="20"
          y="40"
          className="text-white text-lg"
          fill="white"
        >
          {hovered}
        </text>
      )}
    </svg>
  );
}

export default CityMap;

