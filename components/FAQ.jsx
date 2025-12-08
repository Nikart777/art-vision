'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: "01",
    question: "Сколько стоит сайт?",
    answer: "Мы не продаем шаблоны, но современные технологии позволяют нам не завышать цены. Стоимость разработки уникальной цифровой экосистемы начинается от 50 000₽. Это инвестиция в актив, который будет приносить прибыль годами."
  },
  {
    id: "02",
    question: "Сроки разработки?",
    answer: "Средний цикл — 4 недели. 1 неделя: Прототип и Смыслы. 2 неделя: Дизайн-концепция. 3 неделя: WebGL разработка. 4 неделя: Тесты и Запуск. Мы работаем спринтами."
  },
  {
    id: "03",
    question: "Что по SEO?",
    answer: "SEO вшито в ДНК наших сайтов. Мы используем Next.js (SSR), семантическую верстку и микроразметку Schema.org. Google и Яндекс индексируют такие сайты мгновенно."
  },
  {
    id: "04",
    question: "Сложные проекты?",
    answer: "Да. E-commerce, Личные кабинеты, Web3, SaaS. Мы интегрируем любые API, платежные системы и CRM. Если это можно представить — мы можем это закодить."
  },
  {
    id: "05",
    question: "Нужна ли поддержка?",
    answer: "Наши сайты автономны. Мы строим их так, чтобы они не ломались. Но мы всегда на связи для масштабирования проекта и внедрения новых фич."
  },
  {
    id: "06",
    question: "Почему не Tilda?",
    answer: "Tilda — это аренда квартиры. Свой код — это собственный дом. Вы получаете неограниченную свободу дизайна, скорость загрузки 0.3с и полную безопасность данных."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden">
      
      {/* Декоративная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Заголовок */}
        <div className="mb-20 flex flex-col items-center text-center">
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
             Вопросы и <span className="text-purple-500">Ответы</span>
           </h2>
           <p className="font-mono text-xs text-gray-500 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
             /// База_Знаний
           </p>
        </div>

        {/* Сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"> 
          {/* items-start важен, чтобы карточки не растягивались по высоте соседа */}
          
          {questions.map((item) => (
            <motion.div
              layout // Это позволяет карточкам плавно двигаться в сетке
              transition={{ layout: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 } }} // Плавное перемещение соседей
              key={item.id}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-colors duration-500
                ${activeId === item.id 
                  ? 'bg-white/10 border-purple-500 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              <motion.div layout="position" className="p-8 relative z-10">
                
                {/* Верхняя строка */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${activeId === item.id ? 'text-purple-400' : 'text-gray-600'}`}>
                    [{item.id}] Тема Вопроса
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
                    ${activeId === item.id ? 'border-purple-500 bg-purple-500 text-white rotate-45' : 'border-white/20 text-gray-400'}
                  `}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                </div>

                {/* Вопрос */}
                <motion.h3 layout="position" className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white pr-8">
                  {item.question}
                </motion.h3>

                {/* Ответ (ПЛАВНАЯ ВЕРСИЯ) */}
                <AnimatePresence mode="wait">
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }} // Маслянистая анимация без рывков
                    >
                      {/* Отступ теперь внутри, а не снаружи */}
                      <div className="pt-6 font-mono text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/10 mt-6">
                        <div className="w-full h-[1px] bg-purple-500/50 mb-4 shadow-[0_0_10px_#a855f7]"></div>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>

              {/* Свечение */}
              {activeId === item.id && (
                <motion.div 
                  layoutId="activeGlow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent pointer-events-none" 
                />
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}