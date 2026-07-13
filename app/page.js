import HomePage from '@/components/HomePage';

// Главная — серверный компонент, чтобы экспортировать metadata (клиентская
// часть вынесена в components/HomePage.jsx). Свои title/description + canonical.
export const metadata = {
  // Шаблон "%s | Art.Vision" из layout не применяется к корневой странице,
  // поэтому бренд указываем в title главной явно.
  title: 'Разработка сайтов под ключ в Москве | Art.Vision',
  description: 'Создаём конверсионные сайты под ключ за 5 дней: премиальный дизайн на Next.js с фокусом на окупаемость маркетинга. Более 100 проектов. Москва.',
  alternates: {
    canonical: 'https://art-vision.online/',
  },
  openGraph: {
    url: 'https://art-vision.online/',
  },
};

export default function Page() {
  return <HomePage />;
}
