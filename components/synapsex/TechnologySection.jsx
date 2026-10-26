'use client';
import { motion } from 'framer-motion';
import MaskReveal from '../premium/MaskReveal';

const features = [
  { title: "Платформы и SaaS", desc: "Сервисы с личными кабинетами, подписками и сложной логикой — от онлайн-трансляций до ботов и аналитики." },
  { title: "E-commerce", desc: "Интернет-магазины с конфигураторами, каталогом, личным кабинетом и интеграциями с CRM и 1С." },
  { title: "Корпоративные сайты", desc: "Флагманский сайт компании: архитектура разделов, контент и дизайн на уровне бренда." },
  { title: "GEO-сопровождение", desc: "Выводим бренд в ответы Алисы, Яндекс Нейро, ChatGPT и GigaChat — с ежемесячным отчётом.", href: "#geo" },
  { title: "Развитие и поддержка", desc: "После запуска: аналитика, новые функции, A/B-тесты и стабильная работа без простоев." },
];

const EASE = [0.22, 1, 0.36, 1];

export default function TechnologySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.0, delay: 0.3, staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col bg-black overflow-hidden px-8 sm:px-12 md:px-16 py-12 sm:py-16">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full flex-col md:flex-row flex md:justify-between md:items-start gap-6">
        <MaskReveal
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em] uppercase"
          lines={['Наши', <span key="a" className="accent-serif">услуги</span>]}
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
        >
          Полный цикл — стратегия, дизайн, разработка, рост и GEO — для компаний, которым важен уровень.
        </motion.p>
      </div>

      <div className="flex-1 min-h-[30vh] relative z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 w-full"
      >
        {features.map((f, i) => (
          <motion.div key={f.title} variants={itemVariants} className="group flex flex-col">
            <motion.span
              aria-hidden="true"
              variants={lineVariants}
              className="block h-px w-full bg-white/25 origin-left mb-5"
            />
            <span className="flex items-center gap-2 text-white/35 text-[11px] tracking-[0.2em] mb-3">
              0{i + 1}
              {f.href && <span className="rounded-full bg-white px-2 py-px text-[9px] font-bold tracking-[0.15em] text-black">NEW</span>}
            </span>
            <h3 className="text-white text-[15px] sm:text-[17px] font-normal mb-2 transition-transform duration-500 group-hover:translate-x-1">
              {f.href ? <a href={f.href} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">{f.title}</a> : f.title}
            </h3>
            <p className="text-white/45 text-[12px] sm:text-[14px] leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
