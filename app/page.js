import HomePage from '@/components/HomePage';

// Главная — серверный компонент, чтобы экспортировать metadata (клиентская
// часть вынесена в components/HomePage.jsx). Свои title/description + canonical.
export const metadata = {
  // Шаблон "%s | Art.Vision" из layout не применяется к корневой странице,
  // поэтому бренд указываем в title главной явно.
  title: 'Разработка сайтов под ключ: цена от 40 000 ₽ | Art.Vision',
  description: 'Разработка сайтов под ключ за 5 дней: премиальный дизайн на Next.js, фокус на заявках и окупаемости рекламы. Более 100 проектов. ✔ Цена от 40 000 ₽.',
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
