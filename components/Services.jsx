'use client';
import Link from 'next/link';
import { ArrowUpRight, Monitor, ShoppingBag, Rocket, Wrench, Smartphone } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Сайт-Визитка / Лендинг",
    href: "/services/corporate-website",
    description: "Идеально для автосервиса, ремонта или услуг. Одна страница, которая просто продает.",
    icon: <Monitor className="w-8 h-8" />,
    colSpan: "md:col-span-2",
    gradient: "from-green-900/20 to-transparent",
    price: "от 40 000 ₽"
  },
  {
    id: "02",
    title: "Интернет-Магазин",
    href: "/services/ecommerce-development",
    description: "Каталог товаров с корзиной. Для запчастей, одежды или доставки еды.",
    icon: <ShoppingBag className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    gradient: "from-blue-900/20 to-transparent",
    price: "от 90 000 ₽"
  },
  {
    id: "03",
    title: "Бизнес под ключ",
    href: "/services/web-service-development",
    description: "Сайт + Реклама + CRM. Полная упаковка вашего бизнеса в интернете.",
    icon: <Rocket className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    gradient: "from-purple-900/20 to-transparent",
    price: "Индивидуально"
  },
  {
    id: "04",
    title: "Техподдержка",
    href: "/services/ux-ui-design",
    description: "Обновим старый сайт, починим ошибки, добавим новые фото и цены.",
    icon: <Wrench className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    gradient: "from-gray-800/20 to-transparent",
    price: "от 5 000 ₽"
  },
  {
    id: "05",
    title: "Мобильная версия",
    href: "/services/nextjs-development",
    description: "Адаптируем ваш текущий сайт под смартфоны. Это критично для Яндекс.Карт.",
    icon: <Smartphone className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    gradient: "from-orange-900/20 to-transparent",
    price: "от 15 000 ₽"
  }
];

export default function Services() {
  return (
    <section className="relative w-full py-24 bg-[#050505] text-white z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-12">

        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Понятные Услуги <br /> <span className="text-gray-600">Честные Цены</span>
          </h2>
          <p className="max-w-xl text-gray-400 font-mono text-sm leading-relaxed">
            Мы не навязываем лишнее. Выбирайте то, что нужно вашему бизнесу прямо сейчас.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 overflow-hidden hover:border-green-500/30 transition-all duration-500 ${service.colSpan}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-8">

                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-xl text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    {service.icon}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-green-400">
                    {service.price}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-mono text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

              </div>
            </Link>
          ))}

          {/* CALCULATOR CARD */}
          <Link href="/#calculator" className="group relative p-8 rounded-2xl bg-green-500 text-black border border-transparent overflow-hidden hover:bg-green-400 transition-colors md:col-span-1 flex flex-col justify-center items-center text-center">
            <div className="text-3xl font-black uppercase tracking-tighter mb-2">Рассчитать<br />Стоимость</div>
            <div className="px-4 py-2 border border-black/20 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors">
              Онлайн Калькулятор
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}