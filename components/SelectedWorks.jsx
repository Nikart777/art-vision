'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "Sim Racing Club",
    category: "Immersive Website",
    description: "Цифровой пит-стоп для фанатов скорости. Мы разработали высокотехнологичную платформу, передающую драйв, адреналин и атмосферу профессиональных гоночных симуляторов прямо с экрана.",
    image: "/images/sim-racing.jpg",
    link: "https://cyberx.moscow/cyberracing",
    stat: "Броней: +210%",
    statDesc: "рост посещаемости"
  },
  {
    id: 2,
    title: "Hosta Tea",
    category: "E-commerce Redesign",
    description: "Полный редизайн магазина премиального чая. Акцент на атмосферу чайной церемонии через UI, упрощение воронки продаж и 'вкусная' подача товара.",
    image: "/images/tea.jpg",
    link: "https://hosta-tea-redesign.vercel.app/",
    stat: "Заказов: +145%",
    statDesc: "рост конверсии"
  },
  {
    id: 3,
    title: "Fashion Photographer",
    category: "Portfolio / Personal Brand",
    description: "Минималистичный сайт для fashion-фотографа (RU/USA). Чистый 'воздух', адаптивная галерея высокого разрешения и фокус на визуальном контенте для западного рынка.",
    image: "/images/photo-yaroshevich.jpg",
    link: "https://photo-yaroshevich.vercel.app/",
    stat: "Клиентов: +12",
    statDesc: "новых заявок"
  }
];

export default function SelectedWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      
      {/* Заголовок */}
      <div className="container mx-auto px-4 md:px-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <p className="font-mono text-xs text-purple-500 uppercase tracking-widest mb-4">
            /// Кейсы_и_Результаты
          </p>
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter">
            Избранные <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Проекты</span>
          </h2>
        </motion.div>
      </div>

      {/* Список Проектов */}
      <div className="container mx-auto px-4 md:px-12 flex flex-col gap-32">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            
            {/* Изображение */}
            <div className="w-full md:w-3/5 relative group">
              <Link href={project.link} target="_blank" className="block overflow-hidden rounded-2xl border border-white/10 relative">
                
                {/* Бейдж со статистикой */}
                <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md border border-purple-500/30 p-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.2)] transform transition-transform group-hover:scale-105">
                  <div className="text-3xl font-black text-white mb-1">{project.stat}</div>
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">{project.statDesc}</div>
                </div>

                <div className="relative aspect-[16/9] overflow-hidden">
                   <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                   <Image 
                     src={project.image} 
                     alt={project.title}
                     fill
                     className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                   />
                </div>
              </Link>
            </div>

            {/* Текстовый блок */}
            <div className="w-full md:w-2/5 flex flex-col justify-center">
              <span className="text-purple-400 font-mono text-sm mb-4 tracking-widest uppercase">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase leading-tight">
                {project.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {project.description}
              </p>
              
              <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:text-purple-400 transition-colors group">
                Смотреть Кейс
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}