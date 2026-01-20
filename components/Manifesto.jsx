'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';

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
    rgba(0, 185, 209, 0.1),
    transparent 80%
  )`;

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-background-light dark:bg-background-dark transition-colors overflow-hidden border-b border-gray-100 dark:border-white/5">

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">

        {/* LEFT PART */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-black uppercase tracking-widest text-primary">Манифест</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
            <span className="block text-gray-300 dark:text-gray-700 text-3xl mb-4">
              Premium is not
            </span>
            <span className="text-gradient">Luxury anymore</span>
          </h2>
          <p className="max-w-md text-lg text-gray-500 font-medium leading-relaxed">
            Мы пересматриваем стандарты. Качество мирового уровня теперь доступно каждому бизнесу, готовому к росту.
          </p>
        </div>

        {/* RIGHT PART */}
        <div
          className="group relative rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-10 md:p-16 overflow-hidden shadow-2xl shadow-primary/5"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background }}
          />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 rounded-full">
                Доступ: Открыт
              </span>
              <span className="text-[10px] font-black uppercase text-gray-400 line-through decoration-primary/40 decoration-2">
                Раздутые Сметы
              </span>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg">
              <p>
                Раньше сайты мирового уровня стоили миллионы и делались полгода.
                <span className="text-primary font-black"> В 2026 году правила изменились.</span>
              </p>

              <p>
                Мы объединили мощь Next.js и нашу экспертизу, чтобы исключить лишние затраты.
                Вы платите за <span className="text-[#101818] dark:text-white font-black">результат</span>, а не за часы разработки.
              </p>

              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border-l-4 border-primary italic text-sm text-gray-500">
                "Бюджет больше не оправдание для скучного и медленного дизайна."
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/#calculator"
                className="inline-flex h-14 items-center justify-center px-10 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
              >
                Обсудить Проект
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}