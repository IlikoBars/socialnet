'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../components/templates/MainLayout';
import SisterPosts from '../../components/molecules/SisterPosts';
import { animationVariants } from '../../utils/animations';

export default function SisterPage() {
  return (
    <MainLayout
      title="📸 Посты от сестры"
      subtitle="Фотографии и истории от @gaboskii"
      gradient="from-purple-600 via-pink-600 to-purple-800"
    >
      <motion.div
        variants={animationVariants.fadeInUp}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        {/* Информация о сестре */}
        <motion.div
          variants={animationVariants.fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl">👩‍🦰</span>
            <span className="text-white font-medium">Моя сестра @gaboskii</span>
            <span className="text-2xl">📸</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Фотографии от сестры
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Моя сестра ведет Telegram канал с красивыми фотографиями Владикавказа. 
            Здесь собраны посты, созданные на основе её снимков.
          </p>
        </motion.div>

        {/* Посты от сестры */}
        <SisterPosts maxPosts={12} />

        {/* Дополнительная информация */}
        <motion.div
          variants={animationVariants.fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              💡 Как это работает?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Фотографии</h4>
                <p className="text-gray-300">
                  Сестра делает красивые снимки города и делится ими в Telegram
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Генерация</h4>
                <p className="text-gray-300">
                  На основе её фотографий создаются посты разных типов
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💭</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Вайбы</h4>
                <p className="text-gray-300">
                  Каждый пост превращается в уникальный "вайб" с историей
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div
          variants={animationVariants.fadeInUp}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Присоединяйтесь к сообществу!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Подпишитесь на канал сестры, чтобы видеть новые фотографии Владикавказа 
              и создавать свои собственные вайбы на основе её снимков.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://t.me/gaboskii', '_blank')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                👀 Подписаться на @gaboskii
              </button>
              <button
                onClick={() => window.location.href = '/vibes'}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full border border-white/20 transition-all duration-300"
              >
                🎨 Создать свой вайб
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
} 