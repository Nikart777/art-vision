'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Новые понятные названия разделов
const navLinks = [
  { title: 'Услуги', href: '#services' },
  { title: 'Проекты', href: '#works' },
  { title: 'Технологии', href: '#tech' }, // Было "Стек"
  { title: 'Вопросы', href: '#faq' },     // Было "FAQ"
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Функция скролла к калькулятору
  const scrollToCalculator = () => {
    const calcElement = document.getElementById('calculator');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1, 
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } 
    },
    exit: { 
      scaleY: 0, 
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const mobileLinkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 } }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-black/50 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 flex flex-col group">
            <span className="font-black tracking-tighter text-xl text-white mix-blend-difference">
              ART.VISION
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-purple-500 transition-colors">
              Digital Agency
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.title} 
                href={link.href}
                className="text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-full" />
              </Link>
            ))}
            
            {/* Кнопка ведет на калькулятор */}
            <button 
              onClick={scrollToCalculator}
              className="px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Рассчитать проект
            </button>
          </nav>

          {/* MOBILE BURGER */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-8 h-[2px] bg-white block origin-center transition-colors group-hover:bg-purple-500"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[2px] bg-white block transition-colors group-hover:bg-purple-500"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-4 h-[2px] bg-white block origin-center transition-all group-hover:w-8 group-hover:bg-purple-500"
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black z-40 origin-top flex flex-col justify-center px-8 md:hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            
            <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <div key={link.title} className="overflow-hidden">
                  <motion.div variants={mobileLinkVars}>
                    <Link 
                      href={link.href} 
                      onClick={toggleMenu}
                      className="text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 hover:to-purple-500 transition-all"
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="overflow-hidden mt-8">
                <motion.div variants={mobileLinkVars}>
                  <button 
                    onClick={() => { toggleMenu(); scrollToCalculator(); }}
                    className="text-lg font-mono text-purple-500 border-b border-purple-500 pb-1"
                  >
                    Рассчитать проект →
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <div className="absolute bottom-10 left-8 text-xs font-mono text-gray-500 uppercase">
              <p>Москва, Тверская 12</p>
              <p>project@art-vision.online</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}