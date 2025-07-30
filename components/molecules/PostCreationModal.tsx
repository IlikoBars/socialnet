'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PostCreationData } from '../../types/community';

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: PostCreationData) => void;
}

export default function PostCreationModal({ isOpen, onClose, onSubmit }: PostCreationModalProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    
    onSubmit({
      text: text.trim(),
      image: image || undefined,
      tags: tags
    });
    
    // Сброс формы
    setText('');
    setImage(null);
    setTags([]);
    setTagInput('');
    onClose();
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-darkglass/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-soul rounded-soul p-8 max-w-2xl w-full mx-4 shadow-soul"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h2 className="font-soul text-3xl text-shadow mb-2">
                Поделиться словом
              </h2>
              <p className="font-memory text-memory">
                Одно слово в день — как молитва, как важное послание Городу
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Текст поста */}
              <div>
                <label className="block font-memory text-shadow mb-3 text-lg">
                  Твоё слово сегодня
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full h-32 p-4 bg-glass border border-memory/20 rounded-memory font-memory resize-none focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="Что хочешь сказать Городу сегодня? Расскажи о своём дне, поделись мыслями, поделись красотой..."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-memory">
                    Ctrl+Enter для отправки
                  </span>
                  <span className="text-sm text-memory">
                    {text.length}/500
                  </span>
                </div>
              </div>

              {/* Загрузка изображения */}
              <div>
                <label className="block font-memory text-shadow mb-3 text-lg">
                  Изображение (необязательно)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="w-full p-4 bg-glass border border-memory/20 rounded-memory cursor-pointer hover:border-gold/30 transition-colors"
                  />
                  {image && (
                    <motion.div
                      className="mt-3 p-3 bg-gold/10 rounded-memory"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="text-sm text-gold font-memory">
                        Выбрано: {image.name}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Теги */}
              <div>
                <label className="block font-memory text-shadow mb-3 text-lg">
                  Теги (до 5 штук)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 p-3 bg-glass border border-memory/20 rounded-whisper font-memory focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Введите тег и нажмите Enter"
                    disabled={tags.length >= 5}
                  />
                  <button
                    onClick={addTag}
                    disabled={!tagInput.trim() || tags.length >= 5}
                    className="px-4 py-3 bg-gold text-soul rounded-whisper font-memory hover:bg-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                
                {/* Отображение тегов */}
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-gold/20 text-gold rounded-whisper text-sm font-memory flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-gold hover:text-shadow transition-colors"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-memory/20 text-memory rounded-memory font-memory hover:bg-memory/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Отмена
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className={`flex-1 px-6 py-3 rounded-memory font-memory transition-colors ${
                  text.trim() 
                    ? 'bg-gold text-soul hover:bg-amber shadow-whisper hover:shadow-gold' 
                    : 'bg-memory/20 text-memory/50 cursor-not-allowed'
                }`}
                whileHover={text.trim() ? { scale: 1.02 } : {}}
                whileTap={text.trim() ? { scale: 0.98 } : {}}
              >
                Поделиться словом
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 