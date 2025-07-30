'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { PhotoSource } from '../../data/photoSources';

interface PhotoPosition {
  photo: PhotoSource;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  zIndex: number;
  delay: number;
}

interface FreePhotoGalleryProps {
  photos: PhotoSource[];
  className?: string;
}

export default function FreePhotoGallery({ photos, className = '' }: FreePhotoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Состояния для анимации фото
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [allPhotosVisible, setAllPhotosVisible] = useState(false);
  const [randomDelays, setRandomDelays] = useState<number[]>([]);
  const [photoPositions, setPhotoPositions] = useState<PhotoPosition[]>([]);

  // Генерация позиций и задержек только на клиенте
  useEffect(() => {
    const GALLERY_WIDTH = 1200;
    const GALLERY_HEIGHT = 900;
    const MIN_SIZE = 180;
    const MAX_SIZE = 320;
    const MIN_MARGIN = 100;
    const PHOTO_COUNT = Math.min(8, photos.length);

    function isOverlap(a: any, b: any) {
      return !(
        a.left + a.width + MIN_MARGIN < b.left ||
        b.left + b.width + MIN_MARGIN < a.left ||
        a.top + a.height + MIN_MARGIN < b.top ||
        b.top + b.height + MIN_MARGIN < a.top
      );
    }

    const positions: PhotoPosition[] = [];
    const delays: number[] = [];

    for (let i = 0; i < PHOTO_COUNT; i++) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 50) {
        const width = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
        const height = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
        const left = Math.floor(Math.random() * (GALLERY_WIDTH - width - 2 * MIN_MARGIN)) + MIN_MARGIN;
        const top = Math.floor(Math.random() * (GALLERY_HEIGHT - height - 2 * MIN_MARGIN)) + MIN_MARGIN;
        const newPos = { left, top, width, height };
        if (!positions.some(p => isOverlap(p.position, newPos))) {
          positions.push({
            photo: photos[i],
            position: {
              top: top + 'px',
              left: left + 'px',
              width: width + 'px',
              height: height + 'px'
            },
            zIndex: i + 1,
            delay: i * 0.1
          });
          delays.push(Math.random() * 0.5); // Рандомная задержка
          placed = true;
        }
        attempts++;
      }
    }

    setPhotoPositions(positions);
    setRandomDelays(delays);
  }, [photos]);

  // Анимация появления фото по одной
  useEffect(() => {
    if (photoPositions.length > 0) {
      const interval = setInterval(() => {
        setVisiblePhotos(prev => {
          const nextIndex = prev.length;
          if (nextIndex < photoPositions.length) {
            return [...prev, nextIndex];
          } else {
            setAllPhotosVisible(true);
            clearInterval(interval);
            return prev;
          }
        });
      }, 300); // Каждые 300мс появляется новое фото

      return () => clearInterval(interval);
    }
  }, [photoPositions.length]);

  // Трансформации для обратной анимации при скролле вверх
  const photosY = useTransform(scrollYProgress, [0.3, 0.6], [0, -100]);
  const photosOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-hidden ${className}`} style={{ position: 'relative' }}>
      {/* Фотографии галереи */}
      <motion.div className="absolute inset-0" style={{ y: photosY, opacity: photosOpacity }}>
        {photoPositions.map((item, index) => (
          <motion.div
            key={item.photo.id}
            className="absolute group cursor-pointer"
            style={{
              top: item.position.top,
              left: item.position.left,
              width: item.position.width,
              height: item.position.height,
              zIndex: item.zIndex,
            }}
            initial={{ 
              scale: 0, 
              opacity: 0,
              y: 50
            }}
            animate={visiblePhotos.includes(index) ? {
              scale: 1,
              opacity: 1,
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: "easeOut",
                delay: randomDelays[index] || 0
              }
            } : {}}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 20, 
              transition: { duration: 0.7 } 
            }}
          >
            <img
              src={encodeURI(item.photo.src)}
              alt={item.photo.title}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl"
              onError={(e) => console.log('Error loading image:', item.photo.src)}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 