'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Кухни-Мария (Диллер)",
    category: "Мебель на заказ",
    result: "15 замеров/день",
    link: "/solutions/furniture-kitchens/",
    image: "/images/case_kitchens.png"
  },
  {
    id: 2,
    title: "Груз-Логистика 24",
    category: "Аренда спецтехники",
    result: "Рост парка x2",
    link: "/solutions/logistics-transport/",
    image: "/images/case_logistics.png"
  },
  {
    id: 3,
    title: "Автосервис PRO",
    category: "СТО и Детейлинг",
    result: "+200 звонков",
    link: "/solutions/auto-services/",
    image: "/images/case_autoservice.png"
  }
];

export default function SelectedWorks() {
  const containerRef = useRef(null);

  return (
    <section id="works" ref={containerRef} className="relative w-full py-24 bg-black text-white font-sans transition-colors overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-20 relative z-10">

        {/* HEADLINE */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col mb-16"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Портфолио
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
            Наши Кейсы
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl">
            Мы работаем с реальным сектором. От мебельных цехов до логистических хабов.
          </p>
        </motion.div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <Link
                href={project.link}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-8 bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col gap-2 relative z-20">
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-light text-white/30 group-hover:text-white/70 transition-colors uppercase tracking-[0.15em]">0{i + 1}</span>
                    <h3 className="text-xl md:text-2xl font-light tracking-tight text-white/90 group-hover:text-white transition-colors uppercase">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-[12px] font-light uppercase tracking-widest text-white/40 pl-8">{project.category}</span>
                </div>

                <div className="flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto relative z-20 pl-8 md:pl-0">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full group-hover:bg-white/10 transition-all">
                    <TrendingUp className="w-4 h-4 text-white/70" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-light uppercase tracking-widest text-white/40">Результат</span>
                      <span className="font-light text-sm tracking-tight text-white/90">{project.result}</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all transform group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}