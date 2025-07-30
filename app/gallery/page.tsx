'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../components/templates/MainLayout';
import VirtualizedGallery from '../../components/molecules/VirtualizedGallery';
import { cityPhotos } from '../../data/cityPhotos';
import { Text, Button } from '../../components/atoms';

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

export default function GalleryPage() {
  return (
    <MainLayout
      title="📸 Галерея города"
      subtitle="Красивые места Владикавказа глазами местных фотографов"
      gradient="purple"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Информация о галерее */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-center">
            <Text variant="h2" color="primary" className="mb-4">
              📸 Галерея Владикавказа
            </Text>
            <Text variant="body" color="muted" className="max-w-2xl mx-auto mb-6">
              Здесь собраны фотографии красивейших мест нашего города. 
              Каждый снимок рассказывает свою историю и показывает Владикавказ 
              с разных ракурсов.
            </Text>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>📸 Фотографии: @mikhoshka</span>
              <span>📍 Места: Владикавказ</span>
              <span>🎨 Стиль: Уличная фотография</span>
            </div>
          </div>
        </motion.div>

        {/* Оптимизированная галерея */}
        <motion.div variants={itemVariants}>
          <VirtualizedGallery 
            photos={cityPhotos}
            title=""
            subtitle=""
            itemsPerPage={9}
          />
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          <div className="huly-card p-6 text-center">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Уличная фотография</h3>
            <p className="text-gray-300 text-sm">
              Захватываем моменты повседневной жизни города
            </p>
          </div>
          
          <div className="huly-card p-6 text-center">
            <div className="text-3xl mb-3">🏔️</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Горные пейзажи</h3>
            <p className="text-gray-300 text-sm">
              Величественные виды кавказских гор
            </p>
          </div>
          
          <div className="huly-card p-6 text-center">
            <div className="text-3xl mb-3">🏙️</div>
            <h3 className="font-montserrat font-semibold text-white mb-2">Городская архитектура</h3>
            <p className="text-gray-300 text-sm">
              Красота зданий и улиц Владикавказа
            </p>
          </div>
        </motion.div>

        {/* Кредит автору */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="huly-card p-6">
            <Text variant="h4" color="primary" className="mb-2">
              📸 Фотограф
            </Text>
            <Text variant="body" color="muted" className="mb-4">
              Все фотографии в этой галерее сделаны местным фотографом
            </Text>
            <Button
              variant="outline"
              onClick={() => window.open('https://www.instagram.com/mikhoshka', '_blank')}
            >
              👤 @mikhoshka на Instagram
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
} 