import React from 'react';
import { motion } from 'framer-motion';

export interface NavItemProps {
  label: string;
  icon: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  href,
  isActive,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      className={`glass-card p-4 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex items-center gap-4">
        <div className="nav-icon">
          <span className="text-lg">{icon}</span>
        </div>
        <span className="text-graphite font-medium">{label}</span>
      </div>
    </motion.div>
  );
};

export default NavItem; 