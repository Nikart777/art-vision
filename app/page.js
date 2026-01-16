'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Zap, LayoutTemplate, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import Manifesto from '@/components/Manifesto';
import SelectedWorks from '@/components/SelectedWorks';
import Services from '@/components/Services';
import Impact from '@/components/Impact';
import Sectors from '@/components/Sectors';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';
import MagneticCTA from '@/components/MagneticCTA';
import FAQ from '@/components/FAQ';
import SmartCalculator from '@/components/SmartCalculator';
import Process from '@/components/Process';
import Clients from '@/components/Clients';
import Team from '@/components/Team';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text-line", {
        y: 50,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".hero-stat-card", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.6
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-green-500/30 selection:text-white">

      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* === HERO SECTION === */}
      <main ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center px-4 md:px-8 pt-20 overflow-hidden">

        {/* Background Gradients (Subtle Green for Money/Growth) */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* LEFT: OFFER FOR SMB */}
          <div ref={textRef} className="lg:col-span-8 flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-8 ml-2">
              <div className="px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                • Принимаем заказы
              </div>
            </div>

            <h1 className="font-black text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-tighter text-white mb-8">
              <div className="overflow-hidden"><span className="hero-text-line block">САЙТ ДЛЯ БИЗНЕСА</span></div>
              <div className="overflow-hidden"><span className="hero-text-line block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">ЗА 5 ДНЕЙ</span></div>
              <div className="overflow-hidden"><span className="hero-text-line block text-gray-500">ПОД КЛЮЧ</span></div>
            </h1>

            <p className="hero-text-line font-mono text-gray-400 text-sm md:text-lg max-w-xl leading-relaxed ml-2 mb-8">
              Нужны клиенты, а не просто картинка? Делаем сайты, которые продают.
              Идеально для <span className="text-white border-b border-white/20">строителей</span>,
              <span className="text-white border-b border-white/20"> автосервисов</span> и
              <span className="text-white border-b border-white/20"> сферы услуг</span>.
              Запустим рекламу и настроим заявки в Telegram.
            </p>

            <div className="hero-text-line flex flex-wrap gap-4 ml-2">
              <button
                onClick={() => scrollTo('calculator')}
                className="group flex items-center gap-3 px-8 py-5 bg-green-500 text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
              >
                <span>Узнать Цену</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('contact-form')}
                className="group flex items-center gap-3 px-8 py-5 border border-white/10 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
              >
                <span>Обсудить задачу</span>
                <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* RIGHT: TRUST STATS (SMB FOCUSED) */}
          <div className="lg:col-span-4 flex flex-col gap-4 mt-8 lg:mt-0">

            <div className="hero-stat-card bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-green-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-lg font-bold text-white uppercase">Гарантия результата</span>
              </div>
              <p className="text-xs text-gray-500 font-mono">Прописываем сроки и стоимость в договоре. Никаких доплат "по ходу дела".</p>
            </div>

            <div className="hero-stat-card bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-green-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-2">
                <LayoutTemplate className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-bold text-white uppercase">Уже всё включено</span>
              </div>
              <p className="text-xs text-gray-500 font-mono">Мобильная версия, SEO-настройки, админка и хостинг. Вам не нужно разбираться в коде.</p>
            </div>

            <div className="hero-stat-card bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-green-500/30 transition-colors group">
              <div className="flex items-center gap-4 mb-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-bold text-white uppercase">Быстрый старт</span>
              </div>
              <p className="text-xs text-gray-500 font-mono">Первый поток заявок возможен уже через неделю после старта работ.</p>
            </div>

          </div>
        </div>
      </main>

      {/* === SECTIONS (SMB ORDER) === */}
      <Sectors />
      <Impact />
      <section id="services"><Services /></section>
      <section id="calculator"><SmartCalculator /></section>
      <section id="works"><SelectedWorks /></section>
      <Process />
      <section id="faq"><FAQ /></section>
      <Footer />

    </div>
  );
}