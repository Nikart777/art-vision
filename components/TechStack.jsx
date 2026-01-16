'use client';
import { motion } from 'framer-motion';

const tech = [
  "Next.js 14", "React", "TypeScript", "Tailwind CSS", "Three.js", "WebGL",
  "Node.js", "PostgreSQL", "Supabase", "Strapi", "Docker", "Figma",
  "Framer Motion", "GSAP", "Vercel", "AWS"
];

export default function TechStack() {
  return (
    <section className="w-full py-20 bg-[#050505] border-y border-white/5 overflow-hidden">

      <div className="mb-10 text-center px-4">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          Technologies that scale
        </span>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...tech, ...tech, ...tech].map((item, i) => ( // Repeat 3 times for smooth loop
            <div key={i} className="inline-flex items-center mx-8 md:mx-12">
              <span className="text-2xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 opacity-50 hover:opacity-100 hover:text-white transition-all cursor-default select-none">
                {item}
              </span>
              <span className="ml-8 md:ml-12 w-2 h-2 rounded-full bg-purple-500/20"></span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}