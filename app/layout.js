import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";
import CtaTracker from "@/components/CtaTracker";

// Раньше здесь грузились Manrope, Geist Sans и Geist Mono, а Space Mono
// и Anton SC приходили через @import в globals.css. По факту tailwind.config.js
// отдаёт весь текст Space Mono, поэтому три шрифта скачивались вхолостую,
// а два нужных — блокирующим запросом к fonts.googleapis.com.
// Теперь грузим ровно те два, что реально используются, и self-hosted.
import { Space_Mono, Anton } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
});

// Используется только в декоративном водяном знаке на главной
// (components/synapsex/HeroSection.jsx). Там был заявлен Anton SC, но
// в каталоге next/font его нет, а текст выводится в верхнем регистре —
// для капители и обычного Anton результат в этом месте одинаковый.
const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
});

// --- ПРОФЕССИОНАЛЬНОЕ SEO ---
export const metadata = {
  // Базовый URL для всех относительных ссылок (важно для OG картинок)
  metadataBase: new URL('https://art-vision.online'),

  // Заголовок: Шаблон позволяет легко менять названия внутренних страниц
  title: {
    default: "Art.Vision | Агентство цифрового развития",
    template: "%s | Art.Vision"
  },

  // Описание по умолчанию: страницы почти везде задают своё,
  // это подстраховка для маршрутов без собственных метаданных.
  description: "Разработка сайтов, интернет-магазинов, CRM-систем и мобильных приложений под ключ. Работаем по всей России. Запуск от 5 дней, цена от 40 000 ₽.",

  // Ключевые слова (Google их игнорирует, Яндекс частично учитывает)
  keywords: ["разработка сайтов", "создание сайта под ключ", "разработка интернет-магазина", "разработка CRM-системы", "разработка мобильных приложений", "заказать сайт", "веб-студия"],

  // Авторы и создатель
  authors: [{ name: 'Art.Vision studio', url: 'https://art-vision.online' }],
  creator: 'Art.Vision',

  // Open Graph — как ссылка выглядит в Facebook/LinkedIn/Telegram/WhatsApp
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://art-vision.online',
    siteName: 'Art.Vision Digital Agency',
    title: 'Art.Vision | Цифровое превосходство',
    description: 'Мы не просто кодим. Мы строим цифровые активы. Узнайте стоимость разработки сайта нового поколения.',
    // Явно указываем массив картинок
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Art.Vision Cover',
      },
    ],
  },

  // Twitter Card — для X (Twitter)
  twitter: {
    card: 'summary_large_image',
    title: 'Art.Vision | Разработка сайтов',
    description: 'Премиальная разработка на Next.js. Скорость, Дизайн, Конверсия.',
    images: ['/opengraph-image.jpg'],
  },

  // Инструкции для роботов (индексировать всё)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Подтверждение прав (Google Search Console)
  verification: {
    google: 'K9YSOOOASXZ6gbWPZiewqBsAmH8lmzddTRJ9idFTw3I',
  },
};

// Реквизиты и адрес в разметке — сигнал реальности компании (E-E-A-T).
// Данные взяты из футера, чтобы разметка и видимый текст не расходились:
// расхождение поисковики трактуют как попытку обмана.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://art-vision.online/#organization",
  "name": "Art.Vision",
  "legalName": "ООО «АТИМ»",
  "taxID": "504226843290",
  "url": "https://art-vision.online",
  "logo": "https://art-vision.online/icon.png",
  "image": "https://art-vision.online/opengraph-image.jpg",
  "description": "Разработка сайтов, интернет-магазинов, CRM-систем и мобильных приложений под ключ.",
  "email": "project@art-vision.online",
  "telephone": "+7-980-424-30-55",
  "priceRange": "от 5 000 ₽",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Тверская, 12",
    "addressLocality": "Москва",
    "addressCountry": "RU"
  },
  // Клиентов принимаем по всей России, а не только в Москве
  "areaServed": {
    "@type": "Country",
    "name": "Россия"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-980-424-30-55",
    "email": "project@art-vision.online",
    "contactType": "sales",
    "areaServed": "RU",
    "availableLanguage": "Russian"
  },
  "sameAs": [
    "https://t.me/artvision",
    "https://vk.com/artvision"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${spaceMono.variable} ${anton.variable} antialiased font-display bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300`}
      >
        <JsonLd data={organizationSchema} />
        <YandexMetrika />
        <GoogleAnalytics />
        <CtaTracker />
        {children}
        {/* NOISE OVERLAY - GLOBAL (Background Layer) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('/noise.svg')]"></div>
      </body>
    </html>
  );
}
