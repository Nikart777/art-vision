'use client';
import { motion } from 'framer-motion';

// Просто заглушки названий, заменишь на реальные логотипы (svg/png)
const brands = [
  "CyberX", "Hosta Tea", "Gazprom", "Yandex", "Sber", "MTS", "Avito", "Tinkoff"
];

export default function Clients() {
  return (
    <section className="w-full py-20 bg-black border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-10">
        <p className="font-mono text-xs text-center text-gray-500 uppercase tracking-[0.3em]">
          Нам доверяют лидеры рынка
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Скорость бегущей строки
          }}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="text-2xl md:text-4xl font-black text-white/20 uppercase tracking-tighter hover:text-purple-500 transition-colors cursor-default select-none"
            >
              {brand}
            </div>
          ))}
        </motion.div>
        
        {/* Градиентные маски по бокам для плавного исчезновения */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>
    </section>
  );
}