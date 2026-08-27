import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Блок внутренней перелинковки (goal.md §6).
 *
 * Смысл не в «похожих статьях», а в перекачке веса: каждая коммерческая
 * страница отдаёт ссылки другим коммерческим страницам, а не в «О нас».
 * Анкор — осмысленный заголовок услуги/решения, а не «читать далее».
 *
 * items: [{ href, title, subtitle }]
 */
export default function RelatedLinks({
    title = 'Смотрите также',
    subtitle,
    items = [],
}) {
    if (!items.length) return null;

    return (
        <section className="py-24 px-6 border-t border-gray-100 dark:border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-primary mb-4 block">
                        Куда дальше
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h2>
                    {subtitle && (
                        <p className="mt-4 max-w-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-start justify-between gap-6 p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-primary/40 hover:bg-primary/[0.03] transition-all"
                        >
                            <span className="flex flex-col gap-2">
                                <span className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </span>
                                {item.subtitle && (
                                    <span className="text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                        {item.subtitle}
                                    </span>
                                )}
                            </span>
                            <ArrowUpRight
                                aria-hidden="true"
                                className="w-5 h-5 shrink-0 mt-1 text-gray-300 dark:text-gray-600 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
