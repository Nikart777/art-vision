'use client';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import JsonLd from './JsonLd';

import { reviewsData } from '@/data/reviews';

export default function Reviews({ isH1 = false }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "Art.Vision Digital Agency",
            "image": "https://art-vision.online/icon.png",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Moscow",
                "addressCountry": "RU"
            }
        },
        "ratingValue": "5.0",
        "reviewCount": "120",
        "bestRating": "5",
        "worstRating": "1",
        "review": reviewsData.map(rev => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": rev.name },
            "datePublished": rev.date,
            "reviewBody": rev.text,
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": rev.rating.toString()
            }
        }))
    };

    return (
        <section id="reviews" className="relative w-full py-24 bg-black text-white font-sans transition-colors overflow-hidden">
            <JsonLd data={jsonLd} />

            <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">

                <motion.header 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.0 }}
                  className="mb-20 text-center"
                >
                    <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
                        Репутация
                    </p>
                    {isH1 ? (
                        <h1 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
                            Что о нас Говорят Клиенты
                        </h1>
                    ) : (
                        <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-4 uppercase">
                            Нам Доверяют
                        </h2>
                    )}
                    <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
                        Мы не просто делаем сайты, мы строим фундамент для роста вашего бизнеса. Честные отзывы и реальные результаты.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviewsData.map((rev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="p-8 bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col group"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(rev.rating)].map((_, idx) => (
                                    <Star key={idx} className="w-3 h-3 text-white/50 fill-white/50" />
                                ))}
                            </div>

                            <div className="relative mb-8">
                                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-white/5 -z-10 group-hover:text-white/10 transition-colors" />
                                <p className="text-white/70 font-light leading-relaxed italic text-sm tracking-wide">
                                    "{rev.text}"
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <span className="block font-light text-sm uppercase tracking-tight text-white/90">{rev.name}</span>
                                    <span className="text-[10px] font-light text-white/40 uppercase tracking-widest">{rev.company}</span>
                                </div>
                                <div className="p-2 bg-white/5 rounded-full text-white/50 group-hover:bg-white/10 group-hover:text-white transition-all">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Trust Symbols */}
                <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 transition-all duration-700">
                    <div className="flex items-center gap-2 font-light text-sm tracking-[0.2em] uppercase text-white/60">99% Satisfaction</div>
                    <div className="flex items-center gap-2 font-light text-sm tracking-[0.2em] uppercase text-white/60">5.0 Google Rating</div>
                    <div className="flex items-center gap-2 font-light text-sm tracking-[0.2em] uppercase text-white/60">120+ Success Stories</div>
                </div>

            </div>
        </section>
    );
}
