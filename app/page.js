import HomePage from '@/components/HomePage';

// Главная — серверный компонент, чтобы экспортировать metadata (клиентская
// часть вынесена в components/HomePage.jsx). Свои title/description + canonical.
export const metadata = {
  // Шаблон "%s | Art.Vision" из layout не применяется к корневой странице,
  // поэтому бренд указываем в title главной явно.
  title: 'Разработка цифровых продуктов, платформ и сайтов | Art.Vision',
  description: 'Цифровые продукты под ключ: платформы и SaaS, e-commerce, корпоративные сайты и GEO-сопровождение в нейросетях. Для бизнеса и организаций. 100+ проектов.',
  alternates: {
    canonical: 'https://24art-vision.ru/',
  },
  openGraph: {
    url: 'https://24art-vision.ru/',
  },
};

export default function Page() {
  return <HomePage />;
}
