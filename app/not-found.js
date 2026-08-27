'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Куда уводить человека с несуществующего адреса. Раньше здесь была
// единственная ссылка на главную — то есть тупик: посетитель с битой
// ссылки терялся вместо того, чтобы попасть в коммерческий раздел.
// Порядок — по маржинальности, как и в остальной навигации (goal.md §6).
const EXITS = [
  { href: '/services/', title: 'Услуги и цены', hint: 'Сайты, магазины, CRM, приложения' },
  { href: '/solutions/', title: 'Решения для отраслей', hint: 'Как это работает в вашей нише' },
  { href: '/cases/', title: 'Кейсы', hint: 'Проекты с цифрами результата' },
];

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden py-24 px-6">

      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">

        {/* Призрачная «404» на фоне — декоративная, поэтому убрана из семантики */}
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="pointer-events-none select-none absolute -top-8 left-1/2 -translate-x-1/2 text-[9rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent"
        >
          404
        </motion.span>

        <div className="relative z-10 pt-24 sm:pt-32">
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-4 text-white">
            Страница не найдена
          </h1>
          <p className="font-mono text-purple-500 text-sm mb-4">
            /// ERR_PAGE_NOT_FOUND: DESTINATION_UNKNOWN
          </p>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed">
            Адрес устарел или в нём опечатка. Вот куда обычно шли те, кто попадал сюда.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-left">
            {EXITS.map((exit) => (
              <Link
                key={exit.href}
                href={exit.href}
                className="group flex flex-col gap-1 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all"
              >
                <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  {exit.title}
                </span>
                <span className="text-xs text-white/40 leading-relaxed">{exit.hint}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-all rounded-full"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>

    </div>
  );
}
