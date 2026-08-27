'use client';

/**
 * Единая точка отправки конверсий в Яндекс.Метрику и GA4.
 *
 * Регламент (goal.md §8) требует «гигиены конверсий»: цель на странице
 * засчитывается один раз, иначе повторные клики по кнопке раздувают
 * количество лидов и ломают расчёт стоимости заявки.
 */

export const YM_COUNTER_ID = 105786115;

// Ключ — «цель + страница». Живёт до перезагрузки: SPA-переход между
// страницами даёт новый ключ, повторный клик на той же странице — нет.
const firedOnce = new Set();

/**
 * @param {string} goal   идентификатор цели (латиницей, как в Метрике)
 * @param {object} params дополнительные параметры события
 * @param {{ oncePerPage?: boolean }} options
 */
export function trackGoal(goal, params = {}, { oncePerPage = true } = {}) {
    if (typeof window === 'undefined') return false;

    const key = `${goal}@${window.location.pathname}`;
    if (oncePerPage && firedOnce.has(key)) return false;
    if (oncePerPage) firedOnce.add(key);

    try {
        if (typeof window.ym === 'function') {
            window.ym(YM_COUNTER_ID, 'reachGoal', goal, params);
        }
        if (typeof window.gtag === 'function') {
            window.gtag('event', goal, {
                ...params,
                page_path: window.location.pathname,
            });
        }
    } catch {
        // Аналитика не должна ломать интерфейс, если блокировщик вырезал скрипт
        return false;
    }

    return true;
}

// Отправленная форма — основная цель сайта.
export const trackLead = (params) => trackGoal('lead_form_submit', params);

// Клик по CTA: отдельная цель, чтобы видеть разрыв между «нажал» и «отправил».
export const trackCtaClick = (label) => trackGoal('cta_click', { cta: label });
