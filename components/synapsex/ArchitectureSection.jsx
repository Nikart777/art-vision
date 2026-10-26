'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import MaskReveal from '../premium/MaskReveal';

const layers = [
  { num: "01", name: "Стратегия и исследование", desc: "Разбираем бизнес, аудиторию и конкурентов. Фиксируем цели продукта и метрики, по которым будем судить о результате." },
  { num: "02", name: "Арт-дирекшн и дизайн", desc: "Ищем визуальный язык бренда, собираем концепцию и дизайн ключевых страниц. Вы утверждаете каждый экран." },
  { num: "03", name: "Разработка и анимация", desc: "Чистый код на Next.js, motion-дизайн и 3D там, где они работают на смысл, а не ради эффекта." },
  { num: "04", name: "Запуск и развитие", desc: "Тестируем на всех устройствах, настраиваем аналитику и SEO, выводим в релиз и остаёмся рядом." },
];

const EASE = [0.22, 1, 0.36, 1];

export default function ArchitectureSection() {
  const listRef = useRef(null);

  // Вертикальная линия заполняется по мере прокрутки этапов
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"]
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.6 });

  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-32 flex flex-col">

        {/* Heading Block */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8"
          >
            Как мы работаем
          </motion.p>
          <MaskReveal
            className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10 uppercase"
            lines={['Процесс', <span key="a" className="accent-serif">без компромиссов</span>]}
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto"
          >
            Четыре этапа, каждый заканчивается результатом, который вы утверждаете. Вы всегда знаете, на какой стадии проект и что будет дальше.
          </motion.p>
        </div>

        {/* Этапы с линией прогресса */}
        <div ref={listRef} className="relative mt-20 flex flex-col gap-12 pl-10 sm:pl-14">
          <span aria-hidden="true" className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-white/10" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-white via-white/80 to-white/20 origin-top"
            style={{ scaleY: lineScale }}
          />

          {layers.map((layer, i) => (
            <motion.div
              key={layer.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: EASE }}
              className="relative"
            >
              <span aria-hidden="true" className="absolute -left-10 sm:-left-14 top-1.5 flex h-[15px] w-[15px] sm:h-[23px] sm:w-[23px] items-center justify-center rounded-full border border-white/30 bg-black">
                <span className="h-[5px] w-[5px] rounded-full bg-white" />
              </span>
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-white/30 text-[12px] tracking-[0.15em]">{layer.num}</span>
                <h3 className="text-white text-[18px] sm:text-[22px] font-light uppercase tracking-tight">
                  {layer.name}
                </h3>
              </div>
              <p className="text-white/45 text-[14px] sm:text-[15px] leading-relaxed max-w-lg">
                {layer.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
