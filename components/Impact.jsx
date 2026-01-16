'use client';
import { motion } from 'framer-motion';
import { PhoneCall, CalendarDays, Coins, CheckSquare } from 'lucide-react';

const impacts = [
  {
    id: 1,
    title: "Звонки и Заявки",
    value: "15-20",
    desc: "Среднее количество заявок в день у наших клиентов в нише ремонта и услуг.",
    icon: <PhoneCall className="w-6 h-6 text-green-500" />,
    colSpan: "md:col-span-2",
  },
  {
    id: 2,
    title: "Срок запуска",
    value: "5 дней",
    desc: "От первого звонка до рабочего сайта с рекламой. Не тянем резину.",
    icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 3,
    title: "Окупаемость",
    value: "1 мес",
    desc: "Низкая стоимость разработки позволяет отбить вложения с первого заказа.",
    icon: <Coins className="w-6 h-6 text-yellow-500" />,
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "Договор",
    value: "Белоe",
    desc: "Работаем официально. Предоставляем акты выполненных работ и чеки.",
    icon: <CheckSquare className="w-6 h-6 text-purple-500" />,
    colSpan: "md:col-span-2",
  }
];

export default function Impact() {
  return (
    <section className="relative w-full py-24 bg-[#050505] px-4 md:px-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white max-w-2xl">
            Что вы получите <br /> <span className="text-gray-600">на выходе?</span>
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
              className={`p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-green-500/20 transition-colors group ${item.colSpan}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-4xl md:text-5xl font-bold text-white tracking-tighter">
                  {item.value}
                </span>
              </div>

              <h3 className="text-lg font-bold uppercase mb-2 text-gray-200">{item.title}</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}