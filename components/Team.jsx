'use client';
import Image from 'next/image';

const team = [
  {
    id: 1,
    name: "Александр",
    role: "Founder / Art Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Михаил",
    role: "Tech Lead (Next.js)",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Елена",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Дмитрий",
    role: "Backend Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Team() {
  return (
    <section className="relative w-full py-32 bg-[#050505] px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-purple-500 text-xs tracking-widest uppercase mb-2 block">/// Squad</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Команда
            </h2>
          </div>
          <p className="max-w-md text-gray-400 font-mono text-sm leading-relaxed text-right">
            Люди, которые стоят за каждым пикселем и строчкой кода. Фанаты своего дела.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member) => (
            <div key={member.id} className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5">

              {/* IMAGE */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                <Image
                  src={member.image}
                  fill
                  alt={member.name}
                  className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              </div>

              {/* INFO */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {member.role}
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                  {member.name}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}