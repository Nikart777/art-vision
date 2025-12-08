'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const sectors = [
  { 
    id: 1, 
    name: "Строительство и Ремонт", 
    sub: "Окна / Потолки / Дома", 
    // Фото стройки/интерьера
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Авто и Логистика", 
    sub: "Эвакуаторы / СТО / Перевозки", 
    // Фото авто/дороги
    image: "https://images.unsplash.com/photo-1562920616-0b6b6a6c2764?q=80&w=2069&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Сфера Услуг", 
    sub: "Клининг / Юристы / Мастера", 
    // Фото минималистичного инструмента/офиса
    image: "https://images.unsplash.com/photo-1581578731117-104f2a8631eb?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Медицина и Красота", 
    sub: "Стоматологии / Салоны / Клиники", 
    // Фото чистой клиники
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Производство и B2B", 
    sub: "Заводы / Оборудование / Опт", 
    // Фото индастриал
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
  },
];

export default function Sectors() {
  const [activeImg, setActiveImg] = useState(sectors[0].image);

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden">
      
      {/* ФОНОВАЯ КАРТИНКА */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700">
        <div className="absolute inset-0 bg-black/85 z-10"></div> {/* Чуть темнее фон, чтобы текст читался */}
        <motion.img 
          key={activeImg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.7 }}
          src={activeImg} 
          className="w-full h-full object-cover grayscale"
          alt="Sector Background"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Левая колонка: Оффер */}
          <div className="lg:w-1/3">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-6">
              От Стартапа<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white">
                До Завода
              </span>
            </h2>
            <div className="h-[2px] w-20 bg-purple-500 mb-6"></div>
            <p className="font-mono text-gray-400 text-sm leading-relaxed mb-6">
              Масштаб бизнеса не важен. Важна подача. 
              Мы берем простые ниши — установку окон, автосервис или клининг — и упаковываем их так, что клиент видит в вас лидера рынка.
            </p>
            <p className="font-mono text-white text-sm leading-relaxed border-l-2 border-white/20 pl-4">
              "Даже если вы продаете кирпичи, ваш сайт должен выглядеть как бутик."
            </p>
          </div>

          {/* Правая колонка: Список */}
          <div className="lg:w-2/3">
            {sectors.map((sector) => (
              <div 
                key={sector.id}
                onMouseEnter={() => setActiveImg(sector.image)}
                className="group flex items-center justify-between border-b border-white/10 py-8 cursor-pointer hover:pl-8 hover:bg-white/5 transition-all duration-300 pr-4"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-purple-500 text-sm opacity-50 group-hover:opacity-100">
                    0{sector.id}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold uppercase text-gray-400 group-hover:text-white transition-colors">
                    {sector.name}
                  </h3>
                </div>
                
                {/* Подкатегории видны на десктопе */}
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest text-gray-600 group-hover:text-purple-400 text-right">
                  [{sector.sub}]
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}