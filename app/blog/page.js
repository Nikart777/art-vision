import Link from 'next/link';
import { blogData } from '@/data/blog';
import { ArrowRight, Clock, User, BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Блог Art.Vision | Экспертиза в веб-разработке и SEO',
    description: 'Статьи о современной веб-разработке на Next.js, стратегиях продвижения бизнеса и техническом SEO. Только практический опыт и реальные цифры.',
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
        <main className="min-h-screen bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300 pt-32 pb-20">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
                <header className="mb-20 text-center animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">База Знаний</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Блог <span className="text-gradient">Art.Vision</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Мы не пишем ради текста. Мы делимся кодом, стратегиями и ошибками, которые сэкономили нашим клиентам миллионы.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}/`}
                            className="group relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="p-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-gray-400 border border-gray-100 dark:border-white/10">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
                                    {post.h1 || post.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                                    {post.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {post.author}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* SEO CONTENT SECTION */}
                <section className="mt-40 border-t border-gray-100 dark:border-white/5 pt-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="text-primary w-8 h-8" />
                            <h2 className="text-3xl font-black tracking-tight m-0">
                                Тренды веб-разработки и маркетинга в 2026 году
                            </h2>
                        </div>
                        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-400 font-medium">
                            <p className="leading-relaxed">
                                Современный рынок разработки сайтов перестал быть битвой "картинок". Сегодня это про скорость, конверсию и техническое совершенство. В Art.Vision мы верим, что каждый байт кода должен работать на ваш бизнес. Поэтому мы используем стек Next.js — он позволяет достичь показателей скорости загрузки (Lighthouse), которые недоступны классическим CMS или конструкторам вроде Tilda или WordPress.
                            </p>
                            <h3 className="text-xl font-black tracking-tight text-[#101818] dark:text-white mt-12 mb-4 uppercase">Почему контент важен для бизнеса?</h3>
                            <p className="leading-relaxed">
                                Поисковые системы, такие как Google и Яндекс, оценивают экспертизу автора (E-E-A-T). Наш блог — это подтверждение нашего профессионализма в разработке сложных систем, интеграции с CRM и глубоком понимании SEO. Если вы ищете способ масштабировать свой проект, наши статьи помогут разобраться в технических нюансах без лишней воды.
                            </p>
                            <ul className="list-disc pl-5 space-y-3 mt-10">
                                <li><strong>Оптимизация Core Web Vitals</strong>: как не вылететь из индекса поисковых систем.</li>
                                <li><strong>CRM-интеграции</strong>: почему ручная обработка лидов убивает ваш ROI.</li>
                                <li><strong>Архитектура сайтов</strong>: как структура влияет на краулинговый бюджет.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
