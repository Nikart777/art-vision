import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowUpRight,
    ShieldCheck,
    LayoutGrid,
    Target,
    ChevronRight,
    Users
} from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { solutions } from '@/data/solutions';
import { casesData } from '@/data/cases';

export async function generateStaticParams() {
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = solutions.find(s => s.slug === slug);

    if (!data) {
        return {
            title: 'Решение не найдено | Art.Vision',
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
            url: `https://art-vision.online/solutions/${slug}/`,
        },
        alternates: {
            canonical: `https://art-vision.online/solutions/${slug}/`,
        },
    };
}

export default function SolutionPage({ params }) {
    const { slug } = params;
    const data = solutions.find(s => s.slug === slug);

    if (!data) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: data.h1,
        audience: {
            '@type': 'BusinessAudience',
            audienceType: slug
        },
        provider: {
            '@type': 'Organization',
            name: 'Art.Vision',
            url: 'https://art-vision.online'
        },
        description: data.description,
        offers: {
            '@type': 'Offer',
            price: data.price || '40000',
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
            url: `https://art-vision.online/solutions/${slug}/`
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300">
            <JsonLd data={jsonLd} />

            {/* HERO SECTION - Industry Specific */}
            <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center px-6 py-32 overflow-hidden border-b border-gray-100 dark:border-white/5">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50" />

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Отраслевое Решение</span>
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
                            href="/#contact-form"
                            className="inline-flex h-14 items-center justify-center px-10 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            {data.heroCta}
                        </Link>
                        <Link
                            href="/#calculator"
                            className="inline-flex h-14 items-center justify-center px-10 border-2 border-primary/20 bg-transparent text-[#101818] dark:text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/5 transition-all"
                        >
                            Рассчитать стоимость
                        </Link>
                    </div>
                </div>
            </section>

            {/* DOMAIN INSIGHTS */}
            <section className="py-24 px-6 md:px-10 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-12 mb-10">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
                                <Target className="w-8 h-8 text-primary" />
                                Специфика вашей ниши
                            </h2>
                        </div>
                        <div className="lg:col-span-8">
                            <p className="text-xl font-medium leading-[1.6] text-gray-600 dark:text-gray-300 border-l-4 border-primary pl-8 py-2">
                                {data.intro}
                            </p>
                        </div>
                        <div className="lg:col-span-4 bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Закон и Стандарты
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed italic">
                                "{data.valueProp}"
                            </p>
                            <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 font-medium leading-relaxed">
                                {data.compliance || "Мы соблюдаем все юридические требования и стандарты безопасности, актуальные для вашей ниши (ФЗ-152, оферты и т.д.)."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* KEY FEATURES BENTO */}
            <section className="bg-gray-50/50 dark:bg-white/[0.02] py-24 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-black uppercase tracking-widest text-primary mb-4 block">Экосистема</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ключевой функционал</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.scope.map((item, idx) => (
                            <div key={idx} className="p-8 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-primary">
                                    <LayoutGrid className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold tracking-tight mb-4 group-hover:text-primary transition-colors min-h-[3rem]">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RELATED EXPERIENCE */}
            <section className="py-24 px-6 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full mb-4">
                            <Users className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Portfolio</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Наш опыт в этой нише</h2>
                        <p className="mt-4 text-gray-500 font-medium">Мы понимаем боли ваших клиентов и знаем, как превратить их в заявки.</p>
                    </div>

                    <div className="space-y-4">
                        {(data.relatedCases && data.relatedCases.length > 0) ? (
                            data.relatedCases.map(caseSlug => {
                                const caseInfo = casesData[caseSlug];
                                if (!caseInfo) return null;
                                return (
                                    <Link
                                        key={caseSlug}
                                        href={`/cases/${caseSlug}/`}
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2rem] hover:border-primary/30 transition-all shadow-sm hover:shadow-xl"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60">Кейс Art.Vision</span>
                                            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                                {caseInfo.h1 || caseInfo.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#101818] dark:text-white mt-4 sm:mt-0">
                                            Смотреть <ChevronRight className="w-5 h-5 text-primary" />
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="p-12 text-center bg-gray-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 font-medium mb-6">Каждый проект в этой нише уникален. Мы готовы разработать персональную стратегию для вас.</p>
                                <Link
                                    href="/#contact-form"
                                    className="inline-flex h-12 items-center justify-center px-8 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-xl"
                                >
                                    Обсудить ваш проект
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-6 bg-primary/5 border-t border-primary/10">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-3xl font-black tracking-tight mb-6">Готовы к росту?</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-10 leading-relaxed">
                        Мы берем на себя всю техническую часть: от аналитики ниши до запуска трафика. Оставьте заявку и получите стратегию развития.
                    </p>
                    <Link
                        href="/#contact-form"
                        className="inline-flex h-16 items-center justify-center px-12 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                    >
                        Связаться с экспертом
                    </Link>
                </div>
            </section>
        </main>
    );
}
