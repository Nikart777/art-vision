'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Zap, CheckCircle2 } from 'lucide-react';

export default function HeroPremium({ onPrimaryClick, onSecondaryClick }) {
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);
  const animationFrameRef = useRef();
  const opacityRef = useRef(0);

  const animateOpacity = (target, duration, callback) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const startOpacity = opacityRef.current;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newOpacity = startOpacity + (target - startOpacity) * progress;
      opacityRef.current = newOpacity;
      if (videoRef.current) {
        videoRef.current.style.opacity = newOpacity.toString();
      }
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    opacityRef.current = 0;

    const handleLoadedData = () => {
      animateOpacity(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video) return;
      const timeRemaining = video.duration - video.currentTime;
      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(0, 500);
      }
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      opacityRef.current = 0;
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
        fadingOutRef.current = false;
        animateOpacity(1, 500);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
      />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-32 text-center -translate-y-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Премиальная веб-разработка
          </span>
        </motion.div>

        <h1 
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 font-extrabold tracking-tight leading-[0.95]"
        >
          Сайты для бизнеса <br/> под ключ
        </h1>
        
        <div className="max-w-3xl w-full space-y-8 flex flex-col items-center">
          <p className="text-white/80 text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed px-4 text-center">
            Создаём конверсионные сайты, которые превращают посетителей в клиентов. Премиальная разработка на Next.js — запуск за 5 дней.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onPrimaryClick}
              className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-4 hover:bg-white/10 transition-colors group"
            >
              <span className="text-white text-base font-medium">Рассчитать стоимость</span>
              <div className="bg-white rounded-full p-3 text-black transition-transform group-hover:scale-105 flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
            <button 
              onClick={onSecondaryClick}
              className="liquid-glass rounded-full px-8 py-3 text-white text-base font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <Users className="w-5 h-5" />
              Смотреть кейсы
            </button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-4 text-white/80">
             <div className="liquid-glass rounded-full px-6 py-2 flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.9 из 5.0</span>
             </div>
             <div className="liquid-glass rounded-full px-6 py-2 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00d4ff]" />
                <span>100+ проектов</span>
             </div>
             <div className="liquid-glass rounded-full px-6 py-2 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-[#00d4ff]" />
                <span>Запуск 5 дней</span>
             </div>
          </div>
        </div>
      </main>
    </section>
  );
}
