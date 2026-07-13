'use client';
import { motion } from 'framer-motion';

const brands = [
  "CyberX", "Hosta Tea", "Gazprom", "Yandex", "Sber", "MTS", "Avito", "Tinkoff"
];

export default function Clients() {
  return (
    <section className="w-full py-24 bg-background-light dark:bg-background-dark/50 border-y border-gray-100 dark:border-white/5 overflow-hidden transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 mb-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Нам доверяют лидеры</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="text-3xl md:text-5xl font-black text-gray-300 dark:text-white/10 uppercase tracking-tighter hover:text-primary transition-colors cursor-default select-none"
            >
              {brand}
            </div>
          ))}
        </motion.div>

        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-light dark:from-background-dark/50 to-transparent z-10 transition-colors"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-light dark:from-background-dark/50 to-transparent z-10 transition-colors"></div>
      </div>
    </section>
  );
}