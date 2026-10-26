'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle2, Sparkles } from 'lucide-react';
import MaskReveal from './premium/MaskReveal';
import { onSpotlightMove } from './premium/spotlight';

// Бриф проекта вместо калькулятора цен. Цены за модули («лендинг 19 000 ₽,
// наполнение +1 900 ₽») продавали студию как дешёвую; премиальный проект
// оценивается после разговора. Ответы брифа уходят в форму заявки.
const QUESTIONS = [
  {
    id: 'type',
    title: 'Что создаём?',
    subtitle: 'Формат проекта',
    multi: false,
    options: [
      { id: 'platform', label: 'Платформа или SaaS', desc: 'Сервис с личными кабинетами, подписками, трансляциями' },
      { id: 'shop', label: 'E-commerce', desc: 'Интернет-магазин, каталог, конфигуратор' },
      { id: 'corporate', label: 'Корпоративный сайт', desc: 'Флагманский сайт компании или холдинга' },
      { id: 'service', label: 'Приложение или бот', desc: 'Мобильное приложение, Telegram- или MAX-бот' },
    ]
  },
  {
    id: 'stage',
    title: 'С чего начинаем?',
    subtitle: 'Текущая ситуация',
    multi: false,
    options: [
      { id: 'new', label: 'Новый проект с нуля', desc: 'Сайта нет или он не отражает компанию' },
      { id: 'redesign', label: 'Редизайн и перезапуск', desc: 'Сайт есть, но устарел визуально и технически' },
    ]
  },
  {
    id: 'focus',
    title: 'Что для вас важно?',
    subtitle: 'Можно выбрать несколько',
    multi: true,
    options: [
      { id: 'art', label: 'Арт-дирекшн', desc: 'Уникальный визуальный язык бренда', highlight: true },
      { id: 'motion', label: 'Motion и 3D', desc: 'Кинематографичная анимация и WebGL' },
      { id: 'integrations', label: 'Интеграции', desc: 'CRM, 1С, оплата, телефония' },
      { id: 'seo', label: 'SEO-архитектура', desc: 'Структура под поисковый спрос' },
      { id: 'geo', label: 'GEO-сопровождение', desc: 'Бренд в ответах Алисы и ChatGPT' },
      { id: 'ai', label: 'AI-ассистент', desc: 'Консультант на базе нейросети' },
      { id: 'lang', label: 'Мультиязычность', desc: 'Версии для зарубежной аудитории' },
      { id: 'dont_know', label: 'Нужен совет', desc: 'Обсудим и предложим решение', isNeutral: true },
    ]
  }
];

const EASE = [0.22, 1, 0.36, 1];

