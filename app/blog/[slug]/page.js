import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { blogData } from '@/data/blog';
import { User, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import Navbar from '@/components/synapsex/Navbar';
import Footer from '@/components/synapsex/Footer';

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
        <main className="min-h-screen bg-black font-sans text-white selection:bg-white/20">
            <JsonLd data={jsonLd} />

            {/* Dark gradient overlay */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

            <Navbar entranceComplete={true} />

            <div className="relative z-10 pt-32 pb-20">
                <article className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
                    {/* Header Section */}
                    <header className="max-w-4xl mx-auto mb-20 text-center animate-fade-in pt-10">
                        <div className="flex justify-center flex-wrap gap-2 mb-8">
                            {data.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1] mb-10 uppercase text-white drop-shadow-2xl">
                            {data.h1}
                        </h1>

                        <div className="flex items-center justify-center gap-6 pt-10 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30">Автор</span>
                                    <span className="text-sm font-bold text-white/80">{data.author}</span>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30">Опубликовано</span>
                                    <span className="text-sm font-bold text-white/80">{data.date}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Section */}
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
                            prose-p:text-white/60 prose-p:leading-relaxed prose-p:font-light
                            prose-a:text-white prose-a:font-bold prose-a:border-b prose-a:border-white/30 prose-a:no-underline hover:prose-a:border-white
                            prose-strong:text-white prose-strong:font-bold
                            prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-[0_0_30px_rgba(255,255,255,0.05)]
                            prose-li:text-white/60 prose-li:font-light"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </div>

                    {/* Footer Navigation */}
                    <footer className="max-w-4xl mx-auto mt-32 pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-8">
                        <Link
                            href="/blog/"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)]"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Назад в блог
                        </Link>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></div>
                            Art.Vision Digital Expertise
                        </div>
                    </footer>
                </article>

                <div className="mt-32">
                    <Footer />
                </div>
            </div>
        </main>
    );
}
