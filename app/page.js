'use client';

// --- 1. CORE IMPORTS ---
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

// --- 2. COMPONENT IMPORTS ---
// Динамическая загрузка тяжелой 3D-сцены (отключаем SSR)
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

// Существующие блоки
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

// НОВЫЕ блоки (Trust & Process)
import Process from '@/components/Process';
import Clients from '@/components/Clients';
import Team from '@/components/Team';

export default function Home() {
  const [isReady, setIsReady] = useState(false); // Флаг: Прелоадер закончил работу
  const [calcData, setCalcData] = useState(null); // Данные из калькулятора для футера
  
  // Хук для управления плавным скроллом
  const lenis = useLenis();

  // Refs для анимации Hero-секции
  const titleRef = useRef(null);
  const sloganRef = useRef(null);
  const locationRef = useRef(null);

  // --- 3. LOGIC: SCROLL LOCK ---
  // Блокируем скролл, пока сайт не готов
  useEffect(() => {
    if (!isReady) {
      if (lenis) lenis.stop(); // Останавливаем Lenis
      document.body.style.overflow = 'hidden'; // Блокируем нативный скролл
    } else {
      if (lenis) lenis.start(); // Запускаем Lenis
      document.body.style.overflow = 'auto'; // Разблокируем
    }
  }, [isReady, lenis]);

  // --- 4. LOGIC: HERO ANIMATION ---
  // Запускаем GSAP только когда прелоадер исчез
  useEffect(() => {
    if (!isReady) return;
    // Защита от краша, если рефы еще не привязались
    if (!titleRef.current || !sloganRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Появление заголовка снизу
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 } 
    );
    
    // Появление слогана сбоку
    tl.fromTo(sloganRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1");
    
    // Появление локации (если она есть в DOM)
    if (locationRef.current) {
        tl.fromTo(locationRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
    }

    return () => tl.kill(); // Очистка при размонтировании
  }, [isReady]);

  // --- 5. SEO DATA (JSON-LD) ---
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

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      
      {/* Вставка микроразметки */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ПРЕЛОАДЕР: Блокирует экран до полной загрузки */}
      <Preloader onComplete={() => setIsReady(true)} />

      {/* ОБЕРТКА КОНТЕНТА */}
      {/* opacity-0 скрывает верстку, пока сайт грузится (защита от мигания шрифтов/картинок) */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`}
      >
        
        {/* === 1. HERO SECTION (ATTENTION) === */}
        <main className="relative w-full h-screen bg-black overflow-hidden">
           
           {/* 3D Сцена (Грузится скрытно) */}
           <div className="absolute inset-0 z-10">
              <Scene start={isReady} /> 
           </div>
           
           {/* Градиент снизу для читаемости текста */}
           <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />

           {/* Контент Hero */}
           <div className="relative z-20 w-full h-full flex flex-col justify-end p-6 md:p-12 pointer-events-none text-white">
             
             {/* Главный Заголовок */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-difference">
                <div ref={titleRef} className="opacity-0 translate-y-24">
                   <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                       Art.Vision
                   </h1>
                </div>
             </div>
             
             {/* Нижняя панель */}
             <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 pb-4 md:pb-0">
               {/* Слоган */}
               <div ref={sloganRef} className="max-w-lg opacity-0 -translate-x-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:bg-transparent md:backdrop-blur-none md:border-none md:p-0">
                  <h2 className="text-xl md:text-2xl font-medium leading-tight mb-4">
                    Ваш сайт — это зеркало вашего бизнеса.<br/>
                    <span className="text-purple-400 font-bold">Мы создаем цифровое превосходство.</span>
                  </h2>
                  <div className="h-[1px] w-24 bg-white/50 mb-4"></div>
                  <p className="text-xs font-mono text-gray-300 uppercase tracking-widest leading-relaxed">
                    Внимание к деталям рождает доверие.<br/> Превращаем посетителей в клиентов.
                  </p>
               </div>
               
               {/* Локация */}
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

        {/* === 2. IMPACT (INTEREST: Numbers) === */}
        <Impact />
        
        {/* === 3. WORKS (DESIRE: Visuals) === */}
        <section id="works">
          <SelectedWorks />
        </section>

        {/* === 4. SERVICES (LOGIC: What we do) === */}
        <section id="services">
          <Services />
        </section>

        {/* === 5. TECH STACK (LOGIC: Justification) === */}
        <section id="tech">
          <TechStack />
        </section>

        {/* === 6. SECTORS (RELEVANCE) === */}
        <Sectors />
        
        {/* === 7. PROCESS (TRUST: No black box) === */}
        <Process />
        
        {/* === 8. CLIENTS (TRUST: Social Proof) === */}
        <Clients />
        
        {/* === 9. TEAM (TRUST: Humanize) === */}
        <Team />
        
        {/* === 10. CALCULATOR (ACTION: Engagement) === */}
        <section id="calculator">
          <SmartCalculator onUpdate={setCalcData} />
        </section>
        
        {/* === 11. MANIFESTO (EMOTION: Philosophy) === */}
        <Manifesto />
        
        {/* === 12. MAGNETIC CTA (TRIGGER) === */}
        <MagneticCTA />
        
        {/* === 13. FAQ (OBJECTIONS) === */}
        <section id="faq">
          <FAQ />
        </section>
        
        {/* === 14. FOOTER (FINAL ACTION) === */}
        <Footer calculatorData={calcData} />

      </div>

    </ReactLenis>
  );
}