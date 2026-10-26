'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// Слова в *звёздочках* набираются акцентным курсивом
const TEXT =
  'Мы строим не просто сайты, а цифровые продукты, на которых держится бизнес: платформы трансляций, SaaS-сервисы, e-commerce и порталы *флагманского уровня.* Стратегия, дизайн и инженерия в одной команде — чтобы продукт работал как *двигатель роста.*';

// Разбиваем на слова и помечаем акцентные (звёздочки могут охватывать несколько слов)
const WORDS = (() => {
  let accent = false;
  return TEXT.split(' ').map((raw) => {
    const opens = raw.startsWith('*');
    const closes = raw.endsWith('*');
    if (opens) accent = true;
    const word = { text: raw.replace(/\*/g, ''), accent };
    if (closes) accent = false;
    return word;
  });
})();

function Word({ word, progress, range }) {
  // Слово «загорается», когда до него доходит прокрутка
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={word.accent ? 'accent-serif' : undefined}>
      {word.text}
    </motion.span>
  );
}

export default function CinematicTextSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 35,
    mass: 1.5
  });

  // Отдельный прогресс для слов: от входа секции в окно до её середины
  const { scrollYProgress: wordsProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.85"]
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [80, -140]);
  const transformTemplate = useMotionTemplate`perspective(400px) rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  // Appears much faster and earlier
  const opacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  // Cinematic un-blur effect
  const blurRaw = useTransform(smoothProgress, [0.1, 0.3], [12, 0]);
  const filterTemplate = useMotionTemplate`blur(${blurRaw}px)`;

  return (
    <section ref={sectionRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Top Gradient Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[180px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)' }}
      />

      {/* 3D Animated Text */}
      <motion.div
        className="relative z-20 max-w-5xl"
        style={{
          transform: transformTemplate,
          opacity: opacity,
          filter: filterTemplate,
        }}
      >
        <p className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] leading-[1.3] tracking-tight select-none px-6 sm:px-12 text-center text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.12)] [text-wrap:balance]">
          {WORDS.map((word, i) => {
            const start = i / WORDS.length;
            const end = start + 1.5 / WORDS.length;
            return (
              <span key={i}>
                <Word word={word} progress={wordsProgress} range={[start, end]} />
                {i < WORDS.length - 1 && ' '}
              </span>
            );
          })}
        </p>
      </motion.div>
    </section>
  );
}
