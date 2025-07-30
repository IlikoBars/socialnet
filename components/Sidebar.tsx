'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Городская лента', icon: '🏙', description: 'Лента постов' },
  { href: '/vibes', label: 'Сторонки', icon: '🎭', description: 'Вайб-коллекция' },
  { href: '/map', label: 'Карта', icon: '🗺️', description: 'Интерактивная карта' },
  { href: '/profile', label: 'Профиль', icon: '👤', description: 'Личный кабинет' },
  { href: '/register', label: 'Регистрация', icon: '📝', description: 'Создать аккаунт' },
  { href: '/whatsup', label: 'Чё в городе', icon: '📍', description: 'Новости города' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside 
      className="w-72 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 text-white p-6 hidden md:block"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Логотип */}
      <motion.div 
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Город
        </h1>
        <p className="font-montserrat text-sm text-gray-400 mt-1">
          Локальное сообщество
        </p>
      </motion.div>

      {/* Навигация */}
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={item.href}>
                <motion.div
                  className={`p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30' 
                      : 'hover:bg-gray-800/50 border border-transparent'
                  }`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className={`font-montserrat font-medium ${
                        isActive ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                      }`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-yellow-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Статистика */}
      <motion.div 
        className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-montserrat font-medium text-sm text-gray-300 mb-3">
          Статистика
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Постов сегодня:</span>
            <span className="text-yellow-400 font-medium">12</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Активных сторонок:</span>
            <span className="text-yellow-400 font-medium">8</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Онлайн:</span>
            <span className="text-green-400 font-medium">24</span>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
