'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import ScrambleText from './ScrambleText';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

// Шапка — самый весомый сквозной блок ссылок. По регламенту (goal.md §6)
// он отдан коммерческим разделам: «Блог» и «О компании» остаются доступны
// из футера, так что свой вес они не теряют, но и не забирают его у услуг.
const navLinks = [
  { title: 'Услуги', href: '/services/' },
  { title: 'Решения', href: '/solutions/' },
  { title: 'Портфолио', href: '/cases/' },
  { title: 'Отзывы', href: '/reviews/' },
  { title: 'FAQ', href: '/faq/' },
];

export default function Navbar({ entranceComplete = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveredDownload, setIsHoveredDownload] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full h-20 z-[100] flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none"
      >
        {/* Left side: Logo */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/">
            <motion.div 
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md h-10 md:h-12 rounded-[12px] px-4 cursor-pointer border border-white/5"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              <SynapseXLogo className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="text-[14px] md:text-[16px] font-bold tracking-tight text-white uppercase font-sans">Art.Vision</span>
            </motion.div>
          </Link>
        </div>

        {/* Center: Desktop Links */}
        {!isMobile && (
          <div className="pointer-events-auto hidden lg:flex items-center gap-8 bg-white/5 backdrop-blur-md h-12 px-8 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.title)}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[14px] font-light text-white/70 hover:text-white transition-colors tracking-wide uppercase"
              >
                <ScrambleText text={link.title} isHovered={hoveredLink === link.title} />
              </Link>
            ))}
          </div>
        )}

        {/* Right side: Contact Button & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          <motion.button 
            onClick={() => scrollTo('#contact-form')}
            onMouseEnter={() => setIsHoveredDownload(true)}
            onMouseLeave={() => setIsHoveredDownload(false)}
            whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
            whileTap={{ scale: 0.97 }}
            className="h-10 md:h-12 px-5 md:px-6 bg-white rounded-full flex items-center justify-center gap-2 text-black transition-colors"
          >
            <span className="text-[12px] md:text-[14px] font-bold uppercase tracking-widest hidden sm:block">
              <ScrambleText text="Обсудить проект" isHovered={isHoveredDownload} />
            </span>
            <span className="text-[12px] font-bold uppercase tracking-widest sm:hidden">
              Заявка
            </span>
          </motion.button>

          {isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-10 flex items-center justify-center rounded-[12px] bg-white/10 backdrop-blur-md border border-white/5 text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-light text-white/80 hover:text-white uppercase tracking-widest transition-colors"
                >
                  {link.title}
                </Link>
              ))}
              <div className="w-12 h-px bg-white/20 my-4" />
              <button
                onClick={() => scrollTo('#contact-form')}
                className="text-lg font-bold text-white uppercase tracking-widest"
              >
                Связаться с нами
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
