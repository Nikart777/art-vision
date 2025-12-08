'use client';
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

const stats = [
  { 
    label: "Рост Заявок", 
    value: "3.5", 
    suffix: "x", 
    desc: "Среднее увеличение конверсии продаж после редизайна" 
  },
  { 
    label: "Скорость", 
    value: "99", 
    suffix: "/100", 
    desc: "Оценка Google. Сайт летает, клиенты не ждут и не уходят" 
  },
  { 
    label: "Удержание", 
    value: "400", 
    suffix: "%", 
    desc: "Клиенты проводят на сайте больше времени, изучая продукт" 
  },
  { 
    label: "Окупаемость", 
    value: "3-5", 
    suffix: "мес", 
    desc: "Средний срок возврата инвестиций в разработку" 
  },
];

function Counter({ value, suffix }) {
  return (
    <span className="flex items-baseline">
      {value}
      <span className="text-4xl md:text-6xl text-purple-500 ml-2">{suffix}</span>
    </span>
  );
}

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative w-full py-24 bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Заголовок НА РУССКОМ */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
             Язык <span className="text-gray-600">Цифр</span>
           </h2>
           <p className="font-mono text-xs text-purple-500 uppercase tracking-widest mt-4 md:mt-0">
             /// Реальные_Показатели
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 border-l border-white/20 hover:border-purple-500 hover:bg-white/5 transition-colors duration-300 group"
            >
              <div className="text-6xl md:text-7xl font-black tracking-tighter mb-4 tabular-nums group-hover:text-white transition-colors">
                 <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-white group-hover:text-purple-400 transition-colors">
                {stat.label}
              </h3>
              <p className="font-mono text-xs text-gray-500 leading-relaxed group-hover:text-gray-300">
                {stat.desc}
              </p>
              <div className="absolute top-0 left-[-1px] w-[3px] h-0 bg-purple-500 group-hover:h-full transition-all duration-500 ease-in-out"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}