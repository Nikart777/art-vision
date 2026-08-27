'use client';
import Image from 'next/image';


const team = [
  {
    id: 1,
    name: "Владимир Новоятлов",
    role: "Founder / Art Director",
    image: "/images/ceo.webp"
  },
  {
    id: 2,
    name: "Михаил",
    role: "Tech Lead (Next.js)",
    image: "/images/techlead.webp"
  },
  {
    id: 3,
    name: "Елена",
    role: "Head of Design",
    image: "/images/design.webp"
  },
  {
    id: 4,
    name: "Дмитрий",
    role: "Backend Architect",
    image: "/images/backend.webp"
  }
];

export default function Team() {
  return (
    <section className="py-32 px-6 md:px-10 lg:px-20 bg-black font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">Команда</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Мы — небольшая, но сфокусированная команда экспертов. Мы не берем все проекты подряд, чтобы уделять каждому максимум внимания.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-6 shadow-xl backdrop-blur-sm">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.role}, команда Art.Vision`}
                  title={`${member.name}, ${member.role}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                    {member.name}
                  </h3>
                  <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}