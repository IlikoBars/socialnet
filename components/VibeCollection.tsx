'use client';

import Image from 'next/image';
import { motion } from 'framer-motion'; // <-- Добавляем импорт motion

interface Post {
  id: number;
  title: string;
  image: string;
  author: {
    nickname: string;
    avatar: string;
  };
}

interface VibeCollectionProps {
  posts: Post[];
  onOpenPost: (post: Post) => void;
}

// 1. Варианты анимации для каждого отдельного элемента (круглой превьюшки поста)
const postItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 }, // Начальное состояние: невидимый, уменьшен, сдвинут вниз
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring", // Используем пружинный тип для более естественного движения
      stiffness: 260,
      damping: 20
    }
  },
};

// 2. Варианты анимации для контейнера VibeCollection, чтобы элементы появлялись последовательно
const containerVariants = {
  hidden: { opacity: 1 }, // Контейнер сам по себе просто виден, его дети анимируются
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,   // Задержка перед началом анимации первого ребенка
      staggerChildren: 0.15 // Задержка между началом анимации каждого последующего ребенка
    }
  }
};

export default function VibeCollection({ posts, onOpenPost }: VibeCollectionProps) {
  if (!posts || posts.length === 0) return null;

  // Ваши позиции, вынесенные из хардкода
  const positions = [
    { top: '10%', left: '20%' },
    { top: '35%', left: '60%' },
    { top: '60%', left: '30%' },
    { top: '25%', left: '10%' }, // Добавил еще одну для примера, если постов больше 3
    { top: '70%', left: '70%' },
    { top: '5%', left: '75%' },
    { top: '45%', left: '5%' },
    { top: '80%', left: '50%' },
  ];

  return (
    <motion.div // <--- Заменяем div на motion.div
      className="relative w-full h-[600px] overflow-hidden"
      variants={containerVariants} // <--- Применяем варианты контейнера
      initial="hidden"            // <--- Начальное состояние контейнера
      animate="visible"           // <--- Конечное состояние контейнера (запускает анимацию дочерних элементов)
    >
      {posts.map((post, index) => {
        const pos = positions[index % positions.length]; // Циклично используем позиции

        return (
          <motion.div // <--- Заменяем div на motion.div для каждого элемента поста
            key={post.id}
            className="absolute w-20 h-20 rounded-full shadow-md border border-white/30 cursor-pointer" // Убрали hover и transition-all/duration-200, Framer Motion сделает это
            style={{ top: pos.top, left: pos.left }}
            onClick={() => onOpenPost(post)}
            variants={postItemVariants} // <--- Применяем варианты появления для элемента
            whileHover={{
              scale: 1.2, // Увеличение на 20% при наведении
              zIndex: 10, // Чтобы всплывающий элемент был поверх других
              boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.2), 0 5px 10px -5px rgba(0, 0, 0, 0.1)", // Более выраженная тень
              borderColor: '#FACC15' // Цвет рамки при наведении (желтый, как у tailwind yellow-400)
            }}
            // Framer Motion по умолчанию использует плавный transition для whileHover
          >
            <Image
              src={post.author.avatar}
              alt={post.author.nickname}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
