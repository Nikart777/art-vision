'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import MaskReveal from '../premium/MaskReveal';
import Magnetic from '../premium/Magnetic';

const EASE = [0.22, 1, 0.36, 1];

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function HeroSection({ setEntranceComplete }) {
  const videoRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Курсор в долях экрана (-0.5…0.5): по нему двигаются световое пятно
  // и водяной знак — лёгкий параллакс глубины
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.8 });
  const watermarkX = useTransform(smoothX, [-0.5, 0.5], [28, -28]);
  const watermarkY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);
  const glowBackground = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(255,240,250,0.14), transparent 60%)`;

  useEffect(() => {
    // Контент проявляется, когда шторка-заставка (.intro-curtain) уезжает
    // наполовину: она стартует на 0.75 с и длится 0.95 с
    const timer = setTimeout(() => {
      setContentVisible(true);
      if (setEntranceComplete) setEntranceComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setEntranceComplete]);

  useEffect(() => {
    const handlePointer = (e) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', handlePointer);
    return () => window.removeEventListener('pointermove', handlePointer);
  }, [pointerX, pointerY]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We pause initially
    video.pause();

    const state = {
      isSeeking: false,
      targetTime: 0,
      smoothedTime: 0,
    };

    const handleSeeked = () => {
      state.isSeeking = false;
    };

    video.addEventListener('seeked', handleSeeked);
    
    const handleMouseMove = (e) => {
      if (!video.duration) return;
      // sensitivity factor 0.8
      const xProgress = e.clientX / window.innerWidth;
      state.targetTime = Math.min(Math.max(xProgress * video.duration * 0.8, 0), video.duration);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const tick = () => {
      if (video.duration) {
        // Lerp towards the target time for smooth trailing effect
        state.smoothedTime += (state.targetTime - state.smoothedTime) * 0.08;
        
        // Only seek if we're not currently seeking, and the difference is noticeable
        if (!state.isSeeking && Math.abs(video.currentTime - state.smoothedTime) > 0.02) {
          state.isSeeking = true;
          video.currentTime = state.smoothedTime;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col bg-black overflow-hidden">
      {/* Шторка-заставка: анимирована чистым CSS (app/globals.css) */}
      <div className="intro-curtain" aria-hidden="true">
        <div className="flex flex-col items-center">
          <span className="intro-curtain__word text-white text-[13px] sm:text-[15px] tracking-[0.5em] uppercase pl-[0.5em]">
            <span>Art.Vision</span>
          </span>
          <div className="intro-curtain__line" />
        </div>
      </div>

      {/* Background Video */}
      <motion.video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: contentVisible ? 1 : 1.12 }}
        transition={{ duration: 2.4, ease: EASE }}
        muted
        playsInline
      />

      {/* Световое пятно за курсором */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-screen hidden md:block"
        style={{ background: glowBackground }}
      />

      {/* Виньетка и затемнение снизу — под текстом первого экрана */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 45%, rgba(0,0,0,0.65) 100%), linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)',
        }}
      />

      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Large Watermark Text */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mt-[50px]"
        style={{ x: watermarkX, y: watermarkY }}
      >
        <motion.span
          className="block uppercase select-none"
          initial={{ opacity: 0, letterSpacing: '0.12em' }}
          animate={contentVisible ? { opacity: 0.1, letterSpacing: '-0.01em' } : { opacity: 0, letterSpacing: '0.12em' }}
          transition={{ duration: 2.2, ease: EASE }}
          style={{
            fontFamily: 'var(--font-anton), "Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            lineHeight: 1,
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ART.VISION
        </motion.span>
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex-1" /> {/* Spacer */}

        {/* Bottom Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={contentVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 1, ease: EASE }}
              className="flex items-center gap-3 text-white/60 text-[11px] sm:text-[12px] tracking-[0.3em] uppercase [text-shadow:0_1px_14px_rgba(0,0,0,0.9)]"
            >
              <span className="h-px w-8 bg-white/40" />
              Студия разработки цифровых продуктов
            </motion.p>

            {/* Единственный H1 страницы. Правый блок «для бизнеса» — визуальное
                продолжение той же фразы, поэтому он скрыт от семантики,
                а полный текст добавлен сюда для поисковика и скринридера. */}
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] uppercase">
              <MaskReveal
                as="span"
                className="block"
                play={contentVisible}
                lines={[<span key="a" className="accent-serif">Цифровые</span>, 'продукты']}
              />
              <span className="sr-only"> для бизнеса и организаций: платформы, сервисы и сайты под ключ</span>
            </h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={contentVisible ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              className="max-w-sm xl:max-w-md text-[13px] sm:text-[15px] text-white/65 leading-relaxed [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]"
            >
              Проектируем и запускаем платформы, SaaS-сервисы, e-commerce и сайты для компаний и организаций — от стратегии и дизайна до разработки, роста и GEO-сопровождения.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={contentVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1"
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId('contact-form')}
                  className="btn-shine h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-white text-black text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Обсудить проект
                </button>
              </Magnetic>
              <button
                type="button"
                onClick={() => scrollToId('works')}
                className="group flex items-center gap-2 text-white/70 hover:text-white text-[11px] sm:text-[12px] uppercase tracking-[0.2em] transition-colors"
              >
                <span className="relative">
                  Смотреть проекты
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-white/60 origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Индикатор прокрутки — только там, где между колонками есть место */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: contentVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden xl:flex flex-col items-center gap-3 self-end mb-2"
          >
            <span className="text-white/40 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
            <span className="scroll-cue" />
          </motion.div>

          {/* Визуальное продолжение H1 (см. комментарий выше). Кегль чуть меньше,
              чем у левой колонки: «бизнеса» длиннее прежнего «ключ» и на ширине
              планшета иначе не помещается рядом с заголовком */}
          <div aria-hidden="true" className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,7.5vw,100px)] text-left md:text-right uppercase">
            <MaskReveal
              as="span"
              className="block"
              play={contentVisible}
              delay={0.25}
              lines={['для', 'бизнеса']}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
