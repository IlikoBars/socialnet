'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms';
import { Text } from '../atoms';
import { Button } from '../atoms';
import { Post } from '../../types';
import { generatePostsFromSisterPhotos, sisterPhotos } from '../../data/sisterPhotos';
import OptimizedImage from './OptimizedImage';

export interface SisterPostsProps {
  className?: string;
  maxPosts?: number;
}

const SisterPosts: React.FC<SisterPostsProps> = ({
  className = '',
  maxPosts = 6
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Генерируем посты на основе фотографий сестры
  const posts = useMemo(() => {
    const generatedPosts = generatePostsFromSisterPhotos();
    return showAll ? generatedPosts : generatedPosts.slice(0, maxPosts);
  }, [showAll, maxPosts]);

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const getTypeIcon = (type: Post['type']) => {
    switch (type) {
      case 'photo': return '📸';
      case 'text': return '📖';
      case 'audio': return '🎵';
      case 'route': return '🗺️';
      default: return '💭';
    }
  };

  const getTypeLabel = (type: Post['type']) => {
    switch (type) {
      case 'photo': return 'Фото от сестры';
      case 'text': return 'История';
      case 'audio': return 'Аудио-вайб';
      case 'route': return 'Маршрут';
      default: return 'Вайб';
    }
  };

  return (
    <div className={className}>
      {/* Заголовок */}
      <div className="text-center mb-8">
        <Text variant="h3" color="primary" className="mb-2">
          📸 Посты от сестры @gaboskii
        </Text>
        <Text variant="body" color="muted">
          Фотографии и истории от моей сестры из Telegram канала
        </Text>
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => window.open('https://t.me/gaboskii', '_blank')}
          >
            👀 Подписаться на канал
          </Button>
        </div>
      </div>

      {/* Посты */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => openModal(post)}
          >
            <Card variant="default" padding="lg" hover={true}>
              {/* Изображение */}
              {post.mediaUrl && (
                <div className="mb-4">
                  <OptimizedImage
                    src={post.mediaUrl}
                    alt={post.content}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-2xl"
                    priority={index < 3}
                  />
                </div>
              )}

              {/* Тип поста */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{getTypeIcon(post.type)}</span>
                <Text variant="caption" color="accent" className="bg-purple-500/20 px-2 py-1 rounded-full">
                  {getTypeLabel(post.type)}
                </Text>
              </div>

              {/* Контент */}
              <Text variant="body" color="primary" className="mb-3 line-clamp-3">
                {post.content}
              </Text>

              {/* Автор и время */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <Text variant="caption" color="primary" weight="medium">
                      {post.author.name}
                    </Text>
                    <Text variant="caption" color="muted">
                      {post.createdAt}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>

              {/* Музыка (для аудио-постов) */}
              {post.type === 'audio' && post.music && (
                <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
                  <Text variant="caption" color="primary" weight="medium">
                    🎵 {post.music.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    {post.music.artist}
                  </Text>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Кнопка "Показать больше" */}
      {!showAll && posts.length >= maxPosts && (
        <div className="text-center mt-8">
          <Button
            variant="secondary"
            onClick={() => setShowAll(true)}
          >
            Показать все посты от сестры
          </Button>
        </div>
      )}

      {/* Модальное окно */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-2xl w-full bg-gray-900 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Изображение */}
            {selectedPost.mediaUrl && (
              <OptimizedImage
                src={selectedPost.mediaUrl}
                alt={selectedPost.content}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                priority={true}
              />
            )}

            {/* Контент */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{getTypeIcon(selectedPost.type)}</span>
                <Text variant="label" color="accent" className="bg-purple-500/20 px-3 py-1 rounded-full">
                  {getTypeLabel(selectedPost.type)}
                </Text>
              </div>

              <Text variant="body" color="primary" className="mb-4">
                {selectedPost.content}
              </Text>

              {/* Автор */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {selectedPost.author.name.charAt(0)}
                  </div>
                  <div>
                    <Text variant="label" color="primary" weight="semibold">
                      {selectedPost.author.name}
                    </Text>
                    <Text variant="caption" color="muted">
                      {selectedPost.createdAt}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>❤️ {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                </div>
              </div>

              {/* Музыка */}
              {selectedPost.type === 'audio' && selectedPost.music && (
                <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
                  <Text variant="label" color="primary" weight="semibold">
                    🎵 {selectedPost.music.title}
                  </Text>
                  <Text variant="body" color="muted">
                    {selectedPost.music.artist}
                  </Text>
                </div>
              )}

              {/* Кнопки */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://t.me/gaboskii', '_blank')}
                  className="flex-1"
                >
                  👀 Канал сестры
                </Button>
                <Button
                  variant="primary"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SisterPosts; 