'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bolt,
  Verified,
  Star,
} from 'lucide-react';

import SelectedWorks from '@/components/SelectedWorks';
import Services from '@/components/Services';
import Impact from '@/components/Impact';
import Sectors from '@/components/Sectors';
import SmartCalculator from '@/components/SmartCalculator';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import AboutSection from '@/components/AboutSection';
import Reviews from '@/components/Reviews';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const [calcData, setCalcData] = useState(null);

  const handleCalcUpdate = useCallback((data) => {
    setCalcData(data);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-in", {
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-primary/30 selection:text-white">

      <main ref={heroRef} className="flex-1 pt-32 pb-20 relative z-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">

          {/* Hero Section Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center mb-24">

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex flex-wrap gap-2 animate-fade-in">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary">
                  <Bolt className="w-[18px] h-[18px]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Запуск за 5 дней</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/5 px-4 py-1.5">
                  <Verified className="w-[18px] h-[18px] text-gray-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Гарантия результата</span>
                </div>
              </div>

              <div className="space-y-4 animate-fade-in">
                <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                  Сайт для бизнеса <br />
                  <span className="text-gradient">под ключ</span>
                </h1>
                <p className="max-w-xl text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                  Создаем конверсионные инструменты, которые превращают посетителей в клиентов. Полный цикл разработки с фокусом на окупаемость вашего маркетинга.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in">
                <button
                  onClick={() => scrollTo('calculator')}
                  className="flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
                >
                  Рассчитать стоимость
                </button>
                <button
                  onClick={() => scrollTo('works')}
                  className="flex h-14 min-w-[200px] items-center justify-center rounded-xl border-2 border-primary/20 bg-transparent px-8 text-base font-bold hover:bg-primary/5 transition-all"
                >
                  Смотреть кейсы
                </button>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-gray-200 dark:border-white/10 animate-fade-in">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white dark:border-background-dark bg-gray-200 overflow-hidden"
                      style={{
                        backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')`,
                        backgroundSize: 'cover'
                      }}
                    ></div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white dark:border-background-dark bg-primary text-[10px] font-bold text-white">+120</div>
                </div>
                <div className="text-sm font-medium">
                  <span className="block font-bold">Доверяют лидеры рынка</span>
                  <span className="text-gray-500">Более 100 успешных проектов</span>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative animate-fade-in">
              <div className="relative z-10 w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-white/20">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full rounded-2xl bg-white dark:bg-[#1e252b] shadow-2xl overflow-hidden border border-gray-200 dark:border-white/5 transform lg:rotate-[-4deg] lg:translate-x-4">
                    {/* Browser Top Bar */}
                    <div className="h-8 w-full bg-gray-100 dark:bg-white/5 flex items-center px-4 gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/50"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400/50"></div>
                    </div>
                    {/* Browser Content Mockup */}
                    <div className="p-6 space-y-4">
                      <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-primary/20 rounded-lg"></div>
                        <div className="h-24 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
                        <div className="h-24 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
                      </div>
                      <div className="h-32 bg-gray-50 dark:bg-white/5 rounded-lg border border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Verified className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="h-10 w-full bg-primary rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Glows */}
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px] z-0"></div>
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px] z-0"></div>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-32">
            {[
              { label: 'Проектов', val: '100+', sub: 'Успешно реализовано' },
              { label: 'Конверсия', val: '12%', sub: 'Средний показатель' },
              { label: 'Сроки', val: '5 дн', sub: 'От идеи до запуска' },
              { label: 'Оценка', val: '4.9', sub: 'Рейтинг в отзывах', icon: true },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-2xl bg-white dark:bg-white/5 p-8 border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-colors">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-center gap-1">
                  <p className="text-4xl font-black text-primary">{stat.val}</p>
                  {stat.icon && <Star className="w-6 h-6 text-primary fill-primary" />}
                </div>
                <p className="text-xs text-gray-400 font-medium">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Existing Sections restyled by Global CSS */}
          <Sectors />
          <AboutSection />
          <Impact />
          <section id="services"><Services /></section>
          <Reviews />
          <section id="faq"><FAQ /></section>
          <section id="calculator"><SmartCalculator onUpdate={handleCalcUpdate} /></section>
          <section id="works"><SelectedWorks /></section>
          <Process />
          <section id="faq"><FAQ /></section>
          <ContactForm initialData={calcData} />

        </div>
      </main>
    </div>
  );
}