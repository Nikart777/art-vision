'use client';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] text-white pt-20 pb-10 px-4 md:px-12 z-30">
      
      {/* Основной CTA */}
      <div className="border-t border-white/10 pt-20 flex flex-col items-center justify-center text-center">
        <p className="font-mono text-purple-500 mb-8 uppercase tracking-widest">
          Есть идея?
        </p>
        
        <h2 className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter hover:text-purple-500 transition-colors duration-500 cursor-pointer">
          <a href="mailto:hello@art.vision">Напиши Нам</a>
        </h2>
      </div>

      {/* Информация внизу */}
      <div className="mt-32 flex flex-col md:flex-row justify-between items-end gap-8 font-mono text-xs md:text-sm text-gray-500 uppercase">
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Telegram</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Behance</a>
        </div>

        <div className="text-right">
          <p>Art.Vision Agency © 2025</p>
          <p>Helsinki / Worldwide</p>
        </div>

      </div>
    </footer>
  );
}