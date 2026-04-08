'use client';
import Image from 'next/image';

const team = [
  {
    id: 1,
    name: "Владимир Новоятлов",
    role: "Founder / Art Director",
    image: "/images/team_1.jpeg"
  },
  {
    id: 2,
    name: "Михаил",
    role: "Tech Lead (Next.js)",
    image: "/images/team_3.png"
  },
  {
    id: 3,
    name: "Елена",
    role: "Head of Design",
    image: "/images/team_2.png"
  },
  {
    id: 4,
    name: "Дмитрий",
    role: "Backend Architect",
    image: "/images/team_4.png"
  }
];

export default function Team() {
  return (
    <section className="relative w-full py-32 bg-background-light dark:bg-background-dark/80 px-6 md:px-10 lg:px-20 transition-colors">
      <div className="max-w-[1200px] mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-xs font-black uppercase tracking-widest text-primary">Squad</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#101818] dark:text-white uppercase">
              Наша <span className="text-gradient">Команда</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-500 font-medium text-lg leading-relaxed text-right animate-fade-in">
            Люди, которые стоят за каждым пикселем и каждой строчкой кода. Мы горим вашим результатом.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">

              {/* IMAGE */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                <Image
                  src={member.image}
                  fill
                  alt={member.name}
                  className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101818]/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              </div>

              {/* INFO */}
              <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {member.role}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">
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