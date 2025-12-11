'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// 1. Компонент, который отслеживает переходы по страницам (SPA)
// Next.js не перезагружает страницу, поэтому мы должны "стучать" Яндексу вручную при смене URL
function MetrikaTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(105786115, 'hit', url);
    }
  }, [pathname, searchParams]);

  return null;
}

// 2. Основной компонент
export default function YandexMetrika() {
  return (
    <>
      {/* 🛡️ ВАЖНО: Suspense лечит ошибку сборки "missing-suspense-with-csr-bailout" */}
      <Suspense fallback={null}>
        <MetrikaTracking />
      </Suspense>

      {/* Скрипт инициализации (Твой код + оптимизация Next.js) */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(105786115, "init", {
               ssr: true,              // <--- Добавили твой параметр
               clickmap: true,
               trackLinks: true,
               accurateTrackBounce: true,
               webvisor: true
          });
        `}
      </Script>

      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/105786115" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  );
}