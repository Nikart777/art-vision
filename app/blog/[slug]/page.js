
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { blogData } from '@/data/blog';

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
            url: `https://art-vision.online/blog/${slug}`,
            publishedTime: data.date,
            authors: [data.author],
        },
        alternates: {
            canonical: `https://art-vision.online/blog/${slug}`,
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
            '@id': `https://art-vision.online/blog/${slug}`
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />

            <article className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="flex justify-center gap-2 mb-6">
                        {data.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono uppercase tracking-widest px-2 py-1 border border-white/20 rounded text-gray-400">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
                        {data.h1}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-mono">
                        <span>{data.date}</span>
                        <span>•</span>
                        <span>{data.author}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto">
                    <div
                        className="prose prose-invert prose-lg prose-purple mx-auto prose-headings:font-bold prose-headings:uppercase prose-p:text-gray-300 prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>

                {/* Footer Navigation */}
                <div className="max-w-3xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                        ← На главную
                    </Link>
                    <div className="text-gray-500 text-sm">
                        Art.Vision Blog
                    </div>
                </div>
            </article>
        </>
    );
}
