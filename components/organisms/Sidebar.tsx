import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../molecules';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  setTab: (tab: string) => void;
}

const navItems = [
  { id: 'feed', label: 'Лента', icon: '📰', href: '#' },
  { id: 'map', label: 'Карта', icon: '🗺️', href: '#' },
  { id: 'vibes', label: 'Сторонки', icon: '🎭', href: '#' },
  { id: 'profile', label: 'Профиль', icon: '👤', href: '#' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, setTab }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="fixed top-0 left-0 h-full w-64 sidebar z-50 flex flex-col p-6"
        >
          <button
            className="self-end text-2xl text-bluegray mb-6 hover:text-sky transition-colors"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ×
          </button>
          
          <div className="mb-8">
            <h1 className="font-playfair text-2xl font-bold text-graphite">
              Владикавказ
            </h1>
            <p className="font-inter text-sm text-bluegray mt-1">
              Перекрёсток воспоминаний
            </p>
          </div>
          
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                href={item.href}
                isActive={false}
                onClick={() => {
                  setTab(item.id);
                  onClose();
                }}
              />
            ))}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 