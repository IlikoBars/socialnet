import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'dark' | 'transparent';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className = '',
  onClick,
  hover = false,
}) => {
  const variantClasses = {
    glass: 'glass-card',
    dark: 'dark-glass-card',
    transparent: 'bg-transparent',
  };

  const hoverClass = hover ? 'hover-glow cursor-pointer' : '';
  const classes = `${variantClasses[variant]} ${hoverClass} ${className}`;

  const MotionComponent = hover ? motion.div : 'div';

  return (
    <MotionComponent
      className={classes}
      onClick={onClick}
      {...(hover && {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 400, damping: 17 }
      })}
    >
      {children}
    </MotionComponent>
  );
};

export default Card; 