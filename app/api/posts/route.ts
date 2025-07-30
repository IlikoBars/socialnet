import { NextRequest, NextResponse } from 'next/server';

// Моковые данные для демонстрации
const mockPosts = {
  'Иристонский': [
    {
      id: '1',
      type: 'text',
      content: 'Привет из Иристонского района! Центр города с богатой историей и культурными объектами.',
      author: { name: 'Алана' },
      createdAt: '2 часа назад',
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      type: 'image',
      content: 'Красивый закат в центре Владикавказа',
      mediaUrl: '/demo/art1.jpg',
      author: { name: 'Яник' },
      createdAt: '5 часов назад',
      likes: 24,
      comments: 7,
    },
  ],
  'Промышленный': [
    {
      id: '3',
      type: 'audio',
      content: 'Уличная музыка в промышленной зоне',
      mediaUrl: '/audio/sample.mp3',
      author: { name: 'Зураб' },
      createdAt: '1 день назад',
      likes: 8,
      comments: 2,
    },
  ],
  'Северо-Западный': [
    {
      id: '4',
      type: 'video',
      content: 'Прогулка по Северо-Западному району',
      mediaUrl: '/video/sample.mp4',
      author: { name: 'Максим' },
      createdAt: '2 дня назад',
      likes: 31,
      comments: 12,
    },
  ],
  'Затеречный': [
    {
      id: '5',
      type: 'text',
      content: 'Добро пожаловать в Затеречный район!',
      author: { name: 'Ольга' },
      createdAt: '3 дня назад',
      likes: 15,
      comments: 5,
    },
  ],
  'Алагирский': [
    {
      id: '6',
      type: 'image',
      content: 'Уютные улочки Алагирского района',
      mediaUrl: '/demo/art2.jpg',
      author: { name: 'Дмитрий' },
      createdAt: '4 дня назад',
      likes: 18,
      comments: 8,
    },
  ],
  'Куртатинский': [
    {
      id: '7',
      type: 'text',
      content: 'Куртатинский - исторический район!',
      author: { name: 'Анна' },
      createdAt: '5 дней назад',
      likes: 22,
      comments: 10,
    },
  ],
  'Дигорский': [
    {
      id: '8',
      type: 'audio',
      content: 'Джаз в Дигорском районе',
      mediaUrl: '/audio/jazz.mp3',
      author: { name: 'Сергей' },
      createdAt: '1 неделю назад',
      likes: 14,
      comments: 6,
    },
  ],
  'Моздокский': [
    {
      id: '9',
      type: 'video',
      content: 'Ночная жизнь в Моздокском районе',
      mediaUrl: '/video/night.mp4',
      author: { name: 'Елена' },
      createdAt: '1 неделю назад',
      likes: 28,
      comments: 15,
    },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');

  if (!region) {
    return NextResponse.json(
      { error: 'Region parameter is required' },
      { status: 400 }
    );
  }

  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));

  const posts = mockPosts[region as keyof typeof mockPosts] || [];

  return NextResponse.json({
    region,
    posts,
    total: posts.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { region, content, type, author } = body;

    if (!region || !content || !type || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Здесь будет логика сохранения поста в базу данных
    const newPost = {
      id: Date.now().toString(),
      type,
      content,
      author,
      createdAt: 'Только что',
      likes: 0,
      comments: 0,
    };

    return NextResponse.json({
      success: true,
      post: newPost,
      message: 'Пост успешно создан',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 