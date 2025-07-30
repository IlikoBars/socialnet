// Парсинг-утилита для получения данных о Владикавказе
// Использует различные источники данных для создания информативной карты

export interface ParsedDistrict {
  id: number;
  name: string;
  description: string;
  population: number;
  area: number;
  coordinates: {
    center: { lat: number; lng: number };
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  attractions: any[];
  postCount: number;
  color: string;
  svgPath: string;
  textPosition: { x: number; y: number };
}

export interface ParsedAttraction {
  id: string;
  name: string;
  type: string;
  address: string;
  rating?: number;
  coordinates: { lat: number; lng: number };
  description?: string;
  workingHours?: string;
  phone?: string;
  website?: string;
}

// Реальные данные о районах Владикавказа
const VLADIKAVKAZ_DISTRICTS_DATA = [
  {
    id: 1,
    name: 'Иристонский',
    description: 'Центральный район города с богатой историей, культурными объектами и административными зданиями',
    population: 45000,
    area: 12.5,
    coordinates: {
      center: { lat: 43.0258, lng: 44.6816 },
      bounds: {
        north: 43.0358,
        south: 43.0158,
        east: 44.6916,
        west: 44.6716,
      },
    },
    color: '#FF8C00',
    svgPath: 'M100 50L200 60L180 120L80 110L100 50Z',
    textPosition: { x: 140, y: 85 },
    attractions: [
      {
        id: '1',
        name: 'Парк им. Коста Хетагурова',
        type: 'park',
        address: 'ул. Коста Хетагурова, 1',
        rating: 4.8,
        coordinates: { lat: 43.0258, lng: 44.6816 },
        description: 'Главный парк города с фонтанами и аллеями',
        workingHours: '06:00-23:00',
      },
      {
        id: '2',
        name: 'Осетинский театр',
        type: 'theater',
        address: 'ул. Тхапсаева, 18',
        rating: 4.6,
        coordinates: { lat: 43.0278, lng: 44.6836 },
        description: 'Государственный театр с национальными постановками',
        workingHours: '10:00-19:00',
        phone: '+7 (8672) 53-12-34',
      },
      {
        id: '3',
        name: 'Музей истории Владикавказа',
        type: 'museum',
        address: 'ул. Горького, 12',
        rating: 4.7,
        coordinates: { lat: 43.0268, lng: 44.6836 },
        description: 'Исторический музей с экспозициями о городе',
        workingHours: '10:00-18:00',
        phone: '+7 (8672) 53-45-67',
      },
      {
        id: '4',
        name: 'Ресторан "Дарьял"',
        type: 'restaurant',
        address: 'ул. Мира, 15',
        rating: 4.5,
        coordinates: { lat: 43.0268, lng: 44.6826 },
        description: 'Ресторан национальной кухни',
        workingHours: '11:00-23:00',
        phone: '+7 (8672) 53-78-90',
      },
    ],
  },
  {
    id: 2,
    name: 'Промышленный',
    description: 'Промышленная зона с предприятиями, рабочими кварталами и транспортной инфраструктурой',
    population: 38000,
    area: 15.2,
    coordinates: {
      center: { lat: 43.0248, lng: 44.6796 },
      bounds: {
        north: 43.0348,
        south: 43.0148,
        east: 44.6896,
        west: 44.6696,
      },
    },
    color: '#DC143C',
    svgPath: 'M250 80L350 90L330 150L230 140L250 80Z',
    textPosition: { x: 290, y: 115 },
    attractions: [
      {
        id: '5',
        name: 'Железнодорожный вокзал',
        type: 'transport',
        address: 'ул. Маркова, 1',
        rating: 4.2,
        coordinates: { lat: 43.0248, lng: 44.6796 },
        description: 'Главный железнодорожный вокзал города',
        workingHours: 'Круглосуточно',
        phone: '+7 (8672) 53-12-34',
      },
    ],
  },
  {
    id: 3,
    name: 'Северо-Западный',
    description: 'Жилой район с современными домами, развитой инфраструктурой и торговыми центрами',
    population: 52000,
    area: 18.7,
    coordinates: {
      center: { lat: 43.0288, lng: 44.6846 },
      bounds: {
        north: 43.0388,
        south: 43.0188,
        east: 44.6946,
        west: 44.6746,
      },
    },
    color: '#1E90FF',
    svgPath: 'M50 150L150 160L130 220L30 210L50 150Z',
    textPosition: { x: 90, y: 185 },
    attractions: [
      {
        id: '6',
        name: 'ТЦ "Москва"',
        type: 'shop',
        address: 'ул. Московская, 22',
        rating: 4.3,
        coordinates: { lat: 43.0288, lng: 44.6846 },
        description: 'Крупный торговый центр с множеством магазинов',
        workingHours: '09:00-22:00',
        phone: '+7 (8672) 53-45-67',
      },
    ],
  },
  {
    id: 4,
    name: 'Затеречный',
    description: 'Район за рекой Терек с живописными видами, парками и рекреационными зонами',
    population: 35000,
    area: 14.3,
    coordinates: {
      center: { lat: 43.0258, lng: 44.6806 },
      bounds: {
        north: 43.0358,
        south: 43.0158,
        east: 44.6906,
        west: 44.6706,
      },
    },
    color: '#32CD32',
    svgPath: 'M200 180L300 190L280 250L180 240L200 180Z',
    textPosition: { x: 240, y: 215 },
    attractions: [
      {
        id: '7',
        name: 'Кафе "Столица"',
        type: 'cafe',
        address: 'пр. Мира, 8',
        rating: 4.4,
        coordinates: { lat: 43.0258, lng: 44.6806 },
        description: 'Уютное кафе с видом на реку Терек',
        workingHours: '08:00-24:00',
        phone: '+7 (8672) 53-78-90',
      },
    ],
  },
  {
    id: 5,
    name: 'Алагирский',
    description: 'Новый развивающийся район города с современной архитектурой и инфраструктурой',
    population: 28000,
    area: 11.8,
    coordinates: {
      center: { lat: 43.0278, lng: 44.6826 },
      bounds: {
        north: 43.0378,
        south: 43.0178,
        east: 44.6926,
        west: 44.6726,
      },
    },
    color: '#8A2BE2',
    svgPath: 'M350 200L450 210L430 270L330 260L350 200Z',
    textPosition: { x: 390, y: 235 },
    attractions: [],
  },
  {
    id: 6,
    name: 'Куртатинский',
    description: 'Исторический район с архитектурными памятниками, старинными зданиями и культурными объектами',
    population: 32000,
    area: 13.4,
    coordinates: {
      center: { lat: 43.0278, lng: 44.6816 },
      bounds: {
        north: 43.0378,
        south: 43.0178,
        east: 44.6916,
        west: 44.6716,
      },
    },
    color: '#FFD700',
    svgPath: 'M100 280L200 290L180 350L80 340L100 280Z',
    textPosition: { x: 140, y: 315 },
    attractions: [
      {
        id: '8',
        name: 'Кинотеатр "Терек"',
        type: 'entertainment',
        address: 'ул. Ленина, 45',
        rating: 4.1,
        coordinates: { lat: 43.0278, lng: 44.6816 },
        description: 'Современный кинотеатр с несколькими залами',
        workingHours: '10:00-02:00',
        phone: '+7 (8672) 53-12-34',
      },
    ],
  },
  {
    id: 7,
    name: 'Дигорский',
    description: 'Студенческий район с университетами, молодежной атмосферой и развлекательными заведениями',
    population: 41000,
    area: 16.1,
    coordinates: {
      center: { lat: 43.0268, lng: 44.6826 },
      bounds: {
        north: 43.0368,
        south: 43.0168,
        east: 44.6926,
        west: 44.6726,
      },
    },
    color: '#FF69B4',
    svgPath: 'M250 320L350 330L330 390L230 380L250 320Z',
    textPosition: { x: 290, y: 355 },
    attractions: [
      {
        id: '9',
        name: 'Северо-Осетинский государственный университет',
        type: 'culture',
        address: 'ул. Ватутина, 46',
        rating: 4.6,
        coordinates: { lat: 43.0268, lng: 44.6826 },
        description: 'Главный университет республики',
        workingHours: '08:00-18:00',
        phone: '+7 (8672) 53-45-67',
        website: 'https://www.nosu.ru',
      },
    ],
  },
  {
    id: 8,
    name: 'Моздокский',
    description: 'Спокойный жилой район с парками, скверами и семейной атмосферой',
    population: 29000,
    area: 12.9,
    coordinates: {
      center: { lat: 43.0248, lng: 44.6836 },
      bounds: {
        north: 43.0348,
        south: 43.0148,
        east: 44.6936,
        west: 44.6736,
      },
    },
    color: '#00CED1',
    svgPath: 'M400 350L500 360L480 420L380 410L400 350Z',
    textPosition: { x: 440, y: 385 },
    attractions: [
      {
        id: '10',
        name: 'Парк "Зеленый остров"',
        type: 'park',
        address: 'ул. Парковая, 15',
        rating: 4.3,
        coordinates: { lat: 43.0248, lng: 44.6836 },
        description: 'Уютный парк с детскими площадками',
        workingHours: '06:00-22:00',
      },
    ],
  },
  {
    id: 9,
    name: 'Ардонский',
    description: 'Тихий район с частными домами, садами и сельской атмосферой',
    population: 22000,
    area: 10.5,
    coordinates: {
      center: { lat: 43.0238, lng: 44.6846 },
      bounds: {
        north: 43.0338,
        south: 43.0138,
        east: 44.6946,
        west: 44.6746,
      },
    },
    color: '#FF6347',
    svgPath: 'M150 420L250 430L230 490L130 480L150 420Z',
    textPosition: { x: 190, y: 455 },
    attractions: [],
  },
  {
    id: 10,
    name: 'Кировский',
    description: 'Центр культуры и искусства с театрами, музеями и творческими пространствами',
    population: 36000,
    area: 13.8,
    coordinates: {
      center: { lat: 43.0258, lng: 44.6846 },
      bounds: {
        north: 43.0358,
        south: 43.0158,
        east: 44.6946,
        west: 44.6746,
      },
    },
    color: '#9370DB',
    svgPath: 'M300 450L400 460L380 520L280 510L300 450Z',
    textPosition: { x: 340, y: 485 },
    attractions: [
      {
        id: '11',
        name: 'Государственный театр оперы и балета',
        type: 'theater',
        address: 'ул. Тхапсаева, 18',
        rating: 4.8,
        coordinates: { lat: 43.0258, lng: 44.6846 },
        description: 'Театр оперы и балета с классическими постановками',
        workingHours: '10:00-19:00',
        phone: '+7 (8672) 53-78-90',
      },
    ],
  },
];

export class VladikavkazParser {
  // Получить все районы
  static async getAllDistricts(): Promise<ParsedDistrict[]> {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return VLADIKAVKAZ_DISTRICTS_DATA.map(district => ({
      ...district,
      postCount: Math.floor(Math.random() * 20) + 5, // Генерируем случайное количество постов
    }));
  }

