import { Post, District, ValidationError } from '../types';

// Валидация постов
export const validatePost = (post: Partial<Post>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!post.content || post.content.trim().length === 0) {
    errors.push({ field: 'content', message: 'Контент не может быть пустым' });
  }

  if (post.content && post.content.length > 1000) {
    errors.push({ field: 'content', message: 'Контент не может быть длиннее 1000 символов' });
  }

  if (!post.author?.name || post.author.name.trim().length === 0) {
    errors.push({ field: 'author.name', message: 'Имя автора обязательно' });
  }

  if (!post.type || !['text', 'image', 'audio', 'video', 'route'].includes(post.type)) {
    errors.push({ field: 'type', message: 'Неверный тип поста' });
  }

  // Валидация для аудио-постов
  if (post.type === 'audio' && (!post.music?.title || !post.music?.artist)) {
    errors.push({ field: 'music', message: 'Для аудио-поста обязательно указать название и исполнителя' });
  }

  // Валидация для маршрутов
  if (post.type === 'route' && (!post.route?.places || post.route.places.length === 0)) {
    errors.push({ field: 'route', message: 'Маршрут должен содержать хотя бы одно место' });
  }

  return errors;
};

// Валидация районов
export const validateDistrict = (district: Partial<District>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!district.name || district.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Название района обязательно' });
  }

  if (!district.color || !/^#[0-9A-F]{6}$/i.test(district.color)) {
    errors.push({ field: 'color', message: 'Цвет должен быть в формате HEX' });
  }

  if (!district.d || district.d.trim().length === 0) {
    errors.push({ field: 'd', message: 'SVG path обязателен' });
  }

  if (district.postCount !== undefined && district.postCount < 0) {
    errors.push({ field: 'postCount', message: 'Количество постов не может быть отрицательным' });
  }

  return errors;
};

// Валидация координат
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Валидация URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Валидация email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация длины строки
export const validateStringLength = (str: string, min: number, max: number): boolean => {
  return str.length >= min && str.length <= max;
};

// Очистка HTML тегов
export const sanitizeHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Валидация файла изображения
export const validateImageFile = (file: File): ValidationError[] => {
  const errors: ValidationError[] = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (file.size > maxSize) {
    errors.push({ field: 'file', message: 'Размер файла не должен превышать 5MB' });
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push({ field: 'file', message: 'Поддерживаются только JPEG, PNG и WebP' });
  }

  return errors;
};

// Валидация аудио файла
export const validateAudioFile = (file: File): ValidationError[] => {
  const errors: ValidationError[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  if (file.size > maxSize) {
    errors.push({ field: 'file', message: 'Размер файла не должен превышать 10MB' });
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push({ field: 'file', message: 'Поддерживаются только MP3, WAV и OGG' });
  }

  return errors;
}; 