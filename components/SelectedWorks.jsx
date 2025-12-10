'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ДАННЫЕ ПРОЕКТОВ
// ВАЖНО: Положи скриншот сайта CyberX в папку /public/images/ и назови его cyberx.jpg
const projects = [
  {
    id: 'cyberx',
    title: 'CyberX Racing',
    category: 'Автосимуляторы / Immersive Web',
    description: 'Цифровой пит-стоп для фанатов скорости. Мы разработали высокотехнологичную платформу, передающую драйв, адреналин и атмосферу профессиональных гоночных симуляторов прямо с экрана.',
    image: '/images/cyberx.jpg', // <--- Убедись, что файл лежит здесь
    link: 'https://cyberx.moscow/cyberracing',
    year: '2025'
  },
  {
    id: 2,
    title: 'Nebula Core',
    category: 'AI Infrastructure',
    description: 'Облачная платформа для масштабирования нейросетей и обработки больших данных в реальном времени.',
    image: 'https://picsum.photos/id/200/800/600', // Временное фото
    link: '#',
    year: '2024'
  },
  {
    id: 3,
    title: 'Aura Estate',
    category: 'Real Estate / 3D',
    description: 'Интерактивный каталог элитной недвижимости с виртуальными турами и WebGL визуализацией.',
    image: 'https://picsum.photos/id/10/800/600', // Временное фото
    link: '#',
    year: '2023'
  }
];

// Компонент отдельного проекта (Карточка)
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  // Анимация появления при скролле
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Параллакс эффект для картинки и текста
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-20 items-center py-16 md:py-24 border-b border-white/10 last:border-none`}
    >
      {/* Изображение проекта с параллаксом */}
      <div className="w-full md:w-3/5 h-[40vh] md:h-[60vh] relative overflow-hidden rounded-3xl group">
        <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'}>
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
             <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
             />
          </motion.div>
          {/* Кнопка "View Project" при наведении */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <svg className="w-8 h-8 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Информация о проекте */}
      <motion.div style={{ y: textY }} className="w-full md:w-2/5 flex flex-col justify-center z-20 pointer-events-none md:pointer-events-auto px-4 md:px-0">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs text-purple-500 uppercase tracking-widest">/// Project {project.id}</span>
          <span className="h-[1px] flex-grow bg-white/10"></span>
          <span className="font-mono text-xs text-gray-500">{project.year}</span>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
          <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} className="hover:text-purple-500 transition-colors">
            {project.title}
          </Link>
        </h3>
        
        <div className="mb-6">
          <span className="inline-block py-1 px-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-gray-300 mb-4">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-400 leading-relaxed font-mono text-sm md:text-base max-w-md">
          {project.description}
        </p>

        <div className="mt-12">
           <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} className="inline-flex items-center gap-2 text-sm uppercase font-bold tracking-widest hover:text-purple-400 transition-colors group">
             Посмотреть кейс
             <span className="group-hover:translate-x-2 transition-transform">→</span>
           </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SelectedWorks() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-white py-32 px-4 md:px-12 overflow-hidden">
      {/* Фоновый шум */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div>
             <span className="font-mono text-purple-500 text-xs uppercase tracking-widest mb-4 block">/// Portfolio</span>
             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
               Selected <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Works</span>
             </h2>
          </div>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-8 md:mt-0 max-w-xs text-right">
            Избранные проекты, <br/>определяющие цифровой ландшафт.
          </p>
        </div>

        {/* Список проектов */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Кнопка "Все проекты" */}
        <div className="mt-24 flex justify-center">
           <Link href="/works" className="group relative inline-flex items-center gap-4 px-8 py-4 overflow-hidden rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/50">
             <span className="font-bold uppercase tracking-widest text-sm">Смотреть все кейсы</span>
             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
           </Link>
        </div>
      </div>
    </section>
  );
}