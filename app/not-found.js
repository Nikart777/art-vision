'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
            404
          </h1>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-4 text-white mix-blend-difference">
            Системный Сбой
          </h2>
          <p className="font-mono text-purple-500 text-sm mb-8">
            /// ERR_PAGE_NOT_FOUND: DESTINATION_UNKNOWN
          </p>
          
          <Link 
            href="/"
            className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-all rounded-full"
          >
            Вернуться на Базу
          </Link>
        </div>
      </div>

    </div>
  );
}