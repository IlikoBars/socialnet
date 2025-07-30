'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CityPhoto {
  id: string;
  src: string;
  title: string;
  district: string;
  likes: number;
  author: string;
  timestamp: Date;
}

interface CityLookbookProps {
  photos: CityPhoto[];
}

export default function CityLookbook({ photos }: CityLookbookProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<CityPhoto | null>(null);

  return (
    <div className="py-20 px-6 bg-whisper/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="font-soul text-4xl text-shadow text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Лучшие моменты города
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative overflow-hidden rounded-soul mb-4">
                <img 
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-shadow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay с информацией */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-shadow/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-soul font-memory text-sm">{photo.author}</p>
                  <p className="text-gold font-memory text-sm">❤️ {photo.likes}</p>
                </div>
              </div>
              <h3 className="font-memory text-xl text-shadow mb-2">
                {photo.title}
              </h3>
              <p className="text-memory mb-2">{photo.district}</p>
              <p className="text-gold font-memory">❤️ {photo.likes} likes</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра фото */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 bg-shadow/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto rounded-soul"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-10 h-10 bg-glass rounded-full flex items-center justify-center text-shadow hover:bg-memory/20 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-shadow/90 to-transparent p-6 rounded-b-soul">
              <h3 className="font-soul text-2xl text-soul mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="font-memory text-soul mb-2">{selectedPhoto.district}</p>
              <p className="font-memory text-gold">❤️ {selectedPhoto.likes} likes</p>
              <p className="font-memory text-soul/80 text-sm mt-2">
                Автор: {selectedPhoto.author}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 