import React from 'react';
import { Post } from '../../types';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
        <div className="flex-1">
          <div className="font-playfair text-lg text-graphite font-semibold">{post.author.name}</div>
          <div className="font-mono text-xs text-bluegray">{post.createdAt}</div>
        </div>
      </div>
      
      <div className="font-inter text-graphite mb-4 leading-relaxed">{post.content}</div>
      
      {post.mediaUrl && (
        <img 
          src={post.mediaUrl} 
          alt="media" 
          className="rounded-card w-full mb-4 object-cover" 
        />
      )}
      
      <div className="flex gap-3">
        <Button variant="round" onClick={() => console.log('like')}>
          ❤️
        </Button>
        <Button variant="round" onClick={() => console.log('comment')}>
          💬
        </Button>
        <Button variant="round" onClick={() => console.log('share')}>
          📤
        </Button>
      </div>
    </div>
  );
};

export default PostCard; 