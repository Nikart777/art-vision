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
    rgba(255, 255, 255, 0.05),
    transparent 80%
  )`;

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-black transition-colors overflow-hidden border-b border-white/10 font-sans">

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">

        {/* LEFT PART */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-white/40"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Манифест</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95] uppercase">
            <span className="block text-white/40 text-3xl mb-4">
              Premium is not
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">Luxury anymore</span>
          </h2>
          <p className="max-w-md text-lg text-white/50 font-light leading-relaxed">
            Мы пересматриваем стандарты. Качество мирового уровня теперь доступно каждому бизнесу, готовому к росту.
          </p>
        </div>

        {/* RIGHT PART */}
        <div
          className="group relative rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-10 md:p-16 overflow-hidden shadow-2xl backdrop-blur-xl"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background }}
          />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                Доступ: Открыт
              </span>
              <span className="text-[10px] font-bold uppercase text-white/30 line-through decoration-white/20 decoration-2">
                Раздутые Сметы
              </span>
            </div>

            <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
              <p>
                Раньше сайты мирового уровня стоили миллионы и делались полгода.
                <span className="text-white font-bold"> В 2026 году правила изменились.</span>
              </p>

              <p>
                Мы объединили мощь Next.js и нашу экспертизу, чтобы исключить лишние затраты.
                Вы платите за <span className="text-white font-bold">результат</span>, а не за часы разработки.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-white/20 italic text-sm text-white/40">
                "Бюджет больше не оправдание для скучного и медленного дизайна."
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/#contact-form"
                className="inline-flex h-14 items-center justify-center px-10 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
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