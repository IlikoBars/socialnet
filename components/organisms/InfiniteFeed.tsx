import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInfinitePosts } from '../../hooks/useInfinitePosts';
import PostCard from '../molecules/PostCard';
import Loader from '../atoms/Loader';

const InfiniteFeed: React.FC = () => {
  const { posts, hasMore, loading, loadMore } = useInfinitePosts();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          ref={i === posts.length - 1 ? lastPostRef : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="w-full max-w-xl"
        >
          <PostCard post={post} />
        </motion.div>
      ))}
      {loading && <Loader />}
    </div>
  );
};

export default InfiniteFeed; 