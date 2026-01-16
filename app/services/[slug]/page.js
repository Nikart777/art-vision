import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { services } from '@/data/services';

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
            url: `https://art-vision.online/services/${slug}`,
        },
        alternates: {
            canonical: `https://art-vision.online/services/${slug}`,
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
    };

    return (
        <>
            <JsonLd data={jsonLd} />

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center bg-black text-white px-4 py-20 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col gap-6">
                    <span className="text-purple-400 font-mono uppercase tracking-widest text-xs md:text-sm">
                        Art.Vision Services
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        {data.h1}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                        {data.heroSub}
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/#calculator"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105"
                        >
                            {data.heroCta}
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTRO & VALUE PROP */}
            <section className="bg-black text-white py-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200 border-l-2 border-purple-500 pl-6">
                            {data.intro}
                        </p>
                        <div className="mt-12 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                            <h3 className="text-purple-400 font-mono uppercase mb-4 text-sm">Почему Art.Vision</h3>
                            <p className="text-gray-300">
                                {data.valueProp}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCOPE OF WORK */}
            <section className="bg-[#050505] text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-tight text-center">
                        Что входит в услугу
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.scope.map((item, idx) => (
                            <div key={idx} className="p-8 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors group">
                                <div className="h-10 w-10 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-purple-400 font-bold">{idx + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-black text-white py-20 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-mono uppercase text-gray-500 mb-12 text-center">Процесс</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {data.process.map((step, idx) => {
                            const [stepTitle, stepDesc] = step.split(': ');
                            return (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-purple-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="3" />
                                        </svg>
                                    </div>
                                    {/* Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 p-4 rounded border border-white/10 shadow hover:border-purple-500/30 transition-colors">
                                        <h3 className="font-bold text-white mb-1">{stepTitle}</h3>
                                        <p className="text-gray-400 text-xs sm:text-sm">{stepDesc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PRICE & TIMELINE (SIMPLE TEXT) */}
            <section className="bg-[#0A0A0A] text-white py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Стоимость и Сроки</h2>
                    <div className="bg-gradient-to-b from-purple-900/20 to-transparent p-1 rounded-2xl">
                        <div className="bg-black rounded-xl p-8 md:p-12 border border-white/10">
                            <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {data.priceTime}
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/#calculator"
                                    className="text-purple-400 hover:text-white underline underline-offset-4 transition-colors"
                                >
                                    Рассчитать точную смету →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-black text-white py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center uppercase">Частые вопросы</h2>
                    <div className="space-y-4">
                        {data.faq.map((item, idx) => (
                            <details key={idx} className="group bg-white/5 rounded-lg border border-white/5 open:border-white/10 transition-all">
                                <summary className="flex cursor-pointer items-center justify-between p-6 list-none text-lg font-medium">
                                    <span className="group-hover:text-purple-400 transition-colors">{item.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 md:text-base text-sm">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
