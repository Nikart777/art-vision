'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { title: 'Услуги', href: '/#services' },
  { title: 'Портфолио', href: '/cases/' },
  { title: 'Отзывы', href: '/reviews/' },
  { title: 'О компании', href: '/about/' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToContact = () => {
    setIsOpen(false);
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-form';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVars = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <>
      <header className={`fixed top-0 z-50 w-full border-b border-solid transition-all duration-300 px-6 md:px-10 lg:px-40 py-4 ${scrolled
        ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-gray-200/20 dark:border-white/10 shadow-sm'
        : 'bg-transparent border-transparent'
        }`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Art.Vision</h2>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <a className="hidden sm:block text-sm font-bold hover:text-primary transition-colors" href="tel:+79990000000">
              +7 (999) 000-00-00
            </a>
            <button
              onClick={scrollToContact}
              className="flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Связаться
            </button>

            {/* MOBILE BURGER */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-x-0 top-[72px] z-[49] lg:hidden bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 p-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold hover:text-primary transition-colors py-2 border-b border-gray-100 dark:border-white/5"
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <a className="text-lg font-bold text-primary" href="tel:+79990000000">+7 (999) 000-00-00</a>
                <button
                  onClick={scrollToContact}
                  className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20"
                >
                  Оставить заявку
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}