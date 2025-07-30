import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms';
import { Text } from '../atoms';
import { Button } from '../atoms';

export interface CreateVibeProps {
  onVibeCreated?: (vibe: {
    type: 'audio' | 'text' | 'photo' | 'route';
    content: string;
    location: string;
    music?: { title: string; artist: string };
    route?: Array<{ name: string; description: string }>;
  }) => void;
  className?: string;
}

const CreateVibe: React.FC<CreateVibeProps> = ({ onVibeCreated, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vibeType, setVibeType] = useState<'audio' | 'text' | 'photo' | 'route'>('text');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [musicArtist, setMusicArtist] = useState('');
  const [routePlaces, setRoutePlaces] = useState<Array<{ name: string; description: string }>>([]);
  const [newPlace, setNewPlace] = useState({ name: '', description: '' });

  const handleSubmit = () => {
    if (!content.trim() || !location.trim()) return;

    const vibe = {
      type: vibeType,
      content: content.trim(),
      location: location.trim(),
      ...(vibeType === 'audio' && musicTitle && musicArtist && {
        music: { title: musicTitle, artist: musicArtist }
      }),
      ...(vibeType === 'route' && routePlaces.length > 0 && {
        route: routePlaces
      })
    };

    onVibeCreated?.(vibe);
    
    // Сброс формы
    setContent('');
    setLocation('');
    setMusicTitle('');
    setMusicArtist('');
    setRoutePlaces([]);
    setNewPlace({ name: '', description: '' });
    setIsOpen(false);
  };

  const addPlaceToRoute = () => {
    if (newPlace.name.trim() && newPlace.description.trim()) {
      setRoutePlaces([...routePlaces, { ...newPlace }]);
      setNewPlace({ name: '', description: '' });
    }
  };

  const removePlaceFromRoute = (index: number) => {
    setRoutePlaces(routePlaces.filter((_, i) => i !== index));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return '🎵';
      case 'text': return '📖';
      case 'photo': return '📸';
      case 'route': return '🗺️';
      default: return '💭';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'audio': return 'Аудио-вайб';
      case 'text': return 'История';
      case 'photo': return 'Фото-вайб';
      case 'route': return 'Маршрут';
      default: return 'Вайб';
    }
  };

  return (
    <div className={className}>
      {/* Кнопка создания */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsOpen(true)}
            className="w-full h-16 text-lg"
          >
            ✨ Создать вайб
          </Button>
        </motion.div>
      )}

      {/* Форма создания */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="default" padding="lg" className="mt-4">
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <Text variant="h4" color="primary" weight="semibold">
                  Создать новый вайб
                </Text>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Выбор типа вайба */}
              <div className="mb-6">
                <Text variant="label" color="primary" className="mb-3">
                  Тип вайба
                </Text>
                <div className="grid grid-cols-2 gap-3">
                  {(['text', 'audio', 'photo', 'route'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setVibeType(type)}
                      className={`p-4 rounded-2xl border transition-all ${
                        vibeType === type
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{getTypeIcon(type)}</div>
                        <Text variant="caption" color={vibeType === type ? 'accent' : 'muted'}>
                          {getTypeLabel(type)}
                        </Text>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Местоположение */}
              <div className="mb-6">
                <Text variant="label" color="primary" className="mb-2">
                  📍 Место
                </Text>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Где это произошло?"
                  className="w-full huly-input"
                />
              </div>

              {/* Контент */}
              <div className="mb-6">
                <Text variant="label" color="primary" className="mb-2">
                  💭 Ваша история
                </Text>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    vibeType === 'audio' 
                      ? "Какая музыка ассоциируется с этим местом?"
                      : vibeType === 'route'
                      ? "Опишите ваш маршрут..."
                      : "Поделитесь своими воспоминаниями..."
                  }
                  rows={4}
                  className="w-full huly-input resize-none"
                />
              </div>

              {/* Дополнительные поля в зависимости от типа */}
              <AnimatePresence>
                {vibeType === 'audio' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <Text variant="label" color="primary" className="mb-2">
                      🎵 Музыка
                    </Text>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={musicTitle}
                        onChange={(e) => setMusicTitle(e.target.value)}
                        placeholder="Название трека"
                        className="huly-input"
                      />
                      <input
                        type="text"
                        value={musicArtist}
                        onChange={(e) => setMusicArtist(e.target.value)}
                        placeholder="Исполнитель"
                        className="huly-input"
                      />
                    </div>
                  </motion.div>
                )}

                {vibeType === 'route' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <Text variant="label" color="primary" className="mb-2">
                      🗺️ Места маршрута
                    </Text>
                    
                    {/* Список мест */}
                    {routePlaces.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {routePlaces.map((place, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <Text variant="caption" color="primary" weight="medium">
                                {place.name}
                              </Text>
                              <Text variant="caption" color="muted">
                                {place.description}
                              </Text>
                            </div>
                            <button
                              onClick={() => removePlaceFromRoute(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Добавление нового места */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={newPlace.name}
                        onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                        placeholder="Название места"
                        className="huly-input"
                      />
                      <input
                        type="text"
                        value={newPlace.description}
                        onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                        placeholder="Описание"
                        className="huly-input"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addPlaceToRoute}
                      disabled={!newPlace.name.trim() || !newPlace.description.trim()}
                    >
                      + Добавить место
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Кнопки действий */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!content.trim() || !location.trim()}
                  className="flex-1"
                >
                  Создать вайб
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateVibe; 