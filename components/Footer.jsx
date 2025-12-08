'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  // Состояния формы
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    
    // Имитация отправки на сервер (2 секунды)
    // Позже сюда подключим реальный сервис
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <footer className="relative w-full bg-[#050505] text-white pt-32 pb-12 px-4 md:px-12 z-30 border-t border-white/10 overflow-hidden">
      <footer id="contact-form" className="relative w-full bg-[#050505] text-white pt-32 pb-12 px-4 md:px-12 z-30 border-t border-white/10 overflow-hidden"></footer>
      
      {/* Фоновый шум */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* --- ЛЕВАЯ КОЛОНКА: Инфо --- */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
              Let's <br/>
              <span className="text-purple-500">Talk</span>
            </h2>
            <p className="font-mono text-gray-400 max-w-sm">
              Готовы превратить вашу идею в цифровую реальность? Заполните бриф, и мы выйдем на связь в течение 24 часов.
            </p>
          </div>

          <div className="mt-16 space-y-4 font-mono text-sm text-gray-500 uppercase">
            <div className="flex flex-col">
              <span className="text-purple-500 text-xs mb-1">Email:</span>
              <a href="mailto:hello@art.vision" className="text-white hover:text-purple-400 transition-colors text-lg">hello@art.vision</a>
            </div>
            <div className="flex flex-col">
              <span className="text-purple-500 text-xs mb-1">Location:</span>
              <span className="text-white">Moscow, Tverskaya 12</span>
            </div>
            <div className="flex gap-6 pt-4 text-white">
              <a href="#" className="hover:text-purple-400 transition-colors">Telegram</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Behance</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* --- ПРАВАЯ КОЛОНКА: Форма (Бриф) --- */}
        <div className="relative bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
          
          <AnimatePresence mode='wait'>
            {formState === 'success' ? (
              // ЭКРАН УСПЕХА
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold uppercase mb-2">Запрос Принят</h3>
                <p className="font-mono text-gray-400">Мы уже изучаем ваши референсы.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-sm uppercase border-b border-purple-500 text-purple-500 hover:text-white transition-colors"
                >
                  Отправить еще
                </button>
              </motion.div>
            ) : (
              // ФОРМА
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                {/* Имя */}
                <div className="group">
                  <input 
                    type="text" 
                    required
                    placeholder="Ваше Имя / Компания" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <input 
                    type="email" 
                    required
                    placeholder="Email или Telegram" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* О проекте */}
                <div className="group">
                  <textarea 
                    rows="2"
                    placeholder="О чем проект? (Пара слов)" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Референсы */}
                <div className="group">
                  <input 
                    type="text" 
                    placeholder="Ссылка на референс (Behance/Site)" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Кнопка отправки */}
                <div className="pt-4">
                  <button 
                    disabled={formState === 'sending'}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-6 hover:bg-purple-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                        Transmitting...
                      </span>
                    ) : (
                      "Отправить Бриф"
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Копирайт и Реквизиты */}
      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase text-gray-700 font-mono gap-4">
         <span>© 2025 Art.Vision Inc.</span>
         
         {/* ВАЖНО ДЛЯ ЯНДЕКСА: */}
         <div className="flex gap-4">
            <span>ИП Иванов И.И.</span>
            <span>ИНН 1234567890</span>
            <span>ОГРНИП 123456789012345</span>
            <a href="#" className="hover:text-purple-500">Политика Конфиденциальности</a>
         </div>
      </div>
    </footer>
  );
}