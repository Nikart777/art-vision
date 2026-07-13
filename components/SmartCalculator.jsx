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
          { id: 'mobile_app', label: 'Мобильное приложение', price: PRICES.mobile_app.base, desc: 'iOS и Android' },
          { id: 'landing', label: 'Лендинг', price: PRICES.landing.base, desc: 'Одностраничный сайт' },
          { id: 'corporate', label: 'Многостраничный', price: PRICES.corporate.base, desc: 'Компания, Услуги, Блог' },
          { id: 'shop', label: 'E-Commerce', price: PRICES.shop.base, desc: 'Магазин с корзиной' },
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
    <section id="calculator" className="relative w-full py-24 bg-black text-white transition-colors overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="mb-16 text-center"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Онлайн Расчет
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
            Сколько стоит Ваш Проект?
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Получите прозрачную смету за 30 секунд. Выбирайте только то, что нужно вашему бизнесу.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-lg min-h-[500px] flex flex-col justify-between bg-white/[0.02] border border-white/10 md:p-12 p-6 transition-all"
        >
          {/* Progress Bar */}
          {!isCompleted && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-white/50"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-20">
            <div className="flex flex-col mb-4 md:mb-0">
              {!isCompleted ? (
                <>
                  <span className="text-white/40 font-light text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-white/40" /> Шаг {step + 1} / {questions.length}
                  </span>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] font-light uppercase tracking-widest transition-colors mt-2"
                    >
                      ← Назад
                    </button>
                  )}
                </>
              ) : (
                <span className="text-white/40 font-light text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Расчет завершен
                </span>
              )}
            </div>

            <div className="text-right w-full md:w-auto">
              <div className="text-[10px] font-light text-white/40 uppercase tracking-widest mb-1">Ориентировочная стоимость:</div>
              <div className="text-3xl md:text-5xl font-light tabular-nums tracking-tight text-white flex flex-col items-end">
                <motion.span
                  key={total}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {total.toLocaleString()} ₽
                </motion.span>
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
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-3 uppercase">
                    {currentQ.title}
                  </h3>
                  <p className="text-white/40 font-light text-sm tracking-widest uppercase">
                    {currentQ.subtitle}
                    {currentQ.multi && <span className="text-white/60 ml-2">(Выберите несколько)</span>}
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
                          group relative p-6 border rounded-lg cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[140px]
                          ${isSelected
                            ? 'border-white/40 bg-white/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'}
                        `}
                      >
                        {opt.highlight && (
                          <div className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-widest">
                            AI Power
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-lg font-light tracking-tight transition-colors uppercase ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                              {opt.label}
                            </span>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40'}`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                            </div>
                          </div>
                          <p className={`text-xs font-light leading-relaxed tracking-wide ${isSelected ? 'text-white/70' : 'text-white/40'}`}>
                            {opt.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                          <span className={`text-sm font-light ${opt.price === 0 ? 'text-white/60' : 'text-white/40 group-hover:text-white/60'}`}>
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
                      className="px-8 py-4 bg-white text-black font-medium uppercase text-[11px] tracking-widest hover:bg-[#e2e2e6] transition-all rounded-full"
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
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8 relative">
                  <TrendingUp className="w-8 h-8 text-white relative z-10" />
                </div>

                <h3 className="text-[13px] font-light uppercase tracking-[0.2em] text-white/50 mb-4">Предварительный расчет готов</h3>

                <div className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tighter">
                  {total.toLocaleString()} ₽
                </div>

                <p className="max-w-md text-white/40 mb-10 font-light text-sm leading-relaxed">
                  Мы подготовили техническое решение под ваш запрос. Оставьте контакты, чтобы зафиксировать стоимость и получить консультацию.
                </p>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <button
                    onClick={() => scrollTo('contact-form')}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium uppercase text-[11px] tracking-widest hover:bg-[#e2e2e6] transition-all rounded-full"
                  >
                    Обсудить проект
                  </button>
                  <button
                    onClick={() => {
                      setStep(0);
                      setIsCompleted(false);
                      setSelections({});
                      setDiscountActive(false);
                      scrollToContainer();
                    }}
                    className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium uppercase text-[11px] tracking-widest hover:bg-white/5 transition-all rounded-full"
                  >
                    Пересчитать
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