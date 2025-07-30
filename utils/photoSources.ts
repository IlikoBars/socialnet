// Утилиты для работы с фотографиями из внешних источников

export interface PhotoSource {
  id: string;
  src: string;
  title: string;
  author: string;
  district: string;
  likes: number;
  source: 'instagram' | 'telegram';
  tags: string[];
}

// Реальные фото пользователя
export const mikoshkaPhotos: PhotoSource[] = [
  { id: 'mikoshka_1', src: '/photos/mikoshka/photo_2025-07-29 14.44.08.jpeg', title: 'Городское утро', author: 'Микошка', district: 'Иристон', likes: 123, source: 'telegram', tags: ['утро', 'город'] },
  { id: 'mikoshka_2', src: '/photos/mikoshka/photo_2025-07-29 14.44.19.jpeg', title: 'Вид на горы', author: 'Микошка', district: 'Северо-Западный', likes: 98, source: 'instagram', tags: ['горы', 'панорама'] },
  { id: 'mikoshka_3', src: '/photos/mikoshka/photo_2025-07-29 14.44.22.jpeg', title: 'Старый район', author: 'Микошка', district: 'Затеречный', likes: 77, source: 'telegram', tags: ['улица', 'архитектура'] },
  { id: 'mikoshka_4', src: '/photos/mikoshka/photo_2025-07-29 14.44.23.jpeg', title: 'Закат', author: 'Микошка', district: 'Иристон', likes: 111, source: 'instagram', tags: ['закат', 'вечер'] },
  { id: 'mikoshka_5', src: '/photos/mikoshka/photo_2025-07-29 14.44.25.jpeg', title: 'Парк весной', author: 'Микошка', district: 'Затеречный', likes: 88, source: 'telegram', tags: ['парк', 'весна'] },
  { id: 'mikoshka_6', src: '/photos/mikoshka/photo_2025-07-29 14.44.30.jpeg', title: 'Дождливый день', author: 'Микошка', district: 'Северо-Западный', likes: 67, source: 'instagram', tags: ['дождь', 'улица'] },
  { id: 'mikoshka_7', src: '/photos/mikoshka/photo_2025-07-29 14.44.33.jpeg', title: 'Кофейня', author: 'Микошка', district: 'Иристон', likes: 101, source: 'telegram', tags: ['кофе', 'интерьер'] },
  { id: 'mikoshka_8', src: '/photos/mikoshka/photo_2025-07-29 14.50.50.jpeg', title: 'Вечерний город', author: 'Микошка', district: 'Затеречный', likes: 56, source: 'instagram', tags: ['вечер', 'огни'] },
  { id: 'mikoshka_9', src: '/photos/mikoshka/photo_2025-07-29 14.50.59.jpeg', title: 'Площадь', author: 'Микошка', district: 'Северо-Западный', likes: 134, source: 'telegram', tags: ['площадь', 'люди'] },
  { id: 'mikoshka_10', src: '/photos/mikoshka/photo_2025-07-29 14.51.02.jpeg', title: 'Зимний парк', author: 'Микошка', district: 'Иристон', likes: 77, source: 'instagram', tags: ['зима', 'парк'] },
  { id: 'mikoshka_11', src: '/photos/mikoshka/photo_2025-07-29 14.59.12.jpeg', title: 'Уличное искусство', author: 'Микошка', district: 'Затеречный', likes: 99, source: 'telegram', tags: ['стрит-арт', 'граффити'] },
  { id: 'mikoshka_12', src: '/photos/mikoshka/photo_2025-07-29 14.59.15.jpeg', title: 'Рынок', author: 'Микошка', district: 'Северо-Западный', likes: 88, source: 'instagram', tags: ['рынок', 'жизнь'] },
  { id: 'mikoshka_13', src: '/photos/mikoshka/photo_2025-07-29 14.59.20.jpeg', title: 'Детская площадка', author: 'Микошка', district: 'Иристон', likes: 66, source: 'telegram', tags: ['дети', 'площадка'] },
  { id: 'mikoshka_14', src: '/photos/mikoshka/photo_2025-07-29 14.59.21.jpeg', title: 'Сквер', author: 'Микошка', district: 'Затеречный', likes: 55, source: 'instagram', tags: ['сквер', 'отдых'] },
  { id: 'mikoshka_15', src: '/photos/mikoshka/photo_2025-07-29 14.59.27.jpeg', title: 'Мост', author: 'Микошка', district: 'Северо-Западный', likes: 77, source: 'telegram', tags: ['мост', 'река'] },
  { id: 'mikoshka_16', src: '/photos/mikoshka/photo_2025-07-29 14.59.30.jpeg', title: 'Проспект', author: 'Микошка', district: 'Иристон', likes: 88, source: 'instagram', tags: ['проспект', 'улица'] },
  { id: 'mikoshka_17', src: '/photos/mikoshka/photo_2025-07-29 14.59.36.jpeg', title: 'Утренний свет', author: 'Микошка', district: 'Затеречный', likes: 99, source: 'telegram', tags: ['утро', 'свет'] },
];

// Фотографии Габо (сестра)
export const gaboPhotos: PhotoSource[] = [
  {
    id: 'gabo_1',
    src: '/demo/art1.jpg',
    title: 'Семейный ужин',
    author: 'Габо',
    district: 'Иристон',
    likes: 156,
    source: 'telegram',
    tags: ['семья', 'еда', 'вечер']
  },
  {
    id: 'gabo_2',
    src: '/demo/art2.jpg',
    title: 'Прогулка с собакой',
    author: 'Габо',
    district: 'Затеречный',
    likes: 134,
    source: 'instagram',
    tags: ['собака', 'прогулка', 'парк']
  },
  {
    id: 'gabo_3',
    src: '/demo/art1.jpg',
    title: 'Книжный магазин',
    author: 'Габо',
    district: 'Северо-Западный',
    likes: 98,
    source: 'telegram',
    tags: ['книги', 'магазин', 'чтение']
  }
];

// Все фотографии вместе
export const allPhotoSources: PhotoSource[] = [
  ...mikoshkaPhotos,
  ...gaboPhotos
];

// Функция для получения топ фотографий
export function getTopPhotosFromSources(count: number): PhotoSource[] {
  // Сортируем по лайкам и возвращаем топ
  return allPhotoSources
    .sort((a, b) => b.likes - a.likes)
    .slice(0, count);
}

// Функция для получения фотографий по автору
export function getPhotosByAuthor(author: string): PhotoSource[] {
  return allPhotoSources.filter(photo => photo.author === author);
}

// Функция для получения фотографий по району
export function getPhotosByDistrict(district: string): PhotoSource[] {
  return allPhotoSources.filter(photo => photo.district === district);
}

// Функция для получения фотографий по тегу
export function getPhotosByTag(tag: string): PhotoSource[] {
  return allPhotoSources.filter(photo => 
    photo.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
} 