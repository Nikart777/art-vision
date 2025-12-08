'use client';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const { progress, active } = useProgress(); 
  const [percentage, setPercentage] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false); // Флаг завершения

  // 1. Анимация цифр
  useEffect(() => {
    // Если загрузка реально завершена (active=false) или progress=100
    if (progress === 100 || !active) {
      setPercentage(100);
      return;
    }

    // Плавный рост цифр
    const timer = setInterval(() => {
      setPercentage((prev) => {
        // Если мы близко к цели, просто прыгаем туда
        if (progress - prev < 1) return progress;
        return Math.ceil(prev + (progress - prev) * 0.1);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [progress, active]);


  // 2. FAIL-SAFE TIMEOUT (Предохранитель)
  // Если через 3.5 секунды мы всё еще грузимся — принудительно открываем сайт.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (percentage < 100) {
        console.warn("Loader timed out, forcing open.");
        setPercentage(100);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [percentage]);


  // 3. Логика исчезновения (Exit Animation)
  useEffect(() => {
    // Запускаем анимацию выхода только ОДИН раз, когда стало 100%
    if (percentage === 100 && !isFinished) {
      setIsFinished(true); // Блокируем повторный запуск
      
      const tl = gsap.timeline({
        onComplete: onComplete // Сигнал в page.js
      });

      // Цифры исчезают
      tl.to(textRef.current, { opacity: 0, duration: 0.5, delay: 0.2 });
      
      // Шторка улетает
      tl.to(containerRef.current, { 
        y: '-100%', 
        duration: 0.8, 
        ease: "power4.inOut" 
      });
    }
  }, [percentage, isFinished, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white"
    >
      <div ref={textRef} className="text-center font-mono">
        <div className="mb-4 text-xs uppercase tracking-[0.5em] text-gray-500 animate-pulse">
          System Initialization
        </div>
        
        {/* Цифры */}
        <div className="text-9xl font-black tracking-tighter tabular-nums text-white">
          {Math.round(percentage)}%
        </div>

        {/* Логи */}
        <div className="mt-4 text-xs text-purple-500 font-mono h-6 overflow-hidden">
          {percentage < 100 ? "Loading Assets..." : "System Ready."}
        </div>
      </div>
    </div>
  );
}