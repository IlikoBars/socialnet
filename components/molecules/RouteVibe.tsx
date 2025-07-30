import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms';
import { Text } from '../atoms';
import { Button } from '../atoms';

export interface RouteVibeProps {
  id: string;
  type: 'audio' | 'text' | 'photo' | 'route';
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  location: {
    name: string;
    coordinates: { lat: number; lng: number };
  };
  createdAt: string;
  music?: {
    title: string;
    artist: string;
    url?: string;
  };
  route?: {
    places: Array<{
      name: string;
      coordinates: { lat: number; lng: number };
      description: string;
    }>;
    duration: number; // в минутах
    distance: number; // в метрах
  };
  likes?: number;
  comments?: number;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
}

const RouteVibe: React.FC<RouteVibeProps> = ({
  id,
  type,
  content,
  author,
  location,
  createdAt,
  music,
  route,
  likes = 0,
  comments = 0,
  onLike,
  onComment,
  onShare,
  className = '',
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(id);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Здесь будет логика воспроизведения аудио
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'audio':
        return '🎵';
      case 'text':
        return '📖';
      case 'photo':
        return '📸';
      case 'route':
        return '🗺️';
      default:
        return '💭';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'audio':
        return 'Аудио-вайб';
      case 'text':
        return 'История';
      case 'photo':
        return 'Фото-вайб';
      case 'route':
        return 'Маршрут';
      default:
        return 'Вайб';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card variant="default" padding="lg" hover={true}>
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                author.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <Text variant="label" color="primary" weight="semibold">
                {author.name}
              </Text>
              <Text variant="caption" color="muted">
                {createdAt}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon()}</span>
            <Text variant="caption" color="accent" className="bg-purple-500/20 px-2 py-1 rounded-full">
              {getTypeLabel()}
            </Text>
          </div>
        </div>

        {/* Местоположение */}
        <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">📍</span>
            <Text variant="body" color="primary" weight="medium">
              {location.name}
            </Text>
          </div>
        </div>

        {/* Контент */}
        <div className="mb-4">
          <Text variant="body" color="primary" className="leading-relaxed">
            {content}
          </Text>
        </div>

        {/* Музыка (для аудио-вайбов) */}
        {type === 'audio' && music && (
          <motion.div
            className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <div>
                  <Text variant="label" color="primary" weight="semibold">
                    {music.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    {music.artist}
                  </Text>
                </div>
              </div>
              <span className="text-2xl">🎵</span>
            </div>
          </motion.div>
        )}

        {/* Маршрут (для route-вайбов) */}
        {type === 'route' && route && (
          <motion.div
            className="mb-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-400/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <Text variant="label" color="primary" weight="semibold">
                🗺️ Маршрут
              </Text>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>⏱️ {route.duration} мин</span>
                <span>📏 {route.distance} м</span>
              </div>
            </div>
            <div className="space-y-2">
              {route.places.slice(0, 3).map((place, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                    {index + 1}
                  </span>
                  <Text variant="caption" color="primary">
                    {place.name}
                  </Text>
                </div>
              ))}
              {route.places.length > 3 && (
                <Text variant="caption" color="muted">
                  + еще {route.places.length - 3} мест
                </Text>
              )}
            </div>
          </motion.div>
        )}

        {/* Действия */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                isLiked ? 'text-pink-400' : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
              <Text variant="caption" color={isLiked ? 'accent' : 'muted'}>
                {likes + (isLiked ? 1 : 0)}
              </Text>
            </button>
            <button
              onClick={() => onComment?.(id)}
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <span className="text-xl">💬</span>
              <Text variant="caption" color="muted">
                {comments}
              </Text>
            </button>
            <button
              onClick={() => onShare?.(id)}
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <span className="text-xl">📤</span>
              <Text variant="caption" color="muted">
                Поделиться
              </Text>
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Открыть маршрут на карте')}
          >
            🗺️ На карте
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default RouteVibe; 