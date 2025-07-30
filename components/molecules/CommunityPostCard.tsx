'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CommunityPost } from '../../types/community';
import { formatTime } from '../../utils/communityAlgorithm';

interface CommunityPostCardProps {
  post: CommunityPost;
}

export default function CommunityPostCard({ post }: CommunityPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (postId: string) => {
    setIsLiked(!isLiked);
    // В реальном приложении здесь был бы API-запрос
  };

  return (
    <motion.div 
      className="bg-glass backdrop-blur-lg rounded-soul p-6 mb-6 shadow-soul border border-memory/10"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 12px 40px 0 rgba(26,26,26,0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Автор */}
      <div className="flex items-center mb-6">
        <motion.img 
          src={post.author.avatar} 
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gold/20"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <div>
          <h3 className="font-memory text-shadow font-semibold text-lg">
            {post.author.name}
          </h3>
          <p className="text-memory text-sm">
            {post.author.district} • {formatTime(post.timestamp)}
          </p>
        </div>
      </div>

      {/* Контент */}
      <div className="mb-6">
        <p className="font-memory text-shadow text-lg leading-relaxed mb-4">
          {post.content.text}
        </p>
        {post.content.image && (
          <motion.img 
            src={post.content.image}
            alt="Post content"
            className="w-full rounded-memory object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        )}
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.content.tags.map(tag => (
          <motion.span 
            key={tag}
            className="px-3 py-1 bg-gold/10 text-gold rounded-whisper text-sm font-memory"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            #{tag}
          </motion.span>
        ))}
      </div>

      {/* Статистика */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => handleLike(post.id)}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? 'text-gold' : 'text-memory hover:text-gold'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ 
                scale: isLiked ? [1, 1.3, 1] : 1,
                rotate: isLiked ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.3 }}
            >
              ❤️
            </motion.div>
            <span className="font-memory">{post.stats.likes + (isLiked ? 1 : 0)}</span>
          </motion.button>
          
          <div className="flex items-center gap-2 text-memory">
            👁️ <span className="font-memory">{post.stats.views}</span>
          </div>
          
          <div className="flex items-center gap-2 text-memory">
            💬 <span className="font-memory">{post.stats.comments}</span>
          </div>
        </div>

        {/* Индикатор топ-поста */}
        {post.isSelected && (
          <motion.div 
            className="flex items-center gap-2 text-gold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.span 
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ⭐
            </motion.span>
            <span className="font-memory text-sm">Топ дня</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 