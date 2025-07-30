import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  className?: string;
  gradient?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  gradient = false,
}) => {
  const variantClasses = {
    h1: 'font-playfair text-5xl md:text-6xl font-bold',
    h2: 'font-playfair text-4xl md:text-5xl font-bold',
    h3: 'font-montserrat text-3xl font-semibold',
    h4: 'font-montserrat text-2xl font-semibold',
    h5: 'font-montserrat text-xl font-medium',
    h6: 'font-montserrat text-lg font-medium',
    body: 'font-inter text-base',
    caption: 'font-inter text-sm',
    label: 'font-montserrat text-sm font-medium',
  };
  
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-300',
    accent: 'text-yellow-400',
    muted: 'text-gray-400',
    error: 'text-red-400',
    success: 'text-green-400',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const gradientClasses = gradient ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' : '';
  
  const classes = `${variantClasses[variant]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[align]} ${gradientClasses} ${className}`;

  if (variant.startsWith('h')) {
    const HeadingComponent = variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return (
      <HeadingComponent className={classes}>
        {children}
      </HeadingComponent>
    );
  }

  return (
    <p className={classes}>
      {children}
    </p>
  );
};

export default Text; 