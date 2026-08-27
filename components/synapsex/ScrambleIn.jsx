'use client';
import { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

const PLACEHOLDER = ' '; // неразрывный пробел — держит высоту строки

/**
 * Анимация «набора» текста со скремблом.
 *
 * SEO-нюанс: раньше начальным состоянием был неразрывный пробел, поэтому
 * в серверном HTML главной страницы H1 приходил пустым — слов «Сайты Для
 * Бизнеса» в разметке просто не было, они появлялись только после JS.
 *
 * Теперь первый рендер (и на сервере, и на клиенте — иначе была бы ошибка
 * гидратации) отдаёт настоящий текст, а на пустой плейсхолдер компонент
 * переключается уже в эффекте, перед самой анимацией. Вспышки текста не
 * видно: родительский контейнер до старта анимации имеет opacity: 0.
 *
 * Текст в разметке ровно один раз — дублировать его скрытым слоем нельзя,
 * иначе заголовок читается как «Сайты Сайты Для Бизнеса Для Бизнеса».
 */
export default function ScrambleIn({ text, delay = 0, triggered = false, className = "" }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!triggered) {
      setDisplayText(PLACEHOLDER);
      return;
    }

    let timeoutId;
    let intervalId;

    setDisplayText(PLACEHOLDER);

    timeoutId = setTimeout(() => {
      let frame = 0;
      const length = text.length;

      intervalId = setInterval(() => {
        // Раскрываем по половине символа за кадр
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
            // Окно «шума» из трёх символов бежит впереди раскрытой части
            scrambled += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          // Дальше окна ничего не рисуем: эффект печати растёт слева направо
        }

        setDisplayText(scrambled || PLACEHOLDER);
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
