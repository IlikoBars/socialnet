'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../components/templates/MainLayout';
import { MapInteractive } from '../../components/MapInteractive';
import VibeCollection from '../../components/VibeCollection';
import { RouteVibe, CreateVibe } from '../../components/molecules';
import { Text } from '../../components/atoms';
import { mikoshkaPhotos } from '../utils/photoSources';

// Моковые данные для демонстрации
const mockVibes = [
  {
    id: '1',
    type: 'audio' as const,
    content: 'Здесь я всегда слушаю Канье, когда прохожу этот мост. Музыка и город сливаются в одно целое.',
    author: { name: 'Алан' },
    location: { name: 'Мост через Терек', coordinates: { lat: 43.0258, lng: 44.6816 } },
    createdAt: '2 часа назад',
    music: { title: 'Runaway', artist: 'Kanye West' },
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    type: 'text' as const,
    content: 'Здесь я поцеловал её в последний раз. Теперь каждый раз, проходя мимо, вспоминаю этот момент.',
    author: { name: 'Зураб' },
    location: { name: 'Парк им. Коста Хетагурова', coordinates: { lat: 43.0258, lng: 44.6816 } },
    createdAt: '1 день назад',
    likes: 8,
    comments: 5
  },
  {
    id: '3',
    type: 'route' as const,
    content: 'Мой любимый маршрут по центру города. Здесь я гуляю, когда хочу подумать о жизни.',
    author: { name: 'Мадина' },
    location: { name: 'Центр Владикавказа', coordinates: { lat: 43.0258, lng: 44.6816 } },
    createdAt: '3 дня назад',
    route: {
      places: [
        { name: 'Площадь Свободы', coordinates: { lat: 43.0258, lng: 44.6816 }, description: 'Начало маршрута' },
        { name: 'Проспект Мира', coordinates: { lat: 43.0258, lng: 44.6816 }, description: 'Главная улица' },
        { name: 'Парк Коста', coordinates: { lat: 43.0258, lng: 44.6816 }, description: 'Место для отдыха' },
        { name: 'Набережная Терека', coordinates: { lat: 43.0258, lng: 44.6816 }, description: 'Конец маршрута' }
      ],
      duration: 45,
      distance: 1200
    },
    likes: 15,
    comments: 7
  },
  {
    id: '4',
    type: 'photo' as const,
    content: 'Здесь я впервые увидел настоящие граффити и понял, что стану рисовать. Это место изменило мою жизнь.',
    author: { name: 'Артём' },
    location: { name: 'Задний двор на ул. Ленина', coordinates: { lat: 43.0258, lng: 44.6816 } },
    createdAt: '1 неделю назад',
    likes: 23,
    comments: 12
  }
];

const mockPosts = [
  {
    id: 1,
    title: "Вечерний вайб в центре",
    image: mikoshkaPhotos[0]?.src,
    author: {
      nickname: "Алана",
      avatar: "/avatars/alana.png"
    }
  },
  {
    id: 2,
    title: "Утренняя прогулка",
    image: mikoshkaPhotos[1]?.src, 
    author: {
      nickname: "Яник",
      avatar: "/avatars/janik.png"
    }
  },
  {
    id: 3,
    title: "Ночные огни",
    image: mikoshkaPhotos[2]?.src,
    author: {
      nickname: "Зураб",
      avatar: "/avatars/zurab.png"
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function VibesPage() {
  const [vibes, setVibes] = useState(mockVibes);
  const [selectedVibeType, setSelectedVibeType] = useState<'all' | 'audio' | 'text' | 'photo' | 'route'>('all');

  const handleOpenPost = (post: any) => {
    console.log('Открыть пост:', post);
  };

  const handleVibeCreated = (newVibe: any) => {
    const vibe = {
      id: Date.now().toString(),
      type: newVibe.type,
      content: newVibe.content,
      author: { name: 'Вы' },
      location: { name: newVibe.location, coordinates: { lat: 43.0258, lng: 44.6816 } },
      createdAt: 'Только что',
      music: newVibe.music,
      route: newVibe.route ? {
        places: newVibe.route.map((place: any, index: number) => ({
          name: place.name,
          coordinates: { lat: 43.0258 + index * 0.001, lng: 44.6816 + index * 0.001 },
          description: place.description
        })),
        duration: newVibe.route.length * 10,
        distance: newVibe.route.length * 300
      } : undefined,
      likes: 0,
      comments: 0
    };
    
    setVibes([vibe, ...vibes]);
  };

  const filteredVibes = selectedVibeType === 'all' 
    ? vibes 
    : vibes.filter(vibe => vibe.type === selectedVibeType);

  return (
    <MainLayout
      title="Сторонки"
      subtitle="Откройте уникальные места и вайбы вашего города через интерактивную карту"
      gradient="purple"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Создание вайба */}
        <motion.div variants={itemVariants} className="mb-8">
          <CreateVibe onVibeCreated={handleVibeCreated} />
        </motion.div>

        {/* Фильтры */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap gap-3">
            {(['all', 'audio', 'text', 'photo', 'route'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedVibeType(type)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedVibeType === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {type === 'all' ? 'Все вайбы' : 
                 type === 'audio' ? '🎵 Аудио' :
                 type === 'text' ? '📖 Истории' :
                 type === 'photo' ? '📸 Фото' : '🗺️ Маршруты'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Карта */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="huly-map-container p-6">
              <h2 className="font-montserrat text-2xl font-semibold mb-6 text-white">
                Интерактивная карта
              </h2>
              <div className="h-[600px] rounded-3xl overflow-hidden">
                <MapInteractive />
              </div>
            </div>
          </motion.div>

          {/* Боковая панель с вайбами */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="huly-card p-6 h-fit">
              <h2 className="font-montserrat text-2xl font-semibold mb-6 text-white">
                Активные вайбы
              </h2>
              
              {/* Статистика */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 huly-stats-card">
                  <div className="text-2xl font-bold text-purple-400">{vibes.length}</div>
                  <div className="text-sm text-gray-400">Вайбов</div>
                </div>
                <div className="text-center p-4 huly-stats-card">
                  <div className="text-2xl font-bold text-pink-400">24</div>
                  <div className="text-sm text-gray-400">Онлайн</div>
                </div>
              </div>

              {/* Вайб-коллекция */}
              <div className="space-y-4">
                <h3 className="font-montserrat font-medium text-gray-300">
                  Последние вайбы
                </h3>
                <VibeCollection posts={mockPosts} onOpenPost={handleOpenPost} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Лента вайбов */}
        <motion.div variants={itemVariants} className="mt-12">
          <Text variant="h3" color="primary" className="mb-6">
            🧭 Маршрутные вайбы
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVibes.map((vibe) => (
              <RouteVibe
                key={vibe.id}
                {...vibe}
                onLike={(id) => console.log('Лайк:', id)}
                onComment={(id) => console.log('Комментарий:', id)}
                onShare={(id) => console.log('Поделиться:', id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          <div className="huly-card p-6">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Уникальные вайбы</h3>
            <p className="text-gray-300 text-sm">
              Каждая сторонка имеет свой неповторимый характер и атмосферу
            </p>
          </div>
          
          <div className="huly-card p-6">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Интерактивная карта</h3>
            <p className="text-gray-300 text-sm">
              Исследуйте город через авторскую геометрию и локальные названия
            </p>
          </div>
          
          <div className="huly-card p-6">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Сообщество</h3>
            <p className="text-gray-300 text-sm">
              Присоединяйтесь к локальному сообществу и делитесь своими историями
            </p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
