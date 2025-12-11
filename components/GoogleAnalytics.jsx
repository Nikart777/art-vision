'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  // Твой уникальный ID
  const GA_MEASUREMENT_ID = 'G-RY2XVJVWMF'; 

  return (
    <>
      {/* 1. Загружаем библиотеку Google (асинхронно, чтобы сайт летал) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      
      {/* 2. Инициализируем трекер */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}