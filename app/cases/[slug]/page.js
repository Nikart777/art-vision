import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { casesData } from '@/data/cases';
import {
    ArrowLeft,
    ArrowUpRight,
    Calendar,
    Layers,
    Target,
    Zap,
    Briefcase,
    TrendingUp
} from 'lucide-react';

export async function generateStaticParams() {
    return Object.keys(casesData).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = casesData[slug];

    if (!data) {
        return {
            title: 'Кейс не найден | Art.Vision',
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
            url: `https://art-vision.online/cases/${slug}/`,
        },
        alternates: {
            canonical: `https://art-vision.online/cases/${slug}/`,
        },
    };
}

export default function CasePage({ params }) {
    const { slug } = params;
    const data = casesData[slug];

    if (!data) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.h1,
        creator: {
            '@type': 'Organization',
            name: 'Art.Vision'
        },
        description: data.description,
        about: {
            '@type': 'Thing',
            name: data.service
        }
    };

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300 relative z-10 pt-32 pb-20">
            <JsonLd data={jsonLd} />

            <article className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">

                {/* HERO SECTION */}
                <header className="relative mb-24 animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-primary">
                                    {data.industry} / {data.year}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] mb-10">
                                {data.h1}
                            </h1>
                            <p className="max-w-xl text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        <div className="lg:col-span-4 grid grid-cols-2 gap-8 border-l border-gray-100 dark:border-white/5 pl-8 hidden lg:grid">
                            <div className="space-y-2">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Клиент</span>
                                <span className="text-sm font-bold">{data.client}</span>
                            </div>
                            <div className="space-y-2">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Индустрия</span>
                                <span className="text-sm font-bold">{data.industry}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* KEY RESULT HIGHLIGHT */}
                <section className="mb-24 p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                        <TrendingUp className="w-48 h-48" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Zap className="w-10 h-10 fill-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Результат</h2>
                        </div>
                        <p className="text-2xl md:text-4xl font-black tracking-tighter text-right leading-tight">
                            {data.result}
                        </p>
                    </div>
                </section>

                {/* CASE DETAILS BENTO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <div className="p-10 md:p-12 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-8 text-primary">
                            <Target className="w-6 h-6" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Задача</h3>
                        </div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-600 dark:text-gray-300">
                            {data.challenge}
                        </p>
                    </div>

                    <div className="p-10 md:p-12 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-8 text-primary">
                            <Layers className="w-6 h-6" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Решение</h3>
                        </div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-600 dark:text-gray-300">
                            {data.solution}
                        </p>
                    </div>

                    <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-4">Технологический Стек:</span>
                            {data.technologies.map(tech => (
                                <span key={tech} className="px-5 py-2.5 bg-white dark:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest border border-gray-100 dark:border-white/10 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA & FOOTER */}
                <footer className="text-center py-20 border-t border-gray-100 dark:border-white/10">
                    <h2 className="text-3xl font-black tracking-tight mb-10">Хотите измеримый результат для своего бизнеса?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href="/#calculator"
                            className="h-16 inline-flex items-center justify-center px-10 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            Рассчитать стоимость
                        </Link>
                        <Link
                            href="/cases/"
                            className="h-16 inline-flex items-center justify-center px-10 bg-white dark:bg-white/5 border-2 border-primary/20 text-[#101818] dark:text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/5 transition-all"
                        >
                            Все работы
                        </Link>
                    </div>
                </footer>
            </article>
        </main>
    );
}
