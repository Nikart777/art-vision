'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

export default function HeroSection({ setEntranceComplete }) {
  const videoRef = useRef(null);
  const isSeeking = useRef(false);
  const targetTime = useRef(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // 800ms delay for entrance
    const timer = setTimeout(() => {
      setContentVisible(true);
      if (setEntranceComplete) setEntranceComplete(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [setEntranceComplete]);

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
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mt-[50px]">
        <h2 
          className="uppercase select-none opacity-10"
          style={{
            fontFamily: 'var(--font-anton), "Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ART.VISION
        </h2>
      </div>

      {/* Foreground Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      >
        <div className="flex-1" /> {/* Spacer */}
        
        {/* Bottom Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Единственный H1 страницы. Правый блок «Под / Ключ» — визуальное
                продолжение той же фразы, поэтому он скрыт от семантики,
                а его текст добавлен сюда для поисковика и скринридера. */}
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] uppercase">
              <ScrambleIn text="Сайты" delay={200} triggered={contentVisible} />
              <br />
              <ScrambleIn text="Для Бизнеса" delay={500} triggered={contentVisible} />
              <span className="sr-only"> под ключ</span>
            </h1>
            
            <motion.p 
              initial={{ y: 25, opacity: 0 }}
              animate={contentVisible ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.215, 0.610, 0.355, 1.000], delay: 0.2 }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Создаём конверсионные сайты, которые превращают посетителей в клиентов. Премиальная разработка на Next.js — запуск от 5 дней.
            </motion.p>
          </div>

          {/* Визуальное продолжение H1 (см. комментарий выше) */}
          <div aria-hidden="true" className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right uppercase">
            <ScrambleIn text="Под" delay={700} triggered={contentVisible} />
            <br />
            <ScrambleIn text="Ключ" delay={1000} triggered={contentVisible} />
          </div>
          
        </div>
      </motion.div>

    </section>
  );
}
