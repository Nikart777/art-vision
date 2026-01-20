'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Palette, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    // ... simulate sending
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <footer className="border-t border-gray-200 dark:border-white/5 py-12 bg-background-light dark:bg-background-dark/50">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">Art.Vision</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xs">
              Премиальная разработка сайтов для малого и среднего бизнеса. Мы создаем инструменты для вашего роста.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Навигация</h4>
              <ul className="space-y-2">
                <li><Link href="/#services" className="text-sm font-semibold hover:text-primary transition-colors">Услуги</Link></li>
                <li><Link href="/cases/" className="text-sm font-semibold hover:text-primary transition-colors">Портфолио</Link></li>
                <li><Link href="/reviews/" className="text-sm font-semibold hover:text-primary transition-colors">Отзывы</Link></li>
                <li><Link href="/about/" className="text-sm font-semibold hover:text-primary transition-colors">О компании</Link></li>
                <li><Link href="/blog/" className="text-sm font-semibold hover:text-primary transition-colors">Блог</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Документы</h4>
              <ul className="space-y-2">
                <li><Link href="/policy/" className="text-sm font-semibold hover:text-primary transition-colors">Политика</Link></li>
                <li><Link href="/terms/" className="text-sm font-semibold hover:text-primary transition-colors">Оферта</Link></li>
              </ul>
            </div>
          </div>

          {/* Socials & Newsletter Placeholder */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <a href="https://t.me/artvision" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Palette className="w-5 h-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Wallet className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm font-medium text-gray-500">
              <span className="block font-bold text-gray-700 dark:text-gray-300">Москва, Тверская 12</span>
              <a href="mailto:project@art-vision.online" className="hover:text-primary transition-colors">project@art-vision.online</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100 dark:border-white/5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            © 2026 Art.Vision Digital Agency. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-gray-500 font-mono">ООО "АТИМ" ИНН 504226843290</span>
          </div>
        </div>
      </div>
    </footer>
  );
}