'use client';

import Scene from '@/components/Scene';
import Manifesto from '@/components/Manifesto';
import SelectedWorks from '@/components/SelectedWorks';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function Home() {
  // Рефы для анимации появления элементов
  const titleRef = useRef(null);
  const sloganRef = useRef(null);
  const statusRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    // Timeline для синхронизации анимаций входа
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Заголовок выезжает снизу
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
      );
    }

    // 2. Слоган появляется слева
    if (sloganRef.current) {
      tl.fromTo(sloganRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=1" // Запускаем за 1 сек до конца предыдущей анимации
      );
    }

    // 3. Статус и локация (фейд ин)
    if (statusRef.current && locationRef.current) {
      tl.fromTo([statusRef.current, locationRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      
      {/* --- HERO SECTION --- */}
      <main className="relative w-full h-screen bg-black overflow-hidden">
        
        {/* 1. 3D СЛОЙ (ФОН) */}
        <div className="absolute inset-0 z-10">
           <Scene />
        </div>

        {/* 2. UI СЛОЙ (ИНТЕРФЕЙС) */}
        {/* pointer-events-none чтобы мышка проходила сквозь текст к 3D шару */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none text-white mix-blend-difference">
          
          {/* --- TOP BAR --- */}
          <div className="flex justify-between items-start">
            {/* Logo area */}
            <div className="flex flex-col">
               <span className="font-bold tracking-tighter text-xl">ART.VISION</span>
               <span className="text-[10px] uppercase tracking-widest opacity-60">Digital Agency</span>
            </div>

            {/* Status (Top Right) */}
            <div ref={statusRef} className="hidden md:flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider">Available for new projects</span>
            </div>
          </div>

          {/* --- CENTER TITLE --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
             <div ref={titleRef}>
                <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    Art.Vision
                </h1>
             </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            
            {/* Slogan (Bottom Left) */}
            <div ref={sloganRef} className="max-w-md">
               <h2 className="text-xl md:text-2xl font-medium leading-tight mb-4">
                 Превращаем код в цифровую магию.
                 <br/>
                 <span className="text-purple-400">Ваш бренд заслуживает быть искусством.</span>
               </h2>
               <div className="h-[1px] w-24 bg-white/50 mb-4"></div>
               <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                 Web Development • UI/UX • 3D Motion
               </p>
            </div>

            {/* Location / Scroll (Bottom Right) */}
            <div ref={locationRef} className="text-right font-mono text-xs text-gray-400 space-y-2">
              <p className="uppercase tracking-widest">Москва, Россия [HQ]</p>
              <p>55.7558° N, 37.6173° E</p>
              <div className="mt-4 flex justify-end items-center gap-2 text-white">
                 <span>SCROLL TO EXPLORE</span>
                 <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* --- ОСТАЛЬНЫЕ БЛОКИ --- */}
      <Manifesto />
      <SelectedWorks />
      <Services />
      <TechStack />
      <Footer />

    </ReactLenis>
  );
}