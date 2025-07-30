'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

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

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Пример: берём первого пользователя
    axios
      .get('http://localhost:8000/users?_limit=1')
      .then((res) => {
        setUser(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки профиля:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="font-montserrat text-gray-300">Загрузка профиля...</p>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="font-montserrat text-xl font-semibold mb-2">Профиль не найден</h2>
          <p className="font-inter text-gray-300">Попробуйте обновить страницу</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Мой профиль
          </h1>
          <p className="font-montserrat text-lg text-gray-300">
            Управляйте своим аккаунтом и настройками
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="font-montserrat text-2xl font-semibold mb-6 text-white">
                Основная информация
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-white text-lg">
                      {user.name || 'Пользователь'}
                    </h3>
                    <p className="font-inter text-gray-400">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                      Имя
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name || ''}
                      className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-montserrat font-semibold rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Сохранить изменения
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Боковая панель */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="space-y-6">
              {/* Статистика */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="font-montserrat font-semibold text-white mb-4">
                  Статистика
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-gray-400">Постов создано:</span>
                    <span className="font-montserrat font-semibold text-yellow-400">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-gray-400">Сторонок посещено:</span>
                    <span className="font-montserrat font-semibold text-green-400">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-gray-400">Дней в сообществе:</span>
                    <span className="font-montserrat font-semibold text-blue-400">45</span>
                  </div>
                </div>
              </div>

              {/* Быстрые действия */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="font-montserrat font-semibold text-white mb-4">
                  Быстрые действия
                </h3>
                <div className="space-y-3">
                  <motion.button
                    className="w-full py-2 px-4 bg-gray-700/50 rounded-lg text-sm font-montserrat font-medium hover:bg-gray-600/50 transition-colors text-left"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✏️ Создать пост
                  </motion.button>
                  <motion.button
                    className="w-full py-2 px-4 bg-gray-700/50 rounded-lg text-sm font-montserrat font-medium hover:bg-gray-600/50 transition-colors text-left"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🗺️ Открыть карту
                  </motion.button>
                  <motion.button
                    className="w-full py-2 px-4 bg-gray-700/50 rounded-lg text-sm font-montserrat font-medium hover:bg-gray-600/50 transition-colors text-left"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ⚙️ Настройки
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
