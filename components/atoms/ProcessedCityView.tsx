'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProcessedCityViewProps {
  className?: string;
  variant?: 'hero' | 'gallery' | 'overlay';
}

export default function ProcessedCityView({ 
  className = '', 
  variant = 'hero' 
}: ProcessedCityViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Специальные фильтры для этой фотографии в стиле Meo Fusciuni
  const cityViewFilters = {
    hero: {
      brightness: 0.88,
      contrast: 1.15,
      saturation: 0.75,
      sepia: 0.12,
      blur: 0,
      opacity: 0.95,
      vignette: true
    },
    gallery: {
      brightness: 0.85,
      contrast: 1.2,
      saturation: 0.7,
      sepia: 0.15,
      blur: 0.3,
      opacity: 0.9,
      vignette: true
    },
    overlay: {
      brightness: 0.8,
      contrast: 1.25,
      saturation: 0.65,
      sepia: 0.18,
      blur: 0.5,
      opacity: 0.85,
      vignette: true
    }
  };

  const filters = cityViewFilters[variant];

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

        // Добавляем элегантную виньетку
        if (filters.vignette) {
          const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
          );
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.7, 'transparent');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
          
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Добавляем градиентный оверлей для глубины
        const linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        linearGradient.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
        linearGradient.addColorStop(0.3, 'transparent');
        linearGradient.addColorStop(0.7, 'transparent');
        linearGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = linearGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isLoaded, filters]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Скрытое изображение для обработки */}
      <img
        ref={imageRef}
        src="/photos/mikoshka/photo_2025-07-29 22.03.24.jpeg"
        alt="Девушка на каменной стене с видом на город"
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
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}

      {/* Элегантный оверлей в стиле Meo Fusciuni */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/8" />
      
      {/* Тонкая рамка для элегантности */}
      <div className="absolute inset-0 border border-white/8" />
      
      {/* Дополнительный оверлей для атмосферности */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />
    </motion.div>
  );
} 