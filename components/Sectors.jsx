'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Car, Home, Store, Truck, GraduationCap, Armchair, Scissors, Hammer } from 'lucide-react';

const sectors = [
  {
    id: 1,
    name: "Стройка и Ремонт",
    sub: "Окна / Потолки",
    href: "/solutions/windows-construction",
    icon: <Hammer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Автобизнес",
    sub: "СТО / Запчасти",
    href: "/solutions/auto-services",
    icon: <Car className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1978&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Мебель и Кухни",
    sub: "На заказ / Шкафы",
    href: "/solutions/furniture-kitchens",
    icon: <Armchair className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Красота и Услуги",
    sub: "Салоны / Клиники",
    href: "/solutions/beauty-health",
    icon: <Scissors className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Логистика",
    sub: "Спецтехника / Грузы",
    href: "/solutions/logistics-transport",
    icon: <Truck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Обучение",
    sub: "Юристы / Курсы",
    href: "/solutions/services-training",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Sectors() {
  const [activeImg, setActiveImg] = useState(sectors[2].image); // Default to Furniture image

  return (
    <section className="relative w-full py-24 bg-[#050505] overflow-hidden border-b border-white/5">

      {/* ФОНОВАЯ КАРТИНКА - Динамическая */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <motion.div
          key={activeImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={activeImg} className="w-full h-full object-cover grayscale" alt="Background" />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12">

        <div className="text-center mb-16">
          <span className="font-mono text-xs text-green-500 uppercase tracking-widest mb-2 block">
            Выберите вашу нишу
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Готовые Решения <br /> <span className="text-gray-500">Для Бизнеса</span>
          </h2>
        </div>

        {/* GRID 2x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={sector.href}
              onMouseEnter={() => setActiveImg(sector.image)}
              className="group relative flex flex-col justify-between p-8 h-[240px] rounded-2xl bg-[#0A0A0A]/80 border border-white/5 backdrop-blur-sm hover:bg-green-900/10 hover:border-green-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-green-400 group-hover:bg-green-500/10 transition-colors">
                  {sector.icon}
                </div>
                <span className="opacity-0 group-hover:opacity-100 text-white transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  ↗
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold uppercase text-white mb-2 group-hover:text-green-400 transition-colors">
                  {sector.name}
                </h3>
                <p className="font-mono text-sm text-gray-500 group-hover:text-gray-300">
                  {sector.sub}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}