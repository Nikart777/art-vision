'use client';

// --- 1. CORE IMPORTS ---
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { AnimatePresence } from 'framer-motion';

// --- 2. COMPONENT IMPORTS ---
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => null
});

import Manifesto from '@/components/Manifesto';
import SelectedWorks from '@/components/SelectedWorks';
import Services from '@/components/Services';
import Impact from '@/components/Impact';   
import Sectors from '@/components/Sectors'; 
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';
import MagneticCTA from '@/components/MagneticCTA';
import Preloader from '@/components/Preloader';
import FAQ from '@/components/FAQ';
import SmartCalculator from '@/components/SmartCalculator';
import Team from '@/components/Team';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [calcData, setCalcData] = useState(null);
  
  const lenis = useLenis();
  const titleRef = useRef(null); 
  const bottomBarRef = useRef(null); 

  // --- 3. SCROLL LOCK ---
  useEffect(() => {
    if (!isReady) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = 'auto';
    }
  }, [isReady, lenis]);

  useEffect(() => {
    if (!isReady || showScene) return;

    const scheduler =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (fn) => setTimeout(fn, 300);

    const cancelScheduler =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? window.cancelIdleCallback
        : clearTimeout;

    const handle = scheduler(() => setShowScene(true));

    return () => cancelScheduler(handle);
  }, [isReady, showScene]);

  // --- 4. HERO ANIMATION (GSAP) ---
  useEffect(() => {
    if (!isReady) return;
    if (!titleRef.current || !bottomBarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Анимируем появление текста
    tl.fromTo(titleRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.2 } 
    );
    
    // Анимируем нижнюю панель
    tl.fromTo(bottomBarRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.5"
    );

    return () => tl.kill(); 
  }, [isReady]);

  // --- 5. SEO DATA ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Art.Vision',
    image: 'https://art-vision.online/opengraph-image.jpg',
    // В description максимально плотно используем ключи
    description: 'Профессиональная разработка сайтов, интернет-магазинов и веб-сервисов в Москве. Стеке технологий: Next.js, React, WebGL. Премиум качество по рыночной цене.',
    url: 'https://art-vision.online/',
    priceRange: '$$', 
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressCountry: 'RU'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги веб-студии',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Разработка корпоративных сайтов' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Создание интернет-магазинов (E-commerce)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Разработка веб-сервисов и SPA' } }
      ]
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* === ПРЕЛОАДЕР === */}
      <AnimatePresence mode='wait'>
        {!isReady && (
          <Preloader key="preloader" onComplete={() => setIsReady(true)} />
        )}
      </AnimatePresence>

      {/* === КОНТЕНТ === */}
      <div className={`transition-opacity duration-700 ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* === HERO SECTION === */}
        <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
           
           {/* 3D Фон */}
           {showScene && (
             <div className="absolute inset-0 z-10 opacity-60">
                <Scene start={isReady} />
             </div>
           )}
           
           {/* Градиенты */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none" />

           {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
           <div 
             ref={titleRef} 
             className="relative z-20 max-w-6xl mx-auto px-4 text-center flex flex-col items-center gap-6 md:gap-8 mt-[-5vh]"
           >
              
              {/* БЕЙДЖ: Высокочастотный LSI запрос */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/50 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-200">
                  Разработка веб-сайтов и ПО
                </span>
              </div>

              {/* ЗАГОЛОВОК H1: Главный ключ + УТП */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white mix-blend-screen">
                Разработка Сайтов <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400 animate-gradient-x">
                  Премиум Класса
                </span>
              </h1>

              {/* ПОДЗАГОЛОВОК: Стек + Ключи (Магазины/Сервисы) + Цена */}
              <p className="max-w-4xl text-sm md:text-lg text-gray-300 font-mono leading-relaxed md:leading-relaxed">
                Применяем <strong>новейшие технологии</strong> (Next.js, WebGL, AI) для создания 
                <span className="text-white"> сайтов, интернет-магазинов</span> и 
                <span className="text-white"> сложных веб-сервисов</span>. 
                Гарантируем вам <strong>лучшую цену</strong> на рынке за продукт высокого уровня.
              </p>

              {/* КНОПКИ */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <button 
                  onClick={() => scrollTo('works')}
                  className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
                >
                  Смотреть Портфолио
                </button>
                <button 
                  onClick={() => scrollTo('calculator')}
                  className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
                >
                  Рассчитать Бюджет
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

           </div>

           {/* НИЖНЯЯ ПАНЕЛЬ: Техническое SEO и Гео */}
           <div 
             ref={bottomBarRef}
             className="absolute bottom-8 w-full max-w-7xl px-6 flex justify-between items-end z-20 mix-blend-difference text-white/60 font-mono text-[10px] uppercase tracking-widest"
           >
             {/* Слева */}
             <div className="hidden md:block text-left space-y-1">
               <p className="text-white font-bold">Art.Vision Digital Agency</p>
               <p>Создание сайтов под ключ</p>
             </div>

             {/* Центр */}
             <div className="flex items-center gap-4 mx-auto md:mx-0 opacity-80">
                <span className="animate-bounce">Листайте вниз</span>
                <div className="h-8 w-[1px] bg-white/30"></div>
             </div>

             {/* Справа: Стек и Якорь цены */}
             <div className="hidden md:block text-right space-y-1">
               <p>Москва / Санкт-Петербург / РФ</p>
               <p className="text-purple-300 font-bold">Stack: Next.js 14, React, AI, Cloud</p> 
             </div>
           </div>

        </main>

        {/* Остальные блоки */}
        <Impact />
        <section id="works"><SelectedWorks /></section>
        <section id="services"><Services /></section>
        <section id="tech"><TechStack /></section>
        <Sectors />
        <Team />
        <section id="calculator"><SmartCalculator onUpdate={setCalcData} /></section>
        <Manifesto />
        <MagneticCTA />
        <section id="faq"><FAQ /></section>
        <Footer calculatorData={calcData} />

      </div>
    </ReactLenis>
  );
}