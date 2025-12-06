'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion'; 

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [text, setText] = useState(children);
  
  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const queue = [];
    const originalText = children;
    
    // Создаем очередь для анимации каждой буквы
    for (let i = 0; i < originalText.length; i++) {
      queue.push({
        from: originalText[i],
        to: originalText[i],
        start: Math.floor(Math.random() * 40),
        end: Math.floor(Math.random() * 40) + 40,
        char: chars[Math.floor(Math.random() * chars.length)]
      });
    }

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="opacity-50 text-purple-400">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      setText(output);
      
      if (complete === queue.length) return;
      
      frame++;
      requestAnimationFrame(update);
    };

    update();
  }, [children, isInView]);

  return (
    <div 
      ref={ref} 
      className={className}
      dangerouslySetInnerHTML={{ __html: text }} // Используем HTML для цветных символов
    />
  );
}