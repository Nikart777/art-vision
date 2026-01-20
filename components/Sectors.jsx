'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Car, Home, Store, Truck, GraduationCap, Armchair, Scissors, Hammer, ArrowRight } from 'lucide-react';

const sectors = [
  {
    id: 1,
    name: "Стройка и Ремонт",
    sub: "Окна / Потолки",
    href: "/solutions/windows-construction/",
    icon: <Hammer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Автобизнес",
    sub: "СТО / Запчасти",
    href: "/solutions/auto-services/",
    icon: <Car className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1978&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Мебель и Кухни",
    sub: "На заказ / Шкафы",
    href: "/solutions/furniture-kitchens/",
    icon: <Armchair className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Красота и Услуги",
    sub: "Салоны / Клиники",
    href: "/solutions/beauty-health/",
    icon: <Scissors className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Логистика",
    sub: "Спецтехника / Грузы",
    href: "/solutions/logistics-transport/",
    icon: <Truck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Обучение",
    sub: "Юристы / Курсы",
    href: "/solutions/services-training/",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Sectors() {
  const [activeImg, setActiveImg] = useState(sectors[0].image);

  return (
    <section className="relative w-full py-24 bg-background-light dark:bg-background-dark overflow-hidden border-b border-gray-100 dark:border-white/5 transition-colors">

      {/* DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/90 dark:bg-black/90 z-10 transition-colors"></div>
        <motion.div
          key={activeImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={activeImg} className="w-full h-full object-cover grayscale" alt="Sector Background" />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Нишевые решения</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Готовые Решения <br /> <span className="text-gradient">Для Бизнеса</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 font-medium text-lg">
            Отраслевая экспертиза в разработке сайтов, которые учитывают специфику вашей ниши.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={sector.href}
              onMouseEnter={() => setActiveImg(sector.image)}
              className="group relative flex flex-col justify-between p-8 h-[240px] rounded-3xl bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/10 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex justify-between items-start">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-500">
                  {sector.icon}
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {sector.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">
                  {sector.sub}
                </p>
              </div>

              {/* Decorative accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}