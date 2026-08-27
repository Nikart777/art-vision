'use client';

import { useEffect } from 'react';
import { trackCtaClick } from '@/lib/analytics';

/**
 * Один слушатель на весь документ вместо обёртки вокруг каждой кнопки.
 *
 * Так CTA можно размечать прямо в серверных компонентах — достаточно
 * дописать кнопке атрибут data-cta="имя_цели", клиентский код не нужен.
 * Цель по каждому имени считается один раз на страницу (goal.md §8).
 */
export default function CtaTracker() {
    useEffect(() => {
        const onClick = (event) => {
            const target = event.target?.closest?.('[data-cta]');
            if (target) trackCtaClick(target.dataset.cta);
        };

        // capture: клик долетит до нас даже если обработчик кнопки остановит всплытие
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    return null;
}
