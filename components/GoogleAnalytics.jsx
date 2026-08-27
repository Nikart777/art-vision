'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-RY2XVJVWMF';

/**
 * App Router меняет страницы без перезагрузки, поэтому gtag('config') отрабатывает
 * ровно один раз — все последующие переходы в GA4 просто не попадали.
 * Досылаем page_view руками, как это уже сделано для Яндекс.Метрики.
 */
function PageViewTracking() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

        window.gtag('event', 'page_view', {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [pathname, searchParams]);

    return null;
}

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', {
            // Первый просмотр шлём вручную вместе с остальными,
            // иначе на старте страница считалась бы дважды.
            send_page_view: false
          });
        `}
            </Script>

            <Suspense fallback={null}>
                <PageViewTracking />
            </Suspense>
        </>
    );
}
