import { CommunityPost } from '../types/community';

export interface CityPhoto {
  id: string;
  src: string;
  title: string;
  district: string;
  likes: number;
  author: string;
  timestamp: Date;
}

export function getTopPhotosFromForum(posts: CommunityPost[], limit: number = 6): CityPhoto[] {
  return posts
    .filter(post => post.content.image) // Только посты с изображениями
    .sort((a, b) => b.stats.likes - a.stats.likes) // Сортировка по лайкам
    .slice(0, limit) // Топ N фотографий
    .map(post => ({
      id: post.id,
      src: post.content.image!,
      title: post.content.text.length > 50 
        ? post.content.text.substring(0, 50) + '...' 
        : post.content.text,
      district: post.author.district,
      likes: post.stats.likes,
      author: post.author.name,
      timestamp: post.timestamp
    }));
}

export function getDistrictStats(posts: CommunityPost[]) {
  const districtMap = new Map<string, { posts: number; likes: number; images: number }>();
  
  posts.forEach(post => {
    const district = post.author.district;
    const current = districtMap.get(district) || { posts: 0, likes: 0, images: 0 };
    
    current.posts += 1;
    current.likes += post.stats.likes;
    if (post.content.image) current.images += 1;
    
    districtMap.set(district, current);
  });
  
  return Array.from(districtMap.entries()).map(([name, stats]) => ({
    name,
    ...stats
  }));
}

// Моковые данные для демонстрации
export const mockTopPhotos: CityPhoto[] = [
  {
    id: '1',
    src: '/demo/art1.jpg',
    title: 'Утро в Иристоне — первые лучи солнца освещают старые улочки',
    district: 'Иристон',
    likes: 156,
    author: 'Алан Дзагоев',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    src: '/demo/art2.jpg',
    title: 'Вечер в Затеречном — атмосфера уюта и спокойствия',
    district: 'Затеречный',
    likes: 134,
    author: 'Зураб Цховребов',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    src: '/demo/art1.jpg',
    title: 'День в Северо-Западном — современность и прогресс',
    district: 'Северо-Западный',
    likes: 98,
    author: 'Яна Козаева',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '4',
    src: '/demo/art2.jpg',
    title: 'Прогулка по центру — архитектура и история',
    district: 'Иристон',
    likes: 87,
    author: 'Давид Габараев',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    id: '5',
    src: '/demo/art1.jpg',
    title: 'Кофейня в Затеречном — место для душевных разговоров',
    district: 'Затеречный',
    likes: 76,
    author: 'Алина Битарова',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000)
  },
  {
    id: '6',
    src: '/demo/art2.jpg',
    title: 'Парк в Северо-Западном — зелёные зоны города',
    district: 'Северо-Западный',
    likes: 65,
    author: 'Руслан Козаев',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

export const mockDistrictStats = [
  {
    name: 'Иристон',
    posts: 47,
    likes: 892,
    images: 23
  },
  {
    name: 'Затеречный',
    posts: 34,
    likes: 567,
    images: 18
  },
  {
    name: 'Северо-Западный',
    posts: 28,
    likes: 445,
    images: 15
  }
]; 