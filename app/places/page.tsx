'use client';

import React, { useState, useEffect } from 'react';
import { PlacesList } from '../../components/organisms/PlacesList';
import { Place } from '../../components/molecules/PlaceCard';

// Типы данных
interface PlacesData {
  places: Place[];
  categories: Record<string, Place[]>;
  stats: {
    total: number;
    byCategory: Record<string, number>;
  };
  metadata: {
    generatedAt: string;
    source: string;
    region: string;
    radius: number;
  };
}

export default function PlacesPage() {
  const [placesData, setPlacesData] = useState<PlacesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    // Сейчас используем демо данные
    const loadPlacesData = async () => {
      try {
        setLoading(true);
        
        // Имитируем загрузку данных
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Демо данные (в реальном приложении загружались бы с сервера)
        const demoData: PlacesData = {
          places: [
            {
              id: "cafe-u-parka",
              name: "Кафе 'У Парка'",
              category: "кафе",
              address: "ул. Тверская, 1",
              coordinates: { lat: 55.7558, lng: 37.6176 },
              contact: {
                phone: "+7 (495) 123-45-67",
                website: "https://example.com"
              },
              rating: 4.5,
              reviewsCount: 127,
              workingHours: "09:00-23:00",
              type: "place"
            },
            {
              id: "restaurant-moscow",
              name: "Ресторан 'Москва'",
              category: "ресторан",
              address: "ул. Арбат, 15",
              coordinates: { lat: 55.7494, lng: 37.5912 },
              contact: {
                phone: "+7 (495) 987-65-43",
                website: "https://moscow-restaurant.ru"
              },
              rating: 4.8,
              reviewsCount: 89,
              workingHours: "12:00-00:00",
              type: "place"
            },
            {
              id: "bar-klubnika",
              name: "Бар 'Клубника'",
              category: "бар",
              address: "Кутузовский проспект, 25",
              coordinates: { lat: 55.7485, lng: 37.5424 },
              contact: {
                phone: "+7 (495) 555-12-34",
                website: ""
              },
              rating: 4.2,
              reviewsCount: 45,
              workingHours: "18:00-06:00",
              type: "place"
            }
          ],
          categories: {},
          stats: {
            total: 3,
            byCategory: {
              "кафе": 1,
              "ресторан": 1,
              "бар": 1
            }
          },
          metadata: {
            generatedAt: new Date().toISOString(),
            source: "2GIS API",
            region: "Moscow",
            radius: 30
          }
        };

        // Группируем по категориям
        demoData.categories = demoData.places.reduce((acc, place) => {
          if (!acc[place.category]) {
            acc[place.category] = [];
          }
          acc[place.category].push(place);
          return acc;
        }, {} as Record<string, Place[]>);

        setPlacesData(demoData);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Error loading places data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlacesData();
  }, []);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    console.log('Выбрано место:', place);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем данные о местах...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!placesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Данные не найдены</h2>
          <p className="text-gray-600">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Места из 2GIS
          </h1>
          <p className="text-gray-600">
            Данные получены с помощью парсера 2GIS API
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-4 text-sm text-blue-800">
              <div>
                <span className="font-medium">Источник:</span> {placesData.metadata.source}
              </div>
              <div>
                <span className="font-medium">Регион:</span> {placesData.metadata.region}
              </div>
              <div>
                <span className="font-medium">Радиус:</span> {placesData.metadata.radius} км
              </div>
              <div>
                <span className="font-medium">Обновлено:</span> {new Date(placesData.metadata.generatedAt).toLocaleString('ru-RU')}
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{placesData.stats.total}</div>
            <div className="text-sm text-gray-600">Всего мест</div>
          </div>
          {Object.entries(placesData.stats.byCategory).map(([category, count]) => (
            <div key={category} className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{count}</div>
              <div className="text-sm text-gray-600">{category}</div>
            </div>
          ))}
        </div>

        {/* Список мест */}
        <PlacesList
          places={placesData.places}
          title="Найденные места"
          showFilters={true}
          onPlaceClick={handlePlaceClick}
        />

        {/* Модальное окно с деталями места */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{selectedPlace.name}</h3>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <p><strong>Категория:</strong> {selectedPlace.category}</p>
                <p><strong>Адрес:</strong> {selectedPlace.address}</p>
                <p><strong>Рейтинг:</strong> {selectedPlace.rating} ⭐ ({selectedPlace.reviewsCount} отзывов)</p>
                {selectedPlace.contact.phone && (
                  <p><strong>Телефон:</strong> {selectedPlace.contact.phone}</p>
                )}
                {selectedPlace.contact.website && (
                  <p><strong>Сайт:</strong> <a href={selectedPlace.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedPlace.contact.website}</a></p>
                )}
                {selectedPlace.workingHours && (
                  <p><strong>Часы работы:</strong> {selectedPlace.workingHours}</p>
                )}
                <p><strong>Координаты:</strong> {selectedPlace.coordinates.lat.toFixed(6)}, {selectedPlace.coordinates.lng.toFixed(6)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 