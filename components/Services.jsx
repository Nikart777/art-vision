'use client';
import Link from 'next/link';
import {
  ArrowUpRight,
  Monitor,
  ShoppingBag,
  Rocket,
  Wrench,
  Smartphone,
  Calculator
} from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Сайт-Визитка / Лендинг",
    href: "/services/corporate-website/",
    description: "Идеально для автосервиса, ремонта или услуг. Одна страница, которая просто продает.",
    icon: <Monitor className="w-8 h-8" />,
    colSpan: "md:col-span-2",
    price: "от 40 000 ₽"
  },
  {
    id: "02",
    title: "Интернет-Магазин",
    href: "/services/ecommerce-development/",
    description: "Каталог товаров с корзиной. Для запчастей, одежды или доставки еды.",
    icon: <ShoppingBag className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    price: "от 90 000 ₽"
  },
  {
    id: "03",
    title: "Бизнес под ключ",
    href: "/services/web-service-development/",
    description: "Сайт + Реклама + CRM. Полная упаковка вашего бизнеса в интернете.",
    icon: <Rocket className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    price: "Индивидуально"
  },
  {
    id: "04",
    title: "Техподдержка",
    href: "/services/ux-ui-design/",
    description: "Обновим старый сайт, починим ошибки, добавим новые фото и цены.",
    icon: <Wrench className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    price: "от 5 000 ₽"
  },
  {
    id: "05",
    title: "Мобильная версия",
    href: "/services/nextjs-development/",
    description: "Адаптируем ваш текущий сайт под смартфоны. Это критично для Яндекс.Карт.",
    icon: <Smartphone className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    price: "от 15 000 ₽"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-24 bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="mb-16 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Наши Услуги</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Понятные Услуги <br /> <span className="text-gradient">Честные Цены</span>
          </h2>
          <p className="max-w-xl text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
            Мы не навязываем лишнее. Выбирайте то, что нужно вашему бизнесу прямо сейчас для реального роста.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 ${service.colSpan}`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">

                <div className="flex justify-between items-start">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    {service.price}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">
                  Подробнее
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              {/* Subtle background element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            </Link>
          ))}

          {/* CALCULATOR CARD */}
          <Link
            href="/#calculator"
            className="group relative p-8 rounded-3xl bg-primary text-white overflow-hidden shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all md:col-span-1 flex flex-col justify-center items-center text-center gap-4"
          >
            <div className="text-3xl font-black tracking-tight">Рассчитать<br />Стоимость</div>
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md">
              <Calculator className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
              Онлайн Калькулятор →
            </p>
          </Link>
        </div>

      </div>
    </section>
  );
}