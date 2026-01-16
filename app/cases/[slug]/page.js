
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { casesData } from '@/data/cases';

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
            url: `https://art-vision.online/cases/${slug}`,
        },
        alternates: {
            canonical: `https://art-vision.online/cases/${slug}`,
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
        <>
            <JsonLd data={jsonLd} />

            <main className="min-h-screen bg-[#050505] text-white">

                {/* HERO */}
                <section className="relative pt-32 pb-20 px-4 border-b border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-purple-500 font-mono text-xs uppercase tracking-widest">{data.industry}</span>
                                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                    <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">{data.year}</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-8">
                                    {data.h1}
                                </h1>
                                <p className="text-xl text-gray-400 font-light leading-relaxed">
                                    {data.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm font-mono uppercase tracking-wider text-gray-500">
                                <div>
                                    <span className="block text-white/40 text-xs mb-1">Клиент</span>
                                    <span className="text-white">{data.client}</span>
                                </div>
                                <div>
                                    <span className="block text-white/40 text-xs mb-1">Услуга</span>
                                    <span className="text-white">{data.service}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RESULTS METRICS */}
                <section className="py-12 border-b border-white/5 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                            <h3 className="text-2xl font-bold uppercase">Результат</h3>
                            <p className="text-lg md:text-xl text-white font-mono border-l-2 border-green-500 pl-6">
                                {data.result}
                            </p>
                        </div>
                    </div>
                </section>

                {/* CASE DETAILS */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto space-y-16">

                        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                            <h3 className="text-xl font-bold uppercase text-gray-500">Задача</h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {data.challenge}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                            <h3 className="text-xl font-bold uppercase text-purple-500">Решение</h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {data.solution}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                            <h3 className="text-xl font-bold uppercase text-gray-500">Стек</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 text-center border-t border-white/10">
                    <h2 className="text-3xl font-bold uppercase mb-8">Хотите такой же результат?</h2>
                    <Link href="/#calculator" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors">
                        Обсудить проект
                    </Link>
                </section>

            </main>
        </>
    );
}
