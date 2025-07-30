'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '../hooks/useIsMobile';
import CityMap from './organisms/CityMap';
import { District, Post } from '../types';
import { postsApi, districtsApi, mockData } from '../utils/api';

// Динамический импорт модальных окон для lazy loading
const VibeModal = dynamic(() => import('./VibeModal').then(mod => ({ default: mod.VibeModal })), {
  loading: () => <div className="loading-spinner" />,
  ssr: false
});

const VibeDrawer = dynamic(() => import('./VibeDrawer'), {
  loading: () => <div className="loading-spinner" />,
  ssr: false
});

export function MapInteractive() {
  const [open, setOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  // Мемоизированные колбэки для оптимизации
  const handleDistrictClick = useCallback(async (district: District) => {
    setSelectedDistrict(district);
    setLoading(true);
    
    try {
      // Получаем информацию о районе из парсера
      const districtResponse = await districtsApi.getDistrict(district.id);
      
      // Получаем посты для района
      const postsResponse = await postsApi.getPostsByDistrict(district.name);
      
      if (postsResponse.success && postsResponse.posts) {
        setPosts(postsResponse.posts);
      } else {
        // Fallback на моковые данные
        const mockPosts = mockData.getMockPosts(district.name);
        setPosts(mockPosts);
      }
      
      // Логируем информацию о районе
      if (districtResponse.success && districtResponse.district) {
        console.log('Информация о районе:', districtResponse.district);
      }
      
      setOpen(true);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      // Fallback на моковые данные при ошибке
      const mockPosts = mockData.getMockPosts(district.name);
      setPosts(mockPosts);
      setOpen(true);
    } finally {
      setLoading(false);
    }
    }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedDistrict(null);
  }, []);

  return (
    <div className="relative">
      {/* Карта */}
      <CityMap
        onDistrictClick={handleDistrictClick}
        selectedDistrict={selectedDistrict}
        className="w-full"
      />
      
      {/* Индикатор загрузки */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-3xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-white">Загрузка постов...</p>
          </div>
        </div>
      )}
      
      {/* Модальные окна */}
      {isMobile ? (
        <VibeDrawer 
          open={open} 
          posts={posts} 
          onClose={handleClose} 
        />
      ) : (
        <VibeModal 
          open={open} 
          posts={posts}
          onClose={handleClose} 
        />
      )}
    </div>
  );
}
