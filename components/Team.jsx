'use client';
import Image from 'next/image';

const team = [
  {
    name: "Максим Песов",
    role: "Founder & Art Director",
    // Замени на свои фото
    image: "/images/seo.webp?q=80&w=1887&auto=format&fit=crop", 
    quote: "Дизайн — это не как оно выглядит, а как оно работает."
  },
  {
    name: "Анастасия Никульская",
    role: "Lead Developer",
    image: "/images/developer.webp",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white uppercase">{member.name}</h3>
                      <p className="text-purple-400 font-mono text-xs tracking-widest uppercase">{member.role}</p>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-gray-400 italic">
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