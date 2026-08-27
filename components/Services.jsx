'use client';
import Link from 'next/link';
import {
  ArrowUpRight,
  Monitor,
  ShoppingBag,
  Rocket,
  Wrench,
  Smartphone,
  Database,
  AppWindow,
  Calculator
} from 'lucide-react';

// Порядок карточек = порядок распределения внутреннего веса (см. goal.md §6):
// первыми идут маржинальные кластеры — сайты, CRM, мобильные приложения.
const services = [
  {
    id: "01",
    title: "Лендинг под ключ",
    href: "/services/corporate-website/",
    description: "Идеально для автосервиса, ремонта или услуг. Одна страница, которая просто продает.",
    icon: <Monitor className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-2",
    price: "от 40 000 ₽"
  },
  {
    id: "02",
    title: "Интернет-магазин",
    href: "/services/ecommerce-development/",
    description: "Каталог товаров с корзиной. Для запчастей, одежды или доставки еды.",
    icon: <ShoppingBag className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1",
    price: "от 90 000 ₽"
  },
  {
    id: "03",
    title: "CRM-система",
    href: "/services/razrabotka-crm/",
    description: "Своя CRM под ваши процессы: воронки, задачи, интеграции с сайтом и телефонией.",
    icon: <Database className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1",
    price: "от 180 000 ₽"
  },
  {
    id: "04",
    title: "Мобильное приложение",
    href: "/services/mobile-app-development/",
    description: "Одно приложение сразу на iOS и Android. Проектирование, разработка и публикация в сторах.",
    icon: <AppWindow className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-2",
    price: "от 250 000 ₽"
  },
  {
    id: "05",
    title: "Бизнес под ключ",
    href: "/services/web-service-development/",
    description: "Сайт + Реклама + CRM. Полная упаковка вашего бизнеса в интернете.",
    icon: <Rocket className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1",
    price: "Индивидуально"
  },
  {
    id: "06",
    title: "Техподдержка",
    href: "/services/tech-support/",
    description: "Обновим старый сайт, починим ошибки, добавим новые фото и цены.",
    icon: <Wrench className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1",
    price: "от 5 000 ₽"
  },
  {
    id: "07",
    title: "Мобильная версия",
    href: "/services/mobile-adaptation/",
    description: "Адаптируем ваш текущий сайт под смартфоны. Это критично для Яндекс.Карт.",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1",
    price: "от 15 000 ₽"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-32 text-white overflow-hidden">
      {/* COSMOS BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark cinematic gradients to blend with the rest of the site */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
              Премиальная веб-разработка
            </span>
          </div>
          
          <h2 
            className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tight mb-8 leading-[1.1]"
          >
            Создание сайтов под ключ <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00d4ff] to-white">от лендинга до магазина</span>
          </h2>
          <p className="max-w-2xl text-white/70 font-medium text-lg md:text-xl leading-relaxed">
            Создаём конверсионные сайты, которые превращают посетителей в клиентов. Премиальная разработка на Next.js — запуск от 5 дней.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative rounded-[2rem] p-8 overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl ${service.colSpan}`}
            >
              {/* Inner glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/0 to-[#00d4ff]/0 group-hover:from-[#00d4ff]/10 group-hover:to-transparent transition-all duration-500 rounded-[2rem]"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20 group-hover:scale-110 group-hover:bg-[#00d4ff]/20 group-hover:border-[#00d4ff]/50 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                    {service.icon}
                  </div>
                  <div className="px-5 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-white/90 group-hover:bg-[#00d4ff] group-hover:border-[#00d4ff] group-hover:text-black transition-all duration-500">
                    {service.price}
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-bold tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00d4ff] transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-base font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-[#00d4ff] transition-colors mt-4">
                  Подробнее
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}

          {/* CALCULATOR CARD */}
          <Link
            href="/#calculator"
            className="group relative rounded-[2rem] p-8 overflow-hidden bg-gradient-to-br from-[#00d4ff]/10 to-transparent border border-[#00d4ff]/30 backdrop-blur-2xl hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/20 transition-all duration-500 md:col-span-1 flex flex-col justify-center items-center text-center gap-8 shadow-[0_0_30px_rgba(0,212,255,0.1)] hover:shadow-[0_0_50px_rgba(0,212,255,0.3)]"
          >
            <div 
              className="text-5xl font-bold tracking-tight text-white"
            >
              Рассчитать<br />стоимость
            </div>
            <div className="p-5 rounded-full bg-white text-black group-hover:scale-110 group-hover:bg-[#00d4ff] group-hover:text-white transition-all duration-500 shadow-xl">
              <Calculator className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-opacity">
              Онлайн Калькулятор →
            </p>
          </Link>
        </div>

      </div>
    </section>
  );
}