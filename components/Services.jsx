'use client';
import { useRef } from 'react';

const services = [
  { 
    id: "01", 
    title: "Разработка", 
    description: "Полный цикл создания цифровых продуктов. От одностраничных сайтов до сложных WebGL-систем.",
    tags: ["Frontend", "Backend", "WebGL / Three.js", "React & Next.js", "Highload", "CMS Integration"]
  },
  { 
    id: "02", 
    title: "UI/UX Дизайн", 
    description: "Проектируем интерфейсы, которые удерживают внимание. Логика, помноженная на эмоции.",
    tags: ["Art Direction", "Prototyping", "Mobile Apps", "Design Systems", "Motion Design", "3D Assets"]
  },
  { 
    id: "03", 
    title: "Брендинг", 
    description: "Упаковка смыслов в визуальные образы. Создаем бренды, которые хочется носить на себе.",
    tags: ["Strategy", "Logo & Identity", "Brandbook", "Merch Design", "Social Media", "Naming"]
  },
  { 
    id: "04", 
    title: "Маркетинг", 
    description: "Не просто запускаем сайт, а делаем так, чтобы о нем узнали. Аналитика и трафик.",
    tags: ["SEO Optimization", "Performance", "Analytics", "Copywriting", "Strategy", "Launch"]
  }
];

export default function Services() {
  return (
    <section className="relative w-full py-32 bg-[#050505] text-white z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Заголовок */}
        <div className="mb-20 border-b border-white/20 pb-8 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Наши Услуги
          </h2>
          <span className="font-mono text-purple-500 hidden md:block">/// SYSTEM_CAPABILITIES</span>
        </div>

        {/* Список услуг */}
        <div className="flex flex-col">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative border-b border-white/10 transition-colors hover:border-purple-500/50"
            >
              {/* Верхняя часть (Всегда видна) */}
              <div className="py-10 cursor-pointer flex flex-col md:flex-row md:items-baseline justify-between gap-6">
                
                {/* ID и Заголовок */}
                <div className="flex items-baseline gap-8 md:gap-16 transition-transform duration-500 group-hover:translate-x-4">
                  <span className="text-gray-600 font-mono text-xl group-hover:text-purple-500 transition-colors duration-300">
                    ({service.id})
                  </span>
                  <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:text-purple-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Стрелка-индикатор */}
                <div className="hidden md:block pr-4">
                  <span className="inline-block text-2xl text-gray-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                    ↗
                  </span>
                </div>
              </div>

              {/* Скрытая часть (Раскрывается при наведении) */}
              {/* max-h-0 -> max-h-[300px] обеспечивает плавную анимацию высоты на CSS */}
              <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[400px] opacity-0 group-hover:opacity-100">
                <div className="pb-10 pl-0 md:pl-[120px] flex flex-col md:flex-row gap-8 md:gap-16">
                  
                  {/* Описание */}
                  <p className="font-mono text-gray-400 text-sm leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  {/* Теги (Полезный интерактив) */}
                  <div className="flex flex-wrap gap-2 max-w-xl">
                    {service.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-wider text-gray-300 hover:bg-white hover:text-black hover:border-white transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
              
              {/* Фоновая подсветка при наведении */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}