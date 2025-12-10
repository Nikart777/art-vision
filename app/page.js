'use client';

import Scene from '@/components/Scene';
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
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [calcData, setCalcData] = useState(null);

  const titleRef = useRef(null);
  const sloganRef = useRef(null);
  const locationRef = useRef(null);

  // SEO SCHEMA
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Art.Vision',
    image: 'https://artvision.pro/og-image.jpg',
    description: 'Агентство разработки цифровых экосистем. Мы делаем сайты, которые продают.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Тверская ул.',
      addressLocality: 'Москва',
      addressCountry: 'RU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.7558,
      longitude: 37.6173
    },
    url: 'https://artvision.pro',
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00'
      }
    ]
  };

  useEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5 } 
      );
    }
    if (sloganRef.current) {
      tl.fromTo(sloganRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1");
    }
    if (locationRef.current) {
      tl.fromTo(locationRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    }
  }, [isReady]);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Preloader onComplete={() => setIsReady(true)} />

      {/* --- HERO SECTION --- */}
      <main className="relative w-full h-screen bg-black overflow-hidden">
        
        {/* 3D SCENE */}
        <div className="absolute inset-0 z-10">
           <Scene start={isReady} />
        </div>

        {/* FIX: Затемнение низа экрана градиентом. 
           Это визуально "приглушает" пузырь в нижней части, чтобы текст читался лучше, 
           даже если не сработает блюр.
        */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end p-6 md:p-12 pointer-events-none text-white">
          
          {/* CENTER TITLE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-difference">
             <div ref={titleRef} className="opacity-0 translate-y-24">
                <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    Art.Vision
                </h1>
             </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 pb-4 md:pb-0">
            
            {/* СЛОГАН (Обновленный текст + Подложка) 
               Добавлен bg-black/40 и backdrop-blur, чтобы отделить текст от фона (пузыря).
            */}
            <div 
              ref={sloganRef} 
              className="max-w-lg opacity-0 -translate-x-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:bg-transparent md:backdrop-blur-none md:border-none md:p-0"
            >
               <h2 className="text-xl md:text-2xl font-medium leading-tight mb-4">
                 Ваш сайт — это зеркало вашего бизнеса.
                 <br/>
                 <span className="text-purple-400 font-bold">
                   Мы создаем цифровое превосходство.
                 </span>
               </h2>
               
               <div className="h-[1px] w-24 bg-white/50 mb-4"></div>
               
               <p className="text-xs font-mono text-gray-300 uppercase tracking-widest leading-relaxed">
                 Внимание к деталям рождает доверие.<br/>
                 Превращаем посетителей в клиентов.
               </p>
            </div>

            {/* Location (Скрываем на очень маленьких экранах, если мешает, но оставим для эстетики) */}
            <div ref={locationRef} className="text-right font-mono text-xs text-gray-400 space-y-2 opacity-0 hidden sm:block mix-blend-difference">
              <p className="uppercase tracking-widest text-white">Moscow, Russia [HQ]</p>
              <p>55.7558° N, 37.6173° E</p>
              <div className="mt-4 flex justify-end items-center gap-2 text-white">
                 <span>SCROLL TO EXPLORE</span>
                 <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- BLOCKS with ID for Navigation --- */}
      
      <Manifesto />
      
      <Impact />
      
      <section id="works">
        <SelectedWorks />
      </section>

      <Sectors />
      
      <MagneticCTA />
      
      <section id="services">
        <Services />
      </section>

      <section id="tech">
        <TechStack />
      </section>
      
      <section id="calculator">
        <SmartCalculator onUpdate={setCalcData} />
      </section>

      <section id="faq">
        <FAQ />
      </section>
      
      <Footer calculatorData={calcData} />

    </ReactLenis>
  );
}