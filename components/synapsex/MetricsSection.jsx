'use client';
import { motion } from 'framer-motion';
import CountUp from '../premium/CountUp';

// Цифры совпадают с тем, что сайт уже заявляет в других местах:
// 100+ проектов (мета-описание главной), 0,3 с загрузки (FAQ),
// рейтинг 5,0 (разметка отзывов) — расходиться им нельзя.
const metrics = [
  { to: 100, suffix: '+', label: 'Проектов для бизнеса' },
  { to: 0.3, decimals: 1, suffix: ' с', label: 'Загрузка страницы' },
  { to: 5, decimals: 1, label: 'Средняя оценка клиентов' },
];

export default function MetricsSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6 flex flex-col items-center">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
        >
          Art.Vision в цифрах
        </motion.p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 w-full text-center md:divide-x md:divide-white/10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center md:px-8"
            >
              <h3 className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                <CountUp to={m.to} decimals={m.decimals} suffix={m.suffix} />
              </h3>
              <motion.span
                aria-hidden="true"
                className="block h-px w-12 bg-white/30 mt-6 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
              <p className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
