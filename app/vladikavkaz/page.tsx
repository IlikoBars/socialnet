'use client';
import React, { useState, useEffect } from 'react';
import { VladikavkazMap, DistrictsList } from '../../components/organisms';
import { AttractionsList } from '../../components/organisms/AttractionsList';
import { Attraction } from '../../components/molecules/AttractionCard';
import { District } from '../../data/vladikavkazDistricts';

interface AttractionsData {
  attractions: Attraction[];
  districts: District[];
}

export default function VladikavkazPage() {
  const [attractionsData, setAttractionsData] = useState<AttractionsData | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка демо данных
  useEffect(() => {
    const loadDemoData = async () => {
      try {
        setLoading(true);
        
        // Имитируем загрузку данных
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Демо данные достопримечательностей
        const demoAttractions: Attraction[] = [
          {
            id: 'attraction_1',
            name: 'Памятник Коста Хетагурову',
            category: 'Достопримечательности',
            district: 'Мадрид',
            address: 'пл. Свободы',
            lat: 43.0532,
            lng: 44.6668,
            description: 'Памятник осетинскому поэту и просветителю',
            type: 'attraction',
            rating: 4.8,
            reviewsCount: 156
          },
          {
            id: 'attraction_2',
            name: 'Осетинский драматический театр',
            category: 'Достопримечательности',
            district: 'Курская',
            address: 'ул. Ленина, 3',
            lat: 43.0576,
            lng: 44.6642,
            description: 'Главный театр Республики Северная Осетия',
            type: 'attraction',
            rating: 4.6,
            reviewsCount: 89
          },
          {
            id: 'attraction_3',
            name: 'Парк им. Коста Хетагурова',
            category: 'Достопримечательности',
            district: 'Лондон',
            address: 'ул. Мира',
            lat: 43.0664,
            lng: 44.6590,
            description: 'Центральный парк города с фонтанами',
            type: 'attraction',
            rating: 4.7,
            reviewsCount: 234
          },
          {
            id: 'attraction_4',
            name: 'Мемориал Славы',
            category: 'Достопримечательности',
            district: 'Ватикан',
            address: 'ул. Мордовцева',
            lat: 43.0686,
            lng: 44.6577,
            description: 'Памятник воинам Великой Отечественной войны',
            type: 'attraction',
            rating: 4.9,
            reviewsCount: 312
          },
          {
            id: 'attraction_5',
            name: 'Набережная реки Терек',
            category: 'Достопримечательности',
            district: 'Санта-Барбара',
            address: 'наб. Терека',
            lat: 43.0251,
            lng: 44.6833,
            description: 'Красивая набережная с видом на горы',
            type: 'attraction',
            rating: 4.5,
            reviewsCount: 178
          },
          {
            id: 'shaurma_1',
            name: 'Шаурма "Кавказ"',
            category: 'Шаурма и фастфуд',
            district: 'Мадрид',
            address: 'ул. Ленина, 25',
            lat: 43.0532,
            lng: 44.6668,
            description: 'Лучшая шаурма в городе по отзывам',
            type: 'shaurma',
            rating: 4.9,
            reviewsCount: 456,
            price: 'от 150₽',
            workingHours: '09:00-23:00'
          },
          {
            id: 'shaurma_2',
            name: 'Донер "Терек"',
            category: 'Шаурма и фастфуд',
            district: 'Лондон',
            address: 'пр. Мира, 15',
            lat: 43.0664,
            lng: 44.6590,
            description: 'Турецкий донер кебаб',
            type: 'shaurma',
            rating: 4.7,
            reviewsCount: 234,
            price: 'от 180₽',
            workingHours: '10:00-22:00'
          },
          {
            id: 'shaurma_3',
            name: 'Шаверма "Быстро"',
            category: 'Шаурма и фастфуд',
            district: 'Санта-Барбара',
            address: 'ул. Тверская, 8',
            lat: 43.0251,
            lng: 44.6833,
            description: 'Быстро и вкусно',
            type: 'shaurma',
            rating: 4.3,
            reviewsCount: 123,
            price: 'от 120₽',
            workingHours: '08:00-24:00'
          },
          {
            id: 'shaurma_4',
            name: 'Кебаб "Осетия"',
            category: 'Шаурма и фастфуд',
            district: 'Курская',
            address: 'ул. Коцоева, 42',
            lat: 43.0576,
            lng: 44.6642,
            description: 'Осетинский кебаб с местными специями',
            type: 'shaurma',
            rating: 4.8,
            reviewsCount: 345,
            price: 'от 200₽',
            workingHours: '11:00-21:00'
          },
          {
            id: 'shaurma_5',
            name: 'Фастфуд "Бургер Хаус"',
            category: 'Шаурма и фастфуд',
            district: 'Ватикан',
            address: 'ул. Мордовцева, 18',
            lat: 43.0686,
            lng: 44.6577,
            description: 'Бургеры, картошка, напитки',
            type: 'shaurma',
            rating: 4.2,
            reviewsCount: 89,
            price: 'от 250₽',
            workingHours: '10:00-23:00'
          }
        ];

        // Импортируем районы
        const { VLADIKAVKAZ_DISTRICTS } = await import('../../data/vladikavkazDistricts');
        const districts = Object.values(VLADIKAVKAZ_DISTRICTS);

        setAttractionsData({
          attractions: demoAttractions,
          districts
        });
        
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки данных');
        setLoading(false);
      }
    };

    loadDemoData();
  }, []);

  // Фильтрация достопримечательностей по выбранному району
  useEffect(() => {
    if (attractionsData) {
      if (selectedDistrict) {
        const filtered = attractionsData.attractions.filter(
          attraction => attraction.district === selectedDistrict.name
        );
        setFilteredAttractions(filtered);
      } else {
        setFilteredAttractions(attractionsData.attractions);
      }
    }
  }, [attractionsData, selectedDistrict]);

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(selectedDistrict?.id === district.id ? null : district);
  };

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const clearSelection = () => {
    setSelectedDistrict(null);
    setSelectedAttraction(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем данные о Владикавказе...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!attractionsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Нет данных</h2>
          <p className="text-gray-600">Данные о достопримечательностях не найдены</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏔️ Владикавказ - Достопримечательности и шаурма
          </h1>
          <p className="text-gray-600">
            Исследуйте 26 уникальных районов города и найдите лучшие места
          </p>
        </div>

        {/* Переключатель режимов просмотра */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              🗺️ Карта районов
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              📋 Список районов
            </button>
          </div>
        </div>

        {/* Информация о выбранном районе */}
        {selectedDistrict && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Выбран район: {selectedDistrict.name}
                </h3>
                <p className="text-blue-700">
                  {filteredAttractions.length} мест в этом районе
                </p>
              </div>
              <button
                onClick={clearSelection}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                ✕ Очистить
              </button>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - Карта/Список районов */}
          <div>
            {viewMode === 'map' ? (
              <VladikavkazMap 
                onDistrictClick={handleDistrictClick} 
                selectedDistrict={selectedDistrict?.id} 
              />
            ) : (
              <DistrictsList 
                onDistrictClick={handleDistrictClick} 
                selectedDistrict={selectedDistrict?.id} 
              />
            )}
          </div>

          {/* Правая колонка - Список достопримечательностей */}
          <div>
            <AttractionsList
              attractions={filteredAttractions}
              title={selectedDistrict 
                ? `Места в районе "${selectedDistrict.name}"` 
                : 'Все достопримечательности и шаурма'
              }
              onAttractionClick={handleAttractionClick}
            />
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Статистика по Владикавказу</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{attractionsData.attractions.length}</div>
              <div className="text-sm text-gray-600">Всего мест</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {attractionsData.attractions.filter(a => a.type === 'attraction').length}
              </div>
              <div className="text-sm text-gray-600">Достопримечательности</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {attractionsData.attractions.filter(a => a.type === 'shaurma').length}
              </div>
              <div className="text-sm text-gray-600">Шаурма/Фастфуд</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{attractionsData.districts.length}</div>
              <div className="text-sm text-gray-600">Районов</div>
            </div>
          </div>
        </div>

        {/* Модальное окно с деталями места */}
        {selectedAttraction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAttraction.name}</h2>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold">Тип:</span> {selectedAttraction.type === 'attraction' ? '🏛️ Достопримечательность' : '🌮 Шаурма/Фастфуд'}
                  </div>
                  <div>
                    <span className="font-semibold">Район:</span> {selectedAttraction.district}
                  </div>
                  <div>
                    <span className="font-semibold">Адрес:</span> {selectedAttraction.address}
                  </div>
                  <div>
                    <span className="font-semibold">Описание:</span> {selectedAttraction.description}
                  </div>
                  <div>
                    <span className="font-semibold">Рейтинг:</span> {selectedAttraction.rating}⭐ ({selectedAttraction.reviewsCount} отзывов)
                  </div>
                  {selectedAttraction.price && (
                    <div>
                      <span className="font-semibold">Цены:</span> {selectedAttraction.price}
                    </div>
                  )}
                  {selectedAttraction.workingHours && (
                    <div>
                      <span className="font-semibold">Часы работы:</span> {selectedAttraction.workingHours}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Координаты:</span> {selectedAttraction.lat.toFixed(6)}, {selectedAttraction.lng.toFixed(6)}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      const url = `https://yandex.ru/maps/?pt=${selectedAttraction.lng},${selectedAttraction.lat}&z=16&l=map`;
                      window.open(url, '_blank');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🗺️ Открыть на карте
                  </button>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 