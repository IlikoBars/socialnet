'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms';
import { Text } from '../atoms';
import { Button } from '../atoms';

export interface CityPhoto {
  id: string;
  src: string;
  alt: string;
  location: string;
  description: string;
  author: string;
  authorLink: string;
}

export interface CityGalleryProps {
  photos: CityPhoto[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const CityGallery: React.FC<CityGalleryProps> = ({
  photos,
  title = "Галерея города",
  subtitle = "Красивые места Владикавказа глазами местных фотографов",
  className = ''
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CityPhoto | null>(null);

  const openModal = (photo: CityPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => openModal(photo)}
          >
            <Card variant="default" padding="sm" className="overflow-hidden p-0">
              <div className="relative group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
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
                    onClick={() => {
                      window.open(photo.authorLink, '_blank');
                    }}
                  >
                    Автор
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

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
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
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

export default CityGallery; 