import React, { useState } from 'react';
import { PlaceCard, Place } from '../molecules/PlaceCard';

export interface PlacesListProps {
  places: Place[];
  title?: string;
  showFilters?: boolean;
  onPlaceClick?: (place: Place) => void;
}

export const PlacesList: React.FC<PlacesListProps> = ({
  places,
  title = 'Места',
  showFilters = true,
  onPlaceClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('rating');

  // Получаем уникальные категории
  const categories = ['all', ...Array.from(new Set(places.map(place => place.category)))];

  // Фильтруем и сортируем места
  const filteredAndSortedPlaces = places
    .filter(place => {
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           place.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
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

  const handlePlaceClick = (place: Place) => {
    if (onPlaceClick) {
      onPlaceClick(place);
    }
  };

  return (
    <div className="places-list">
      {/* Заголовок */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">
          Найдено {filteredAndSortedPlaces.length} из {places.length} мест
        </p>
      </div>

      {/* Фильтры */}
      {showFilters && (
        <div className="mb-6 space-y-4">
          {/* Поиск */}
          <div>
            <input
              type="text"
              placeholder="Поиск по названию или адресу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-4">
            {/* Категории */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Категория:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Все' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Сортировка */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Сортировка:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'reviews')}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">По рейтингу</option>
                <option value="reviews">По отзывам</option>
                <option value="name">По названию</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Список мест */}
      {filteredAndSortedPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onClick={handlePlaceClick}
              showDetails={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Места не найдены
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </div>
      )}

      {/* Статистика */}
      {showFilters && filteredAndSortedPlaces.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Статистика:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Всего мест:</span>
              <span className="ml-2 font-medium">{places.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Показано:</span>
              <span className="ml-2 font-medium">{filteredAndSortedPlaces.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Средний рейтинг:</span>
              <span className="ml-2 font-medium">
                {(filteredAndSortedPlaces.reduce((sum, place) => sum + place.rating, 0) / filteredAndSortedPlaces.length).toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Категорий:</span>
              <span className="ml-2 font-medium">{categories.length - 1}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesList; 