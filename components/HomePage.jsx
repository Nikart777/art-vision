'use client';

import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import Navbar from './synapsex/Navbar';
import HeroSection from './synapsex/HeroSection';
import CinematicTextSection from './synapsex/CinematicTextSection';
import MetricsSection from './synapsex/MetricsSection';
import TechnologySection from './synapsex/TechnologySection';
import ArchitectureSection from './synapsex/ArchitectureSection';
import Marquee from './premium/Marquee';
import GeoSection from './GeoSection';
import SelectedWorks from './SelectedWorks';
import Sectors from './Sectors';
import SmartCalculator from './SmartCalculator';
import Reviews from './Reviews';
import FAQ from './FAQ';
import ContactForm from './ContactForm';
import Footer from './synapsex/Footer';

export default function HomePage() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [calcData, setCalcData] = useState(null);

  return (
    // Инерционный скролл (Lenis) даёт «тяжёлую», кинематографичную прокрутку
    // колесом; на тач-устройствах остаётся нативная. reducedMotion="user" —
    // анимации framer-motion отключаются у тех, кто попросил об этом в системе.
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
        <div className="relative flex min-h-screen w-full flex-col bg-black selection:bg-white/30 selection:text-white font-sans text-white">
          <Navbar entranceComplete={entranceComplete} />

          <main className="flex-1 relative z-10 w-full">
            <HeroSection setEntranceComplete={setEntranceComplete} />
            <CinematicTextSection />
            <Marquee />
            <SelectedWorks />
            <Sectors />
            <MetricsSection />
            <TechnologySection />
            <GeoSection />
            <ArchitectureSection />
            <SmartCalculator onUpdate={setCalcData} />
            <Reviews />
            <FAQ />
            <ContactForm initialData={calcData} />
          </main>

          <Footer />

          {/* Плёночное зерно поверх всей страницы (app/globals.css) */}
          <div aria-hidden="true" className="film-grain z-[95]" />
        </div>
      </MotionConfig>
    </ReactLenis>
  );
}
