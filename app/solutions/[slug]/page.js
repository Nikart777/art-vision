
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { solutions } from '@/data/solutions';

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
            url: `https://art-vision.online/solutions/${slug}`,
        },
        alternates: {
            canonical: `https://art-vision.online/solutions/${slug}`,
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
    };

    return (
        <>
            <JsonLd data={jsonLd} />

            {/* HERO SECTION - More Industry Focused */}
            <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center bg-[#050505] text-white px-4 py-20 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col gap-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4">
                        Industry Solution
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
                        {data.h1}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                        {data.heroSub}
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/#contact-form"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                            {data.heroCta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTRO & VALUE PROP */}
            <section className="bg-black text-white py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold uppercase text-gray-200">Специфика ниши</h3>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            {data.intro}
                        </p>
                        <div className="p-6 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-lg">
                            <p className="text-emerald-100 italic">
                                "{data.valueProp}"
                            </p>
                        </div>
                    </div>

                    {/* Compliance Block */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h4 className="font-mono uppercase text-sm tracking-wider">Безопасность и Закон</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {/* Compliance data is removed from new structure, using fallback text or check if exists */}
                            {data.compliance || "Мы соблюдаем все юридические требования и стандарты безопасности, актуальные для вашей ниши (ФЗ-152, оферты и т.д.)."}
                        </p>
                    </div>
                </div>
            </section>

            {/* DOMAIN FEATURES */}
            <section className="bg-[#080808] text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight text-center">
                        Ключевой Функционал
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.scope.map((item, idx) => (
                            <div key={idx} className="p-6 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                                <h3 className="text-lg font-bold mb-3 min-h-[3rem] text-emerald-500/90">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ (Removed from new data structure, using call to action instead or generic FAQ) */}
            <section className="bg-black text-white py-20 px-4 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-mono uppercase text-gray-500 mb-6">Остались вопросы?</h2>
                    <p className="text-gray-400 mb-8">
                        Мы понимаем специфику {data.title} и готовы предложить решение под ключ.
                    </p>
                    <Link
                        href="/#contact-form"
                        className="inline-block px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded hover:bg-gray-200 transition-colors"
                    >
                        Связаться с нами
                    </Link>
                </div>
            </section>

        </>
    );
}
