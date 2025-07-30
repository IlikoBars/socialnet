import { CommunityPost } from '../types/community';

export function selectTopPosts(posts: CommunityPost[]): CommunityPost[] {
  return posts
    .filter(post => {
      // Только посты за последние 24 часа
      const hoursAgo = (Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60);
      return hoursAgo <= 24;
    })
    .sort((a, b) => {
      // Сортировка по лайкам + качеству контента
      const scoreA = calculatePostScore(a);
      const scoreB = calculatePostScore(b);
      return scoreB - scoreA;
    })
    .slice(0, 8); // Топ-8
}

function calculatePostScore(post: CommunityPost): number {
  const likeWeight = 1;
  const viewWeight = 0.1;
  const commentWeight = 2;
  const timeDecay = Math.exp(-0.1 * getHoursSince(post.timestamp));
  
  return (
    (post.stats.likes * likeWeight +
     post.stats.views * viewWeight +
     post.stats.comments * commentWeight) * timeDecay
  );
}

function getHoursSince(timestamp: Date): number {
  return (Date.now() - timestamp.getTime()) / (1000 * 60 * 60);
}

export function canUserPostToday(lastPostDate?: Date): boolean {
  if (!lastPostDate) return true;
  
  const now = new Date();
  const lastPost = new Date(lastPostDate);
  
  // Проверяем, прошло ли 24 часа с последнего поста
  const hoursSinceLastPost = (now.getTime() - lastPost.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastPost >= 24;
}

export function formatTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}ч назад`;
  } else if (minutes > 0) {
    return `${minutes}м назад`;
  } else {
    return 'Только что';
  }
} 