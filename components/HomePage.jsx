'use client';

import { useState } from 'react';
import Navbar from './synapsex/Navbar';
import HeroSection from './synapsex/HeroSection';
import CinematicTextSection from './synapsex/CinematicTextSection';
import MetricsSection from './synapsex/MetricsSection';
import TechnologySection from './synapsex/TechnologySection';
import ArchitectureSection from './synapsex/ArchitectureSection';
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
    <div className="relative flex min-h-screen w-full flex-col bg-black selection:bg-white/30 selection:text-white font-sans text-white">
      <Navbar entranceComplete={entranceComplete} />
      
      <main className="flex-1 relative z-10 w-full">
        <HeroSection setEntranceComplete={setEntranceComplete} />
        <CinematicTextSection />
        <SelectedWorks />
        <Sectors />
        <MetricsSection />
        <TechnologySection />
        <ArchitectureSection />
        <SmartCalculator onUpdate={setCalcData} />
        <Reviews />
        <FAQ />
        <ContactForm initialData={calcData} />
      </main>

      <Footer />
    </div>
  );
}
