'use client';
import { motion } from 'framer-motion';

export default function SquashHamburger({ isOpen, className = "" }) {
  const springConfig = { type: "spring", stiffness: 300, damping: 20 };
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 
        Container must define w/h in CSS. 
        Top bar translates to vertical center and rotates 45deg.
        Bottom bar translates to vertical center and rotates -45deg.
      */}
      <motion.span 
        className="absolute w-full h-[1.2px] md:h-[1.5px] bg-white rounded-full"
        animate={{ top: isOpen ? "50%" : "0%", translateY: isOpen ? "-50%" : "0%", rotate: isOpen ? 45 : 0 }}
        transition={springConfig}
        style={{ top: "0%" }}
      />
      <motion.span 
        className="absolute w-full h-[1.2px] md:h-[1.5px] bg-white rounded-full"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={springConfig}
      />
      <motion.span 
        className="absolute w-full h-[1.2px] md:h-[1.5px] bg-white rounded-full"
        animate={{ bottom: isOpen ? "50%" : "0%", translateY: isOpen ? "50%" : "0%", rotate: isOpen ? -45 : 0 }}
        transition={springConfig}
        style={{ bottom: "0%" }}
      />
    </div>
  );
}
