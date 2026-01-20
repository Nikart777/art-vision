import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { blogData } from '@/data/blog';
import { User, ArrowLeft, BookOpen, Clock } from 'lucide-react';

export async function generateStaticParams() {
    return Object.keys(blogData).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = blogData[slug];

    if (!data) {
        return {
            title: 'Статья не найдена | Art.Vision Blog',
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
            url: `https://art-vision.online/blog/${slug}/`,
            publishedTime: data.date,
            authors: [data.author],
        },
        alternates: {
            canonical: `https://art-vision.online/blog/${slug}/`,
        },
    };
}

export default function BlogPage({ params }) {
    const { slug } = params;
    const data = blogData[slug];

    if (!data) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.h1,
        datePublished: data.date,
        author: {
            '@type': 'Person',
            name: data.author
        },
        description: data.description,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://art-vision.online/blog/${slug}/`
        }
    };

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-300 pt-32 pb-20 selection:bg-primary/30 selection:text-white">
            <JsonLd data={jsonLd} />

            <article className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
                {/* Header Section */}
                <header className="max-w-4xl mx-auto mb-20 text-center animate-fade-in">
                    <div className="flex justify-center flex-wrap gap-2 mb-8">
                        {data.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-primary/5 text-primary rounded-full border border-primary/10 transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-10">
                        {data.h1}
                    </h1>

                    <div className="flex items-center justify-center gap-6 pt-10 border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Автор Контента</span>
                                <span className="text-sm font-bold">{data.author}</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-gray-100 dark:bg-white/5 hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Категория</span>
                                <span className="text-sm font-bold">Industry Insight</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className="prose dark:prose-invert prose-lg max-w-none 
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[#101818] dark:prose-headings:text-white
                        prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-medium
                        prose-a:text-primary prose-a:font-black prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-[#101818] dark:prose-strong:text-white prose-strong:font-black
                        prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                        prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-li:font-medium"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>

                {/* Footer Navigation */}
                <footer className="max-w-4xl mx-auto mt-32 pt-12 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <Link
                        href="/blog/"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest hover:border-primary transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5"
                    >
                        <ArrowLeft className="w-4 h-4 text-primary transition-transform group-hover:-translate-x-1" />
                        Назад в блог
                    </Link>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <div className="h-1 w-1 bg-primary rounded-full"></div>
                        Art.Vision Digital Expertise
                    </div>
                </footer>
            </article>
        </main>
    );
}
