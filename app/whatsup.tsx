'use client';

import { motion } from 'framer-motion';

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

// Моковые данные о городских событиях
const cityEvents = [
  {
    id: 1,
    title: "Фестиваль уличного искусства",
    date: "15 августа",
    time: "18:00",
    location: "Центральная площадь",
    description: "Местные художники представят свои работы на стенах города",
    category: "Искусство",
    icon: "🎨"
  },
  {
    id: 2,
    title: "Вечерняя прогулка по набережной",
    date: "Каждый четверг",
    time: "20:00",
    location: "Набережная реки",
    description: "Неспешная прогулка с видом на закат и городские огни",
    category: "Активный отдых",
    icon: "🌅"
  },
  {
    id: 3,
    title: "Ночной рынок",
    date: "По пятницам",
    time: "22:00",
    location: "Старый район",
    description: "Уличная еда, музыка и атмосфера ночного города",
    category: "Еда и развлечения",
    icon: "🌙"
  },
  {
    id: 4,
    title: "Утренний кофе в парке",
    date: "По выходным",
    time: "09:00",
    location: "Городской парк",
    description: "Кофе и общение в тени старых деревьев",
    category: "Социальное",
    icon: "☕"
  }
];

const cityNews = [
  {
    id: 1,
    title: "Открытие новой велодорожки",
    content: "В центре города появилась новая велодорожка, соединяющая основные районы",
    date: "2 дня назад",
    category: "Инфраструктура"
  },
  {
    id: 2,
    title: "Реконструкция исторического здания",
    content: "Началась реставрация старой библиотеки в центре города",
    date: "1 неделя назад",
    category: "Культура"
  },
  {
    id: 3,
    title: "Новый арт-пространство",
    content: "В бывшем заводе открылось современное арт-пространство для молодежи",
    date: "3 дня назад",
    category: "Искусство"
  }
];

export default function WhatsUpPage() {
  return (
    <motion.main 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Чё в городе?
          </h1>
          <p className="font-montserrat text-lg text-gray-300 max-w-2xl mx-auto">
            Узнавайте о самых интересных событиях, новостях и местах в вашем городе
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* События */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="font-montserrat text-2xl font-semibold mb-6 text-white flex items-center">
                <span className="mr-3">📅</span>
                Ближайшие события
              </h2>
              
              <div className="space-y-4">
                {cityEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{event.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-montserrat font-semibold text-white mb-1">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <span>📅 {event.date}</span>
                          <span>🕐 {event.time}</span>
                          <span>📍 {event.location}</span>
                        </div>
                        <p className="font-inter text-gray-300 text-sm mb-2">
                          {event.description}
                        </p>
                        <span className="inline-block px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full font-montserrat font-medium">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Новости */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="font-montserrat text-2xl font-semibold mb-6 text-white flex items-center">
                <span className="mr-3">📰</span>
                Городские новости
              </h2>
              
              <div className="space-y-4">
                {cityNews.map((news) => (
                  <motion.div
                    key={news.id}
                    className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-montserrat font-semibold text-white">
                        {news.title}
                      </h3>
                      <span className="text-xs text-gray-500 font-montserrat">
                        {news.date}
                      </span>
                    </div>
                    <p className="font-inter text-gray-300 text-sm mb-3">
                      {news.content}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-400/20 text-blue-400 text-xs rounded-full font-montserrat font-medium">
                      {news.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Статистика города */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center">
            <div className="text-3xl mb-2">🏘️</div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
            <div className="text-sm text-gray-400 font-montserrat">Районов</div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-green-400 mb-1">45K</div>
            <div className="text-sm text-gray-400 font-montserrat">Жителей</div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center">
            <div className="text-3xl mb-2">🎭</div>
            <div className="text-2xl font-bold text-purple-400 mb-1">8</div>
            <div className="text-sm text-gray-400 font-montserrat">Сторонок</div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-pink-400 mb-1">24</div>
            <div className="text-sm text-gray-400 font-montserrat">События в месяц</div>
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
            <h3 className="font-montserrat text-2xl font-semibold text-white mb-4">
              Поделитесь своим событием
            </h3>
            <p className="font-inter text-gray-300 mb-6 max-w-2xl mx-auto">
              Знаете о интересном событии в городе? Расскажите о нем сообществу и помогите другим узнать о том, что происходит вокруг
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-montserrat font-semibold rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Добавить событие
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