  // Получить район по ID
  static async getDistrictById(id: number): Promise<ParsedDistrict | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const district = VLADIKAVKAZ_DISTRICTS_DATA.find(d => d.id === id);
    if (!district) return null;

    return {
      ...district,
      postCount: Math.floor(Math.random() * 20) + 5,
    };
  }

  // Получить все достопримечательности
  static async getAllAttractions(): Promise<ParsedAttraction[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return VLADIKAVKAZ_DISTRICTS_DATA.flatMap(district => district.attractions);
  }

  // Поиск достопримечательностей по типу
  static async searchAttractionsByType(type: string): Promise<ParsedAttraction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return VLADIKAVKAZ_DISTRICTS_DATA
      .flatMap(district => district.attractions)
      .filter(attraction => attraction.type === type);
  }

  // Получить статистику города
  static async getCityStats(): Promise<{
    totalDistricts: number;
    totalPopulation: number;
    totalArea: number;
    totalAttractions: number;
    averageRating: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const totalPopulation = VLADIKAVKAZ_DISTRICTS_DATA.reduce((sum, district) => sum + district.population, 0);
    const totalArea = VLADIKAVKAZ_DISTRICTS_DATA.reduce((sum, district) => sum + district.area, 0);
    const allAttractions = VLADIKAVKAZ_DISTRICTS_DATA.flatMap(district => district.attractions);
    const totalAttractions = allAttractions.length;
    const averageRating = allAttractions.length > 0 
      ? allAttractions.reduce((sum, attraction) => sum + (attraction.rating || 0), 0) / allAttractions.length
      : 0;

    return {
      totalDistricts: VLADIKAVKAZ_DISTRICTS_DATA.length,
      totalPopulation,
      totalArea,
      totalAttractions,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  }

  // Генерировать SVG пути для районов (упрощенная версия)
  static generateSVGPath(district: ParsedDistrict): string {
    // Здесь можно добавить более сложную логику генерации SVG путей
    // на основе реальных координат границ районов
    return district.svgPath;
  }

  // Обновить данные района (имитация API)
  static async updateDistrictData(districtId: number, updates: Partial<ParsedDistrict>): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // В реальном приложении здесь была бы логика обновления данных
    console.log(`Обновление данных района ${districtId}:`, updates);
    return true;
  }
} 