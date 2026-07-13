'use client';

export default function TechStack() {
  const stack = [
    {
      category: "Frontend",
      techs: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"]
    },
    {
      category: "Backend & DB",
      techs: ["Node.js", "Express", "Supabase", "PostgreSQL", "Prisma", "Redis"]
    },
    {
      category: "Infra & CMS",
      techs: ["Vercel", "Docker", "AWS", "Sanity", "Strapi", "WordPress"]
    }
  ];

  return (
    <div className="w-full bg-black font-sans">
      <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col gap-12 relative z-10">
          {stack.map((group, index) => (
            <div key={index} className="space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {String(index + 1).padStart(2, '0')} //
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                  {group.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.techs.map((tech, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}