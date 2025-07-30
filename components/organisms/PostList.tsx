import React from 'react';
import { motion } from 'framer-motion';
import Text from '../atoms/Text';
import PostCard, { Post } from '../molecules/PostCard';

export interface PostListProps {
  posts: Post[];
  title?: string;
  onOpenPost?: (post: Post) => void;
  onLikePost?: (postId: string) => void;
  onSharePost?: (postId: string) => void;
  className?: string;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  title,
  onOpenPost,
  onLikePost,
  onSharePost,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (posts.length === 0) {
    return (
      <motion.div
        className={`text-center py-12 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Text variant="h4" color="muted" className="mb-4">
          Пока нет постов
        </Text>
        <Text variant="body" color="muted">
          Будьте первым, кто поделится чем-то интересным!
        </Text>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {title && (
        <motion.div variants={itemVariants} className="mb-6">
          <Text variant="h3" color="primary">
            {title}
          </Text>
        </motion.div>
      )}
      
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div key={post.id} variants={itemVariants}>
            <PostCard
              post={post}
              onOpen={onOpenPost}
              onLike={onLikePost}
              onShare={onSharePost}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PostList; 