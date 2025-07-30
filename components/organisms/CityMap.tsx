import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import MapDistrict from '../atoms/MapDistrict';
import { DISTRICT_DATA } from '../../data/districtData';
import { Text } from '../atoms';
import { District, MapProps } from '../../types';
import { animationVariants } from '../../utils/animations';

const CityMap: React.FC<MapProps> = ({
  onDistrictClick,
  selectedDistrict,
  className = '',
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  // Мемоизированные колбэки для оптимизации
  const handleDistrictClick = useCallback((district: District) => {
    onDistrictClick(district);
  }, [onDistrictClick]);

  const handleDistrictHover = useCallback((district: District) => {
    setHoveredDistrict(district);
  }, []);

  const handleDistrictLeave = useCallback(() => {
    setHoveredDistrict(null);
  }, []);

  // Мемоизированные вычисления
  const totalPosts = useMemo(() => 
    DISTRICT_DATA.reduce((sum, district) => sum + (district.postCount || 0), 0), 
    []
  );

  const legendDistricts = useMemo(() => 
    DISTRICT_DATA.slice(0, 4), 
    []
  );

  return (
    <div className={`relative ${className}`}>
      {/* SVG карта */}
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"
      >
        {/* Фоновая сетка */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Районы */}
        {DISTRICT_DATA.map((district) => (
          <MapDistrict
            key={district.id}
            district={district}
            isHovered={hoveredDistrict?.id === district.id}
            isSelected={selectedDistrict?.id === district.id}
            onClick={handleDistrictClick}
            onMouseEnter={handleDistrictHover}
            onMouseLeave={handleDistrictLeave}
          />
        ))}

        {/* Информационная панель при наведении */}
        {hoveredDistrict && (
          <foreignObject x="20" y="20" width="280" height="140">
            <motion.div 
              className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-600/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Text variant="h6" color="primary" className="mb-2">
                {hoveredDistrict.name}
              </Text>
              <Text variant="caption" color="muted" className="mb-2">
                {hoveredDistrict.description}
              </Text>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Text variant="caption" color="muted">Постов:</Text>
                  <Text variant="caption" color="accent">{hoveredDistrict.postCount}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="caption" color="muted">Население:</Text>
                  <Text variant="caption" color="accent">
                    {hoveredDistrict.postCount * 2000} чел.
                  </Text>
                </div>
              </div>
            </motion.div>
          </foreignObject>
        )}
      </svg>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
        <Text variant="caption" color="primary" className="mb-2 font-semibold">
          Районы города
        </Text>
        <div className="grid grid-cols-2 gap-2">
          {legendDistricts.map((district) => (
            <div key={district.id} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: district.color }}
              />
              <Text variant="caption" color="muted">
                {district.name}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
        <Text variant="caption" color="primary" className="mb-2 font-semibold">
          Статистика
        </Text>
        <div className="space-y-1">
          <div className="flex justify-between">
            <Text variant="caption" color="muted">Всего районов:</Text>
            <Text variant="caption" color="accent">{DISTRICT_DATA.length}</Text>
          </div>
          <div className="flex justify-between">
            <Text variant="caption" color="muted">Всего постов:</Text>
            <Text variant="caption" color="accent">{totalPosts}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap; 