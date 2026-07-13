'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function CinematicTextSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 35,
    mass: 1.5
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [80, -140]);
  const transformTemplate = useMotionTemplate`perspective(400px) rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;
  
  // Appears much faster and earlier
  const opacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  // Cinematic un-blur effect
  const blurRaw = useTransform(smoothProgress, [0.1, 0.3], [12, 0]);
  const filterTemplate = useMotionTemplate`blur(${blurRaw}px)`;

  return (
    <section ref={sectionRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Top Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-[180px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)' }}
      />

      {/* 3D Animated Text */}
      <motion.div
        className="relative z-20 max-w-5xl"
        style={{
          transform: transformTemplate,
          opacity: opacity,
          filter: filterTemplate,
        }}
      >
        <p className="font-sans font-bold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.3] tracking-tight select-none px-6 sm:px-12 text-center text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#5a5a66] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          Мы не просто делаем сайты. Мы создаем цифровые решения на стыке маркетинга и технологий. Каждый проект становится измеримым, структурированным и эффективным инструментом продаж, объединяя премиальный дизайн и передовую аналитику.
        </p>
      </motion.div>
    </section>
  );
}
