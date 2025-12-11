'use client';
import Image from 'next/image';

const team = [
  {
    name: "Максим Песов",
    role: "Founder & Art Director",
    image: "/images/seo.webp?q=80&w=1887&auto=format&fit=crop", 
    quote: "Дизайн — это не как оно выглядит, а как оно работает."
  },
  {
    name: "Анастасия Никульская",
    role: "Lead Developer",
    image: "/images/developer.webp?q=80&w=1964&auto=format&fit=crop",
    quote: "Код должен быть таким же чистым, как и совесть."
  }
];

export default function Team() {
  return (
    <section className="relative w-full py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            Лица <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white">Бренда</span>
          </h2>
        </div>

        {/* Сетка: На десктопе 4 колонки, чтобы фото были не огромными, или 2 узкие */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              
              {/* FIX: Заменили h-[400px] на aspect-[3/4].
                 Теперь блок всегда держит пропорцию вертикального фото.
              */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border border-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  // object-top гарантирует, что лицо (верх фото) не обрежется
                  className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Градиент снизу, чтобы текст читался на любом фоне */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                
                {/* Текст поверх фото */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
                  <div className="border-l-2 border-purple-500 pl-4 mb-4">
                    <h3 className="text-2xl font-bold text-white uppercase leading-none mb-1">{member.name}</h3>
                    <p className="text-gray-300 font-mono text-[10px] tracking-widest uppercase">{member.role}</p>
                  </div>
                  <p className="font-mono text-xs text-gray-400 italic opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    "{member.quote}"
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}