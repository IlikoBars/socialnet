import React from 'react';
import { motion } from 'framer-motion';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { District } from '../atoms/MapDistrict';

export interface RegionCardProps {
  district: District;
  postCount: number;
  isActive?: boolean;
  onClick?: (district: District) => void;
  className?: string;
}

const RegionCard: React.FC<RegionCardProps> = ({
  district,
  postCount,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card
        variant={isActive ? 'elevated' : 'default'}
        padding="md"
        hover={true}
        onClick={() => onClick?.(district)}
        className={`border-l-4 ${isActive ? 'border-yellow-400' : 'border-gray-600'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Цветовой индикатор */}
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: district.color }}
            />
            
            {/* Информация о районе */}
            <div>
              <Text variant="h6" color="primary" className="mb-1">
                {district.name}
              </Text>
              <Text variant="caption" color="muted">
                {postCount} {postCount === 1 ? 'пост' : postCount < 5 ? 'поста' : 'постов'}
              </Text>
            </div>
          </div>
          
          {/* Кнопка действия */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClick?.(district)}
          >
            👁️
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default RegionCard; 