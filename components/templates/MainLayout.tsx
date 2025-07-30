import React from 'react';
import { motion } from 'framer-motion';
import Text from '../atoms/Text';

export interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  gradient?: 'yellow' | 'purple' | 'blue' | 'green' | 'red';
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  subtitle,
  gradient = 'yellow',
}) => {
  const gradientClasses = {
    yellow: 'from-yellow-400 to-orange-400',
    purple: 'from-purple-400 to-pink-400',
    blue: 'from-blue-400 to-cyan-400',
    green: 'from-green-400 to-blue-400',
    red: 'from-red-400 to-pink-400',
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="p-6 overflow-auto">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Заголовок страницы */}
          {(title || subtitle) && (
            <motion.div 
              className="text-center mb-12"
              variants={itemVariants}
            >
              {title && (
                <Text 
                  variant="h1" 
                  className={`bg-gradient-to-r ${gradientClasses[gradient]} bg-clip-text text-transparent mb-4`}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text variant="body" color="secondary" className="max-w-2xl mx-auto">
                  {subtitle}
                </Text>
              )}
            </motion.div>
          )}
          
          {/* Основной контент */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout; 