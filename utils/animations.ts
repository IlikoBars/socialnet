import { AnimationVariants } from '../types';

// Базовые варианты анимаций
export const animationVariants: Record<string, AnimationVariants> = {
  // Появление снизу
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Появление сверху
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Появление слева
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Появление справа
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Масштабирование
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Появление с задержкой для списков
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },

  // Появление элемента списка
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },

  // Hover эффекты
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },

  // Tap эффекты
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  },

  // Модальное окно
  modal: {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  },

  // Drawer (для мобильных)
  drawer: {
    hidden: { 
      x: "100%",
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  },

  // Карточка
  card: {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      rotateX: 10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  },

  // Кнопка
  button: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  }
};

// Утилиты для создания кастомных анимаций
export const createAnimation = (
  type: 'fade' | 'slide' | 'scale' | 'rotate',
  direction?: 'up' | 'down' | 'left' | 'right',
  duration: number = 0.5,
  delay: number = 0
): AnimationVariants => {
  const baseTransition = {
    duration,
    delay,
    ease: "easeOut" as const
  };

  switch (type) {
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: baseTransition
        },
        exit: { 
          opacity: 0,
          transition: { ...baseTransition, duration: duration * 0.6 }
        }
      };

    case 'slide':
      const directionMap = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 }
      };
      const offset = directionMap[direction || 'up'];
      
      return {
        hidden: { opacity: 0, ...offset },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0,
          transition: baseTransition
        },
        exit: { 
          opacity: 0, 
          ...offset,
          transition: { ...baseTransition, duration: duration * 0.6 }
        }
      };

    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: baseTransition
        },
        exit: { 
          opacity: 0, 
          scale: 0.8,
          transition: { ...baseTransition, duration: duration * 0.6 }
        }
      };

    case 'rotate':
      return {
        hidden: { opacity: 0, rotate: -10 },
        visible: { 
          opacity: 1, 
          rotate: 0,
          transition: baseTransition
        },
        exit: { 
          opacity: 0, 
          rotate: 10,
          transition: { ...baseTransition, duration: duration * 0.6 }
        }
      };

    default:
      return animationVariants.fadeInUp;
  }
};

// Утилиты для stagger анимаций
export const createStaggerAnimation = (
  staggerDelay: number = 0.1,
  itemDuration: number = 0.4
) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: staggerDelay
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: itemDuration,
        ease: "easeOut"
      }
    }
  }
}); 