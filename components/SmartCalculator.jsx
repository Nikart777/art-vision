'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- БАЗОВЫЕ ЦЕНЫ И КОНФИГ ---
const PRICES = {
  // Типы проектов
  mobile_app: { base: 90000, design: 45000, support: 10000 }, // Новый тип
  landing: { base: 19000, design: 20000, support: 2000 },
  corporate: { base: 34000, design: 25000, support: 3500 },
  shop: { base: 55000, design: 30000, support: 9000 },

  // Доп. услуги
  seo: 2900,
  admin: 5000,
  calculator: 3500,
  crm: 3500,
  mobile: 0, 
  
  // Новые услуги
  acquiring: 3900,
  ai_consultant: 4900,
  content: 1900,
};

export default function SmartCalculator({ onUpdate }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [discountActive, setDiscountActive] = useState(false);
  
  const containerRef = useRef(null);

  const scrollToContainer = () => {
    if (containerRef.current) {
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // --- ДИНАМИЧЕСКИЕ ВОПРОСЫ ---
  const questions = useMemo(() => {
    // Если тип не выбран, берем дефолт, но стараемся определить текущий
    const selectedType = selections['type'] || 'landing'; 
    const typeConfig = PRICES[selectedType] || PRICES.landing;

    return [
      {
        id: 'type',
        title: 'Тип проекта',
        subtitle: 'Что будем разрабатывать?',
        multi: false,
        options: [
          // 1. Мобильное приложение (В самом начале)
          { 
            id: 'mobile_app', 
            label: 'Мобильное приложение', 
            price: PRICES.mobile_app.base, 
            desc: 'iOS и Android (React Native / Swift)' 
          },
          { id: 'landing', label: 'Лендинг', price: PRICES.landing.base, desc: 'Быстрый старт: одностраничный сайт' },
          { id: 'corporate', label: 'Многостраничный', price: PRICES.corporate.base, desc: 'Компания, Услуги, Блог' },
          { id: 'shop', label: 'E-Commerce', price: PRICES.shop.base, desc: 'Магазин с корзиной и оплатой' },
        ]
      },
      {
        id: 'design',
        title: 'Дизайн',
        subtitle: 'Визуальная часть',
        multi: false,
        options: [
          { 
            id: 'has_design', 
            label: 'Макет есть', 
            price: 0, 
            desc: 'Мы просто сверстаем ваш макет' 
          },
          { 
            id: 'need_design', 
            label: 'Индивидуальный дизайн', 
            price: typeConfig.design, 
            desc: 'Разработка концепции с нуля' 
          },
        ]
      },
      {
        id: 'addons',
        title: 'Функционал',
        subtitle: 'Можно выбрать несколько', 
        multi: true, 
        options: [
          // 2. AI Консультант (Выделен особо)
          { 
            id: 'ai_consultant', 
            label: 'AI Консультант', 
            price: PRICES.ai_consultant, 
            desc: 'Нейросеть (не бот), ведет живой диалог с клиентом',
            highlight: true // Флаг для подсветки
          },
          // Исключаем "Мобильную версию" для мобильных приложений (она там по умолчанию)
          ...(selectedType !== 'mobile_app' ? [{ 
            id: 'mobile', 
            label: 'Адаптив под Mobile', 
            price: PRICES.mobile, 
            desc: 'Корректная работа на телефонах' 
          }] : []),
          // 3. Интернет эквайринг
          { 
            id: 'acquiring', 
            label: 'Прием платежей', 
            price: PRICES.acquiring, 
            desc: 'Интеграция эквайринга (карты, SberPay)' 
          },
          // 4. Наполнение контентом
          { 
            id: 'content', 
            label: 'Наполнение', 
            price: PRICES.content, 
            desc: 'Загрузка ваших текстов и фото' 
          },
          { 
            id: 'seo', 
            label: 'SEO Старт', 
            price: PRICES.seo, 
            desc: 'Мета-теги и индексация' 
          },
          { 
            id: 'crm', 
            label: 'CRM / Telegram', 
            price: PRICES.crm, 
            desc: 'Заявки в мессенджер' 
          },
          // Админка не нужна для магазина (она там встроенная обычно) и может быть не нужна для простого app
          ...((selectedType !== 'shop' && selectedType !== 'mobile_app') ? [{ 
            id: 'admin', 
            label: 'Админка', 
            price: PRICES.admin, 
            desc: 'Редактирование контента' 
          }] : []),
          { 
            id: 'calculator', 
            label: 'Калькулятор', 
            price: PRICES.calculator, 
            desc: 'Скрипт расчета цен' 
          },
          { 
            id: 'support', 
            label: 'Поддержка', 
            price: 0, 
            desc: `Технический контроль 24/7` 
          },
          // 5. Поле "Не знаю"
          {
            id: 'dont_know',
            label: 'Не знаю / Посоветуйте',
            price: 0,
            desc: 'Обсудим детали лично',
            isNeutral: true // Флаг для спокойного стиля
          }
        ]
      }
    ];
  }, [selections]);

  const total = useMemo(() => {
    let sum = 0;
    // Базовая цена типа
    if (selections.type && PRICES[selections.type]) {
      sum += PRICES[selections.type].base;
      // Цена дизайна
      if (selections.design === 'need_design') {
        sum += PRICES[selections.type].design;
      }
    }
    
    // Цена опций
    if (selections.addons) {
      const addonsQ = questions.find(q => q.id === 'addons');
      selections.addons.forEach(addonId => {
        const option = addonsQ.options.find(opt => opt.id === addonId);
        if (option) sum += option.price;
      });
    }

    if (discountActive) sum = Math.round(sum * 0.9);
    return sum;
  }, [selections, discountActive, questions]);

  useEffect(() => {
    if (!onUpdate) return;
    const typeLabel = questions[0].options.find(o => o.id === selections.type)?.label || 'Не выбрано';
    const designLabel = questions[1].options.find(o => o.id === selections.design)?.label || 'Не указано';
    let addonsLabels = [];
    if (selections.addons && selections.addons.length > 0) {
       const addonsQ = questions.find(q => q.id === 'addons');
       addonsLabels = selections.addons.map(id => {
         const opt = addonsQ.options.find(o => o.id === id);
         return opt ? opt.label : id;
       });
    }
    const summaryText = `[РАСЧЕТ]: Тип: ${typeLabel}. Дизайн: ${designLabel}. Опции: ${addonsLabels.join(', ') || 'Нет'}. Скидка: ${discountActive ? 'Да (-10%)' : 'Нет'}. ИТОГО: ${total} руб.`;

    onUpdate({ total: total, summary: summaryText });
  }, [total, selections, discountActive, questions, onUpdate]);

  const handleSelect = (questionId, optionId, isMulti) => {
    if (isMulti) {
      setSelections(prev => {
        const current = prev[questionId] || [];
        return current.includes(optionId)
          ? { ...prev, [questionId]: current.filter(id => id !== optionId) }
          : { ...prev, [questionId]: [...current, optionId] };
      });
    } else {
      setSelections(prev => ({ ...prev, [questionId]: optionId }));
      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep(s => s + 1);
          if (window.innerWidth < 768) scrollToContainer();
        } else {
          setIsCompleted(true);
          scrollToContainer();
        }
      }, 250);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1);
      scrollToContainer();
    }
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
      scrollToContainer();
    } else {
      setIsCompleted(true);
      scrollToContainer();
    }
  };

  const restart = () => {
    setStep(0);
    setIsCompleted(false);
    setSelections({});
    setDiscountActive(false);
    scrollToContainer();
  };

  const currentQ = questions[step];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#050505] text-white overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-12 relative z-10">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
            Сколько стоит <span className="text-purple-500">Проект?</span>
          </h2>
          <p className="font-mono text-gray-500 text-xs uppercase tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full border border-white/10">
            /// Калькулятор разработки
          </p>
        </div>

        <div 
          ref={containerRef}
          className="
            relative overflow-hidden rounded-3xl min-h-[600px] flex flex-col justify-between shadow-2xl
            bg-[#0f0f0f] border border-purple-500/20 
            md:p-12 p-6
          "
          style={{
            boxShadow: '0 0 50px -10px rgba(126, 34, 206, 0.15)'
          }}
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

          {!isCompleted && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="flex justify-between items-start mb-8 md:mb-12 relative z-20 border-b border-white/5 pb-6">
            <div className="flex flex-col">
               {!isCompleted && (
                 <span className="text-purple-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                   Шаг {step + 1} / {questions.length}
                 </span>
               )}
               
               {step > 0 && !isCompleted && (
                <button 
                  onClick={prevStep}
                  className="text-gray-500 hover:text-white flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors mt-2"
                >
                  ← Назад
                </button>
              )}
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Текущая смета:</div>
              <div className="text-2xl md:text-4xl font-black tabular-nums tracking-tight text-white flex flex-col items-end">
                 <motion.span
                   key={total}
                   initial={{ scale: 1.1, color: "#fff" }}
                   animate={{ scale: 1, color: "#fff" }}
                   transition={{ duration: 0.2 }}
                 >
                   {total.toLocaleString()} ₽
                 </motion.span>
                 
                 {discountActive && (
                    <span className="text-[10px] font-bold text-black bg-green-400 px-2 py-0.5 rounded mt-1">
                      СКИДКА -10%
                    </span>
                 )}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-grow justify-center"
              >
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 text-white">
                    {currentQ.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-mono">
                    {currentQ.subtitle} 
                    {currentQ.multi && <span className="text-purple-400 ml-2">(Можно несколько)</span>}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentQ.multi 
                      ? selections[currentQ.id]?.includes(opt.id)
                      : selections[currentQ.id] === opt.id;

                    // Определение классов стилей в зависимости от флагов (highlight, neutral)
                    let borderClass = 'border-white/5 hover:border-purple-500/50';
                    let bgClass = 'bg-[#151515] hover:bg-[#1a1a1a]';
                    let shadowClass = '';

                    if (isSelected) {
                        borderClass = 'border-purple-500';
                        bgClass = 'bg-purple-600/20';
                        shadowClass = 'shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]';
                    } else if (opt.highlight) {
                        // Особый стиль для AI
                        borderClass = 'border-purple-500/40 hover:border-purple-400';
                        bgClass = 'bg-gradient-to-br from-[#1a1025] to-[#0f0f0f] hover:bg-[#1f1230]';
                        shadowClass = 'shadow-[0_0_15px_rgba(168,85,247,0.1)]';
                    } else if (opt.isNeutral) {
                        borderClass = 'border-white/5 hover:border-white/20';
                        bgClass = 'bg-transparent hover:bg-white/5';
                    }

                    return (
                      <div 
                        key={opt.id}
                        onClick={() => handleSelect(currentQ.id, opt.id, currentQ.multi)}
                        className={`
                          group relative p-6 border rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[140px]
                          ${borderClass} ${bgClass} ${shadowClass}
                        `}
                      >
                        {/* Бейдж для важных элементов */}
                        {opt.highlight && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                New Gen
                            </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-lg font-bold uppercase leading-tight transition-colors ${isSelected ? 'text-white' : (opt.highlight ? 'text-purple-300 group-hover:text-white' : 'text-gray-300 group-hover:text-white')}`}>
                              {opt.label}
                            </span>
                            
                            <div className={`
                              w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ml-2
                              ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20 group-hover:border-purple-500'}
                            `}>
                               {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                            </div>
                          </div>
                          
                          <p className={`font-mono text-xs leading-relaxed max-w-[95%] ${opt.highlight ? 'text-purple-200/70' : 'text-gray-500'}`}>
                            {opt.desc}
                          </p>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                           <span className={`text-sm font-bold font-mono ${opt.price === 0 ? 'text-green-400' : 'text-gray-400 group-hover:text-white'}`}>
                             {opt.price === 0 
                               ? (opt.id === 'dont_know' ? 'Бесплатно' : 'Включено')
                               : (currentQ.id === 'type' 
                                   ? `от ${opt.price.toLocaleString()} ₽` 
                                   : `+ ${opt.price.toLocaleString()} ₽`
                                 )
                             }
                           </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentQ.multi && (
                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={nextStep}
                      className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    >
                      Далее →
                    </button>
                  </div>
                )}
                
                {step === questions.length - 1 && !discountActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-xl flex items-center justify-between cursor-pointer hover:border-white/30 transition-colors"
                    onClick={() => setDiscountActive(true)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">%</div>
                      <div>
                        <div className="font-bold text-white uppercase text-sm">Скидка для новых клиентов</div>
                        <div className="text-xs text-gray-400">Нажмите, чтобы применить -10%</div>
                      </div>
                    </div>
                    <div className="text-purple-400 text-xl">→</div>
                  </motion.div>
                )}

              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                
                <h3 className="text-lg font-mono text-gray-400 mb-2 uppercase tracking-widest">Ориентировочный бюджет</h3>
                
                <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                  {total.toLocaleString()} ₽
                </div>

                {discountActive && (
                   <div className="mb-6 text-green-400 font-mono text-xs uppercase border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">
                     С учетом скидки 10%
                   </div>
                )}
                
                <p className="max-w-md text-gray-400 mb-8 font-mono text-xs leading-relaxed">
                  Мы сохранили расчет. Оставьте заявку ниже, чтобы обсудить детали и зафиксировать цену за проектом.
                </p>

                <div className="flex flex-col w-full sm:w-auto gap-3">
                  <button 
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:-translate-y-1"
                  >
                    Зафиксировать цену
                  </button>
                  
                  <button 
                    onClick={restart}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent text-gray-500 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors"
                  >
                    Посчитать заново
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}