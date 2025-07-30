'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms';
import { Text } from '../atoms';
import { Button } from '../atoms';
import OptimizedImage from './OptimizedImage';
import { CityPhoto } from '../../types';

export interface VirtualizedGalleryProps {
  photos: CityPhoto[];
  title?: string;
  subtitle?: string;
  className?: string;
  itemsPerPage?: number;
}

const VirtualizedGallery: React.FC<VirtualizedGalleryProps> = ({
  photos,
  title = "Галерея города",
  subtitle = "Красивые места Владикавказа глазами местных фотографов",
  className = '',
  itemsPerPage = 6,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CityPhoto | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Вычисляем общее количество страниц
  const totalPages = useMemo(() => Math.ceil(photos.length / itemsPerPage), [photos.length, itemsPerPage]);

  // Получаем фотографии для текущей страницы
  const currentPhotos = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return photos.slice(startIndex, startIndex + itemsPerPage);
  }, [photos, currentPage, itemsPerPage]);

  // Intersection Observer для виртуализации
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...new Set([...prev, index])]);
          } else {
            setVisibleItems(prev => prev.filter(i => i !== index));
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const items = containerRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [currentPhotos]);

  const openModal = useCallback((photo: CityPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  return (
    <div className={className}>
      {/* Заголовок */}
      <div className="text-center mb-8">
        <Text variant="h3" color="primary" className="mb-2">
          📸 {title}
        </Text>
        <Text variant="body" color="muted">
          {subtitle}
        </Text>
      </div>

      {/* Галерея */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPhotos.map((photo, index) => {
          const globalIndex = currentPage * itemsPerPage + index;
          const isVisible = visibleItems.includes(globalIndex);
          
          return (
            <motion.div
              key={photo.id}
              data-index={globalIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => openModal(photo)}
            >
              <Card variant="default" padding="none" className="overflow-hidden">
                <div className="relative group">
                  <OptimizedImage
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className="w-full h-64"
                    priority={index < 3} // Приоритет для первых 3 изображений
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Text variant="label" color="primary" weight="semibold" className="text-white">
                        {photo.location}
                      </Text>
                      <Text variant="caption" color="muted" className="text-white/80">
                        Фото: {photo.author}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Text variant="body" color="primary" className="mb-2">
                    {photo.description}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Text variant="caption" color="muted">
                      📍 {photo.location}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(photo.authorLink, '_blank');
                      }}
                    >
                      Автор
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            ← Назад
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i;
              } else if (currentPage < 3) {
                pageNum = i;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 5 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            Вперед →
          </Button>
        </div>
      )}

      {/* Модальное окно */}
      <AnimatePresence>
        {selectedPhoto && (
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
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain"
                priority={true}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <Text variant="h4" color="primary" className="mb-2 text-white">
                  {selectedPhoto.location}
                </Text>
                <Text variant="body" color="muted" className="mb-3 text-white/90">
                  {selectedPhoto.description}
                </Text>
                <div className="flex items-center justify-between">
                  <Text variant="caption" color="muted" className="text-white/80">
                    📸 Фото: {selectedPhoto.author}
                  </Text>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedPhoto.authorLink, '_blank')}
                    >
                      Профиль автора
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={closeModal}
                    >
                      Закрыть
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualizedGallery; 