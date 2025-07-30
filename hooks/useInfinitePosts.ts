import { useState, useCallback } from 'react';
import { Post } from '../types';
import { mockData } from '../utils/api';

const PAGE_SIZE = 10;

export function useInfinitePosts() {
  const [posts, setPosts] = useState<Post[]>(mockData.getMockPosts('Владикавказ').slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const all = mockData.getMockPosts('Владикавказ');
      const next = all.slice(0, (page + 1) * PAGE_SIZE);
      setPosts(next);
      setPage(page + 1);
      setHasMore(next.length < all.length);
      setLoading(false);
    }, 800);
  }, [loading, hasMore, page]);

  return { posts, hasMore, loading, loadMore };
} 