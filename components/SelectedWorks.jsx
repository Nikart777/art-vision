'use client';
import { useRef } from 'react';
import { motion, useTransform, useScroll, useMotionValue, useSpring } from 'framer-motion';

const works = [
  { 
    id: "01", 
    title: "Cyber Finance", 
    category: "Fintech / Web3", 
    year: "2024",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" 
  },
  { 
    id: "02", 
    title: "Neon Tokyo", 
    category: "E-commerce", 
    year: "2023",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" 
  },
  { 
    id: "03", 
    title: "Zenith Bionic", 
    category: "Медицина / AI", 
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop" 
  },
  { 
    id: "04", 
    title: "Aero Space", 
    category: "Пром. Дизайн", 
    year: "2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop" 
  },
];

// Компонент отдельной карточки с 3D эффектом
function ProjectCard({ work }) {
  const ref = useRef(null);

  // Логика 3D наклона
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-[75vw] md:w-[45vw] h-[65vh] flex-shrink-0 cursor-pointer perspective-1000"
    >
      {/* Контейнер картинки */}
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="absolute inset-0 overflow-hidden border border-white/10 bg-[#111] transition-all duration-500 group-hover:border-purple-500/50"
      >
        {/* Изображение */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
             <img 
               src={work.image} 
               alt={work.title} 
               className="w-full h-full object-cover transition-all duration-700 
                          scale-110 group-hover:scale-100 
                          grayscale group-hover:grayscale-0 
                          opacity-70 group-hover:opacity-100"
             />
             {/* Зернистый шум для стиля */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Оверлей при ховере (затемнение снизу) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Контент поверх (вынесен вперед по Z-оси) */}
      <div 
        style={{ transform: "translateZ(80px)" }}
        className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end items-start pointer-events-none"
      >
        {/* Номер и Год */}
        <div className="flex justify-between w-full mb-4 border-b border-white/20 pb-4 overflow-hidden">
            <span className="text-purple-500 font-mono text-xl translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                ({work.id})
            </span>
            <span className="text-gray-400 font-mono text-sm translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                [{work.year}]
            </span>
        </div>
        
        {/* Категория */}
        <span className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            {work.category}
        </span>
        
        {/* Заголовок */}
        <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
           {work.title.split(" ").map((word, i) => (
             <span key={i} className="inline-block overflow-hidden align-bottom">
               <span className="inline-block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ transitionDelay: `${i * 100}ms` }}>
                 {word}&nbsp;
               </span>
             </span>
           ))}
        </h3>
      </div>
      
      {/* Кнопка "View" (Появляется в центре) */}
      <div 
        style={{ transform: "translateZ(100px)" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <div className="w-24 h-24 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center bg-black/30">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">View</span>
        </div>
      </div>

    </motion.div>
  );
}

export default function SelectedWorks() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      
      {/* Декоративная линия сверху */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-10"></div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Заголовок секции */}
        <div className="absolute top-12 left-12 md:left-24 z-20 pointer-events-none mix-blend-difference">
             <h2 className="text-xl font-mono uppercase text-gray-500 tracking-widest">
               // Archive
             </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-12 md:px-24 items-center">
          
          {/* Интро карточка (текстовая) */}
          <div className="flex flex-col justify-center min-w-[25vw] shrink-0">
             <h2 className="text-7xl md:text-9xl font-black uppercase text-white leading-[0.85] mb-8">
               Select<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-gray-500">
                 Works
               </span>
             </h2>
             <p className="text-gray-400 font-mono text-sm max-w-md leading-relaxed">
               Каждый проект — это вызов гравитации. Мы не следуем трендам, мы создаем аномалии, которые становятся правилами.
             </p>
             <div className="mt-8 flex gap-4">
                 <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
                 <span className="text-xs font-mono text-gray-500 uppercase">Scroll to explore</span>
             </div>
          </div>

          {/* Рендер карточек */}
          {works.map((work) => (
            <ProjectCard key={work.id} work={work} />
          ))}

          {/* Пустое пространство в конце для плавности */}
          <div className="min-w-[10vw]"></div>

        </motion.div>
      </div>
    </section>
  );
}