'use client';
import { motion } from 'framer-motion';

const layers = [
  { num: "Этап 1", name: "Аналитика и прототип" },
  { num: "Этап 2", name: "Дизайн и верстка" },
  { num: "Этап 3", name: "Запуск и реклама" },
];

export default function ArchitectureSection() {
  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-32 flex flex-col">
        
        {/* Heading Block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="text-center"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Как мы работаем
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10 uppercase">
            Процесс. Без задержек.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Прозрачный процесс разработки из трех этапов. Вы всегда знаете, на какой стадии находится проект.
          </p>
        </motion.div>

        {/* Layer Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-4 w-full"
        >
          {layers.map((layer, i) => (
            <div 
              key={i} 
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02]"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                {layer.num}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {layer.name}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
