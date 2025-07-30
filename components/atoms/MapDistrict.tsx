import React from 'react';
import { motion } from 'framer-motion';

export interface District {
  id: number;
  name: string;
  color: string;
  d: string;
  textPosition: { x: number; y: number };
  text: string;
  postCount?: number;
}

export interface MapDistrictProps {
  district: District;
  isHovered: boolean;
  isSelected: boolean;
  onClick: (district: District) => void;
  onMouseEnter: (district: District) => void;
  onMouseLeave: () => void;
  className?: string;
}

const MapDistrict: React.FC<MapDistrictProps> = ({
  district,
  isHovered,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  const baseClasses = 'cursor-pointer transition-all duration-300 ease-out';
  
  const stateClasses = isSelected 
    ? 'opacity-100 drop-shadow-2xl' 
    : isHovered 
    ? 'opacity-90 drop-shadow-lg scale-105' 
    : 'opacity-70 hover:opacity-90';

  const glowClasses = isHovered 
    ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
    : '';

  return (
    <g className={`${baseClasses} ${stateClasses} ${glowClasses} ${className}`}>
      {/* Основной путь района */}
      <motion.path
        d={district.d}
        fill={district.color}
        onClick={() => onClick(district)}
        onMouseEnter={() => onMouseEnter(district)}
        onMouseLeave={onMouseLeave}
        whileHover={{ 
          scale: 1.02,
          filter: "brightness(1.1)",
        }}
        whileTap={{ scale: 0.98 }}
        className="transition-all duration-200"
      />
      
      {/* Текст района */}
      <text
        x={district.textPosition.x}
        y={district.textPosition.y}
        className="pointer-events-none select-none"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none'
        }}
      >
        {district.text}
      </text>

      {/* Индикатор количества постов */}
      {district.postCount && district.postCount > 0 && (
        <circle
          cx={district.textPosition.x + 15}
          cy={district.textPosition.y - 10}
          r="8"
          fill="#ef4444"
          className="pointer-events-none"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 6px rgba(239,68,68,0.6))' : 'none'
          }}
        />
      )}
    </g>
  );
};

export default MapDistrict; 