import React from 'react';
import { motion } from 'framer-motion';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

export interface MediaPost {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video';
  content: string;
  mediaUrl?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes?: number;
  comments?: number;
}

export interface MediaPostProps {
  post: MediaPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  className?: string;
}

const MediaPost: React.FC<MediaPostProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  className = '',
}) => {
  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'audio': return '🎵';
      case 'video': return '🎬';
      default: return '📝';
    }
  };

  const renderMediaContent = () => {
    switch (post.type) {
      case 'image':
        return (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={post.mediaUrl} 
              alt={post.content}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              🖼️
            </div>
          </div>
        );
      
      case 'audio':
        return (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                🎵
              </div>
              <div className="flex-1">
                <Text variant="body" color="primary" className="mb-1">
                  Аудио запись
                </Text>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="relative rounded-lg overflow-hidden bg-gray-700/50">
            <video 
              src={post.mediaUrl} 
              className="w-full h-48 object-cover"
              controls
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              🎬
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card variant="default" padding="md" hover={true}>
        <div className="space-y-4">
          {/* Заголовок поста */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
              {post.author.name[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <Text variant="h6" color="primary">
                {post.author.name}
              </Text>
              <Text variant="caption" color="muted">
                {post.createdAt}
              </Text>
            </div>
            <div className="text-2xl">
              {getMediaIcon(post.type)}
            </div>
          </div>

          {/* Контент */}
          {post.content && (
            <Text variant="body" color="secondary">
              {post.content}
            </Text>
          )}

          {/* Медиа контент */}
          {post.mediaUrl && renderMediaContent()}

          {/* Действия */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike?.(post.id)}
              >
                ❤️ {post.likes || 0}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment?.(post.id)}
              >
                💬 {post.comments || 0}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
            >
              📤
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MediaPost; 