import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const BASE_URL = 'https://art-vision.online';

/**
 * Хлебные крошки: видимая навигация + BreadcrumbList для расширенного сниппета.
 *
 * items — массив от корня к текущей странице, БЕЗ главной (она добавляется сама)
 * и БЕЗ ссылки у последнего элемента:
 *   [{ name: 'Услуги', href: '/services/' }, { name: 'Разработка CRM' }]
 *
 * Зачем: в выдаче вместо «сырого» URL показывается путь Главная › Услуги › …,
 * это поднимает CTR и одновременно раздаёт вес хабовым разделам (goal.md §6).
 */
export default function Breadcrumbs({ items = [], className = '' }) {
    const trail = [{ name: 'Главная', href: '/' }, ...items];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            // У последнего элемента ссылки нет — по спецификации item опускается
            ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
        })),
    };

    return (
        <>
            <JsonLd data={schema} />
            <nav aria-label="Хлебные крошки" className={className}>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {trail.map((item, index) => {
                        const isLast = index === trail.length - 1;
                        return (
                            <li key={item.name} className="flex items-center gap-2">
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span aria-current="page" className="text-gray-600 dark:text-gray-300">
                                        {item.name}
                                    </span>
                                )}
                                {!isLast && <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</span>}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
