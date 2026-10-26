'use client';
import { motion } from 'framer-motion';
import { Search, MessageSquare, FileText, Code, Quote, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import MaskReveal from './premium/MaskReveal';
import Magnetic from './premium/Magnetic';
import CountUp from './premium/CountUp';
import { onSpotlightMove } from './premium/spotlight';

const EASE = [0.22, 1, 0.36, 1];

// Нейросети, в ответах которых работаем над видимостью бренда
const ENGINES = ['Алиса', 'Яндекс Нейро', 'ChatGPT', 'Perplexity', 'GigaChat', 'DeepSeek'];

// Ответ в макете чата. mark — бренд, cite — номер источника.
const ANSWER = [
  { t: 'Среди студий, которые делают такие платформы, чаще всего упоминают' },
  { t: 'Art.Vision', mark: true },
  { t: '. Студия разработала MEDPROG — платформу вебинаров для 35 000+ врачей с собственным видеоплеером, потоковыми трансляциями и чатом эфира' },
  { cite: 1 },
  { t: '. Кроме платформ, команда делает e-commerce, SaaS-продукты и корпоративные сайты' },
  { cite: 2 },
  { t: '.' },
];

const SOURCES = ['medprogramcenter.com', '24art-vision.ru'];

// Пример отчёта: доля ответов с упоминанием бренда по месяцам (иллюстрация)
const REPORT = [4, 9, 15, 22, 31, 38];
const REPORT_ENGINES = [
  { name: 'Алиса и Яндекс Нейро', value: 44 },
  { name: 'ChatGPT', value: 36 },
  { name: 'GigaChat', value: 29 },
];

const STEPS = [
  { icon: Search, title: 'Аудит видимости', text: 'Задаём нейросетям сотни вопросов вашей аудитории и фиксируем, кого они называют вместо вас.' },
  { icon: MessageSquare, title: 'Карта вопросов', text: 'Собираем, что люди спрашивают о вашей нише: сравнения, «кто лучше», «сколько стоит», «где заказать».' },
  { icon: FileText, title: 'Контент-ответы', text: 'Экспертные страницы, FAQ и сравнения в формате, который модели охотно цитируют.' },
  { icon: Code, title: 'Техническая база', text: 'Schema.org, llms.txt, чистая индексация и скорость — чтобы краулеры нейросетей видели сайт целиком.' },
  { icon: Quote, title: 'Цитируемость', text: 'Упоминания на авторитетных площадках, справочниках и в отзывах — источниках, которым доверяют модели.' },
  { icon: TrendingUp, title: 'Мониторинг', text: 'Каждый месяц замеряем долю ответов с вашим брендом и корректируем план.' },
];

const DELIVERABLES = [
  'Отчёт по доле ответов в 6 нейросетях',
  'Новые вопросы аудитории и ответы на них',
  'Опубликованные материалы и упоминания',
  'План работ на следующий месяц',
];

const wordVariants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  shown: (i) => ({ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4, delay: 0.6 + i * 0.035 } }),
};

// Ответ нейросети «печатается» по словам. Текст целиком лежит в разметке,
// анимируется только проявление.
function StreamedAnswer() {
  let index = 0;
  return (
    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-white/80">
      {ANSWER.map((part, p) => {
        if (part.cite) {
          const i = index++;
          return (
            <motion.sup key={p} variants={wordVariants} custom={i} className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded bg-white/15 px-1 text-[9px] font-bold text-white">
              {part.cite}
            </motion.sup>
          );
        }
        if (part.mark) {
          const i = index++;
          return (
            <span key={p}>
              {' '}
              <motion.mark variants={wordVariants} custom={i} className="rounded-md bg-white px-1.5 py-0.5 font-bold text-black">
                {part.t}
              </motion.mark>
            </span>
          );
        }
        return part.t.split(' ').map((word, w) => {
          const i = index++;
          return (
            <span key={`${p}-${w}`}>
              {w > 0 || (p > 0 && !part.t.startsWith('.')) ? ' ' : ''}
              <motion.span variants={wordVariants} custom={i}>{word}</motion.span>
            </span>
          );
        });
      })}
    </p>
  );
}

function ChatMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      variants={{ hidden: { opacity: 0, y: 50 }, shown: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } } }}
      onPointerMove={onSpotlightMove}
      className="spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-[#08080a] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]"
    >
      <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/[0.03] px-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          AI-ассистент
        </span>
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        {/* Вопрос пользователя */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: 20 }, shown: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.25, ease: EASE } } }}
          className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-white/[0.08] px-5 py-3.5 text-[14px] sm:text-[15px] text-white/90"
        >
          Кто в России делает сложные платформы для онлайн-конференций врачей?
        </motion.div>

        {/* Ответ нейросети */}
        <div className="flex gap-4">
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]">
            <Sparkles className="h-4 w-4 text-white/80" />
          </span>
          <div className="min-w-0 space-y-5">
            <StreamedAnswer />
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 2.6, ease: EASE } } }}
              className="flex flex-wrap gap-2"
            >
              {SOURCES.map((source, i) => (
                <span key={source} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-white/15 text-[9px] font-bold text-white">{i + 1}</span>
                  {source}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <p className="border-t border-white/10 px-5 py-4 text-[11px] leading-relaxed text-white/35 sm:px-8">
        Иллюстрация цели GEO: бренд звучит в ответе, а ваш сайт стоит в источниках.
      </p>
    </motion.div>
  );
}

function ReportCard() {
  const max = Math.max(...REPORT);
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      variants={{ hidden: { opacity: 0, y: 50 }, shown: { opacity: 1, y: 0, transition: { duration: 1.1, delay: 0.15, ease: EASE } } }}
      onPointerMove={onSpotlightMove}
      className="spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Доля ответов с вашим брендом</p>
          <p className="mt-3 text-[56px] sm:text-[64px] font-light leading-none tracking-[-0.04em] text-white">
            <CountUp to={REPORT[REPORT.length - 1]} suffix="%" />
          </p>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">Пример отчёта</span>
      </div>

      {/* Рост по месяцам */}
      <div className="flex h-36 items-end gap-2 sm:gap-3 border-b border-white/10 pb-3">
        {REPORT.map((value, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-[10px] tabular-nums text-white/40">{value}%</span>
            <motion.span
              className="block w-full origin-bottom rounded-t-md bg-gradient-to-t from-white/20 to-white"
              style={{ height: `${(value / max) * 100}%` }}
              variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 1.2, delay: 0.4 + i * 0.1, ease: EASE } } }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.15em] text-white/30">
        <span>1 мес</span>
        <span>6 мес</span>
      </div>

      {/* По нейросетям */}
      <ul className="mt-7 space-y-4">
        {REPORT_ENGINES.map((engine, i) => (
          <li key={engine.name}>
            <div className="mb-1.5 flex justify-between text-[12px] text-white/65">
              <span>{engine.name}</span>
              <span className="tabular-nums text-white/85">{engine.value}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full origin-left rounded-full bg-white/80"
                style={{ width: `${engine.value}%` }}
                variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.3, delay: 0.9 + i * 0.12, ease: EASE } } }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function GeoSection({ standalone = false }) {
  const ctaHref = standalone ? '/#contact-form' : '#contact-form';

  return (
    <section id="geo" className="relative w-full overflow-hidden bg-black py-28 md:py-36 text-white font-sans">
      {/* Фон: мягкое свечение и точечная сетка */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[140px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Заголовок */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1 }}
              className="mb-8 flex items-center gap-3 text-[13px] sm:text-[14px] uppercase tracking-[0.2em] text-white/40"
            >
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] text-black">New</span>
              Сопровождение
            </motion.p>
            <MaskReveal
              className="text-white font-light text-[clamp(34px,7vw,80px)] leading-[1] tracking-[-0.03em] uppercase"
              lines={['GEO-', <span key="a" className="accent-serif">сопровождение</span>]}
            />
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/60">
              Клиенты всё чаще спрашивают не поисковик, а нейросеть: «кто лучше сделает», «к кому обратиться». GEO — Generative Engine Optimization — делает так, чтобы нейросети знали вашу компанию, рекомендовали её и ставили ссылку на ваш сайт.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ENGINES.map((engine) => (
                <li key={engine} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-light text-white/75">
                  {engine}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Визуалы: ответ нейросети и отчёт */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChatMockup />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <ReportCard />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-white/45">Каждый месяц вы получаете</p>
              <ul className="space-y-3">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-white/80">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Этапы */}
        <div className="relative mt-24">
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-gradient-to-r from-white/50 via-white/20 to-transparent lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.8, ease: EASE }}
          />
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                  onPointerMove={onSpotlightMove}
                  className="spotlight group relative rounded-2xl border border-white/10 bg-[#070708] p-5"
                >
                  <div className="relative z-10 mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] tracking-[0.2em] text-white/35">0{i + 1}</span>
                  </div>
                  <h3 className="relative z-10 mb-2 text-[15px] font-normal uppercase tracking-tight text-white">{step.title}</h3>
                  <p className="relative z-10 text-[12px] leading-relaxed text-white/50">{step.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Призыв */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Magnetic>
            <a
              href={ctaHref}
              className="btn-shine inline-flex h-14 items-center rounded-full bg-white px-9 text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Проверить видимость бренда
            </a>
          </Magnetic>
          {!standalone && (
            <a
              href="/services/geo-soprovozhdenie/"
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              Подробнее об услуге
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
