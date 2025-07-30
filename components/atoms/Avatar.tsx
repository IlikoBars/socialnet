import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = '', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const classes = `avatar ${sizeClasses[size]} ${className}`;

  return (
    <img
      src={src || '/avatars/default.png'}
      alt={alt}
      className={classes}
      loading="lazy"
    />
  );
};

export default Avatar; 