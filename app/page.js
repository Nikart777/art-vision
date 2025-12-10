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
        
        <div className="absolute inset-0 z-10">
           <Scene start={isReady} />
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-end p-8 md:p-12 pointer-events-none text-white mix-blend-difference">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
             <div ref={titleRef} className="opacity-0 translate-y-24">
                <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    Art.Vision
                </h1>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 md:pb-0">
            <div ref={sloganRef} className="max-w-md opacity-0 -translate-x-12">
               <h2 className="text-xl md:text-2xl font-medium leading-tight mb-4">
                 Ваш сайт — это зеркало качества ваших услуг.
                 <br/>
                 <span className="text-purple-400 font-bold">
                   Хватит плодить посредственность.
                 </span>
               </h2>
               <div className="h-[1px] w-24 bg-white/50 mb-4"></div>
               <p className="text-xs font-mono text-gray-400 uppercase tracking-widest leading-relaxed">
                 Плохой дизайн убивает доверие.<br/>
                 Мы создаем репутацию.
               </p>
            </div>

            <div ref={locationRef} className="text-right font-mono text-xs text-gray-400 space-y-2 opacity-0">
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
      
      {/* Секция Проекты */}
      <section id="works">
        <SelectedWorks />
      </section>

      <Sectors />
      
      <MagneticCTA />
      
      {/* Секция Услуги */}
      <section id="services">
        <Services />
      </section>

      {/* Секция Технологии (Стек) */}
      <section id="tech">
        <TechStack />
      </section>
      
      {/* Секция Калькулятор */}
      <section id="calculator">
        <SmartCalculator onUpdate={setCalcData} />
      </section>

      {/* Секция Вопросы */}
      <section id="faq">
        <FAQ />
      </section>
      
      <Footer calculatorData={calcData} />

    </ReactLenis>
  );
}