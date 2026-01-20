import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { services } from '@/data/services';
import {
    CheckCircle2,
    ChevronRight,
    TrendingUp,
    ArrowUpRight,
    HelpCircle
} from 'lucide-react';

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = services.find(s => s.slug === slug);

    if (!data) {
        return {
            title: 'Услуга не найдена | Art.Vision',
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
            url: `https://art-vision.online/services/${slug}/`,
        },
        alternates: {
            canonical: `https://art-vision.online/services/${slug}/`,
        },
    };
}

export default function ServicePage({ params }) {
    const { slug } = params;
    const data = services.find(s => s.slug === slug);

    if (!data) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.h1,
        provider: {
            '@type': 'Organization',
            name: 'Art.Vision',
            url: 'https://art-vision.online'
        },
        description: data.description,
        offers: {
            '@type': 'Offer',
            price: data.basePrice || '40000',
            priceCurrency: 'RUB'
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300 relative z-10">
            <JsonLd data={jsonLd} />

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center px-6 py-32 overflow-hidden border-b border-gray-100 dark:border-white/5">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-primary/2 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Сервис Art.Vision</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        {data.h1}
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                        {data.heroSub}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href="/#calculator"
                            className="inline-flex h-14 items-center justify-center px-10 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            {data.heroCta}
                        </Link>
                        <Link
                            href="/#works"
                            className="inline-flex h-14 items-center justify-center px-10 border-2 border-primary/20 bg-transparent text-[#101818] dark:text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/5 transition-all"
                        >
                            Наши работы
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTRO & VALUE PROP */}
            <section className="py-24 px-6 md:px-10 lg:px-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-7">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
                                Решаем бизнес-задачи <br />
                                <span className="text-gradient">цифровыми методами</span>
                            </h2>
                            <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-600 dark:text-gray-300">
                                {data.intro}
                            </p>
                        </div>
                        <div className="lg:col-span-5 bg-white dark:bg-white/5 p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-primary/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Почему Art.Vision</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                {data.valueProp}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCOPE OF WORK */}
            <section className="bg-gray-50/50 dark:bg-white/[0.02] py-24 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-black uppercase tracking-widest text-primary mb-4 block">Что внутри</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Полный комплекс работ</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.scope.map((item, idx) => (
                            <div key={idx} className="p-10 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-primary font-black text-xl">{idx + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 block">Дорожная карта</span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Как мы создаем продукт</h2>
                    </div>
                    <div className="space-y-6">
                        {data.process.map((step, idx) => {
                            const [stepTitle, stepDesc] = step.split(': ');
                            return (
                                <div key={idx} className="group relative flex gap-6 p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2rem] hover:border-primary/30 transition-all shadow-sm">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{stepTitle}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{stepDesc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PRICE & TIMELINE */}
            <section className="py-24 px-6 bg-primary/5">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-background-dark rounded-[3rem] p-10 md:p-16 border-2 border-primary/10 text-center shadow-2xl shadow-primary/10">
                        <h2 className="text-3xl font-black tracking-tight mb-8">Стоимость и Сроки</h2>
                        <p className="text-xl font-medium text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed mb-10">
                            {data.priceTime}
                        </p>
                        <Link
                            href="/#calculator"
                            className="inline-flex h-14 items-center justify-center px-12 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            Рассчитать точную смету →
                        </Link>
                    </div>
                </div>
            </section>

            {/* PAGE FAQ */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-black uppercase tracking-widest text-[#00b9d1] mb-4 block">Ответы</span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Частые вопросы об этой услуге</h2>
                    </div>
                    <div className="space-y-4">
                        {data.faq.map((item, idx) => (
                            <details key={idx} className="group bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all">
                                <summary className="flex cursor-pointer items-center justify-between p-8 list-none text-lg font-bold">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                            <HelpCircle className="w-5 h-5" />
                                        </div>
                                        <span className="group-hover:text-primary transition-colors">{item.q}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-gray-100 dark:border-white/10 flex items-center justify-center group-open:rotate-180 transition-transform">
                                        <ArrowUpRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </summary>
                                <div className="p-8 pt-0 text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-100 dark:border-white/5 text-base">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
