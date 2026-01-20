'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, CheckCircle2 } from 'lucide-react';

// --- БАЗОВЫЕ ЦЕНЫ И КОНФИГ ---
const PRICES = {
  mobile_app: { base: 90000, design: 45000, support: 10000 },
  landing: { base: 19000, design: 20000, support: 2000 },
  corporate: { base: 34000, design: 25000, support: 3500 },
  shop: { base: 55000, design: 30000, support: 9000 },
  seo: 2900,
  admin: 5000,
  calculator: 3500,
  crm: 3500,
  mobile: 0,
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const questions = useMemo(() => {
    const selectedType = selections['type'] || 'landing';
    const typeConfig = PRICES[selectedType] || PRICES.landing;

    return [
      {
        id: 'type',
        title: 'Тип проекта',
        subtitle: 'Что будем разрабатывать?',
        multi: false,
        options: [
          { id: 'mobile_app', label: 'Мобильное приложение', price: PRICES.mobile_app.base, desc: 'iOS и Android (React Native / Swift)' },
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
          { id: 'has_design', label: 'Макет есть', price: 0, desc: 'Мы просто сверстаем ваш макет' },
          { id: 'need_design', label: 'Индивидуальный дизайн', price: typeConfig.design, desc: 'Разработка концепции с нуля' },
        ]
      },
      {
        id: 'addons',
        title: 'Функционал',
        subtitle: 'Можно выбрать несколько',
        multi: true,
        options: [
          { id: 'ai_consultant', label: 'AI Консультант', price: PRICES.ai_consultant, desc: 'Нейросеть нового поколения', highlight: true },
          ...(selectedType !== 'mobile_app' ? [{ id: 'mobile', label: 'Адаптив под Mobile', price: PRICES.mobile, desc: 'Корректная работа на телефонах' }] : []),
          { id: 'acquiring', label: 'Прием платежей', price: PRICES.acquiring, desc: 'Интеграция эквайринга' },
          { id: 'content', label: 'Наполнение', price: PRICES.content, desc: 'Загрузка ваших текстов и фото' },
          { id: 'seo', label: 'SEO Старт', price: PRICES.seo, desc: 'Мета-теги и индексация' },
          { id: 'crm', label: 'CRM / Telegram', price: PRICES.crm, desc: 'Заявки в мессенджер' },
          ...((selectedType !== 'shop' && selectedType !== 'mobile_app') ? [{ id: 'admin', label: 'Админка', price: PRICES.admin, desc: 'Редактирование контента' }] : []),
          { id: 'calculator', label: 'Калькулятор', price: PRICES.calculator, desc: 'Скрипт расчета цен' },
          { id: 'dont_know', label: 'Не знаю / Посоветуйте', price: 0, desc: 'Обсудим детали лично', isNeutral: true }
        ]
      }
    ];
  }, [selections]);

  const total = useMemo(() => {
    let sum = 0;
    if (selections.type && PRICES[selections.type]) {
      sum += PRICES[selections.type].base;
      if (selections.design === 'need_design') {
        sum += PRICES[selections.type].design;
      }
    }
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
    const summaryText = `[РАСЧЕТ]: Тип: ${typeLabel}. ИТОГО: ${total} руб.`;

    // Use a ref to store previous state and prevent redundant updates
    const currentData = { total: total, summary: summaryText };
    if (JSON.stringify(currentData) !== JSON.stringify(onUpdate.lastSent)) {
      onUpdate(currentData);
      onUpdate.lastSent = currentData;
    }
  }, [total, selections, questions, onUpdate]);

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

  const currentQ = questions[step];

  return (
    <section id="calculator" className="relative w-full py-24 bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">

        <div className="mb-16 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Онлайн Расчет</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Сколько стоит <span className="text-gradient">Ваш Проект?</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
            Получите прозрачную смету за 30 секунд. Выбирайте только то, что нужно вашему бизнесу.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[2.5rem] min-h-[600px] flex flex-col justify-between shadow-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 md:p-12 p-6"
        >
          {/* Progress Bar */}
          {!isCompleted && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 dark:bg-white/5">
              <motion.div
                className="h-full bg-primary shadow-[0_0_15px_rgba(0,185,209,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-100 dark:border-white/5 pb-8 relative z-20">
            <div className="flex flex-col mb-4 md:mb-0">
              {!isCompleted ? (
                <>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Шаг {step + 1} / {questions.length}
                  </span>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="text-gray-400 hover:text-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      ← Назад
                    </button>
                  )}
                </>
              ) : (
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Расчет завершен
                </span>
              )}
            </div>

            <div className="text-right w-full md:w-auto">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ориентировочная стоимость:</div>
              <div className="text-3xl md:text-5xl font-black tabular-nums tracking-tight text-[#101818] dark:text-white flex flex-col items-end">
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {total.toLocaleString()} ₽
                </motion.span>
                {discountActive && (
                  <span className="text-[10px] font-black text-white bg-green-500 px-3 py-1 rounded-full mt-2 shadow-lg shadow-green-500/20">
                    СКИДКА -10% ПРИМЕНЕНА
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
                <div className="mb-10">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                    {currentQ.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium font-display">
                    {currentQ.subtitle}
                    {currentQ.multi && <span className="text-primary ml-2 font-bold text-sm">(Выберите несколько)</span>}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentQ.multi
                      ? selections[currentQ.id]?.includes(opt.id)
                      : selections[currentQ.id] === opt.id;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelect(currentQ.id, opt.id, currentQ.multi)}
                        className={`
                          group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[140px]
                          ${isSelected
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                            : 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:border-primary/40'}
                        `}
                      >
                        {opt.highlight && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#00b9d1] to-[#00d4ff] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                            AI Power
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-lg font-black tracking-tight transition-colors ${isSelected ? 'text-primary' : 'text-gray-800 dark:text-gray-200 group-hover:text-primary'}`}>
                              {opt.label}
                            </span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary' : 'border-gray-200 dark:border-white/10 group-hover:border-primary'}`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          <p className={`text-xs font-medium leading-relaxed ${isSelected ? 'text-primary/70' : 'text-gray-500'}`}>
                            {opt.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                          <span className={`text-sm font-black ${opt.price === 0 ? 'text-green-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary'}`}>
                            {opt.price === 0
                              ? 'Включено'
                              : (currentQ.id === 'type'
                                ? `~ ${opt.price.toLocaleString()} ₽`
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
                  <div className="mt-10 flex justify-end">
                    <button
                      onClick={() => {
                        if (step < questions.length - 1) setStep(step + 1);
                        else setIsCompleted(true);
                        scrollToContainer();
                      }}
                      className="px-10 py-5 bg-primary text-white font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all rounded-2xl shadow-xl shadow-primary/30"
                    >
                      Следующий шаг →
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-6"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  <TrendingUp className="w-10 h-10 text-primary relative z-10" />
                </div>

                <h3 className="text-xl font-black uppercase tracking-widest text-[#101818] dark:text-white mb-4">Предварительный расчет готов</h3>

                <div className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-tighter">
                  {total.toLocaleString()} ₽
                </div>

                <p className="max-w-md text-gray-500 dark:text-gray-400 mb-10 font-medium text-sm leading-relaxed">
                  Мы подготовили техническое решение под ваш запрос. Оставьте контакты, чтобы зафиксировать стоимость и получить консультацию ведущего разработчика.
                </p>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <button
                    onClick={() => scrollTo('contact-form')}
                    className="w-full sm:w-auto px-10 py-6 bg-primary text-white font-black uppercase text-xs tracking-widest hover:scale-105 transition-all rounded-2xl shadow-2xl shadow-primary/30"
                  >
                    Заказать проект по этой цене
                  </button>
                  <button
                    onClick={() => {
                      setStep(0);
                      setIsCompleted(false);
                      setSelections({});
                      setDiscountActive(false);
                      scrollToContainer();
                    }}
                    className="w-full sm:w-auto px-8 py-5 bg-transparent text-gray-400 hover:text-primary font-black uppercase text-xs tracking-widest transition-colors"
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