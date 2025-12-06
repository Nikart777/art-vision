'use client';
import TextScramble from './TextScramble';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function Manifesto() {
  // Хуки для отслеживания мыши (эффект "Реакции")
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Динамический градиент (Spotlight), который следует за мышью
  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(126, 34, 206, 0.15),
    transparent 80%
  )`;

  return (
    <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505] z-30 overflow-hidden">
      
      {/* Глобальный фоновый шум для текстуры */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
        
        {/* --- ЛЕВАЯ ЧАСТЬ: Агрессия --- */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
            <span className="block text-gray-600 text-2xl md:text-3xl mb-4 font-mono">
              // SYSTEM_STATUS:
            </span>
            <span className="block text-white opacity-90">
              Обычные сайты
            </span>
            {/* Глитч-слово */}
            <TextScramble className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              МЕРТВЫ
            </TextScramble>
          </h2>
        </div>

        {/* --- ПРАВАЯ ЧАСТЬ: Живая экосистема (Интерактив) --- */}
        {/* Этот div отслеживает мышь */}
        <div 
          className="group relative rounded-xl border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight эффект (подсветка под курсором) */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background }}
          />

          <div className="relative z-10 font-mono text-lg text-gray-400 space-y-8 leading-relaxed">
            <p>
              Статика — это прошлое. Пользователь больше не хочет просто "смотреть". Он хочет чувствовать кончиками пальцев.
            </p>
            
            <p className="text-xl text-white">
              Мы создаем 
              {/* ЖИВОЙ ТЕКСТ: Анимация градиента */}
              <span className="relative inline-block mx-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-x">
                 живые цифровые экосистемы
                 {/* Линия пульса под текстом */}
                 <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 animate-pulse"></span>
              </span>.
              <br className="mb-2"/>
              Они дышат кодом. Они <span className="text-purple-300 italic decoration-wavy underline decoration-purple-500/50 underline-offset-4">реагируют</span> на каждое ваше движение, адаптируясь под контекст.
            </p>

            <p>
              Это не веб-дизайн. Это биотехнологии в браузере.
            </p>
            
            {/* Кнопка */}
            <div className="pt-6">
              <button className="relative px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 clip-path-slant">
                Запустить Протокол
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}