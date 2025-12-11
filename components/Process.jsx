'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Бриф и Стратегия",
    desc: "Мы не начинаем без карты. Глубокое погружение в бизнес-модель, анализ конкурентов и формирование технического задания. Результат: Прототип структуры."
  },
  {
    num: "02",
    title: "Дизайн-Концепция",
    desc: "Поиск визуальной метафоры. Мы создаем 'Mood of the Future' — дизайн, который выделяет вас из серой массы. Результат: UI-макеты главной страницы."
  },
  {
    num: "03",
    title: "Разработка (Code)",
    desc: "Магия Next.js и WebGL. Мы пишем чистый, семантический код, настраиваем анимации и оптимизируем производительность. Результат: Рабочий сайт на тестовом домене."
  },
  {
    num: "04",
    title: "Запуск и Тесты",
    desc: "Финальная полировка. Проверка SEO, адаптивности и скорости. Подключение аналитики и передача доступов. Результат: Ваш сайт в топе и готов к трафику."
  }
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative w-full py-32 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Как мы <span className="text-purple-500">Работаем</span>
          </h2>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-4 md:mt-0">
            /// ALGORITHM_EXECUTION
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group relative flex flex-col justify-between h-full min-h-[280px] p-6 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-purple-500/20 transition-colors">
                {step.num}
              </div>
              
              <div className="mt-8">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-purple-300 transition-colors">
                  {step.title}
                </h3>
                
                <p className="font-mono text-xs text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 w-full h-[1px] bg-white/10 group-hover:bg-purple-500/50 transition-colors"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}