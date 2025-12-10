'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- БАЗОВЫЕ ЦЕНЫ И КОНФИГ ---
const PRICES = {
  landing: { base: 19000, design: 20000, support: 2000 },
  corporate: { base: 34000, design: 25000, support: 3500 },
  shop: { base: 55000, design: 30000, support: 9000 },
  seo: 2900,
  admin: 5000,
  calculator: 3500,
  crm: 3500,
  mobile: 0, 
};

export default function SmartCalculator({ onUpdate }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [discountActive, setDiscountActive] = useState(false);

  // --- ДИНАМИЧЕСКИЕ ВОПРОСЫ ---
  const questions = useMemo(() => {
    const selectedType = selections['type'] || 'landing'; 
    const typeConfig = PRICES[selectedType];

    return [
      {
        id: 'type',
        title: 'Тип проекта',
        subtitle: '/// ЭТАП 1',
        options: [
          { id: 'landing', label: 'Лендинг', price: PRICES.landing.base, desc: 'Одностраничный сайт' },
          { id: 'corporate', label: 'Многостраничный', price: PRICES.corporate.base, desc: 'Корпоративный сайт / Услуги' },
          { id: 'shop', label: 'Интернет-магазин', price: PRICES.shop.base, desc: 'Каталог, корзина, оплата' },
        ]
      },
      {
        id: 'design',
        title: 'Дизайн и Концепция',
        subtitle: '/// ЭТАП 2',
        options: [
          { 
            id: 'has_design', 
            label: 'Макет уже есть', 
            price: 0, 
            desc: 'Или требуется обновление текущего сайта' 
          },
          { 
            id: 'need_design', 
            label: 'Нужен дизайн с нуля', 
            price: typeConfig.design, 
            desc: 'Разработка концепции и визуала' 
          },
        ]
      },
      {
        id: 'addons',
        title: 'Дополнительные опции',
        subtitle: '/// ЭТАП 3',
        multi: true,
        options: [
          { 
            id: 'mobile', 
            label: 'Мобильная версия', 
            price: PRICES.mobile, 
            desc: 'Адаптация под смартфоны и планшеты' 
          },
          { 
            id: 'seo', 
            label: 'Базовое SEO', 
            price: PRICES.seo, 
            desc: 'Настройка для поисковиков' 
          },
          { 
            id: 'crm', 
            label: 'CRM / Telegram', 
            price: PRICES.crm, 
            desc: 'Заявки мгновенно приходят вам в Telegram' 
          },
          // Админку показываем всем, кроме магазина
          ...(selectedType !== 'shop' ? [{ 
            id: 'admin', 
            label: 'Админ-панель', 
            price: PRICES.admin, 
            desc: 'Возможность менять текст и фото' 
          }] : []),
          { 
            id: 'calculator', 
            label: 'Калькулятор для клиентов', 
            price: PRICES.calculator, 
            desc: 'Скрипт расчета цен по вашему прайсу' 
          },
          { 
            id: 'support', 
            label: 'Поддержка', 
            price: 0, 
            desc: `1 мес. бесплатно, далее ${typeConfig.support} ₽/мес` 
          },
        ]
      }
    ];
  }, [selections]);

  // Подсчет итоговой стоимости
  const total = useMemo(() => {
    let sum = 0;
    
    // 1. База
    if (selections.type) {
      sum += PRICES[selections.type].base;
    }

    // 2. Дизайн
    if (selections.type && selections.design === 'need_design') {
      sum += PRICES[selections.type].design;
    }

    // 3. Допы
    if (selections.addons) {
      const addonsQ = questions.find(q => q.id === 'addons');
      selections.addons.forEach(addonId => {
        const option = addonsQ.options.find(opt => opt.id === addonId);
        if (option) sum += option.price;
      });
    }

    // Скидка
    if (discountActive) {
      sum = Math.round(sum * 0.9);
    }

    return sum;
  }, [selections, discountActive, questions]);

  // --- ПЕРЕДАЧА ДАННЫХ РОДИТЕЛЮ ---
  useEffect(() => {
    if (!onUpdate) return;

    // Генерируем красивый текст для заявки
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

    const summaryText = `[РАСЧЕТ С САЙТА]: Тип: ${typeLabel}. Дизайн: ${designLabel}. Опции: ${addonsLabels.join(', ') || 'Нет'}. Скидка: ${discountActive ? 'Да (-10%)' : 'Нет'}. ИТОГО: ${total} руб.`;

    onUpdate({
      total: total,
      summary: summaryText
    });

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
        if (step < questions.length - 1) setStep(s => s + 1);
        else setIsCompleted(true);
      }, 250);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const nextStep = () => {
    if (step < questions.length - 1) setStep(s => s + 1);
    else setIsCompleted(true);
  };

  const restart = () => {
    setStep(0);
    setIsCompleted(false);
    setSelections({});
    setDiscountActive(false);
  };

  const currentQ = questions[step];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-12 relative z-10">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
            Рассчитать <span className="text-purple-500">Стоимость</span>
          </h2>
          <p className="font-mono text-gray-500 text-xs uppercase tracking-widest">
            /// Онлайн конфигуратор
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-12 relative overflow-hidden min-h-[600px] flex flex-col justify-between shadow-2xl">
          
          {!isCompleted && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="flex justify-between items-start mb-8 md:mb-12 relative z-20">
            <div>
              {step > 0 && !isCompleted && (
                <button 
                  onClick={prevStep}
                  className="text-gray-500 hover:text-white flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  ← Назад
                </button>
              )}
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Итого:</div>
              <div className="text-3xl md:text-4xl font-black tabular-nums tracking-tight text-white flex flex-col items-end">
                 <motion.span
                   key={total}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                 >
                   {total.toLocaleString()} ₽
                 </motion.span>
                 
                 {discountActive && (
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded mt-1">
                      -10% применено
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
                  <span className="font-mono text-purple-500 text-xs mb-2 block">{currentQ.subtitle}</span>
                  <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">{currentQ.title}</h3>
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
                          group relative p-5 border rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px]
                          ${isSelected 
                            ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                            : 'bg-white/5 border-white/5 hover:border-purple-500/30 hover:bg-white/10'
                          }
                        `}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-lg font-bold uppercase leading-tight ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                              {opt.label}
                            </span>
                            {isSelected && <span className="text-purple-400">●</span>}
                          </div>
                          <p className="font-mono text-xs text-gray-500 leading-relaxed max-w-[90%]">
                            {opt.desc}
                          </p>
                        </div>
                        
                        {/* ЦЕНА */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                           <span className={`text-sm font-bold ${opt.price === 0 ? 'text-green-400' : 'text-white'}`}>
                             {opt.price === 0 
                               ? 'Бесплатно' 
                               : (currentQ.id === 'type' 
                                   ? `${opt.price.toLocaleString()} ₽` 
                                   : `+ ${opt.price.toLocaleString()} ₽`
                                 )
                             }
                           </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

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

                {currentQ.multi && (
                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={nextStep}
                      className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-colors rounded-full"
                    >
                      Рассчитать
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
                <div className="w-20 h-20 rounded-full border-2 border-purple-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <span className="text-3xl">✓</span>
                </div>
                
                <h3 className="text-lg font-mono text-gray-400 mb-2 uppercase tracking-widest">Финальная оценка</h3>
                
                <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-4 tracking-tighter">
                  {total.toLocaleString()} ₽
                </div>

                {discountActive && (
                   <div className="mb-6 text-green-400 font-mono text-xs uppercase border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">
                     С учетом скидки 10%
                   </div>
                )}
                
                <p className="max-w-md text-gray-500 mb-8 font-mono text-xs leading-relaxed">
                  Мы зафиксировали конфигурацию. Оставьте заявку, чтобы обсудить детали и забронировать цену.
                </p>

                <div className="flex flex-col w-full sm:w-auto gap-3">
                  <button 
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-purple-500 transition-all rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  >
                    Оставить заявку
                  </button>
                  
                  <button 
                    onClick={restart}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-gray-400 hover:text-white hover:border-white/30 font-bold uppercase text-xs tracking-widest transition-colors rounded-lg"
                  >
                    Рассчитать заново
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