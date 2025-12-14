'use client';

import { useState } from 'react';

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
import Team from '@/components/Team';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Art.Vision',
  image: 'https://art-vision.online/opengraph-image.jpg',
  description:
    'Профессиональная разработка сайтов, интернет-магазинов и веб-сервисов в Москве. Стеке технологий: Next.js, React, WebGL.\nПремиум качество по рыночной цене.',
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

export default function Home() {
  const [calcData, setCalcData] = useState(null);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center flex flex-col items-center gap-6 md:gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md cursor-default">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-200">
              Разработка веб-сайтов и ПО
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            Разработка Сайтов <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400 animate-gradient-x">
              Премиум Класса
            </span>
          </h1>

          <p className="max-w-4xl text-sm md:text-lg text-gray-300 font-mono leading-relaxed md:leading-relaxed">
            Применяем <strong>новейшие технологии</strong> (Next.js, WebGL, AI) для создания
            <span className="text-white"> сайтов, интернет-магазинов</span> и
            <span className="text-white"> сложных веб-сервисов</span>. Гарантируем вам <strong>лучшую цену</strong>
            на рынке за продукт высокого уровня.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a
              href="#works"
              className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              Смотреть Портфолио
            </a>
            <a
              href="#calculator"
              className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Рассчитать Бюджет
              <span className="transition-transform">→</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 w-full max-w-7xl px-6 flex justify-between items-end z-10 mix-blend-difference text-white/60 font-mono text-[10px] uppercase tracking-widest">
          <div className="hidden md:block text-left space-y-1">
            <p className="text-white font-bold">Art.Vision Digital Agency</p>
            <p>Создание сайтов под ключ</p>
          </div>

          <div className="flex items-center gap-4 mx-auto md:mx-0 opacity-80">
            <span>Листайте вниз</span>
            <div className="h-8 w-[1px] bg-white/30"></div>
          </div>

          <div className="hidden md:block text-right space-y-1">
            <p>Москва / Санкт-Петербург / РФ</p>
            <p className="text-purple-300 font-bold">Stack: Next.js 14, React, AI, Cloud</p>
          </div>
        </div>
      </main>

      <Impact />
      <section id="works">
        <SelectedWorks />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="tech">
        <TechStack />
      </section>
      <Sectors />
      <Team />
      <section id="calculator">
        <SmartCalculator onUpdate={setCalcData} />
      </section>
      <Manifesto />
      <MagneticCTA />
      <section id="faq">
        <FAQ />
      </section>
      <Footer calculatorData={calcData} />
    </>
  );
}
