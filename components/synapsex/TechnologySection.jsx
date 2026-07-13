'use client';
import { motion } from 'framer-motion';

const features = [
  { title: "Сайт-Визитка", desc: "Идеально для автосервиса, ремонта или услуг. Одна страница, которая просто продает." },
  { title: "Интернет-Магазин", desc: "Каталог товаров с корзиной. Для запчастей, одежды или доставки еды." },
  { title: "Бизнес под ключ", desc: "Сайт + Реклама + CRM. Полная упаковка вашего бизнеса в интернете." },
  { title: "Техподдержка", desc: "Обновим старый сайт, починим ошибки, добавим новые фото и цены." },
];

export default function TechnologySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.0, delay: 0.3, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
  };

  return (
    <section className="relative w-full h-[100dvh] flex flex-col bg-black overflow-hidden px-8 sm:px-12 md:px-16 py-12 sm:py-16">
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
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em] uppercase"
        >
          Наши <br />
          Услуги
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
        >
          Создание сайтов под ключ: от простого лендинга до сложного интернет-магазина.
        </motion.p>
      </div>

      <div className="flex-1 relative z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 w-full"
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={itemVariants} className="flex flex-col">
            <h4 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {f.title}
            </h4>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
