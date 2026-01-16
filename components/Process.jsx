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
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        <div className="mb-20 text-center">
          <span className="font-mono text-purple-500 text-xs tracking-widest uppercase mb-4 block">/// Workflow</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Как Мы <span className="text-gray-600">Работаем</span>
          </h2>
        </div>

        {/* TIMELINE GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* Connecting Line (Mobile Hidden) */}
          <div className="absolute top-[3.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent hidden md:block"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 pt-16 rounded-2xl border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors group text-center md:text-left"
            >
              {/* Number Badge */}
              <div className="absolute top-8 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-[#050505] border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono font-bold z-10 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                {step.id}
              </div>

              <h3 className="text-xl font-bold uppercase mb-4 mt-4 text-white group-hover:text-purple-400 transition-colors">
                {step.title}
              </h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}