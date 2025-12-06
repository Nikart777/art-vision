'use client';
import { useState } from 'react';

const services = [
  { 
    id: "01", 
    title: "Разработка", 
    desc: "Frontend / Backend / Highload / 3D Web",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGZ4eThlMXJ4bnJ4bnJ4bnJ4bnJ4bnJ4bnJ4bnJ4bnJ4bnJ4bnJ4YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L8K62iTDkzGX6/giphy.gif"
  },
  { 
    id: "02", 
    title: "Веб-Дизайн", 
    desc: "UI/UX / Анимации / Прототипирование",
    image: "https://media.giphy.com/media/26tn33aiTi1jkl6VU6/giphy.gif"
  },
  { 
    id: "03", 
    title: "Брендинг", 
    desc: "Айдентика / Логотипы / Гайдлайны",
    image: "https://media.giphy.com/media/3o7TKsAds5T6lD6f4y/giphy.gif"
  },
];

export default function Services() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="relative w-full py-32 bg-[#050505] text-white z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="mb-20 border-b border-white/20 pb-8 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Наши Услуги
          </h2>
          <span className="font-mono text-purple-500 hidden md:block">/// SYSTEM_OFFER</span>
        </div>

        <div className="relative">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative border-b border-white/10 py-12 cursor-pointer transition-colors hover:bg-white/5"
              onMouseEnter={() => setActiveImage(service.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 mix-blend-difference">
                <span className="text-purple-500 font-mono text-xl mb-4 md:mb-0 mr-8">
                  ({service.id})
                </span>
                <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="mt-4 md:mt-0 font-mono text-gray-400 text-sm md:text-right w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Фоновая картинка */}
          <div 
            className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] z-0 opacity-20 md:opacity-40 mix-blend-screen transition-opacity duration-500"
            style={{ opacity: activeImage ? 0.4 : 0 }}
          >
             {activeImage && (
               <img src={activeImage} alt="Preview" className="w-full h-full object-cover grayscale contrast-125" />
             )}
          </div>
        </div>
      </div>
    </section>
  );
}