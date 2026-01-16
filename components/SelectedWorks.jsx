'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Кухни-Мария (Диллер)",
    category: "Мебель на заказ",
    result: "15 замеров/день",
    link: "/solutions/furniture-kitchens",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Груз-Логистика 24",
    category: "Аренда спецтехники",
    result: "Рост парка x2",
    link: "/solutions/logistics-transport",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Автосервис PRO",
    category: "СТО и Детейлинг",
    result: "+200 звонков",
    link: "/solutions/auto-services",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1978&auto=format&fit=crop"
  }
];

export default function SelectedWorks() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-[#050505] text-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        {/* HEADLINE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Наши <span className="text-gray-600">Кейсы</span>
          </h2>
          <div className="text-right">
            <p className="text-gray-400 font-mono text-xs max-w-xs mb-2">
              Мы работаем с реальным сектором. От мебельных цехов до автопарков.
            </p>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={project.link}
              className="group relative border-b border-white/10 py-12 md:py-16 hover:bg-white/5 transition-colors duration-500 rounded-lg px-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline md:items-center relative z-20">

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-gray-600 text-sm">0{i + 1}</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-gray-400 pl-8">{project.category}</span>
                </div>

                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <div className="flex flex-col text-right">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Результат</span>
                    <span className="font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded text-sm">{project.result}</span>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-gray-700 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                </div>

              </div>

              {/* HOVER IMAGE */}
              <div className="absolute right-20 top-1/2 -translate-y-1/2 w-48 h-32 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg overflow-hidden border border-white/20 rotate-3 group-hover:rotate-0 transform transition-transform pointer-events-none">
                <Image
                  src={project.image}
                  fill
                  alt={project.title}
                  className="object-cover"
                />
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}