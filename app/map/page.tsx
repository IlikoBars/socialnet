'use client';

import { motion } from 'framer-motion';
import { MapInteractive } from '../../components/MapInteractive';
import { MainLayout } from '../../components/templates';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { CityStats } from '../../components/molecules';

export default function MapPage() {
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
    <MainLayout
      title="Интерактивная карта"
      subtitle="Исследуйте районы города и находите интересные посты"
      gradient="blue"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Основная карта */}
        <motion.div variants={itemVariants}>
          <MapInteractive />
        </motion.div>

        {/* Контролы карты */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button variant="outline" size="md">
            🔍 Увеличить
          </Button>
          <Button variant="outline" size="md">
            📍 Моё местоположение
          </Button>
          <Button variant="outline" size="md">
            🏠 Центр города
          </Button>
          <Button variant="outline" size="md">
            📊 Статистика
          </Button>
        </motion.div>

        {/* Статистика города */}
        <motion.div variants={itemVariants}>
          <CityStats />
        </motion.div>

        {/* Информационные карточки */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="huly-card p-6">
            <div className="text-3xl mb-3">🗺️</div>
            <Text variant="h5" color="primary" className="mb-2">
              Исследуйте районы
            </Text>
            <Text variant="body" color="secondary">
              Кликайте на районы карты, чтобы увидеть посты местных жителей
            </Text>
          </div>

          <div className="huly-card p-6">
            <div className="text-3xl mb-3">📱</div>
            <Text variant="h5" color="primary" className="mb-2">
              Адаптивный дизайн
            </Text>
            <Text variant="body" color="secondary">
              Карта автоматически адаптируется под мобильные устройства
            </Text>
          </div>

          <div className="huly-card p-6">
            <div className="text-3xl mb-3">🎨</div>
            <Text variant="h5" color="primary" className="mb-2">
              Красивые анимации
            </Text>
            <Text variant="body" color="secondary">
              Плавные переходы и hover-эффекты для лучшего UX
            </Text>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

