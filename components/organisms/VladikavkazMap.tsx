'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VLADIKAVKAZ_DISTRICTS, District } from '../../data/vladikavkazDistricts';

interface VladikavkazMapProps {
  onDistrictClick?: (district: District) => void;
  selectedDistrict?: string;
  showLabels?: boolean;
  className?: string;
}

export const VladikavkazMap: React.FC<VladikavkazMapProps> = ({
  onDistrictClick,
  selectedDistrict,
  showLabels = true,
  className = ''
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; district: District } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Координаты границ Владикавказа (приблизительно)
  const cityBounds = {
    minLat: 43.0200,
    maxLat: 43.0900,
    minLng: 44.6400,
    maxLng: 44.7000
  };

  // Преобразование координат в SVG координаты
  const latLngToSvg = (lat: number, lng: number) => {
    const x = ((lng - cityBounds.minLng) / (cityBounds.maxLng - cityBounds.minLng)) * 800;
    const y = ((cityBounds.maxLat - lat) / (cityBounds.maxLat - cityBounds.minLat)) * 600;
    return { x, y };
  };

  // Создание полигонов для районов (упрощенно - круги вокруг центра)
  const createDistrictPolygon = (district: District) => {
    const center = latLngToSvg(district.center.lat, district.center.lng);
    const radius = 25; // Радиус района в SVG координатах
    
    // Создаем многоугольник (октагон) для более реалистичного вида
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    return {
      points: points.join(' '),
      center
    };
  };

  const handleDistrictClick = (district: District) => {
    if (onDistrictClick) {
      onDistrictClick(district);
    }
  };

  const handleMouseMove = (event: React.MouseEvent, district: District) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setTooltip({ x, y, district });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
    setTooltip(null);
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width="800"
        height="600"
        viewBox="0 0 800 600"
        className="w-full h-auto border border-gray-300 rounded-lg bg-gray-50"
      >
        {/* Река Терек */}
        <path
          d="M 200 150 Q 400 200 600 250 Q 500 300 300 350 Q 400 400 200 450"
          stroke="#4A90E2"
          strokeWidth="8"
          fill="none"
          opacity="0.7"
        />
        
        {/* Районы */}
        {VLADIKAVKAZ_DISTRICTS.map((district) => {
          const polygon = createDistrictPolygon(district);
          const isSelected = selectedDistrict === district.id;
          const isHovered = hoveredDistrict === district.id;
          
          return (
            <g key={district.id}>
              {/* Полигон района */}
              <polygon
                points={polygon.points}
                fill={district.color}
                stroke={isSelected ? "#000" : "#666"}
                strokeWidth={isSelected ? 3 : 1}
                opacity={isHovered ? 0.8 : 0.6}
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleDistrictClick(district)}
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseMove={(e) => handleMouseMove(e, district)}
                onMouseLeave={handleMouseLeave}
              />
              
              {/* Номер района */}
              <text
                x={polygon.center.x}
                y={polygon.center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-white pointer-events-none"
                style={{ fontSize: '12px' }}
              >
                {district.number}
              </text>
              
              {/* Название района */}
              {showLabels && (
                <text
                  x={polygon.center.x}
                  y={polygon.center.y + 40}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {district.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Основные улицы */}
        <path d="M 100 300 L 700 300" stroke="#999" strokeWidth="2" opacity="0.3" />
        <path d="M 400 100 L 400 500" stroke="#999" strokeWidth="2" opacity="0.3" />
        
        {/* Легенда */}
        <g transform="translate(20, 20)">
          <rect width="200" height="120" fill="white" stroke="#ccc" strokeWidth="1" opacity="0.9" />
          <text x="10" y="20" className="text-sm font-bold fill-gray-800">Районы Владикавказа</text>
          <text x="10" y="35" className="text-xs fill-gray-600">Нажмите на район для выбора</text>
          <text x="10" y="50" className="text-xs fill-gray-600">Всего: 26 районов</text>
          <text x="10" y="65" className="text-xs fill-gray-600">Река: Терек</text>
        </g>
      </svg>
      
      {/* Тултип */}
      {tooltip && (
        <div
          className="absolute z-10 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 30,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold">{tooltip.district.name}</div>
          <div>Район #{tooltip.district.number}</div>
          {tooltip.district.description && (
            <div className="max-w-xs">{tooltip.district.description}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default VladikavkazMap; 