export default function SmartCalculator({ onUpdate }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const lastSent = useRef(null);

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

  // Человекочитаемые ответы: для итогового экрана и для формы заявки
  const answers = useMemo(() => {
    const labelOf = (q, id) => q.options.find(o => o.id === id)?.label;
    return QUESTIONS.map(q => {
      const value = selections[q.id];
      const labels = q.multi
        ? (value || []).map(id => labelOf(q, id)).filter(Boolean)
        : [labelOf(q, value)].filter(Boolean);
      return { title: q.title, labels };
    });
  }, [selections]);

  useEffect(() => {
    if (!onUpdate) return;
    const [type, stage, focus] = answers;
    if (!type.labels.length) return;
    const summary = `[БРИФ]: ${type.labels[0]}`
      + (stage.labels.length ? ` · ${stage.labels[0]}` : '')
      + (focus.labels.length ? ` · Важно: ${focus.labels.join(', ')}` : '');
    if (summary !== lastSent.current) {
      lastSent.current = summary;
      onUpdate({ summary });
    }
  }, [answers, onUpdate]);

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
        if (step < QUESTIONS.length - 1) {
          setStep(s => s + 1);
          if (window.innerWidth < 768) scrollToContainer();
        } else {
          setIsCompleted(true);
          scrollToContainer();
        }
      }, 300);
    }
  };

  const currentQ = QUESTIONS[step];
  const typeLabel = answers[0].labels[0];

  return (
    <section id="calculator" className="relative w-full py-28 md:py-36 bg-black text-white transition-colors overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">

        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8"
          >
            Бриф проекта
          </motion.p>
          <MaskReveal
            className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase"
            lines={['Расскажите', <span key="a" className="accent-serif">о задаче</span>]}
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto"
          >
            Три коротких вопроса — чтобы первый разговор был предметным. Стоимость рассчитываем индивидуально под ваш проект.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl min-h-[500px] flex flex-col justify-between bg-white/[0.02] border border-white/10 md:p-12 p-6 transition-all"
        >
          {/* Мягкое свечение за карточкой брифа */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[70%] rounded-full bg-white/[0.06] blur-[100px]" />

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-white/30 via-white to-white/30"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-20">
            <div className="flex flex-col mb-4 md:mb-0">
              {!isCompleted ? (
                <>
                  <span className="text-white/40 font-light text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-white/40" /> Шаг {step + 1} / {QUESTIONS.length}
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
                  <CheckCircle2 className="w-4 h-4" /> Бриф заполнен
                </span>
              )}
            </div>

            <div className="text-left md:text-right w-full md:w-auto">
              <div className="text-[10px] font-light text-white/40 uppercase tracking-widest mb-1">Ваш проект:</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={typeLabel || 'empty'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-2xl md:text-4xl font-light tracking-tight text-white"
                >
                  {typeLabel ? <span className="accent-serif">{typeLabel}</span> : <span className="text-white/30">—</span>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col flex-grow justify-center relative z-20"
              >
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-3 uppercase">
                    {currentQ.title}
                  </h3>
                  <p className="text-white/40 font-light text-sm tracking-widest uppercase">
                    {currentQ.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = currentQ.multi
                      ? selections[currentQ.id]?.includes(opt.id)
                      : selections[currentQ.id] === opt.id;

                    return (
                      <motion.button
                        type="button"
                        key={opt.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(currentQ.id, opt.id, currentQ.multi)}
                        onPointerMove={onSpotlightMove}
                        aria-pressed={isSelected}
                        className={`
                          spotlight group relative text-left p-6 border rounded-xl cursor-pointer transition-colors duration-500 flex flex-col justify-between min-h-[120px]
                          ${isSelected
                            ? 'border-white/50 bg-white/[0.09] shadow-[0_0_40px_-10px_rgba(255,255,255,0.35)]'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'}
                        `}
                      >
                        {opt.highlight && (
                          <span className="absolute top-3 right-14 flex items-center gap-1 text-white/60 text-[9px] font-medium uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" /> Основа премиума
                          </span>
                        )}

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-2 gap-4">
                            <span className={`text-lg font-light tracking-tight transition-colors uppercase ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                              {opt.label}
                            </span>
                            <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white border-white scale-110' : 'border-white/20 group-hover:border-white/40'}`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                            </span>
                          </div>
                          <p className={`text-xs font-light leading-relaxed tracking-wide ${isSelected ? 'text-white/70' : 'text-white/40'}`}>
                            {opt.desc}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {currentQ.multi && (
                  <div className="mt-10 flex justify-end">
                    <button
                      onClick={() => {
                        if (step < QUESTIONS.length - 1) setStep(step + 1);
                        else setIsCompleted(true);
                        scrollToContainer();
                      }}
                      className="btn-shine px-8 py-4 bg-white text-black font-medium uppercase text-[11px] tracking-widest hover:bg-[#e2e2e6] active:scale-[0.98] transition-all rounded-full"
                    >
                      Готово →
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex flex-col items-center justify-center h-full text-center py-6 relative z-20"
              >
                <div className="relative w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full border border-white/30 animate-ping [animation-duration:2.4s]" />
                  <CheckCircle2 className="w-8 h-8 text-white relative z-10" />
                </div>

                <h3 className="text-[13px] font-light uppercase tracking-[0.2em] text-white/50 mb-6">Бриф готов</h3>

                <div className="flex flex-wrap justify-center gap-2 max-w-xl mb-8">
                  {answers.flatMap(a => a.labels).map(label => (
                    <span key={label} className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white/80 text-[12px] font-light tracking-wide">
                      {label}
                    </span>
                  ))}
                </div>

                <p className="max-w-md text-white/40 mb-10 font-light text-sm leading-relaxed">
                  Мы перенесли ответы в форму заявки. Оставьте контакты — свяжемся в течение 30 минут в рабочее время и предложим формат работы и оценку.
                </p>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <button
                    onClick={() => scrollTo('contact-form')}
                    className="btn-shine w-full sm:w-auto px-8 py-4 bg-white text-black font-medium uppercase text-[11px] tracking-widest hover:bg-[#e2e2e6] active:scale-[0.98] transition-all rounded-full"
                  >
                    Отправить бриф
                  </button>
                  <button
                    onClick={() => {
                      setStep(0);
                      setIsCompleted(false);
                      setSelections({});
                      scrollToContainer();
                    }}
                    className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium uppercase text-[11px] tracking-widest hover:bg-white/5 transition-all rounded-full"
                  >
                    Заполнить заново
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
