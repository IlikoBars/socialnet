// Утилита для обработки изображений в стиле Meo Fusciuni

export interface MeoFusciuniFilter {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  blur: number;
  opacity: number;
  vignette?: boolean;
  grain?: boolean;
}

export const meoFusciuniFilters: Record<string, MeoFusciuniFilter> = {
  // Основной стиль - элегантный и глубокий
  primary: {
    brightness: 0.9,
    contrast: 1.1,
    saturation: 0.8,
    sepia: 0.1,
    blur: 0,
    opacity: 0.95,
    vignette: true,
    grain: false
  },
  
  // Вторичный стиль - более драматичный
  secondary: {
    brightness: 0.85,
    contrast: 1.2,
    saturation: 0.7,
    sepia: 0.15,
    blur: 0.5,
    opacity: 0.9,
    vignette: true,
    grain: true
  },
  
  // Оверлей стиль - для фоновых изображений
  overlay: {
    brightness: 0.8,
    contrast: 1.3,
    saturation: 0.6,
    sepia: 0.2,
    blur: 1,
    opacity: 0.85,
    vignette: true,
    grain: false
  },
  
  // Портретный стиль - для людей
  portrait: {
    brightness: 0.92,
    contrast: 1.05,
    saturation: 0.75,
    sepia: 0.08,
    blur: 0,
    opacity: 0.98,
    vignette: true,
    grain: false
  },
  
  // Пейзажный стиль - для городских видов
  landscape: {
    brightness: 0.88,
    contrast: 1.15,
    saturation: 0.85,
    sepia: 0.12,
    blur: 0.3,
    opacity: 0.92,
    vignette: true,
    grain: true
  }
};

// Генерирует CSS фильтры для изображения
export function generateMeoFusciuniCSS(filter: MeoFusciuniFilter): string {
  const filters = [
    `brightness(${filter.brightness})`,
    `contrast(${filter.contrast})`,
    `saturate(${filter.saturation})`,
    `sepia(${filter.sepia})`
  ];
  
  if (filter.blur > 0) {
    filters.push(`blur(${filter.blur}px)`);
  }
  
  return filters.join(' ');
}

// Создает градиентный оверлей в стиле Meo Fusciuni
export function createMeoFusciuniOverlay(variant: string = 'primary'): string {
  const overlays = {
    primary: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%)',
    secondary: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.15) 100%)',
    overlay: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.2) 100%)',
    portrait: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.03) 60%, rgba(0,0,0,0.08) 100%)',
    landscape: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.12) 100%)'
  };
  
  return overlays[variant] || overlays.primary;
}

// Обрабатывает изображение через Canvas API
export async function processImageInMeoFusciuniStyle(
  imageSrc: string, 
  filter: MeoFusciuniFilter
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      // Устанавливаем размеры
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Применяем фильтры
      ctx.filter = generateMeoFusciuniCSS(filter);
      
      // Рисуем изображение
      ctx.drawImage(img, 0, 0);
      
      // Добавляем виньетку если нужно
      if (filter.vignette) {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Добавляем зернистость если нужно
      if (filter.grain) {
        addGrainEffect(ctx, canvas.width, canvas.height);
      }
      
      // Возвращаем обработанное изображение
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageSrc;
  });
}

// Добавляет эффект зернистости
function addGrainEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Определяет лучший фильтр для типа изображения
export function getBestFilterForImage(imageType: 'portrait' | 'landscape' | 'abstract' | 'urban'): string {
  const filterMap = {
    portrait: 'portrait',
    landscape: 'landscape',
    abstract: 'secondary',
    urban: 'landscape'
  };
  
  return filterMap[imageType] || 'primary';
} 