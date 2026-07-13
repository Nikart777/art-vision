'use client';
import { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export default function ScrambleIn({ text, delay = 0, triggered = false, className = "" }) {
  const [displayText, setDisplayText] = useState('\u00A0'); // initially non-breaking space
  
  useEffect(() => {
    if (!triggered) {
      setDisplayText('\u00A0');
      return;
    }
    
    let timeoutId;
    let intervalId;
    
    timeoutId = setTimeout(() => {
      let frame = 0;
      const length = text.length;
      
      intervalId = setInterval(() => {
        // We reveal 0.5 chars per frame
        const revealIdx = Math.floor(frame / 2);
        
        if (revealIdx >= length) {
          setDisplayText(text);
          clearInterval(intervalId);
          return;
        }
        
        let scrambled = '';
        for (let i = 0; i < length; i++) {
          if (i < revealIdx) {
            scrambled += text[i];
          } else if (i < revealIdx + 3) {
            if (text[i] === ' ') {
              scrambled += ' ';
            } else {
              scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          } else {
            // Beyond window, don't show anything (to match empty spec)
            // Wait, if we use empty string, the element size might change. 
            // We use \u00A0 to keep spacing? Spec says "characters beyond that are empty".
            // Since it's a typing effect, it grows from left to right.
          }
        }
        // If scrambled is completely empty initially, make sure it has at least non-breaking space
        setDisplayText(scrambled || '\u00A0');
        frame++;
      }, 25);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, triggered]);

  return <span className={className}>{displayText}</span>;
}
