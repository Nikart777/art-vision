import Link from 'next/link';
import Navbar from '@/components/synapsex/Navbar';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/synapsex/Footer';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { services } from '@/data/services';

export const metadata = {
    title: 'Разработка сайтов на заказ: услуги и цены',
    description: 'Услуги веб-разработки под ключ: лендинги, интернет-магазины, CRM-системы и мобильные приложения. Цены от 15 000 ₽, запуск от 5 дней. ✔ Смотреть прайс.',
    alternates: {
        canonical: 'https://art-vision.online/services/',
    },
    openGraph: {
        url: 'https://art-vision.online/services/',
    },
};

// ItemList помогает поисковику понять, что это хаб-страница со списком услуг,
// и подтягивать в выдачу отдельные пункты вместо одной общей ссылки.
const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Услуги веб-разработки Art.Vision',
    itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.h1,
        url: `https://art-vision.online/services/${service.slug}/`,
    })),
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay matching the main page */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

            <JsonLd data={itemListJsonLd} />
            <Navbar entranceComplete={true} />

            <div className="relative z-20 pt-20">
                {/* SEO-хедер: до правки у страницы вообще не было H1,
                    хотя это главная коммерческая точка входа сайта. */}
                <header className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 pt-20 pb-4">
                    <Breadcrumbs className="mb-10" items={[{ name: 'Услуги' }]} />

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] uppercase max-w-4xl">
                        Услуги веб-разработки: от лендинга до CRM и приложений
                    </h1>

                    <p className="mt-8 max-w-2xl text-white/60 text-base md:text-lg leading-relaxed">
                        Собираем цифровые продукты, которые окупаются: сайты и интернет-магазины,
                        CRM-системы под процессы отдела продаж, мобильные приложения для iOS и Android.
                        Работаем по всей России, запуск первого результата — от 5 рабочих дней.
                    </p>

                    {/* Текстовая перелинковка: анкоры-ключи ведут вглубь, где деньги */}
                    <ul className="mt-10 flex flex-wrap gap-3">
                        {services.map((service) => (
                            <li key={service.slug}>
                                <Link
                                    href={`/services/${service.slug}/`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-[13px] font-semibold text-white/80 hover:border-[#00d4ff]/60 hover:text-white hover:bg-[#00d4ff]/10 transition-all"
                                >
                                    {service.h1}
                                    <span className="text-white/40">{service.price}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-sm text-white/40 leading-relaxed max-w-2xl">
                        Не нашли свою задачу? Посмотрите{' '}
                        <Link href="/solutions/" className="text-[#00d4ff] hover:underline">
                            отраслевые решения
                        </Link>{' '}
                        — там разобрано, как сайт работает в конкретной нише, — или{' '}
                        <Link href="/cases/" className="text-[#00d4ff] hover:underline">
                            наши кейсы
                        </Link>{' '}
                        с цифрами по каждому проекту.
                    </p>
                </header>

                <Services />
                <ContactForm />
                <Footer />
            </div>
        </main>
    );
}
