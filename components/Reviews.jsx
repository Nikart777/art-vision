'use client';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import JsonLd from './JsonLd';

const reviews = [
    {
        name: "Иван Петров",
        company: "ООО 'ТехноМир'",
        text: "Заказывали сайт для привлечения B2B клиентов. За 5 дней получили готовый продукт, который уже через месяц окупил вложения за счет SEO-трафика.",
        rating: 5,
        service: "Разработка сайта + SEO",
        date: "2025-11-12"
    },
    {
        name: "Мария Волкова",
        company: "Клиника 'Nova'",
        text: "Art.Vision помогли перенести наш сайт на Next.js. Скорость загрузки выросла в 4 раза, а количество заявок с мобильных устройств — на 40%.",
        rating: 5,
        service: "Миграция на Next.js",
        date: "2025-12-05"
    },
    {
        name: "Сергей Семенов",
        company: "МебельПлюс",
        text: "Интегрировали сложный калькулятор стоимости и CRM. Теперь менеджеры тратят на обработку заказа в 2 раза меньше времени.",
        rating: 5,
        service: "Кастомная разработка",
        date: "2026-01-10"
    }
];

export default function Reviews() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "Art.Vision Digital Agency",
            "image": "https://art-vision.online/logo.png",
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
        "review": reviews.map(rev => ({
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
        <section id="reviews" className="relative w-full py-24 bg-background-light dark:bg-background-dark/30 transition-colors overflow-hidden">
            <JsonLd data={jsonLd} />

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">

                <header className="mb-20 text-center animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Репутация</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                        Нам <span className="text-gradient">Доверяют</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Мы не просто делаем сайты, мы строим фундамент для роста вашего бизнеса. Честные отзывы и реальные результаты.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((rev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col group"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(rev.rating)].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 text-primary fill-primary" />
                                ))}
                            </div>

                            <div className="relative mb-8">
                                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/5 -z-10 group-hover:text-primary/10 transition-colors" />
                                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic text-base">
                                    "{rev.text}"
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                <div>
                                    <span className="block font-black text-sm uppercase tracking-tight">{rev.name}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rev.company}</span>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Trust Symbols */}
                <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase">99% Satisfaction</div>
                    <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase">5.0 Google Rating</div>
                    <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase">120+ Success Stories</div>
                </div>

            </div>
        </section>
    );
}
