import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Подключение локальных шрифтов
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

// Метаданные сайта
export const metadata = {
  title: "Art.Vision | Digital Agency",
  description: "Агентство разработки цифровых экосистем. Мы делаем сайты, которые продают.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* 👇 ВСТАВЛЯЕМ МЕТРИКУ СЮДА (сразу после открытия body) */}
        <YandexMetrika />
        <GoogleAnalytics />

        {/* Хедер будет виден на всех страницах */}
        <Header />
        
        {/* Основной контент страницы */}
        {children}
      </body>
    </html>
  );
}