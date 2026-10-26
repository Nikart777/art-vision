'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const format = (value, decimals, prefix, suffix) =>
  // Русская запись дробей — через запятую: «0,3 с», «5,0»
  `${prefix}${value.toFixed(decimals).replace('.', ',')}${suffix}`;

/**
 * Число, которое «досчитывает» до значения, когда попадает в окно.
 * Сервер отдаёт итоговое значение (его видят поисковик и браузер без JS),
 * на клиенте до появления в окне показываем ноль.
 */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 2.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(() => format(to, decimals, prefix, suffix));

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) {
      setText(format(0, decimals, prefix, suffix));
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(format(v, decimals, prefix, suffix)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
