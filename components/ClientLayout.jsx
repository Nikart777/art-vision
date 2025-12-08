'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function ClientLayout({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      
      {/* Навигация (Menu) */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between mix-blend-difference pointer-events-none">
        {/* Логотип */}
        <span className="text-xl font-bold tracking-tighter uppercase pointer-events-auto cursor-pointer">
          Art.Vision
        </span>
        
        {/* Гамбургер / Меню */}
        <div className="pointer-events-auto cursor-pointer group flex flex-col items-end">
           <span className="text-sm font-mono uppercase group-hover:text-purple-400 transition-colors">Menu</span>
           <span className="h-[1px] w-8 bg-white group-hover:w-12 group-hover:bg-purple-400 transition-all duration-300 mt-1"></span>
           <span className="h-[1px] w-4 bg-white group-hover:w-12 group-hover:bg-purple-400 transition-all duration-300 mt-1 delay-75"></span>
        </div>
      </nav>
      
      {/* Весь контент сайта рендерится здесь */}
      {children}

    </ReactLenis>
  );
}