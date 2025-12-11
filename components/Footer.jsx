'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer({ calculatorData }) {
  // Состояния формы
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    // Собираем данные формы автоматически
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Отправляем запрос на наш API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
        // Очистка формы (опционально)
        e.target.reset();
      } else {
        console.error('Ошибка сервера');
        // Здесь можно добавить состояние 'error' и показать уведомление
        setFormState('idle'); 
        alert('Произошла ошибка при отправке. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка сети', error);
      setFormState('idle');
      alert('Ошибка соединения.');
    }
  };

  return (
    <footer id="contact-form" className="relative w-full bg-[#050505] text-white pt-24 md:pt-32 pb-12 px-4 md:px-12 z-30 border-t border-white/10 overflow-hidden">
      
      {/* Фоновый шум */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        
        {/* --- ЛЕВАЯ КОЛОНКА (На мобильном уходит ВНИЗ благодаря order-last) --- */}
        <div className="flex flex-col justify-between order-last md:order-first">
          
          {/* Заголовок виден только на десктопе в этой колонке */}
          <div className="hidden md:block">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
              Let's <br/>
              <span className="text-purple-500">Talk</span>
            </h2>
            <p className="font-mono text-gray-400 max-w-sm">
              Готовы превратить вашу идею в цифровую реальность? Заполните бриф, и мы выйдем на связь в течение 24 часов.
            </p>
          </div>

          {/* Контакты (Email & Socials) */}
          <div className="mt-8 md:mt-16 space-y-8 font-mono text-sm text-gray-500 uppercase">
            
            {/* Email */}
            <div className="flex flex-col">
              <span className="text-purple-500 text-xs mb-2">Email:</span>
              <a 
                href="mailto:project@art-vision.online" 
                className="text-white hover:text-purple-400 transition-colors text-xl md:text-2xl font-bold tracking-tight"
              >
                project@art-vision.online
              </a>
            </div>

            {/* Socials (Telegram) */}
            <div className="flex flex-col">
               <span className="text-purple-500 text-xs mb-2">Socials:</span>
               <div className="flex gap-6 text-white">
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    Telegram
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* --- ПРАВАЯ КОЛОНКА: Форма (На мобильном идет ПЕРВОЙ) --- */}
        <div className="relative bg-white/5 p-6 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl order-first md:order-last">
          
          {/* Заголовок для мобилок внутри блока формы */}
          <div className="block md:hidden mb-8 text-center">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              Let's <span className="text-purple-500">Talk</span>
            </h2>
            <p className="font-mono text-xs text-gray-400">
              Заполните бриф и мы свяжемся с вами
            </p>
          </div>

          <AnimatePresence mode='wait'>
            {formState === 'success' ? (
              // ЭКРАН УСПЕХА
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
                  Мы получили ваш запрос на <br/>
                  <span className="text-white font-bold">project@art-vision.online</span>
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-xs font-bold uppercase tracking-widest border-b border-purple-500 text-purple-500 hover:text-white transition-colors pb-1"
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
                className="space-y-6 md:space-y-8"
              >
                {/* --- СКРЫТОЕ ПОЛЕ --- */}
                <input 
                  type="hidden" 
                  name="calculator_details" 
                  value={calculatorData ? calculatorData.summary : ''} 
                />

                {/* Имя */}
                <div className="group">
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Ваше Имя / Компания" 
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Email или Telegram" 
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* О проекте */}
                <div className="group">
                  <textarea 
                    name="message"
                    rows="2"
                    placeholder="Пара слов о задаче..." 
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors resize-none text-white"
                  ></textarea>
                </div>

                {/* Референсы */}
                <div className="group">
                  <input 
                    type="text" 
                    name="references"
                    placeholder="Ссылка на пример (если есть)" 
                    className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-xl outline-none placeholder:text-gray-600 focus:border-purple-500 transition-colors text-white"
                  />
                </div>

                {/* Индикация расчета */}
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

                {/* КНОПКА ОТПРАВКИ */}
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
                           Отправить Бриф
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

      {/* --- НИЖНИЙ БЛОК: Копирайт и Реквизиты --- */}
      <div className="mt-20 md:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] uppercase text-gray-600 font-mono gap-8 md:gap-6">
         
         <div className="flex flex-col gap-1">
            <span className="text-gray-500 font-bold">© 2025 Art.Vision</span>
            <span>All rights reserved.</span>
         </div>
         
         {/* РЕКВИЗИТЫ (Оптимизированы для мобилок) */}
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