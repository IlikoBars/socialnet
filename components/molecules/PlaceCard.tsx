import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    website: string;
  };
  rating: number;
  reviewsCount: number;
  workingHours: string;
  type: 'place';
}

export interface PlaceCardProps {
  place: Place;
  onClick?: (place: Place) => void;
  showDetails?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place, 
  onClick, 
  showDetails = false 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(place);
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

  return (
    <Card className="place-card hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="p-4">
        {/* Заголовок */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {place.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              {place.category}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {formatRating(place.rating)}
            </div>
            <div className="text-xs text-gray-500">
              {formatReviews(place.reviewsCount)}
            </div>
          </div>
        </div>

        {/* Адрес */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 flex items-center">
            <span className="mr-2">📍</span>
            {place.address}
          </p>
        </div>

        {/* Контакты */}
        {showDetails && (
          <div className="mb-3 space-y-2">
            {place.contact.phone && (
              <p className="text-sm text-gray-700 flex items-center">
                <span className="mr-2">📞</span>
                <a 
                  href={`tel:${place.contact.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  {place.contact.phone}
                </a>
              </p>
            )}
            {place.contact.website && (
              <p className="text-sm text-gray-700 flex items-center">
                <span className="mr-2">🌐</span>
                <a 
                  href={place.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  Сайт
                </a>
              </p>
            )}
            {place.workingHours && (
              <p className="text-sm text-gray-700 flex items-center">
                <span className="mr-2">🕒</span>
                {place.workingHours}
              </p>
            )}
          </div>
        )}

        {/* Координаты */}
        {showDetails && (
          <div className="mb-3">
            <p className="text-xs text-gray-500">
              Координаты: {place.coordinates.lat.toFixed(6)}, {place.coordinates.lng.toFixed(6)}
            </p>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (place.contact.phone) {
                window.open(`tel:${place.contact.phone}`);
              }
            }}
            disabled={!place.contact.phone}
          >
            Позвонить
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (place.contact.website) {
                window.open(place.contact.website, '_blank');
              }
            }}
            disabled={!place.contact.website}
          >
            Сайт
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const url = `https://2gis.ru/moscow/search/${encodeURIComponent(place.name)}`;
              window.open(url, '_blank');
            }}
          >
            2GIS
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PlaceCard; 