'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveCommunityFeed from '../components/organisms/LiveCommunityFeed';
import FreePhotoGallery from '../components/organisms/FreePhotoGallery';
import MeoFusciuniImage from '../components/atoms/MeoFusciuniImage';
import ProcessedCityView from '../components/atoms/ProcessedCityView';
import { getTopPhotosFromSources, mikoshkaPhotos } from '../utils/photoSources';
import { mockDistrictStats } from '../utils/lookbookUtils';

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
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

// Получаем реальные фотографии
const dynamicPhotos = getTopPhotosFromSources(14);

export default function HomePage() {
  const [isImageFalling, setIsImageFalling] = useState(false);
  const [clonedImage, setClonedImage] = useState<HTMLImageElement | null>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);

  // Анимация падения картинки
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Starting image fall animation');
      
      // Клонируем исходную картинку с сохранением всех стилей
      if (originalImageRef.current) {
        const cloned = originalImageRef.current.cloneNode(true) as HTMLImageElement;
        
        // Сохраняем все стили исходной картинки
        const computedStyle = window.getComputedStyle(originalImageRef.current);
        cloned.style.position = 'fixed';
        cloned.style.zIndex = '50';
        cloned.style.pointerEvents = 'none';
        cloned.style.width = computedStyle.width;
        cloned.style.height = computedStyle.height;
        cloned.style.objectFit = computedStyle.objectFit;
        cloned.style.borderRadius = computedStyle.borderRadius;
        cloned.style.boxShadow = computedStyle.boxShadow;
        
        setClonedImage(cloned);
      }
      
      setIsImageFalling(true);
    }, 3000); // Через 3 секунды после загрузки страницы

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-soul">
      {/* Главная презентация — асимметричная */}
      <section className="relative h-screen overflow-hidden">
        {/* Фоновое изображение с наклоном */}
        <div className="absolute inset-0 transform -skew-y-6 origin-top-left">
          <img 
            src={encodeURI(mikoshkaPhotos[0]?.src)}
            alt={mikoshkaPhotos[0]?.title || 'Владикавказ'}
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-shadow/40"></div>
        </div>
        
        {/* Центральный контент — смещённый */}
        <motion.div 
          className="relative text-soul z-10 px-6 h-full flex items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-4xl ml-8 md:ml-20">
            <motion.h1 
              className="font-soul text-7xl md:text-8xl mb-8 leading-tight"
              variants={itemVariants}
            >
              ВЛАДИКАВКАЗ
            </motion.h1>
            <motion.p 
              className="font-memory text-xl md:text-2xl mb-12 max-w-2xl"
              variants={itemVariants}
            >
              Город — это душа, которая рисует наши воспоминания. 
              Место, где традиции встречаются с инновациями.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="px-8 py-4 bg-gold text-soul rounded-memory font-memory hover:bg-amber transition-colors">
                Discover City World
              </button>
              <button className="px-8 py-4 bg-glass text-shadow rounded-memory font-memory hover:bg-memory/20 transition-colors">
                Explore Districts
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Философия города — асимметричная */}
      <section className="py-20 px-6 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Левая колонка */}
            <div className="lg:col-span-2">
              <h2 className="font-soul text-5xl text-shadow mb-8">
                Город — это душа, которая рисует наши воспоминания
              </h2>
              <p className="font-memory text-xl text-memory leading-relaxed">
                Каждый район — это аромат, каждая улица — это история, 
                каждый житель — это голос в хоре локального сообщества.
                Мы создаём пространство, где традиции встречаются с инновациями,
                где каждый может поделиться своим видением города.
              </p>
            </div>
            
            {/* Правая колонка — наклонное изображение */}
            <motion.div 
              className="transform rotate-3 hover:rotate-6 transition-transform duration-500"
              animate={isImageFalling ? {
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 }
              } : {}}
            >
              <ProcessedCityView 
                variant="hero"
                className="w-full h-64 rounded-soul shadow-soul"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Клонированная летающая картинка */}
      {isImageFalling && clonedImage && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          initial={{ 
            top: '60%', // Точная позиция исходной картинки в секции философии
            left: '85%',
            rotate: 3,
            scale: 1,
            opacity: 1
          }}
          animate={{
            top: ['60%', '60%', '75%'], // Начинает с исходной позиции, пролетает над ней, приземляется
            left: '85%',
            rotate: [3, 3, -15],
            scale: [1, 1, 1],
            opacity: [1, 1, 1]
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.4, 1]
          }}
          style={{
            transform: 'translate(-50%, -50%)'
          }}
        >
          <img 
            src={clonedImage.src}
            alt={clonedImage.alt}
            className="w-full h-64 object-cover rounded-soul shadow-2xl"
          />
        </motion.div>
      )}

      {/* Анимированная галерея с падением картинки */}
      <section className="relative">
        <FreePhotoGallery photos={dynamicPhotos} />
      </section>

      {/* Свободная галерея фотографий — без сетки */}
      <section className="py-20 px-6 bg-whisper/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="font-soul text-4xl text-shadow text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Лучшие моменты города
          </motion.h2>
          
          {/* Здесь была галерея - теперь она выше */}
        </div>
      </section>

      {/* Районы — асимметричная композиция */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="font-soul text-4xl text-shadow text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Районы города
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {mockDistrictStats.map((district, index) => (
              <motion.div
                key={district.name}
                className={`text-center group cursor-pointer ${
                  index === 0 ? 'lg:col-span-5' : 
                  index === 1 ? 'lg:col-span-4' : 'lg:col-span-3'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative overflow-hidden rounded-soul mb-6 transform hover:rotate-2 transition-transform duration-500">
                  <img 
                    src={encodeURI(mikoshkaPhotos[index % mikoshkaPhotos.length]?.src)}
                    alt={district.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-soul text-2xl text-shadow mb-3">
                  {district.name}
                </h3>
                <div className="space-y-2 text-memory font-memory">
                  <p>{district.posts} posts</p>
                  <p>❤️ {district.likes} likes</p>
                  <p>📸 {district.images} photos</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Живая лента */}
      <section className="py-20 px-6 bg-memory/5 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <LiveCommunityFeed />
        </motion.div>
      </section>
    </div>
  );
}

