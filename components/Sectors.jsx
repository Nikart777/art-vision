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
    icon: <Hammer className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Автобизнес",
    sub: "СТО / Запчасти",
    href: "/solutions/auto-services/",
    icon: <Car className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1978&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Мебель и Кухни",
    sub: "На заказ / Шкафы",
    href: "/solutions/furniture-kitchens/",
    icon: <Armchair className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Красота и Услуги",
    sub: "Салоны / Клиники",
    href: "/solutions/beauty-health/",
    icon: <Scissors className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Логистика",
    sub: "Спецтехника / Грузы",
    href: "/solutions/logistics-transport/",
    icon: <Truck className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Обучение",
    sub: "Юристы / Курсы",
    href: "/solutions/services-training/",
    icon: <GraduationCap className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Sectors() {
  const [activeImg, setActiveImg] = useState(sectors[0].image);

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden font-sans">

      {/* DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <motion.div
          key={activeImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={activeImg} className="w-full h-full object-cover grayscale" alt="" />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-10 lg:px-20">

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col mb-16 text-center"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Нишевые решения
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
            Сайты для вашей<br/>ниши и отрасли
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Разработка сайтов для ресторана, клиники, автосервиса, юридической компании и других ниш — с учётом специфики и коммерческих факторов вашего бизнеса.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link
                href={sector.href}
                onMouseEnter={() => setActiveImg(sector.image)}
                className="group relative flex flex-col justify-between p-6 h-[220px] rounded-lg bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="p-3 bg-white/5 rounded-lg text-white/70 group-hover:text-white transition-colors duration-500">
                    {sector.icon}
                  </div>
                  <div className="h-8 w-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white group-hover:text-black transition-all transform group-hover:-rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="z-10">
                  <h3 className="text-xl font-light tracking-tight mb-2 text-white/90 group-hover:text-white transition-colors uppercase">
                    {sector.name}
                  </h3>
                  <p className="text-[11px] font-light uppercase tracking-[0.15em] text-white/40 group-hover:text-white/60 transition-colors">
                    {sector.sub}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}