'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CommunityPostCard from '../molecules/CommunityPostCard';
import PostCreationModal from '../molecules/PostCreationModal';
import { CommunityPost, PostCreationData } from '../../types/community';
import { canUserPostToday } from '../../utils/communityAlgorithm';
import { getTopPhotosFromForum } from '../../utils/lookbookUtils';
import React from 'react'; // Added for useState
import { mikoshkaPhotos } from '../../utils/photoSources';

// Моковые данные для демонстрации
const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Алан Дзагоев',
      avatar: '/avatars/alana.png',
      district: 'Иристон'
    },
    content: {
      text: 'Сегодня утром в парке встретил старика, который рассказывал детям легенды об Осетии. Это напомнило мне, что мы — хранители нашей культуры.',
      image: mikoshkaPhotos[0]?.src,
      tags: ['культура', 'память', 'Иристон']
    },
    stats: {
      likes: 47,
      views: 156,
      comments: 12
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
    canPostToday: false,
    isSelected: true
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Зураб Цховребов',
      avatar: '/avatars/zurab.png',
      district: 'Затеречный'
    },
    content: {
      text: 'В Затеречном районе открыли новую кофейню. Атмосфера как в старом Владикавказе — дерево, книги, джаз. Рекомендую всем любителям уюта.',
      image: mikoshkaPhotos[1]?.src,
      tags: ['кофейня', 'Затеречный', 'атмосфера']
    },
    stats: {
      likes: 34,
      views: 89,
      comments: 8
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 часа назад
    canPostToday: false,
    isSelected: true
  },
  {
    id: '3',
    author: {
      id: 'user3',
      name: 'Яна Козаева',
      avatar: '/avatars/janik.png',
      district: 'Северо-Западный'
    },
    content: {
      text: 'Вечером в Северо-Западном районе небо было особенно красивым. Фотография не передаёт всей красоты, но попыталась запечатлеть этот момент.',
      tags: ['небо', 'вечер', 'Северо-Западный', 'красота']
    },
    stats: {
      likes: 28,
      views: 67,
      comments: 5
    },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 часов назад
    canPostToday: false,
    isSelected: true
  }
];

export default function LiveCommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [canPost, setCanPost] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [topPhotos, setTopPhotos] = useState<any[]>([]);

  // Получаем лучшие фотографии из форума
  useEffect(() => {
    // Вместо getTopPhotosFromForum(posts, 3):
    const TOP_PHOTO_COUNT = 6; // столько слотов в сетке (можно увеличить)
    setTopPhotos(mikoshkaPhotos.slice(0, TOP_PHOTO_COUNT));
  }, [posts]);

  // Проверка возможности постинга
  useEffect(() => {
    // В реальном приложении здесь была бы проверка с сервера
    setCanPost(true);
  }, []);

  const handlePostSubmit = (postData: PostCreationData) => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: {
        id: 'currentUser',
        name: 'Ты',
        avatar: '/avatars/default.png',
        district: 'Твой район'
      },
      content: {
        text: postData.text,
        image: postData.image ? URL.createObjectURL(postData.image) : undefined,
        tags: postData.tags
      },
      stats: {
        likes: 0,
        views: 0,
        comments: 0
      },
      timestamp: new Date(),
      canPostToday: false,
      isSelected: false
    };

    setPosts(prev => [newPost, ...prev]);
    setCanPost(false);
  };

  // При формировании posts (или перед рендером):
  const postsWithPhotos = posts.map((post, idx) => ({
    ...post,
    content: {
      ...post.content,
      image: mikoshkaPhotos[idx % mikoshkaPhotos.length]?.src || post.content.image,
      title: mikoshkaPhotos[idx % mikoshkaPhotos.length]?.title || post.content.title,
    }
  }));

  // Перед рендером topPhotos:
  const [loadingStates, setLoadingStates] = React.useState<boolean[]>(() => topPhotos.map(() => true));
  const [errorStates, setErrorStates] = React.useState<boolean[]>(() => topPhotos.map(() => false));

  React.useEffect(() => {
    setLoadingStates(topPhotos.map(() => true));
    setErrorStates(topPhotos.map(() => false));
  }, [topPhotos.length]);

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Заголовок ленты */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-soul text-4xl text-shadow mb-4">
          Сегодня в городе
        </h1>
        <p className="font-memory text-memory text-lg">
          Слова, которые формируют нас сегодня
        </p>
      </motion.div>

      {/* Лучшие фотографии дня */}
      {topPhotos.length > 0 && (
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-soul text-2xl text-shadow mb-6 text-center">
            Лучшие фотографии дня
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-memory group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (0.3 + index * 0.1) * 3, duration: 2.5 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ amount: 0.16 }}
              >
                {/* Трекер загрузки */}
                <img
                  src={encodeURI(photo.src)}
                  alt={photo.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoad={() => {
                    setLoadingStates(prev => prev.map((v, i) => i === index ? false : v));
                    setErrorStates(prev => prev.map((v, i) => i === index ? false : v));
                    console.log(`[LOADED] #${index} src:`, photo.src, '| alt:', photo.title);
                  }}
                  onError={e => {
                    setLoadingStates(prev => prev.map((v, i) => i === index ? false : v));
                    setErrorStates(prev => prev.map((v, i) => i === index ? true : v));
                    e.currentTarget.style.opacity = 0.2;
                    console.error(`[ERROR] #${index} src:`, photo.src, '| alt:', photo.title);
                  }}
                />
                {loadingStates[index] && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {errorStates[index] && (
                  <div className="absolute inset-0 bg-red-200/40 flex items-center justify-center z-20">
                    <span className="text-red-700 font-bold">Ошибка загрузки</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-shadow/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-soul font-memory text-sm font-semibold">
                      {photo.title}
                    </p>
                    <p className="text-gold font-memory text-xs">
                      ❤️ {photo.likes} • {photo.district}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Кнопка создания поста */}
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setShowModal(true)}
          disabled={!canPost}
          className={`
            px-8 py-4 rounded-memory font-memory text-lg transition-all
            ${canPost 
              ? 'bg-gold text-soul hover:bg-amber shadow-whisper hover:shadow-gold' 
              : 'bg-memory/20 text-memory/50 cursor-not-allowed'
            }
          `}
        >
          {canPost ? 'Поделиться словом' : 'Сегодня уже поделился'}
        </button>
      </motion.div>

      {/* Лента постов */}
      <AnimatePresence>
        {postsWithPhotos.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ 
              delay: 0.5 + index * 0.1,
              duration: 1.6, // было 0.6, стало на 1s больше
              type: "spring",
              stiffness: 100
            }}
            viewport={{ amount: 0.16 }}
          >
            <CommunityPostCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Модальное окно создания поста */}
      <PostCreationModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
} 