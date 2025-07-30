import React, { useState } from 'react';
import { VLADIKAVKAZ_DISTRICTS, District } from '../../data/vladikavkazDistricts';

export interface DistrictsListProps {
  onDistrictClick?: (district: District) => void;
  selectedDistrict?: string;
  showSearch?: boolean;
  className?: string;
}

export const DistrictsList: React.FC<DistrictsListProps> = ({
  onDistrictClick,
  selectedDistrict,
  showSearch = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'number' | 'name'>('number');

  // Фильтруем и сортируем районы
  const filteredAndSortedDistricts = VLADIKAVKAZ_DISTRICTS
    .filter(district => {
      const matchesSearch = district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           district.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'number':
        default:
          return a.number - b.number;
      }
    });

  const handleDistrictClick = (district: District) => {
    if (onDistrictClick) {
      onDistrictClick(district);
    }
  };

  return (
    <div className={`districts-list ${className}`}>
      {/* Заголовок */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Районы Владикавказа</h2>
        <p className="text-gray-600">
          Выберите район для просмотра мест
        </p>
      </div>

      {/* Поиск и фильтры */}
      {showSearch && (
        <div className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Поиск по названию района..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Сортировка:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'number' | 'name')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="number">По номеру</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </div>
      )}

      {/* Список районов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedDistricts.map((district) => (
          <div
            key={district.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedDistrict === district.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
            onClick={() => handleDistrictClick(district)}
          >
            <div className="flex items-center space-x-3">
              {/* Цветной индикатор */}
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: district.color }}
              />
              
              {/* Информация о районе */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    #{district.number}
                  </span>
                  <h3 className="font-semibold text-gray-900">
                    {district.name}
                  </h3>
                </div>
                
                {district.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {district.description}
                  </p>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  Координаты: {district.center.lat.toFixed(4)}, {district.center.lng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Статистика:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Всего районов:</span>
            <span className="ml-2 font-medium">{VLADIKAVKAZ_DISTRICTS.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Показано:</span>
            <span className="ml-2 font-medium">{filteredAndSortedDistricts.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Выбран:</span>
            <span className="ml-2 font-medium">
              {selectedDistrict ? VLADIKAVKAZ_DISTRICTS.find(d => d.id === selectedDistrict)?.name : 'Нет'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Поиск:</span>
            <span className="ml-2 font-medium">{searchQuery ? 'Активен' : 'Неактивен'}</span>
          </div>
        </div>
      </div>

      {/* Пустое состояние */}
      {filteredAndSortedDistricts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Районы не найдены
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить поисковый запрос
          </p>
        </div>
      )}
    </div>
  );
};

export default DistrictsList; 