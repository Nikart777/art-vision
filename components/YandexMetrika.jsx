'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Внутренний компонент отслеживания
function MetrikaTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Эта функция сработает при первой загрузке (Mount) 
    // И при каждом изменении пути или параметров (Navigation)
    if (typeof window !== 'undefined' && window.ym) {
      const url = window.location.href; // Берем полный URL
      
      // Отправляем HIT (просмотр) вручную, так как defer: true
      window.ym(105786115, 'hit', url, {
        title: document.title // Передаем заголовок страницы
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function YandexMetrika() {
  return (
    <>
      {/* Suspense защищает от ошибок сборки в Next.js 14 */}
      <Suspense fallback={null}>
        <MetrikaTracking />
      </Suspense>

      {/* Инициализация счетчика по правилам SPA */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(105786115, "init", {
               defer: true,            // <--- ГЛАВНОЕ: Отключаем авто-отправку
               clickmap: true,         // Карта кликов
               trackLinks: true,       // Карта ссылок
               accurateTrackBounce: true, // Точный показатель отказов
               webvisor: true          // Вебвизор
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