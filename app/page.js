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
import Process from '@/components/Process';
import Clients from '@/components/Clients';
import Team from '@/components/Team';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
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

  // --- 4. HERO ANIMATION (GSAP) ---
  useEffect(() => {
    if (!isReady) return;
    if (!titleRef.current || !bottomBarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.2 } 
    );
    
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
    image: 'https://artvision.pro/og-image.jpg',
    description: 'Разработка сайтов премиум-класса по доступным ценам. Next.js, WebGL и AI-технологии.',
    url: 'https://artvision.pro',
    priceRange: '$$', // Показываем, что цена средняя, не $$$$
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressCountry: 'RU'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги разработки',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Разработка сайтов' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Веб-дизайн UI/UX' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Создание интернет-магазинов' } }
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
           <div className="absolute inset-0 z-10 opacity-60">
              <Scene start={isReady} /> 
           </div>
           
           {/* Градиенты */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none" />

           {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
           <div 
             ref={titleRef} 
             className="relative z-20 max-w-6xl mx-auto px-4 text-center flex flex-col items-center gap-6 md:gap-8 mt-[-5vh]"
           >
              
              {/* БЕЙДЖ: Акцент на честность и адекватность */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/50 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-200">
                  Честные цены и прозрачные сметы
                </span>
              </div>

              {/* ЗАГОЛОВОК H1 */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white mix-blend-screen">
                Разработка Сайтов <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400 animate-gradient-x">
                  Премиум Класса
                </span>
              </h1>

              {/* ПОДЗАГОЛОВОК: Рационализация цены */}
              <p className="max-w-3xl text-sm md:text-lg text-gray-300 font-mono leading-relaxed md:leading-relaxed">
                Мы используем современные технологии (AI & Next.js), чтобы сократить время разработки в 2 раза. 
                Вы получаете <span className="text-white font-bold">визуально дорогой проект</span> по комфортной рыночной цене, без переплат за "воздух".
              </p>

              {/* КНОПКИ */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <button 
                  onClick={() => scrollTo('works')}
                  className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
                >
                  Смотреть Кейсы
                </button>
                <button 
                  onClick={() => scrollTo('calculator')}
                  className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
                >
                  Узнать Стоимость
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

           </div>

           {/* НИЖНЯЯ ПАНЕЛЬ */}
           <div 
             ref={bottomBarRef}
             className="absolute bottom-8 w-full max-w-7xl px-6 flex justify-between items-end z-20 mix-blend-difference text-white/60 font-mono text-[10px] uppercase tracking-widest"
           >
             {/* Слева: Бренд */}
             <div className="hidden md:block text-left space-y-1">
               <p className="text-white font-bold">Art.Vision Digital Agency</p>
               <p>Полный цикл производства</p>
             </div>

             {/* Центр: Навигация */}
             <div className="flex items-center gap-4 mx-auto md:mx-0 opacity-80">
                <span className="animate-bounce">Листайте вниз</span>
                <div className="h-8 w-[1px] bg-white/30"></div>
             </div>

             {/* Справа: Цена ОТ (Якорь) */}
             <div className="hidden md:block text-right space-y-1">
               <p>Москва / РФ / Мир</p>
               <p className="text-green-400 font-bold">Projects from 50k ₽</p> {/* Триггер доступности */}
             </div>
           </div>

        </main>

        {/* Остальные блоки */}
        <Impact />
        <section id="works"><SelectedWorks /></section>
        <section id="services"><Services /></section>
        <section id="tech"><TechStack /></section>
        <Sectors />
        <Process />
        <Clients />
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