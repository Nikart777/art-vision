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
    <section id="faq" className="relative w-full py-32 bg-black text-white font-sans transition-colors overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20">

        {/* Заголовок */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="mb-20 text-center"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            База знаний
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
            Вопросы и Ответы
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Отвечаем на самые популярные вопросы о нашей работе и технологиях.
          </p>
        </motion.div>

        {/* Сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {questions.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              className={`group relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-500
                ${activeId === item.id
                  ? 'bg-white/10 border-white/40'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }
              `}
            >
              <div className="p-6 sm:p-8 relative z-10">

                {/* Верхняя строка */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded bg-white/5 transition-colors ${activeId === item.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-light uppercase tracking-[0.15em] transition-colors ${activeId === item.id ? 'text-white/70' : 'text-white/40'}`}>
                      Вопрос {item.id}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500
                    ${activeId === item.id ? 'border-white bg-white text-black' : 'border-white/10 text-white/40 group-hover:border-white/40 group-hover:text-white'}
                  `}>
                    {activeId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Вопрос */}
                <h3 className={`text-lg sm:text-xl font-light tracking-tight pr-8 transition-colors uppercase ${activeId === item.id ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
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
                      <div className="pt-6 text-white/50 font-light text-[13px] sm:text-sm leading-relaxed border-t border-white/10 mt-6 tracking-wide">
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
