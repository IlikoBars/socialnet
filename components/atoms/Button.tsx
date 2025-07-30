import React from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'round' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
}) => {
  const baseClasses = 'font-memory font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-soul';

  const variantClasses = {
    primary: 'soft-btn',
    secondary: 'bg-glass text-shadow px-6 py-3 rounded-whisper font-memory shadow-whisper transition-all hover:scale-105 hover:shadow-gold',
    round: 'action-btn',
    icon: 'nav-icon',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: variant === 'round' || variant === 'icon' ? 1.1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button; 