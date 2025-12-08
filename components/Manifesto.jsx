'use client';
import TextScramble from './TextScramble';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function Manifesto() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(126, 34, 206, 0.15),
    transparent 80%
  )`;

  return (
    <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505] z-30 overflow-hidden">
      
      {/* Фоновый шум */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
        
        {/* --- ЛЕВАЯ ЧАСТЬ --- */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
            <span className="block text-gray-600 text-2xl md:text-3xl mb-4 font-mono">
              // НОВАЯ_РЕАЛЬНОСТЬ:
            </span>
            <span className="block text-white opacity-90">
              ПРЕМИУМ
            </span>
            <span className="block text-white opacity-90">
              БОЛЬШЕ НЕ
            </span>
            {/* Глитч-слово */}
            <TextScramble className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              РОСКОШЬ
            </TextScramble>
          </h2>
        </div>

        {/* --- ПРАВАЯ ЧАСТЬ --- */}
        <div 
          className="group relative rounded-xl border border-white/10 bg-white/5 p-8 md:p-12 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background }}
          />

          <div className="relative z-10 font-mono text-lg text-gray-400 space-y-6 leading-relaxed">
            {/* Бейджи на русском */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest border border-green-500/20 rounded-full">
                Доступ: Открыт
              </span>
              <span className="text-xs uppercase text-gray-600 line-through decoration-red-500 decoration-2">
                Раздутые Сметы
              </span>
            </div>

            <p>
              Раньше сайты мирового уровня стоили миллионы и делались полгода. 
              <span className="text-white font-bold"> В 2025 году правила изменились.</span>
            </p>
            
            <p>
              Мы используем нейросети и готовые движки (Next.js), чтобы убрать рутину и снизить стоимость. 
              Вы платите за <span className="text-white">результат</span>, а не за часы работы программистов.
            </p>
            
            <p className="text-sm border-l-2 border-purple-500 pl-4 italic text-gray-500">
              "Бюджет больше не оправдание для скучного дизайна."
            </p>
            
            <div className="pt-6">
              <button 
                 onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                 className="relative px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 clip-path-slant"
              >
                Узнать Стоимость
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}