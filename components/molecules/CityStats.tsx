import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface CityStatsData {
  totalDistricts: number;
  totalPopulation: number;
  totalArea: number;
  totalAttractions: number;
  averageRating: number;
}

interface CityStatsProps {
  className?: string;
}

const CityStats: React.FC<CityStatsProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<CityStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/vladikavkaz?action=stats');
        const data = await response.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
        // Fallback данные
        setStats({
          totalDistricts: 10,
          totalPopulation: 350000,
          totalArea: 150,
          totalAttractions: 11,
          averageRating: 4.5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card variant="default" padding="md" className={className}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-600 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card variant="default" padding="md" className={className}>
        <Text variant="body" color="muted">
          Не удалось загрузить статистику
        </Text>
      </Card>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card variant="default" padding="lg">
        <Text variant="h5" color="primary" className="mb-4">
          📊 Статистика Владикавказа
        </Text>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-blue-400">
              {stats.totalDistricts}
            </div>
            <Text variant="caption" color="muted">
              Районов
            </Text>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-green-400">
              {formatNumber(stats.totalPopulation)}
            </div>
            <Text variant="caption" color="muted">
              Население
            </Text>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-purple-400">
              {stats.totalArea} км²
            </div>
            <Text variant="caption" color="muted">
              Площадь
            </Text>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-yellow-400">
              {stats.totalAttractions}
            </div>
            <Text variant="caption" color="muted">
              Достопримечательности
            </Text>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-orange-400">
              ⭐ {stats.averageRating}
            </div>
            <Text variant="caption" color="muted">
              Средний рейтинг
            </Text>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center p-3 huly-stats-card"
          >
            <div className="text-2xl font-bold text-cyan-400">
              🏙️
            </div>
            <Text variant="caption" color="muted">
              Столица РСО-А
            </Text>
          </motion.div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-600/30">
          <Text variant="caption" color="muted" className="text-center">
            Данные обновляются в реальном времени
          </Text>
        </div>
      </Card>
    </motion.div>
  );
};

export default CityStats; 