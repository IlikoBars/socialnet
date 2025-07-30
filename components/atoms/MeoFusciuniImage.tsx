'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MeoFusciuniImageProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'overlay';
}

export default function MeoFusciuniImage({ 
  src, 
  alt, 
  className = '', 
  variant = 'primary' 
}: MeoFusciuniImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Meo Fusciuni стиль фильтры
  const meoFusciuniFilters = {
    primary: {
      brightness: 0.9,
      contrast: 1.1,
      saturation: 0.8,
      sepia: 0.1,
      blur: 0,
      opacity: 0.95
    },
    secondary: {
      brightness: 0.85,
      contrast: 1.2,
      saturation: 0.7,
      sepia: 0.15,
      blur: 0.5,
      opacity: 0.9
    },
    overlay: {
      brightness: 0.8,
      contrast: 1.3,
      saturation: 0.6,
      sepia: 0.2,
      blur: 1,
      opacity: 0.85
    }
  };

  const filters = meoFusciuniFilters[variant];

  // Обработка изображения в стиле Meo Fusciuni
  useEffect(() => {
    if (imageRef.current && canvasRef.current && isLoaded) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      if (ctx) {
        // Устанавливаем размеры canvas
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Применяем фильтры в стиле Meo Fusciuni
        ctx.filter = `
          brightness(${filters.brightness})
          contrast(${filters.contrast})
          saturate(${filters.saturation})
          sepia(${filters.sepia})
          blur(${filters.blur}px)
        `;

        // Рисуем изображение
        ctx.drawImage(img, 0, 0);

        // Добавляем градиентный оверлей для глубины
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isLoaded, filters]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Скрытое изображение для обработки */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="hidden"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Обработанное изображение */}
      {isLoaded && (
        <motion.canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            filter: `
              brightness(${filters.brightness})
              contrast(${filters.contrast})
              saturate(${filters.saturation})
              sepia(${filters.sepia})
            `,
            opacity: filters.opacity
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: filters.opacity }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      )}

      {/* Элегантный оверлей в стиле Meo Fusciuni */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      
      {/* Тонкая рамка */}
      <div className="absolute inset-0 border border-white/10" />
    </motion.div>
  );
} 