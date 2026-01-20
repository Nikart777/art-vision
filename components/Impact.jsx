'use client';
import { motion } from 'framer-motion';
import { PhoneCall, CalendarDays, Coins, CheckSquare } from 'lucide-react';

const impacts = [
  {
    id: 1,
    title: "Звонки и Заявки",
    value: "15-20",
    desc: "Среднее количество заявок в день у наших клиентов в нише ремонта и услуг.",
    icon: <PhoneCall className="w-6 h-6" />,
    colSpan: "md:col-span-2",
  },
  {
    id: 2,
    title: "Срок запуска",
    value: "5 дней",
    desc: "От первого звонка до рабочего сайта с рекламой. Не тянем резину.",
    icon: <CalendarDays className="w-6 h-6" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 3,
    title: "Окупаемость",
    value: "1 мес",
    desc: "Низкая стоимость разработки позволяет отбить вложения с первого заказа.",
    icon: <Coins className="w-6 h-6" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "Договор",
    value: "Белоe",
    desc: "Работаем официально. Предоставляем акты выполненных работ и чеки.",
    icon: <CheckSquare className="w-6 h-6" />,
    colSpan: "md:col-span-2",
  }
];

export default function Impact() {
  return (
    <section className="relative w-full py-24 bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors border-b border-gray-100 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="mb-16 animate-fade-in text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Ваши результаты</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Что вы получите <br /> <span className="text-gradient">на выходе?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-all group ${item.colSpan} shadow-sm hover:shadow-xl hover:shadow-primary/5`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <span className="text-5xl md:text-6xl font-black text-primary/20 group-hover:text-primary/100 transition-colors tracking-tighter">
                  {item.value}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}