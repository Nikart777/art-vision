'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    id: "01",
    title: "Аналитика",
    desc: "Изучаем нишу, конкурентов и боли ЦА. Формируем ТЗ."
  },
  {
    id: "02",
    title: "UX/UI Дизайн",
    desc: "Прототипируем логику. Рисуем концепт. Собираем дизайн-систему."
  },
  {
    id: "03",
    title: "Разработка",
    desc: "Пишем чистый код на Next.js. Настраиваем CMS и интеграции."
  },
  {
    id: "04",
    title: "QA & Тесты",
    desc: "Нагрузочное тестирование. Проверка адаптива и безопасности."
  },
  {
    id: "05",
    title: "Запуск",
    desc: "Деплой на сервер. Настройка SEO. Обучение команды."
  }
];

export default function Process() {
  return (
    <section className="relative w-full py-32 bg-background-light dark:bg-background-dark transition-colors overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="mb-20 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Workflow</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Как Мы <span className="text-gradient">Работаем</span>
          </h2>
        </div>

        {/* TIMELINE GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">

          {/* Connecting Line (Mobile Hidden) */}
          <div className="absolute top-[3.5rem] left-0 w-full h-[2px] bg-gray-100 dark:bg-white/5 hidden md:block">
            <div className="h-full bg-gradient-to-r from-primary to-primary/20 w-3/4"></div>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 pt-16 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all group text-center md:text-left shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Number Badge */}
              <div className="absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-sm z-10 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                {step.id}
              </div>

              <h3 className="text-xl font-bold tracking-tight mb-4 mt-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}