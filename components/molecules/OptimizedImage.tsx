'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer для ленивой загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Начинаем загружать за 50px до появления
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {/* Плейсхолдер */}
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-800 flex items-center justify-center"
          >
            <div className="animate-pulse">
              <div className="w-full h-full bg-gray-700 rounded-lg"></div>
            </div>
          </motion.div>
        )}

        {/* Ошибка загрузки */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-800 flex items-center justify-center"
          >
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm">Ошибка загрузки</div>
            </div>
          </motion.div>
        )}

        {/* Изображение */}
        {isInView && !hasError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0.7, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority={priority}
              placeholder="blur"
              blurDataURL={placeholder}
              onLoad={handleLoad}
              onError={handleError}
              loading={priority ? 'eager' : 'lazy'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedImage; 