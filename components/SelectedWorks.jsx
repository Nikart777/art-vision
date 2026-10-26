'use client';
import { motion } from 'framer-motion';
import MaskReveal from './premium/MaskReveal';
import FeaturedProjects from './FeaturedProjects';

const EASE = [0.22, 1, 0.36, 1];

export default function SelectedWorks() {
  return (
    <section
      id="works"
      className="relative w-full py-28 md:py-36 bg-black text-white font-sans transition-colors overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">

        {/* HEADLINE */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1 }}
              className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8"
            >
              Портфолио
            </motion.p>
            <MaskReveal
              className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] uppercase"
              lines={['Избранные', <span key="a" className="accent-serif">проекты</span>]}
            />
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-md md:text-right"
          >
            От платформы онлайн-трансляций для 35 000 врачей и e-commerce с конфигуратором ПК до SaaS-продукта под ключ, международной медицинской ассоциации и фармбренда.
          </motion.p>
        </div>

        <FeaturedProjects />

        <motion.a
          href="/cases/"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="group mt-12 flex items-center justify-center gap-3 text-white/60 hover:text-white text-[12px] uppercase tracking-[0.25em] transition-colors"
        >
          <span className="relative">
            Всё портфолио — ещё 46 проектов
            <span className="absolute left-0 -bottom-1 h-px w-full bg-white/60 origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </motion.a>

      </div>
    </section>
  );
}
