import { Post, District, ApiResponse, PostsResponse, DistrictResponse } from '../types';

// Базовый URL для API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Общий метод для API запросов
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// API для постов
export const postsApi = {
  // Получить посты для района
  async getPostsByDistrict(districtName: string): Promise<PostsResponse> {
    return apiRequest<Post[]>(`/api/posts?region=${encodeURIComponent(districtName)}`);
  },

  // Создать новый пост
  async createPost(post: Partial<Post>): Promise<ApiResponse<Post>> {
    return apiRequest<Post>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  // Получить все посты
  async getAllPosts(): Promise<PostsResponse> {
    return apiRequest<Post[]>('/api/posts');
  },

  // Удалить пост
  async deletePost(postId: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  },
};

// API для районов
export const districtsApi = {
  // Получить информацию о районе
  async getDistrict(districtId: number): Promise<DistrictResponse> {
    return apiRequest<District>(`/api/vladikavkaz?action=district&districtId=${districtId}`);
  },

  // Получить все районы
  async getAllDistricts(): Promise<ApiResponse<District[]>> {
    return apiRequest<District[]>('/api/vladikavkaz?action=districts');
  },

  // Получить статистику
  async getStats(): Promise<ApiResponse<any>> {
    return apiRequest<any>('/api/vladikavkaz?action=stats');
  },
};

// Моковые данные для демонстрации
export const mockData = {
  // Моковые посты
  getMockPosts: (districtName: string): Post[] => [
    {
      id: '1',
      type: 'text',
      content: `Привет из ${districtName}! Район Владикавказа с уникальной атмосферой и достопримечательностями.`,
      author: { name: 'Алана' },
      createdAt: '2 часа назад',
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      type: 'image',
      content: 'Красивый закат в нашем районе',
      mediaUrl: '/demo/art1.jpg',
      author: { name: 'Яник' },
      createdAt: '5 часов назад',
      likes: 24,
      comments: 7,
    },
    {
      id: '3',
      type: 'audio',
      content: 'Уличная музыка в центре района',
      mediaUrl: '/audio/sample.mp3',
      author: { name: 'Зураб' },
      createdAt: '1 день назад',
      likes: 8,
      comments: 2,
    },
    {
      id: '4',
      type: 'video',
      content: 'Прогулка по району',
      mediaUrl: '/video/sample.mp4',
      author: { name: 'Максим' },
      createdAt: '2 дня назад',
      likes: 31,
      comments: 12,
    },
  ],

  // Моковая статистика
  getMockStats: () => ({
    totalDistricts: 8,
    totalPosts: 156,
    totalUsers: 1247,
    activeToday: 89,
  }),
};

// Утилиты для работы с данными
export const dataUtils = {
  // Группировка постов по типу
  groupPostsByType: (posts: Post[]) => {
    return posts.reduce((acc, post) => {
      if (!acc[post.type]) {
        acc[post.type] = [];
      }
      acc[post.type].push(post);
      return acc;
    }, {} as Record<Post['type'], Post[]>);
  },

  // Фильтрация постов
  filterPosts: (posts: Post[], filters: {
    type?: Post['type'];
    district?: string;
    author?: string;
  }) => {
    return posts.filter(post => {
      if (filters.type && post.type !== filters.type) return false;
      if (filters.district && post.location?.name !== filters.district) return false;
      if (filters.author && post.author.name !== filters.author) return false;
      return true;
    });
  },

  // Сортировка постов
  sortPosts: (posts: Post[], sortBy: 'date' | 'likes' | 'comments' = 'date') => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'comments':
          return (b.comments || 0) - (a.comments || 0);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  },

  // Поиск по постам
  searchPosts: (posts: Post[], query: string) => {
    const lowerQuery = query.toLowerCase();
    return posts.filter(post => 
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.name.toLowerCase().includes(lowerQuery) ||
      post.location?.name.toLowerCase().includes(lowerQuery)
    );
  },
}; 