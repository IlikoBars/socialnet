'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

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

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('http://localhost:8000/auth/register', {
        email, 
        password, 
        firstName: firstName || "Ном", 
        lastName: lastName || "кäй фырт/чызг дä"
      });
      setSuccess(true);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при регистрации. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div 
            className="text-6xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            🎉
          </motion.div>
          <h2 className="font-montserrat text-2xl font-semibold mb-4">Регистрация успешна!</h2>
          <p className="font-inter text-gray-300 mb-6">Добро пожаловать в наше сообщество</p>
          <Link href="/">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-montserrat font-semibold rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Перейти на главную
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 className="font-playfair text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Регистрация
          </h1>
          <p className="font-montserrat text-gray-300">
            Присоединяйтесь к локальному сообществу
          </p>
        </motion.div>

        {/* Форма */}
        <motion.form 
          onSubmit={register} 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          variants={itemVariants}
        >
          <div className="space-y-6">
            {/* Имя и Фамилия */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                  Фамилия
                </label>
                <input
                  type="text"
                  placeholder="Ваша фамилия"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                required
              />
            </div>

            {/* Пароль */}
            <div>
              <label className="block font-montserrat text-sm font-medium mb-2 text-gray-200">
                Пароль
              </label>
              <input
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 font-inter focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                required
                minLength={6}
              />
            </div>

            {/* Кнопка регистрации */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-400 text-white font-montserrat font-semibold rounded-xl hover:from-green-300 hover:to-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Регистрация...
                </div>
              ) : (
                'Создать аккаунт'
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Ссылка на вход */}
        <motion.div 
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="font-inter text-gray-400">
            Уже есть аккаунт?{' '}
            <Link href="/profile" className="text-yellow-400 hover:text-yellow-300 font-montserrat font-medium">
              Войти
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}

