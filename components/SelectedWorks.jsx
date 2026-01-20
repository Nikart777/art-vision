'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, TrendingUp, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Кухни-Мария (Диллер)",
    category: "Мебель на заказ",
    result: "15 замеров/день",
    link: "/solutions/furniture-kitchens/",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Груз-Логистика 24",
    category: "Аренда спецтехники",
    result: "Рост парка x2",
    link: "/solutions/logistics-transport/",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Автосервис PRO",
    category: "СТО и Детейлинг",
    result: "+200 звонков",
    link: "/solutions/auto-services/",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1978&auto=format&fit=crop"
  }
];

export default function SelectedWorks() {
  const containerRef = useRef(null);

  return (
    <section id="works" ref={containerRef} className="relative w-full py-24 bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-20">

        {/* HEADLINE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 dark:border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Портфолио</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Наши <span className="text-gradient">Кейсы</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm max-w-xs uppercase tracking-tight">
              Мы работаем с реальным сектором. От мебельных цехов до логистических хабов.
            </p>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={project.link}
              className="group relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 py-8 md:py-12 rounded-3xl px-8 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline md:items-center relative z-20">

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-8">{project.category}</span>
                </div>

                <div className="flex items-center gap-8 mt-6 md:mt-0 w-full md:w-auto">
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                    <TrendingUp className="w-4 h-4 text-primary group-hover:text-white" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Результат</span>
                      <span className="font-bold text-sm tracking-tight">{project.result}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* FLOATING PREVIEW IMAGE (Desktop only) */}
              <div className="absolute right-40 top-1/2 -translate-y-1/2 w-64 h-40 hidden lg:block opacity-0 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 pointer-events-none z-30">
                <Image
                  src={project.image}
                  fill
                  alt={`${project.category}: ${project.title} - пример работы Art.Vision`}
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
              </div>

            </Link>
          ))}
        </div>

        {/* VIEW ALL CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/cases/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary/20 hover:bg-primary/5 font-black uppercase text-xs tracking-widest transition-all"
          >
            Смотреть все кейсы
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}