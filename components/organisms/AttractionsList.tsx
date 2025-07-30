import React, { useState, useMemo } from 'react';
import { AttractionCard, Attraction } from '../molecules/AttractionCard';

export interface AttractionsListProps {
  attractions: Attraction[];
  title?: string;
  onAttractionClick?: (attraction: Attraction) => void;
  className?: string;
}

export const AttractionsList: React.FC<AttractionsListProps> = ({
  attractions,
  title = 'Достопримечательности и шаурма',
  onAttractionClick,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'attraction' | 'shaurma'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('rating');

  // Получаем уникальные районы
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(attractions.map(a => a.district))];
    return uniqueDistricts.sort();
  }, [attractions]);

  // Фильтрация и сортировка
  const filteredAndSortedAttractions = useMemo(() => {
    let filtered = attractions;

    // Фильтр по поиску
    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтр по типу
    if (selectedType !== 'all') {
      filtered = filtered.filter(attraction => attraction.type === selectedType);
    }

    // Фильтр по району
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(attraction => attraction.district === selectedDistrict);
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewsCount - a.reviewsCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [attractions, searchTerm, selectedType, selectedDistrict, sortBy]);

  // Статистика
  const stats = useMemo(() => {
    const total = attractions.length;
    const attractionsCount = attractions.filter(a => a.type === 'attraction').length;
    const shaurmaCount = attractions.filter(a => a.type === 'shaurma').length;
    const avgRating = attractions.length > 0 
      ? (attractions.reduce((sum, a) => sum + a.rating, 0) / attractions.length).toFixed(1)
      : '0.0';

    return { total, attractionsCount, shaurmaCount, avgRating };
  }, [attractions]);

  return (
    <div className={`attractions-list ${className}`}>
      {/* Заголовок */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Всего: {stats.total}</span>
          <span>🏛️ Достопримечательности: {stats.attractionsCount}</span>
          <span>🌮 Шаурма/Фастфуд: {stats.shaurmaCount}</span>
          <span>⭐ Средний рейтинг: {stats.avgRating}</span>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-6 space-y-4">
        {/* Поиск */}
        <div>
          <input
            type="text"
            placeholder="🔍 Поиск по названию, адресу или описанию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-4">
          {/* Тип */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тип:
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Все типы</option>
              <option value="attraction">🏛️ Достопримечательности</option>
              <option value="shaurma">🌮 Шаурма/Фастфуд</option>
            </select>
          </div>

          {/* Район */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Район:
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Все районы</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Сортировка */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Сортировка:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rating">По рейтингу</option>
              <option value="reviews">По количеству отзывов</option>
              <option value="name">По названию</option>
            </select>
          </div>

          {/* Сброс фильтров */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedDistrict('all');
                setSortBy('rating');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🔄 Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Найдено: {filteredAndSortedAttractions.length} из {attractions.length}
        </p>
      </div>

      {/* Список карточек */}
      {filteredAndSortedAttractions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onClick={onAttractionClick}
              showDetails={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </div>
      )}

      {/* Статистика по фильтрам */}
      {filteredAndSortedAttractions.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Статистика по результатам:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Достопримечательности:</span>
              <span className="ml-2 text-gray-600">
                {filteredAndSortedAttractions.filter(a => a.type === 'attraction').length}
              </span>
            </div>
            <div>
              <span className="font-medium">Шаурма/Фастфуд:</span>
              <span className="ml-2 text-gray-600">
                {filteredAndSortedAttractions.filter(a => a.type === 'shaurma').length}
              </span>
            </div>
            <div>
              <span className="font-medium">Средний рейтинг:</span>
              <span className="ml-2 text-gray-600">
                {(filteredAndSortedAttractions.reduce((sum, a) => sum + a.rating, 0) / filteredAndSortedAttractions.length).toFixed(1)}⭐
              </span>
            </div>
            <div>
              <span className="font-medium">Топ рейтинг:</span>
              <span className="ml-2 text-gray-600">
                {Math.max(...filteredAndSortedAttractions.map(a => a.rating))}⭐
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionsList; 