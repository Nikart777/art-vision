'use client';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const { progress, active } = useProgress(); 
  const [percentage, setPercentage] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null); 
  const [isFinished, setIsFinished] = useState(false);

  // 1. Плавная интерполяция (Математика загрузки)
  useEffect(() => {
    const targetProgress = !active ? 100 : progress;
    
    const timer = setInterval(() => {
      setPercentage((prev) => {
        const diff = targetProgress - prev;
        if (diff === 0) return prev;
        return Math.min(prev + Math.ceil(diff * 0.1), 100); 
      });
    }, 20);

    return () => clearInterval(timer);
  }, [progress, active]);


  // 2. Анимация выхода (Шторка)
  useEffect(() => {
    if (percentage === 100 && !isFinished) {
      setIsFinished(true);
      
      const tl = gsap.timeline({
        onComplete: onComplete,
        defaults: { ease: "power4.inOut" }
      });

      // Текст уходит вверх
      tl.to(textRef.current, { y: -50, opacity: 0, duration: 0.8 });
      
      // Полоска вспыхивает на всю ширину и гаснет
      tl.to(barRef.current, { width: '100vw', height: '2px', duration: 0.5 }, "-=0.5")
        .to(barRef.current, { opacity: 0, duration: 0.2 });

      // Шторка открывает сайт (Clip Path Reveal)
      tl.to(containerRef.current, { 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
        duration: 1.2, 
        delay: 0.1 
      });
    }
  }, [percentage, isFinished, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Фоновый шум (Grain) для премиум эффекта */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div ref={textRef} className="text-center font-mono relative z-10 mix-blend-difference px-4">
        
        {/* Статус загрузки */}
        <div className="flex items-center justify-center gap-3 mb-4 md:mb-8 opacity-60">
           <span className={`w-2 h-2 rounded-full ${percentage < 100 ? 'bg-purple-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}></span>
           <span className="text-[10px] md:text-xs uppercase tracking-[0.3em]">
             {percentage < 100 ? "Синхронизация..." : "Доступ Разрешен"}
           </span>
        </div>
        
        {/* Огромные цифры с градиентом */}
        <div className="text-[18vw] md:text-[12rem] font-black leading-none tracking-tighter tabular-nums select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
          {Math.round(percentage)}
        </div>

        {/* Техническая строка */}
        <div className="mt-4 md:mt-8 text-[10px] text-gray-500 font-mono uppercase tracking-widest h-4 overflow-hidden flex justify-center">
           <span className="inline-block min-w-[200px] text-center animate-pulse">
             {active ? `Загрузка модулей` : 'Система готова к запуску'}
           </span>
        </div>
      </div>

      {/* Тонкий прогресс-бар внизу (Неоновый) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div 
           ref={barRef}
           className="h-full bg-purple-600 shadow-[0_0_40px_#9333ea] transition-[width] duration-75 ease-linear"
           style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}