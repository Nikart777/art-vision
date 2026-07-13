'use client';
import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export default function ScrambleText({ text, isHovered, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
      return;
    }
    
    let frame = 0;
    const length = text.length;
    // Scramble all initially
    let currentScrambled = text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    setDisplayText(currentScrambled);
    
    intervalRef.current = setInterval(() => {
      // reveal at 4 frames per char, i.e. 0.25 chars per frame
      const revealIdx = Math.floor(frame / 4);
      
      if (revealIdx >= length) {
        setDisplayText(text);
        clearInterval(intervalRef.current);
        return;
      }
      
      let nextStr = '';
      for (let i = 0; i < length; i++) {
        if (i <= revealIdx) {
          nextStr += text[i];
        } else {
          if (text[i] === ' ') nextStr += ' ';
          else nextStr += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(nextStr);
      frame++;
    }, 25);
    
    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
}
