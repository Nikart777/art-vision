import { NextResponse } from 'next/server';

/**
 * Легаси-редиректы (goal.md §3).
 *
 * Почему не `redirects()` в next.config.mjs: при `trailingSlash: true` Next
 * срезает слэш у destination, и получается цепочка
 *   /старый/ → /новый → /новый/
 * то есть два перехода вместо одного. Здесь адрес назначения отдаётся
 * ровно в том виде, в каком он записан, — один 301 и всё.
 *
 * Правило регламента: страницы не удаляем, а склеиваем, чтобы ссылочный
 * вес старого URL перешёл на новый.
 */
const LEGACY_REDIRECTS = new Map([
    // URL не соответствовал контенту (страница про мобильную адаптацию)
    ['/services/nextjs-development', '/services/mobile-adaptation/'],
    // URL обещал UX/UI-дизайн, а контент — техподдержка и редизайн
    ['/services/ux-ui-design', '/services/tech-support/'],
    // URL обещал корпоративный сайт, а страница была про лендинг.
    // Само понятие «корпоративный сайт» отдано новой странице
    // /services/korporativnyy-sayt/ под свой кластер запросов.
    ['/services/corporate-website', '/services/razrabotka-lendinga/'],
]);

export function middleware(request) {
    const { pathname } = request.nextUrl;
    // Ищем и со слэшем, и без — чтобы оба варианта старого адреса вели напрямую
    const target =
        LEGACY_REDIRECTS.get(pathname) ?? LEGACY_REDIRECTS.get(pathname.replace(/\/$/, ''));

    if (!target) return NextResponse.next();

    const destination = new URL(target, request.url);
    destination.search = request.nextUrl.search; // метки из рекламы не теряем
    return NextResponse.redirect(destination, 301);
}

export const config = {
    matcher: [
        '/services/nextjs-development/:path*',
        '/services/ux-ui-design/:path*',
        '/services/corporate-website/:path*',
    ],
};
