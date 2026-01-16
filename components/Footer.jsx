'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Footer({ calculatorData }) {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
        e.target.reset();
      } else {
        setFormState('idle');
        alert('Ошибка при отправке. Попробуйте позже.');
      }
    } catch (error) {
      console.error(error);
      setFormState('idle');
      alert('Ошибка соединения.');
    }
  };

  return (
    <footer id="contact-form" className="relative w-full bg-[#050505] text-white pt-24 md:pt-32 pb-12 px-4 md:px-12 z-30 border-t border-white/10 overflow-hidden">

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="flex flex-col justify-between order-last md:order-first">

          <div className="hidden md:block">
            {/* РУСИФИКАЦИЯ ЗАГОЛОВКА */}
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Обсудим <br />
              <span className="text-purple-500">Проект?</span>
            </h2>
            <p className="font-mono text-gray-400 max-w-sm">
              Готовы превратить вашу идею в цифровую реальность? Заполните бриф, и мы выйдем на связь в течение 24 часов.
            </p>
          </div>

          <div className="mt-8 md:mt-16 space-y-8 font-mono text-sm text-gray-500 uppercase">

            <div className="flex flex-col">
              <span className="text-purple-500 text-xs mb-2">Email:</span>
              <a
                href="mailto:project@art-vision.online"
                className="text-white hover:text-purple-400 transition-colors text-xl md:text-2xl font-bold tracking-tight"
              >
                project@art-vision.online
              </a>
            </div>

            <div className="flex flex-col">
              <span className="text-purple-500 text-xs mb-2">Соцсети:</span>
              <div className="flex gap-6 text-white">
                <a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  Telegram
                </a>
              </div>
            </div>

            {/* SITEMAP COLUMN FOR SEO */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <span className="text-purple-500 text-xs uppercase mb-2 block">Услуги</span>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><Link href="/services/corporate-website" className="hover:text-white">Корпоративные сайты</Link></li>
                  <li><Link href="/services/ecommerce-development" className="hover:text-white">E-commerce</Link></li>
                  <li><Link href="/services/ux-ui-design" className="hover:text-white">UX/UI Дизайн</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-purple-500 text-xs uppercase mb-2 block">Решения</span>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><Link href="/solutions/medical" className="hover:text-white">Медицина</Link></li>
                  <li><Link href="/solutions/fintech" className="hover:text-white">Fintech</Link></li>
                  <li><Link href="/solutions/real-estate" className="hover:text-white">Недвижимость</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ФОРМА */}
        <div className="relative bg-white/5 p-6 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl order-first md:order-last">

          <div className="block md:hidden mb-8 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
              Начать <span className="text-purple-500">Проект</span>
            </h2>
            <p className="font-mono text-xs text-gray-400">
              Заполните форму ниже
            </p>
          </div>

          <AnimatePresence mode='wait'>
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2">Заявка принята</h3>
                <p className="font-mono text-gray-400 text-sm max-w-xs mx-auto mb-6">
                  Мы свяжемся с вами в течение 24 часов.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-xs font-bold uppercase tracking-widest border-b border-purple-500 text-purple-500 hover:text-white transition-colors pb-1"
                >
                  Отправить еще
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
              >
                <input type="hidden" name="calculator_details" value={calculatorData ? calculatorData.summary : ''} />

                {/* Имя */}
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ваше Имя"
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* --- НОВОЕ ПОЛЕ: ТЕЛЕФОН --- */}
                <div className="group">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* Сообщение */}
                <div className="group">
                  <textarea
                    name="message"
                    rows="2"
                    placeholder="Описание задачи..."
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors resize-none text-white"
                  ></textarea>
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="references"
                    placeholder="Ссылка на пример (необязательно)"
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {calculatorData && calculatorData.total > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-400 bg-green-400/10 rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                      <span className="text-[10px] font-bold text-purple-200 uppercase tracking-widest">Расчет прикреплен</span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono pl-7">
                      Смета: <span className="text-white font-bold">{calculatorData.total.toLocaleString()} ₽</span>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="group relative w-full overflow-hidden rounded-xl bg-white p-[1px]"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-black px-6 py-4 md:px-8 md:py-6 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-black/80">

                      {formState === 'sending' ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-4 w-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Отправка...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Отправить Заявку
                          <svg className="w-4 h-4 text-purple-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                      )}

                    </span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>

      <div className="mt-20 md:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] uppercase text-gray-600 font-mono gap-8 md:gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-bold">© 2025 Art.Vision</span>
          <span>All rights reserved.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-x-8 gap-y-4 w-full md:w-auto md:justify-end">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-700 mb-0.5">Организация</span>
            <span className="text-gray-400 font-bold">ООО "АТИМ"</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-700 mb-0.5">ИНН</span>
            <span className="text-gray-400">504226843290</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-700 mb-0.5">КПП</span>
            <span className="text-gray-400">770901001</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-700 mb-0.5">ОГРН</span>
            <span className="text-gray-400">1227700259863</span>
          </div>
          <a href="#" className="flex items-end hover:text-purple-500 transition-colors mt-2 md:mt-0 underline decoration-white/10 underline-offset-4">
            Политика Конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}