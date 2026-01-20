'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const questions = [
  {
    id: "01",
    question: "Сколько стоит сайт?",
    answer: "Мы не продаем шаблоны, но современные технологии позволяют нам не завышать цены. Стоимость разработки начинается от 40 000 ₽. Это инвестиция в актив, который будет приносить прибыль годами."
  },
  {
    id: "02",
    question: "Сроки разработки?",
    answer: "Средний цикл — от 5 до 14 рабочих дней. Мы работаем спринтами, чтобы вы получили работающий инструмент как можно скорее."
  },
  {
    id: "03",
    question: "Что по SEO?",
    answer: "SEO вшито в ДНК наших сайтов. Мы используем Next.js (SSR), семантическую верстку и микроразметку Schema.org. Google и Яндекс индексируют такие сайты мгновенно."
  },
  {
    id: "04",
    question: "Сложные проекты?",
    answer: "Да. E-commerce, Личные кабинеты, Сложные калькуляторы. Если это современный веб — мы можем это закодить."
  },
  {
    id: "05",
    question: "Нужна ли поддержка?",
    answer: "Наши сайты автономны. Мы строим их на современном стеке, который не требует постоянного присмотра. Но мы всегда рядом для масштабирования."
  },
  {
    id: "06",
    question: "Почему не Tilda?",
    answer: "Tilda — это аренда. Свой код — это собственность. Вы получаете неограниченную свободу дизайна, скорость загрузки 0.3с и отсутствие ежемесячных платежей за платформу."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="faq" className="relative w-full py-32 bg-background-light dark:bg-background-dark transition-colors overflow-hidden">

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

        {/* Заголовок */}
        <div className="mb-20 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">База знаний</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Вопросы и <span className="text-gradient">Ответы</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
            Отвечаем на самые популярные вопросы о нашей работе и технологиях.
          </p>
        </div>

        {/* Сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {questions.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              className={`group relative overflow-hidden rounded-[2rem] border-2 cursor-pointer transition-all duration-500
                ${activeId === item.id
                  ? 'bg-white dark:bg-white/10 border-primary shadow-xl shadow-primary/10'
                  : 'bg-white/60 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-primary/30'
                }
              `}
            >
              <div className="p-8 relative z-10">

                {/* Верхняя строка */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${activeId === item.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:text-primary'}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeId === item.id ? 'text-primary' : 'text-gray-400'}`}>
                      Вопрос {item.id}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500
                    ${activeId === item.id ? 'border-primary bg-primary text-white' : 'border-gray-100 dark:border-white/10 text-gray-400 group-hover:border-primary'}
                  `}>
                    {activeId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Вопрос */}
                <h3 className={`text-xl font-bold tracking-tight pr-8 transition-colors ${activeId === item.id ? 'text-primary' : ''}`}>
                  {item.question}
                </h3>

                {/* Ответ */}
                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pt-6 text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed border-t border-gray-100 dark:border-white/10 mt-6">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
