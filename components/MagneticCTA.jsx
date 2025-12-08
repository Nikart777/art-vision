'use client';
import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export default function MagneticCTA() {
  const ref = useRef(null);
  
  // Состояния для магнита
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Пружинистая физика (мягкая и приятная)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Вычисляем центр кнопки
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Двигаем кнопку за мышкой (магнетизм)
    x.set(middleX * 0.3); // 0.3 - сила притяжения
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    // Возвращаем на место при уходе
    x.set(0);
    y.set(0);
  };

  const scrollToFooter = () => {
    // Плавный скролл к футеру
    const footer = document.getElementById('contact-form');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-32 flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Текст-подводка */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4">
          Ваш бренд готов к <span className="text-purple-500">эволюции?</span>
        </h2>
        <p className="font-mono text-gray-400 text-sm">
          /// SYSTEM_READY: WAITING_FOR_INPUT
        </p>
      </div>

      {/* МАГНИТНАЯ КНОПКА */}
      <motion.button
        ref={ref}
        onClick={scrollToFooter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="group relative px-12 py-8 md:px-20 md:py-10 rounded-full bg-white text-black font-black uppercase text-xl md:text-3xl tracking-tighter transition-all hover:scale-110 active:scale-95"
      >
        {/* Текст кнопки */}
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          Начать Проект
        </span>

        {/* Эффект заливки при наведении (Фиолетовая сфера) */}
        <span className="absolute inset-0 rounded-full bg-purple-600 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center z-0"></span>
        
        {/* Искры / Блики */}
        <span className="absolute -inset-2 rounded-full border border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"></span>
      
      </motion.button>

    </section>
  );
}