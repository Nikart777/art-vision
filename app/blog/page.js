import Link from 'next/link';
import { blogData } from '@/data/blog';
import { ArrowRight, Clock, User, BookOpen } from 'lucide-react';
import Navbar from '@/components/synapsex/Navbar';
import Footer from '@/components/synapsex/Footer';

export const metadata = {
    title: 'Блог о веб-разработке и SEO',
    description: 'Статьи о веб-разработке на Next.js, продвижении бизнеса в Яндексе и Google и техническом SEO. Только практический опыт агентства и реальные цифры по проектам.',
    alternates: {
        canonical: 'https://art-vision.online/blog/',
    },
};

export default function BlogListPage() {
    const posts = Object.entries(blogData).map(([slug, data]) => ({
        slug,
        ...data
    }));

    return (
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            {/* Dark gradient overlay */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-20">
                {/* HERO SECTION FOR BLOG */}
                <section className="relative py-32 px-6 md:px-10 lg:px-20 border-b border-white/10 overflow-hidden min-h-[70vh] flex items-center justify-center">
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40 filter grayscale contrast-125"
                        >
                            <source
                                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
                                type="video/mp4"
                            />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 max-w-[1400px] mx-auto text-center animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
                                    База Знаний
                                </span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1] mb-10 text-white uppercase drop-shadow-2xl">
                            Блог <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-white">Art.Vision</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-white/60 font-light leading-relaxed">
                            Мы не пишем ради текста. Мы делимся кодом, стратегиями и ошибками, которые сэкономили нашим клиентам миллионы.
                        </p>
                    </div>
                </section>

                <div className="py-24 px-6 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}/`}
                                className="group relative bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-white/30 transition-all duration-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <div className="relative z-10 p-10 flex flex-col h-full">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4 tracking-tight text-white leading-tight uppercase">
                                        {post.h1 || post.title}
                                    </h2>
                                    <p className="text-white/50 text-base font-light leading-relaxed mb-10 flex-grow">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                                        <div className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-widest">
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                                <User className="w-4 h-4" />
                                            </div>
                                            {post.author}
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* SEO CONTENT SECTION */}
                    <section className="mt-40 border-t border-white/10 pt-20">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <BookOpen className="text-white w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
                                    Тренды веб-разработки и маркетинга в 2026 году
                                </h2>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-white/60 font-light">
                                <p className="leading-relaxed">
                                    Современный рынок разработки сайтов перестал быть битвой "картинок". Сегодня это про скорость, конверсию и техническое совершенство. В Art.Vision мы верим, что каждый байт кода должен работать на ваш бизнес. Поэтому мы используем стек Next.js — он позволяет достичь показателей скорости загрузки (Lighthouse), которые недоступны классическим CMS или конструкторам вроде Tilda или WordPress.
                                </p>
                                <h3 className="text-xl font-bold tracking-tight text-white mt-12 mb-4 uppercase">Почему контент важен для бизнеса?</h3>
                                <p className="leading-relaxed">
                                    Поисковые системы, такие как Google и Яндекс, оценивают экспертизу автора (E-E-A-T). Наш блог — это подтверждение нашего профессионализма в разработке сложных систем, интеграции с CRM и глубоком понимании SEO. Если вы ищете способ масштабировать свой проект, наши статьи помогут разобраться в технических нюансах без лишней воды.
                                </p>
                                <ul className="list-disc pl-5 space-y-3 mt-10">
                                    <li><strong className="text-white font-bold">Оптимизация Core Web Vitals</strong>: как не вылететь из индекса поисковых систем.</li>
                                    <li><strong className="text-white font-bold">CRM-интеграции</strong>: почему ручная обработка лидов убивает ваш ROI.</li>
                                    <li><strong className="text-white font-bold">Архитектура сайтов</strong>: как структура влияет на краулинговый бюджет.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </main>
    );
}
