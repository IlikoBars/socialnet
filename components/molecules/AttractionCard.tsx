import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

export interface Attraction {
  id: string;
  name: string;
  category: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  type: 'attraction' | 'shaurma';
  rating: number;
  reviewsCount: number;
  price?: string;
  workingHours?: string;
}

export interface AttractionCardProps {
  attraction: Attraction;
  onClick?: (attraction: Attraction) => void;
  showDetails?: boolean;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ 
  attraction, 
  onClick, 
  showDetails = false 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(attraction);
    }
  };

  const formatRating = (rating: number) => {
    if (rating === 0) return 'Нет оценок';
    return `${rating.toFixed(1)} ⭐`;
  };

  const formatReviews = (count: number) => {
    if (count === 0) return '';
    return `(${count} отзывов)`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attraction': return '🏛️';
      case 'shaurma': return '🌮';
      default: return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'attraction': return 'Достопримечательность';
      case 'shaurma': return 'Шаурма/Фастфуд';
      default: return 'Место';
    }
  };

  return (
    <Card className="attraction-card hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="p-4">
        {/* Заголовок */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xl">{getTypeIcon(attraction.type)}</span>
              <h3 className="text-lg font-semibold text-gray-900">
                {attraction.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {getTypeLabel(attraction.type)}
            </p>
            <p className="text-xs text-gray-500">
              {attraction.district}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {formatRating(attraction.rating)}
            </div>
            <div className="text-xs text-gray-500">
              {formatReviews(attraction.reviewsCount)}
            </div>
            {attraction.price && (
              <div className="text-xs text-green-600 font-medium mt-1">
                {attraction.price}
              </div>
            )}
          </div>
        </div>

        {/* Адрес */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 flex items-center">
            <span className="mr-2">📍</span>
            {attraction.address}
          </p>
        </div>

        {/* Описание */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {attraction.description}
          </p>
        </div>

        {/* Дополнительная информация */}
        {showDetails && (
          <div className="mb-3 space-y-2">
            {attraction.workingHours && (
              <p className="text-sm text-gray-700 flex items-center">
                <span className="mr-2">🕒</span>
                {attraction.workingHours}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Координаты: {attraction.lat.toFixed(6)}, {attraction.lng.toFixed(6)}
            </p>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const url = `https://yandex.ru/maps/?pt=${attraction.lng},${attraction.lat}&z=16&l=map`;
              window.open(url, '_blank');
            }}
          >
            🗺️ Карта
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const url = `https://yandex.ru/search/?text=${encodeURIComponent(attraction.name + ' ' + attraction.address)}`;
              window.open(url, '_blank');
            }}
          >
            🔍 Поиск
          </Button>
          {attraction.type === 'shaurma' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const url = `https://yandex.ru/search/?text=${encodeURIComponent('доставка ' + attraction.name + ' Владикавказ')}`;
                window.open(url, '_blank');
              }}
            >
              🚚 Доставка
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AttractionCard; 