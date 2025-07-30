'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface OptimizedPhotoProps {
  src: string;
  alt: string;
  title: string;
  author: string;
  district: string;
  likes: number;
  source: 'telegram' | 'instagram';
  className?: string;
  onClick?: () => void;
}

export default function OptimizedPhoto({
  src,
  alt,
  title,
  author,
  district,
  likes,
  source,
  className = '',
  onClick
}: OptimizedPhotoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback изображение
  const fallbackSrc = '/demo/art1.jpg';

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      className={`group cursor-pointer relative overflow-hidden rounded-soul ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Загрузка */}
      {isLoading && (
        <div className="absolute inset-0 bg-memory/20 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Изображение */}
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        onLoad={handleImageLoad}
        onError={handleImageError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />

      {/* Overlay с информацией */}
      <div className="absolute inset-0 bg-gradient-to-t from-shadow/80 via-shadow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-memory text-soul font-semibold text-lg mb-1">
            {title}
          </h3>
          <p className="text-gold font-memory text-sm mb-1">
            {author} • {district}
          </p>
          <p className="text-soul font-memory text-sm">
            ❤️ {likes}
          </p>
          <p className="text-soul/70 font-memory text-xs mt-1">
            {source === 'telegram' ? '📱 Telegram' : '📸 Instagram'}
          </p>
        </div>
      </div>

      {/* Индикатор источника */}
      <div className="absolute top-3 right-3 bg-glass/80 backdrop-blur-sm rounded-full p-2">
        <span className="text-xs">
          {source === 'telegram' ? '📱' : '📸'}
        </span>
      </div>
    </motion.div>
  );
} 