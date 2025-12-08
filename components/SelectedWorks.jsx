'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const works = [
  { 
    id: "01", 
    title: "Cyber Finance", 
    category: "Fintech / Web3", 
    color: "#1a1a1a", // Глубокий серый
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" 
  },
  { 
    id: "02", 
    title: "Neon Tokyo", 
    category: "E-commerce", 
    color: "#0f0f0f", // Почти черный
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" 
  },
  { 
    id: "03", 
    title: "Zenith Bionic", 
    category: "Медицина / AI", 
    color: "#141414", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop" 
  },
  { 
    id: "04", 
    title: "Aero Space", 
    category: "Пром. Дизайн", 
    color: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop" 
  }
];

// Компонент одной карточки
function Card({ i, title, category, image, color, progress, range, targetScale }) {
  const container = useRef(null);
  
  // Отслеживаем скролл конкретной карточки
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Анимация уменьшения (карточка уходит вглубь)
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }} 
        className="relative flex flex-col w-[90vw] md:w-[70vw] h-[60vh] md:h-[70vh] rounded-3xl border border-white/10 origin-top overflow-hidden shadow-2xl"
      >
        
        {/* Верхняя панель карточки */}
        <div className="absolute z-20 top-0 w-full p-8 flex justify-between items-center mix-blend-difference text-white">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{title}</h3>
            <span className="font-mono text-sm uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full">{category}</span>
        </div>

        {/* Изображение с параллаксом внутри */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <img 
               src={image} 
               alt={title} 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
          {/* Шум поверх */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Кнопка внизу */}
        <div className="absolute z-20 bottom-8 right-8">
            <button className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs hover:bg-purple-500 hover:text-white transition-colors">
                View Case
            </button>
        </div>

      </motion.div>
    </div>
  );
}

export default function SelectedWorks() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative mt-[10vh] mb-[10vh]">
      
      {/* Заголовок раздела (пролетает мимо) */}
      <div className="w-full text-center mb-20">
         <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Selected Works
         </h2>
         <p className="text-purple-500 font-mono mt-4 animate-pulse">
            /// SCROLL TO EXPLORE
         </p>
      </div>

      {/* Рендер карточек */}
      {works.map((work, i) => {
        // Вычисляем масштаб для каждой карточки, чтобы они складывались красиво
        const targetScale = 1 - ((works.length - i) * 0.05);
        return (
          <Card 
            key={i} 
            i={i} 
            {...work} 
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}