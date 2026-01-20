import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";

// Подключение локальных шрифтов (как было)
// Google Fonts & Icons imported via Metadata or direct link in Head if needed, 
// but for Next.js it's better to use next/font/google
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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

  // Описание: Продающий текст, который виден в Google (сниппет)
  description: "Разработка премиальных сайтов и цифровых экосистем. Мы создаем веб-продукты, которые повышают продажи, скорость и доверие к бренду. Москва.",

  // Ключевые слова (хотя Google их игнорирует, Яндекс и другие учитывают)
  keywords: ["разработка сайтов", "веб-дизайн", "Next.js", "React", "создание сайтов москва", "digital agency", "3D сайты", "дорогой сайт"],

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Art.Vision",
  "url": "https://art-vision.online",
  "logo": "https://art-vision.online/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-999-000-00-00",
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
        className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-display bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300`}
      >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <JsonLd data={organizationSchema} />
        <YandexMetrika />
        <GoogleAnalytics />
        <Header />
        {children}
      </body>
    </html>
  );
}
