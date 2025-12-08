import { ReactLenis } from '@studio-freight/react-lenis'; // Убрали "use client" отсюда, чтобы работали метаданные
import './globals.css';

// 1. КОНФИГУРАЦИЯ МЕТАДАННЫХ (SEO)
export const metadata = {
  metadataBase: new URL('https://artvision.pro'), // ЗАМЕНИ НА СВОЙ ДОМЕН!
  title: {
    default: 'Art.Vision | Digital Ecosystems & WebGL Development',
    template: '%s | Art.Vision'
  },
  description: 'Мы создаем живые цифровые экосистемы. Разработка сайтов, WebGL, 3D Design, UI/UX. Агентство цифровой трансформации.',
  keywords: ['Web Development', 'WebGL', 'Three.js', 'React Agency', 'Digital Design', 'Сайт визитка', 'Разработка сайтов'],
  authors: [{ name: 'Art.Vision Team' }],
  creator: 'Art.Vision',
  openGraph: {
    title: 'Art.Vision — Digital Agency',
    description: 'Превращаем код в цифровую магию. Живые экосистемы для вашего бизнеса.',
    url: 'https://artvision.pro',
    siteName: 'Art.Vision',
    images: [
      {
        url: '/og-image.jpg', // Тебе нужно положить картинку og-image.jpg в папку public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Тоже положи в public
  },
};

// 2. ВЫНОСИМ КЛИЕНТСКУЮ ЛОГИКУ В ОТДЕЛЬНЫЙ КОМПОНЕНТ
// Next.js не любит хуки в файле с metadata, поэтому делаем обертку
import ClientLayout from '@/components/ClientLayout'; 

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="bg-[#050505] text-white overflow-x-hidden">
      <body className="antialiased selection:bg-purple-500 selection:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}