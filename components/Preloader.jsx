'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  // Состояния для этапов анимации
  // 1. entry: Буквы выезжают
  // 2. exit: Шторки открываются
  const [phase, setPhase] = useState('entry');

  useEffect(() => {
    document.body.style.cursor = 'wait';

    // ТАЙМИНГ ШОУ (Фиксированный, чтобы не зависало)
    // 1. Через 1.1 сек начинаем открывать шторки
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1100);

    // 2. Через 1.6 сек (когда шторки открылись) удаляем прелоадер из DOM
    const completeTimer = setTimeout(() => {
      document.body.style.cursor = 'auto'; // Возвращаем курсор
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.cursor = 'auto'; // На всякий случай
    };
  }, [onComplete]);

  // Анимация текста (ART слева, VISION справа)
  const textVariants = {
    initial: { x: 0, opacity: 0 },
    entry: (direction) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Анимация ШТОРОК (разъезжаются вверх и вниз)
  const curtainVariants = {
    initial: { height: "50vh" },
    exit: {
      height: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
    }
  };

  // Линия посередине (расширяется и исчезает)
  const lineVariants = {
    initial: { width: 0 },
    entry: { 
      width: "100%", 
      transition: { duration: 1.5, ease: "easeInOut" } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between pointer-events-auto">
      
      {/* ВЕРХНЯЯ ШТОРКА */}
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate={phase === 'exit' ? 'exit' : 'initial'}
        className="w-full bg-[#050505] flex items-end justify-center relative overflow-hidden border-b border-white/10"
      >
         {/* Слово ART (Выезжает слева к центру) */}
         <div className="absolute bottom-4 md:bottom-8 flex items-baseline gap-4 overflow-hidden">
            <motion.div
              custom={-1}
              initial={{ x: "-100%", opacity: 0 }}
              animate={phase === 'entry' ? { x: "0%", opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter mix-blend-difference"
            >
              ART
            </motion.div>
         </div>
      </motion.div>

      {/* ЦЕНТРАЛЬНАЯ ЛИНИЯ (Стыковка) */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] z-50 flex items-center justify-center">
         <motion.div 
            variants={lineVariants}
            initial="initial"
            animate={phase === 'entry' ? 'entry' : 'exit'}
            className="h-full bg-purple-500 shadow-[0_0_20px_#a855f7]"
         />
      </div>

      {/* НИЖНЯЯ ШТОРКА */}
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate={phase === 'exit' ? 'exit' : 'initial'}
        className="w-full bg-[#050505] flex items-start justify-center relative overflow-hidden border-t border-white/10"
      >
         {/* Слово VISION (Выезжает справа к центру) */}
         <div className="absolute top-4 md:top-8 flex items-baseline gap-4 overflow-hidden">
            {/* Точка (декоративный элемент) */}
            <motion.div
               initial={{ scale: 0 }}
               animate={phase === 'entry' ? { scale: 1 } : { scale: 0 }}
               transition={{ delay: 1, duration: 0.3 }}
               className="w-2 h-2 md:w-4 md:h-4 bg-purple-500 rounded-full mb-2 md:mb-4"
            />
            <motion.div
              custom={1}
              initial={{ x: "100%", opacity: 0 }}
              animate={phase === 'entry' ? { x: "0%", opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter mix-blend-difference"
            >
              VISION
            </motion.div>
         </div>
      </motion.div>

    </div>
  );
}