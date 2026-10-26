'use client';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const lineVariants = {
  hidden: { y: '115%', rotate: 2.5 },
  shown: ({ delay }) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1.15, ease: EASE, delay },
  }),
};

/**
 * Заголовок, строки которого выезжают из-под маски снизу вверх.
 *
 * Текст целиком приходит в серверном HTML (важно для SEO), анимируются
 * только transform-свойства. lines — массив строк: строка или JSX, например
 * <span className="accent-serif">проекты</span>.
 *
 * play не передан — запуск при появлении в окне; передан — внешний запуск
 * (первый экран ждёт, пока уедет шторка-заставка).
 *
 * Появление в окне отслеживает сам заголовок, а не строки: строка до старта
 * сдвинута под маску, и IntersectionObserver с учётом overflow: hidden
 * считает её невидимой — анимация никогда бы не запустилась.
 */
export default function MaskReveal({
  as: Tag = 'h2',
  lines,
  className = '',
  delay = 0,
  stagger = 0.1,
  play,
  ...rest
}) {
  const MotionTag = motion[Tag];
  const external = typeof play === 'boolean';

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(external
        ? { animate: play ? 'shown' : 'hidden' }
        : { whileInView: 'shown', viewport: { once: true, amount: 0.4 } })}
      {...rest}
    >
      {lines.map((line, i) => (
        // Отступы с отрицательными полями — чтобы маска не срезала выносные
        // элементы кириллицы и курсив антиквы при line-height меньше 1
        <span key={i} className="block overflow-hidden py-[0.12em] -my-[0.12em] pr-[0.1em] -mr-[0.1em]">
          <motion.span
            className="block origin-bottom-left"
            variants={lineVariants}
            custom={{ delay: delay + i * stagger }}
          >
            {line}
            {/* Пробел между блочными строками: без него поисковик
                и скринридер склеят последнее слово строки с первым следующей */}
            {' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
